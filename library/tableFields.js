'use strict';

const listsTableFields = {
	listId: {
		required: false,
		updateable: false,
		dataType: 'NUMBER',
		fieldSize: 'null'
	},
	userId: {
		required: false,
		updateable: false,
		dataType: 'STRING',
		fieldSize: { MIN: 1, MAX: 255 }
	},
	name: {
		required: true,
		updateable: true,
		dataType: 'STRING',
		fieldSize: { MIN: 1, MAX: 255 }
	},
	year: {
		required: false,
		updateable: true,
		dataType: 'NUMBER',
		fieldSize: 'null'
	},
	createdOn: {
		required: false,
		updateable: false,
		dataType: 'DATETIME',
		fieldSize: 'null'
	},
	modifiedOn: {
		required: false,
		updateable: true,
		dataType: 'DATETIME',
		fieldSize: 'null'
	},
};

const booksTableFields = {
	bookId: {
		required: false,
		updateable: false,
		dataType: 'NUMBER',
		fieldSize: 'null'
	},
	userId: {
		required: false,
		updateable: false,
		dataType: 'STRING',
		fieldSize: { MIN: 1, MAX: 255 }
	},
	listId: {
		required: true,
		updateable: true,
		dataType: 'NUMBER',
		fieldSize: 'null'
	},
	author: {
		required: true,
		updateable: true,
		dataType: 'STRING',
		fieldSize: { MIN: 1, MAX: 255 }
	},
	title: {
		required: true,
		updateable: true,
		dataType: 'STRING',
		fieldSize: { MIN: 1, MAX: 255 }
	},
	imageUrl: {
		required: false,
		updateable: true,
		dataType: 'STRING',
		fieldSize: { MIN: 1, MAX: 255 }
	},
	pages: {
		required: false,
		updateable: true,
		dataType: 'NUMBER',
		fieldSize: 'null'
	},
  readingStatusId: {
		required: false,
		updateable: true,
		dataType: 'NUMBER',
		fieldSize: 'null'
	},
	dateStarted: {
		required: false,
		updateable: true,
		dataType: 'DATETIME',
		fieldSize: 'null'
	},
	dateFinished: {
		required: false,
		updateable: true,
		dataType: 'DATETIME',
		fieldSize: 'null'
	},
	createdOn: {
		required: false,
		updateable: true,
		dataType: 'DATETIME',
		fieldSize: 'null'
	},
	modifiedOn: {
		required: false,
		updateable: true,
		dataType: 'DATETIME',
		fieldSize: 'null'
	}
};

const readingStatusTableFields = {
	readingStatusId: {
		required: false,
		updateable: false,
		dataType: 'NUMBER',
		fieldSize: 'null'
	},
	userId: {
		required: false,
		updateable: false,
		dataType: 'STRING',
		fieldSize: { MIN: 1, MAX: 255 }
	},
	name: {
		required: true,
		updateable: true,
		dataType: 'STRING',
		fieldSize: { MIN: 1, MAX: 255 }
	},
	year: {
		required: false,
		updateable: true,
		dataType: 'NUMBER',
		fieldSize: 'null'
	},
	createdOn: {
		required: false,
		updateable: true,
		dataType: 'DATETIME',
		fieldSize: 'null'
	},
	modifiedOn: {
		required: true,
		updateable: true,
		dataType: 'DATETIME',
		fieldSize: 'null'
	}
};

module.exports = {
	listsTableFields,
	booksTableFields,
	readingStatusTableFields
};