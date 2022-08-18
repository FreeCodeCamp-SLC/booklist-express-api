function sort(sortOption, lists) {
  let sortBy;
  switch (sortOption) {
    case 'Name: Asc':
      sortBy = lists ? 'NAME ASC' : 'TITLE ASC';
      break;
    case 'Name: Desc':
      sortBy = lists ? 'NAME DESC' : 'TITLE DESC';
      break;
    case 'Most Recent: Asc':
      sortBy = lists ? 'LIST_ID ASC' : 'BOOK_ID ASC';
      break;
    case 'Most Recent: Desc':
      sortBy = lists ? 'LIST_ID DESC' : 'BOOK_ID DESC';
      break;
    case 'Year: Asc':
      sortBy = lists ? 'YEAR ASC' : 'TITLE ASC';
      break;
    case 'Year: Desc':
      sortBy = lists ? 'YEAR DESC' : 'TITLE ASC';
      break;
    default:
      sortBy = lists ? 'NAME ASC' : 'TITLE ASC';
  }
  return sortBy;
}

module.exports = {
  sort,
};
