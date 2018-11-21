//adapted from stackoverflow
//*https://stackoverflow.com/questions/8900732/javascript-sort-objects-in-an-array-alphabetically-on-one-property-of-the-arra*

export const sortAllBooks = (list)=> {
  const newList = list.sort(function(a,b) {
    let textA = a.title.toUpperCase();
    let textB = b.title.toUpperCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
  });
  return newList;
};

export const combineShelfAndSearch = (shelf, search) => {
//check books from search results if they are already on the shelf data
  const exdata = {};
  shelf.forEach(book => exdata[book.id] = book.shelf);
  search.forEach(book => {
    book.shelf = exdata[book.id] || 'none';
  });

  return search;
}
