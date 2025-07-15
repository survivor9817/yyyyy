// bookNames is an array of book names

function addBooks(bookNames) {
  const bookSelector = document.getElementById('BooksDropdownList');
  bookNames.forEach((bookName) => {
    const newBookOption = document.createElement('option');
    newBookOption.classList.add('book-option');
    newBookOption.value = bookName;
    newBookOption.text = bookName;
    bookSelector.appendChild(newBookOption);
  });
}

export { addBooks };