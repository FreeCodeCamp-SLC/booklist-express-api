function gatherTableUpdateableFields(fields) {
  const updateableFields = [];
  Object.keys(fields).forEach((field) => {
    if (fields[field].updateable === true) {
      updateableFields.push(field);
    }
  });
  return updateableFields;
}

function validateRequestBody(req, tableFields, next) {
  // PRIVATE FUNCTIONS
  function gatherTableRequiredFields(fields) {
    const requiredFields = [];
    Object.keys(fields).forEach((field) => {
      if (fields[field].required === true) {
        requiredFields.push(field);
      }
    });
    return requiredFields;
  }

  function gatherTableStringFields(fields) {
    const stringFields = [];
    Object.keys(fields).forEach((field) => {
      if (fields[field].dataType === 'STRING') {
        stringFields.push(field);
      }
    });
    return stringFields;
  }

  function gatherTableStringFieldSizes(fields) {
    const stringFieldSizes = {};
    Object.entries(fields).forEach((field) => {
      if (fields[field[0]].dataType === 'STRING') {
        stringFieldSizes[field[0]] = field[1].fieldSize;
      }
    });
    return stringFieldSizes;
  }

  function gatherTableIntFields(fields) {
    const intFields = [];
    Object.keys(fields).forEach((field) => {
      if (fields[field].dataType === 'NUMBER') {
        intFields.push(field);
      }
    });
    return intFields;
  }

  function detectInvalidStringField(validStringList, requestBody) {
    return validStringList.find(
      (field) => field in requestBody && typeof requestBody[field] !== 'string',
    );
  }

  function gatherStringFieldsFromBody(reqBody) {
    const stringFields = {};
    Object.entries(reqBody).forEach((field) => {
      const key = field[0];
      const value = field[1];
      if (typeof (value) === 'string') {
        stringFields[key] = value;
      }
    });
    return stringFields;
  }

  function detectNonTrimmedStrings(stringFields, stringFieldsFromBody) {
    return stringFields.find(
      (field) => field in stringFieldsFromBody
        && stringFieldsFromBody[field].trim() !== stringFieldsFromBody[field],
    );
  }

  function detectStringTooSmall(fieldSizes, stringFieldsFromBody) {
    return Object.keys(fieldSizes).find(
      (field) => field in stringFieldsFromBody
        && 'MIN' in fieldSizes[field]
        && stringFieldsFromBody[field].length < fieldSizes[field].MIN,
    );
  }

  function detectStringTooLarge(fieldSizes, stringFieldsFromBody) {
    return Object.keys(fieldSizes).find(
      (field) => field in stringFieldsFromBody
        && 'MAX' in fieldSizes[field]
        && stringFieldsFromBody[field].length > fieldSizes[field].MAX,
    );
  }

  function detectInvalidIntField(validNumberList, requestBody) {
    return validNumberList.find(
      (field) => field in requestBody && typeof requestBody[field] !== 'number',
    );
  }

  function gatherIntFieldsFromBody(reqBody) {
    const intFields = {};
    Object.entries(reqBody).forEach((field) => {
      const key = field[0];
      const value = field[1];
      if (typeof (value) === 'number') {
        intFields[key] = value;
      }
    });
    return intFields;
  }

  function detectNegativeInt(intFieldsFromBody) {
    let returnedField;
    Object.entries(intFieldsFromBody).forEach((field) => {
      const key = field[0];
      const value = field[1];
      if (value <= 0) {
        returnedField = key;
      }
    });
    return returnedField;
  }

  const { method } = req;
  const requestBodyKeys = Object.keys(req.body);
  const validTableFields = Object.keys(tableFields);
  const requiredTableFields = gatherTableRequiredFields(tableFields);
  const updateableTableFields = gatherTableUpdateableFields(tableFields);
  const tableStringFields = gatherTableStringFields(tableFields);
  const tableIntFields = gatherTableIntFields(tableFields);
  const tableStringFieldSizes = gatherTableStringFieldSizes(tableFields);

  // CHECK TO MAKE SURE NO INVALID FIELDS ARE IN THE REQ.BODY
  requestBodyKeys.forEach((key) => {
    if (!validTableFields.includes(key)) {
      const error = new Error(`'${key}' is not a valid field.`);
      error.status = 422;
      return next(error);
    }
    return true;
  });

  // CHECK TO MAKE SURE REQUIRED FIELDS ARE IN THE REQ.BODY
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

  // CHECK TO MAKE SURE UPDATEABLE FIELDS ARE IN THE REQ.BODY
  if (method === 'PUT') {
    requestBodyKeys.forEach((key) => {
      if (!updateableTableFields.includes(key)) {
        const error = new Error(`'${key}' is not an updateable field.`);
        error.status = 422;
        return next(error);
      }
      return true;
    });
  }

  // CHECK TO MAKE SURE STRING FIELDS ARE ACTUALLY STRINGS
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

  // CHECK TO MAKE SURE NO LEADING/HANGING WHITE SPACES ARE IN THE STRINGS
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

  // CHECK TO MAKE SURE STRINGS HAVE THE MINIMUM AMOUNT OF CHARACTERS
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

  // CHECK TO MAKE SURE STRINGS DON'T EXCEED MAXIMUM STRING LENGTH
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

  // CHECK TO MAKE SURE INT FIELDS ARE ACTUALLY NUMBERS
  const nonIntField = detectInvalidIntField(tableIntFields, req.body);
  if (nonIntField) {
    const error = new Error(`Field: '${nonIntField}' must be a number.`);
    error.status = 422;
    return next(error);
  }
  const intFieldsFromBody = gatherIntFieldsFromBody(req.body);

  // CHECK TO MAKE SURE INT FIELDS ARE POSITIVE NUMBERS
  const negativeInt = detectNegativeInt(intFieldsFromBody);
  if (negativeInt) {
    const error = new Error(
      `Field: '${negativeInt}' must be a positive number.`,
    );
    error.status = 422;
    return next(error);
  }
  return false;
}

module.exports = {
  validateRequestBody,
  gatherTableUpdateableFields,
};
