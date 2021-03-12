'use strict';

function validateRequestBody(req, tableFields, next) {
  const method = req.method;
  const requestBodyKeys = Object.keys(req.body);

  const validTableFields = Object.keys(tableFields);
  const requiredTableFields = gatherTableRequiredFields(tableFields);
  const updateableTableFields = gatherTableUpdateableFields(tableFields);
  const tableStringFields = gatherTableStringFields(tableFields);
  const tableIntFields = gatherTableIntFields(tableFields);
  const tableStringFieldSizes = gatherTableStringFieldSizes(tableFields);

  //CHECK TO MAKE SURE NO INVALID FIELDS ARE IN THE REQ.BODY
  requestBodyKeys.forEach((key) => {
    if (!validTableFields.includes(key)) {
      const error = new Error(`'${key}' is not a valid field.`);
      error.status = 422;
      return next(error);
    }
  });

  //CHECK TO MAKE SURE REQUIRED FIELDS ARE IN THE REQ.BODY
  if (method === 'POST') {
    const missingField = requiredTableFields.find(
      (field) => !(field in req.body),
    );
    if (missingField) {
      const error = new Error(`'${missingField}' is required.`);
      error.status = 422;
      return next(error);
    }
  }

  //CHECK TO MAKE SURE UPDATEABLE FIELDS ARE IN THE REQ.BODY
  if (method === 'PUT') {
    requestBodyKeys.forEach((key) => {
      if (!updateableTableFields.includes(key)) {
        const error = new Error(`'${key}' is not an updateable field.`);
        error.status = 422;
        return next(error);
      }
    });
  }

  //CHECK TO MAKE SURE STRING FIELDS ARE ACTUALLY STRINGS
  const invalidStringField = detectInvalidStringField(
    tableStringFields,
    req.body,
  );
  if (invalidStringField) {
    const error = new Error(`Field: '${invalidStringField}' must be a string.`);
    error.status = 422;
    return next(error);
  }
  const stringFieldsFromBody = gatherStringFieldsFromBody(req.body);

  //CHECK TO MAKE SURE NO LEADING/HANGING WHITE SPACES ARE IN THE STRINGS
  const nonTrimmedField = detectNonTrimmedStrings(
    tableStringFields,
    stringFieldsFromBody,
  );
  if (nonTrimmedField) {
    const error = new Error(
      `Field: '${nonTrimmedField}' cannot start or end with a whitespace.`,
    );
    error.status = 422;
    return next(error);
  }

  //CHECK TO MAKE SURE STRINGS HAVE THE MINIMUM AMOUNT OF CHARACTERS
  const fieldTooSmall = detectStringTooSmall(
    tableStringFieldSizes,
    stringFieldsFromBody,
  );
  if (fieldTooSmall) {
    const { MIN } = tableStringFieldSizes[fieldTooSmall];
    const characterString = MIN === 1 ? 'character' : 'characters';
    const error = new Error(
      `Field: '${fieldTooSmall}' must be at least ${MIN} ${characterString} long.`,
    );
    error.status = 422;
    return next(error);
  }

  //CHECK TO MAKE SURE STRINGS DON'T EXCEED MAXIMUM STRING LENGTH
  const fieldTooLarge = detectStringTooLarge(
    tableStringFieldSizes,
    stringFieldsFromBody,
  );
  if (fieldTooLarge) {
    const { MAX } = tableStringFieldSizes[fieldTooLarge];
    const error = new Error(
      `Field: '${fieldTooLarge}' must be at most ${MAX} characters long.`,
    );
    error.status = 422;
    return next(error);
  }

  //CHECK TO MAKE SURE INT FIELDS ARE ACTUALLY NUMBERS
  const nonIntField = detectInvalidIntField(tableIntFields, req.body);
  if (nonIntField) {
    const error = new Error(`Field: '${nonIntField}' must be a number.`);
    error.status = 422;
    return next(error);
  }
  const intFieldsFromBody = gatherIntFieldsFromBody(req.body);

  //CHECK TO MAKE SURE INT FIELDS ARE POSITIVE NUMBERS
  const negativeInt = detectNegativeInt(intFieldsFromBody);
  if (negativeInt) {
    const error = new Error(
      `Field: '${negativeInt}' must be a positive number.`,
    );
    error.status = 422;
    return next(error);
  }

  // PRIVATE FUNCTIONS
  function gatherTableRequiredFields(tableFields) {
    const requiredFields = [];
    for (const property in tableFields) {
      if (tableFields[property].required === true) {
        requiredFields.push(property);
      }
    }
    return requiredFields;
  }

  function gatherTableStringFields(tableFields) {
    const stringFields = [];
    for (const property in tableFields) {
      if (tableFields[property].dataType === 'STRING') {
        stringFields.push(property);
      }
    }
    return stringFields;
  }

  function gatherTableStringFieldSizes(tableFields) {
    const stringFieldSizes = {};
    for (const [key, value] of Object.entries(tableFields)) {
      if (tableFields[key].dataType === 'STRING') {
        stringFieldSizes[key] = value.fieldSize;
      }
    }
    return stringFieldSizes;
  }

  function gatherTableIntFields(tableFields) {
    const intFields = [];
    for (const property in tableFields) {
      if (tableFields[property].dataType === 'NUMBER') {
        intFields.push(property);
      }
    }
    return intFields;
  }

  function detectInvalidStringField(validStringList, requestBody) {
    return validStringList.find(
      (field) => field in requestBody && typeof requestBody[field] !== 'string',
    );
  }

  function gatherStringFieldsFromBody(reqBody) {
    const stringFields = {};
    for (const [key, value] of Object.entries(reqBody)) {
      if (typeof value === 'string') {
        stringFields[key] = value;
      }
    }
    return stringFields;
  }

  function detectNonTrimmedStrings(stringFields, stringFieldsFromBody) {
    return stringFields.find(
      (field) =>
        field in stringFieldsFromBody &&
        stringFieldsFromBody[field].trim() !== stringFieldsFromBody[field],
    );
  }

  function detectStringTooSmall(fieldSizes, stringFieldsFromBody) {
    return Object.keys(fieldSizes).find(
      (field) =>
        field in stringFieldsFromBody &&
        'MIN' in fieldSizes[field] &&
        stringFieldsFromBody[field].length < fieldSizes[field].MIN,
    );
  }

  function detectStringTooLarge(fieldSizes, stringFieldsFromBody) {
    return Object.keys(fieldSizes).find(
      (field) =>
        field in stringFieldsFromBody &&
        'MAX' in fieldSizes[field] &&
        stringFieldsFromBody[field].length > fieldSizes[field].MAX,
    );
  }

  function detectInvalidIntField(validNumberList, requestBody) {
    return validNumberList.find(
      (field) => field in requestBody && typeof requestBody[field] !== 'number',
    );
  }

  function gatherIntFieldsFromBody(reqBody) {
    const intFields = {};
    for (const [key, value] of Object.entries(reqBody)) {
      if (typeof value === 'number') {
        intFields[key] = value;
      }
    }
    return intFields;
  }

  function detectNegativeInt(intFieldsFromBody) {
    for (const [key, value] of Object.entries(intFieldsFromBody)) {
      if (value <= 0) {
        return key;
      }
    }
  }
}

function gatherTableUpdateableFields(tableFields) {
  const updateableFields = [];
  for (const property in tableFields) {
    if (tableFields[property].updateable === true) {
      updateableFields.push(property);
    }
  }
  return updateableFields;
}

module.exports = {
  validateRequestBody,
  gatherTableUpdateableFields,
};
