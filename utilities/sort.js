function sort(sortOption, lists) {
  console.log('sortOption', sortOption);
  console.log('lists', lists);
  let sortBy;
  switch (sortOption) {
    case 'Name: Asc':
      if (lists) {
        sortBy = 'NAME ASC';
      } else {
        sortBy = 'TITLE ASC';
      }
      break;
    case 'Name: Desc':
      if (lists) {
        sortBy = 'NAME DESC';
      } else {
        sortBy = 'TITLE DESC';
      }
      break;
    case 'Most Recent: Asc':
      if (lists) {
        sortBy = 'LIST_ID ASC';
      } else {
        sortBy = 'BOOK_ID ASC';
      }
      break;
    case 'Most Recent: Desc':
      if (lists) {
        sortBy = 'LIST_ID DESC';
      } else {
        sortBy = 'BOOK_ID DESC';
      }
      break;
    case 'Year: Asc':
      sortBy = 'YEAR ASC';
      break;
    case 'Year: Desc':
      sortBy = 'YEAR DESC';
      break;
    default:
      if (lists) {
        sortBy = 'NAME ASC';
      } else {
        sortBy = 'TITLE ASC';
      }
  }
  return sortBy;
}

module.exports = {
  sort,
};
