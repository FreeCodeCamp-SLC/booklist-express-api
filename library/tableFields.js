const listsTableFields = {
  list_id: {
    required: false,
    updateable: false,
    dataType: 'NUMBER',
    fieldSize: 'null',
  },
  user_id: {
    required: false,
    updateable: false,
    dataType: 'STRING',
    fieldSize: { MIN: 1, MAX: 255 },
  },
  name: {
    required: true,
    updateable: true,
    dataType: 'STRING',
    fieldSize: { MIN: 1, MAX: 255 },
  },
  year: {
    required: false,
    updateable: true,
    dataType: 'NUMBER',
    fieldSize: 'null',
  },
  created_on: {
    required: false,
    updateable: false,
    dataType: 'DATETIME',
    fieldSize: 'null',
  },
  modified_on: {
    required: false,
    updateable: true,
    dataType: 'DATETIME',
    fieldSize: 'null',
  },
};

const booksTableFields = {
  book_id: {
    required: false,
    updateable: false,
    dataType: 'NUMBER',
    fieldSize: 'null',
  },
  user_id: {
    required: false,
    updateable: false,
    dataType: 'STRING',
    fieldSize: { MIN: 1, MAX: 255 },
  },
  list_id: {
    required: true,
    updateable: true,
    dataType: 'NUMBER',
    fieldSize: 'null',
  },
  author: {
    required: true,
    updateable: true,
    dataType: 'STRING',
    fieldSize: { MIN: 1, MAX: 255 },
  },
  title: {
    required: true,
    updateable: true,
    dataType: 'STRING',
    fieldSize: { MIN: 1, MAX: 255 },
  },
  image_url: {
    required: false,
    updateable: true,
    dataType: 'STRING',
    fieldSize: { MIN: 1, MAX: 255 },
  },
  pages: {
    required: false,
    updateable: true,
    dataType: 'NUMBER',
    fieldSize: 'null',
  },
  favorite: {
    required: false,
    updateable: true,
    dataType: 'BOOLEAN',
    fieldSize: 'null',
  },
  reading_status_id: {
    required: false,
    updateable: true,
    dataType: 'NUMBER',
    fieldSize: 'null',
  },
  date_started: {
    required: false,
    updateable: true,
    dataType: 'DATETIME',
    fieldSize: 'null',
  },
  date_finished: {
    required: false,
    updateable: true,
    dataType: 'DATETIME',
    fieldSize: 'null',
  },
  created_on: {
    required: false,
    updateable: true,
    dataType: 'DATETIME',
    fieldSize: 'null',
  },
  modified_on: {
    required: false,
    updateable: true,
    dataType: 'DATETIME',
    fieldSize: 'null',
  },
  rating: {
    required: false,
    updateable: true,
    dataType: 'NUMBER',
    fieldSize: 1,
  },
  bookmark_page: {
    required: false,
    updateable: true,
    dataType: 'NUMBER',
    fieldSize: 'null',
  },
  google_link: {
    required: false,
    updateable: true,
    dataType: 'STRING',
    fieldSize: { MIN: 0, MAX: 255 },
  },
  description: {
    required: false,
    updateable: true,
    dataType: 'STRING',
    fieldSize: { MIN: 0, MAX: 5000 },
  },
};

const readingStatusTableFields = {
  reading_status_id: {
    required: false,
    updateable: false,
    dataType: 'NUMBER',
    fieldSize: 'null',
  },
  name: {
    required: true,
    updateable: true,
    dataType: 'STRING',
    fieldSize: { MIN: 1, MAX: 255 },
  },
  created_on: {
    required: false,
    updateable: true,
    dataType: 'DATETIME',
    fieldSize: 'null',
  },
  modified_on: {
    required: false,
    updateable: true,
    dataType: 'DATETIME',
    fieldSize: 'null',
  },
};

const profilesTableFields = {
  user_id: {
    required: false,
    updateable: false,
    dataType: 'STRING',
    fieldSize: { MIN: 1, MAX: 255 },
  },
  user_name: {
    required: false,
    updateable: true,
    dataType: 'STRING',
    fieldSize: { MIN: 1, MAX: 40 },
  },
  about: {
    required: false,
    updateable: true,
    dataType: 'STRING',
    fieldSize: { MIN: 0, MAX: 2000 },
  },
  image_url: {
    required: false,
    updateable: true,
    dataType: 'STRING',
    fieldSize: { MIN: 1, MAX: 2048 },
  },
};

module.exports = {
  listsTableFields,
  booksTableFields,
  readingStatusTableFields,
  profilesTableFields,
};
