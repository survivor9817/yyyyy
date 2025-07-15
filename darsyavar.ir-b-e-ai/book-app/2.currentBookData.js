import { fehrestsOfPurchasedBooks, contentOfBooks } from "./0.data.js";

const bookSelector = document.getElementById("BooksDropdownList");
const pageInputNumberElement = document.getElementById("PageInput");
const pageInputRangeElement = document.getElementById("PageInput2");

const currentBookData = {
  // ---- Internal state ----
  _selectedBookName: null,
  _fehrestOfSelectedBook: null,
  _contentsOfSelectedBook: null,
  _fehrestRefTitlePagesArray: null,
  _observingPageNumber: 1,

  // ---- Getters ----
  get selectedBookName() {
    return this._selectedBookName;
  },
  get fehrestOfSelectedBook() {
    return this._fehrestOfSelectedBook;
  },
  get contentsOfSelectedBook() {
    return this._contentsOfSelectedBook;
  },
  get fehrestRefTitlePagesArray() {
    return this._fehrestRefTitlePagesArray;
  },
  get observingPageNumber() {
    return this._observingPageNumber;
  },

  // ---- Setters ----
  updateSelectedBook(bookName) {
    this._selectedBookName = bookName;
    this._fehrestOfSelectedBook = fehrestsOfPurchasedBooks[bookName];
    this._contentsOfSelectedBook = contentOfBooks[bookName];
    this._fehrestRefTitlePagesArray = this._fehrestOfSelectedBook.map(
      (item) => item.refPage
    );
    bookSelector.value = bookName;
    this.saveAsLastSelectedBook();
  },

  saveAsLastSelectedBook() {
    localStorage.setItem("lastBookRead", this._selectedBookName);
  },

  goToLastSelectedBook() {
    const lastSelectedBook = localStorage.getItem("lastBookRead");
    this.updateSelectedBook(lastSelectedBook || bookSelector.value);
  },

  updateObservingPageNumber(newPageNumber) {
    if (!newPageNumber) return;
    this._observingPageNumber = newPageNumber;

    const persianNumberFormat = new Intl.NumberFormat("fa-IR");
    pageInputNumberElement.value = persianNumberFormat.format(newPageNumber);

    pageInputRangeElement.value = newPageNumber;
    this.saveAsLastPageRead();
  },

  saveAsLastPageRead() {
    localStorage.setItem(this._selectedBookName, this._observingPageNumber);
  },

  goToLastPageRead() {
    const lastPageRead = localStorage.getItem(this._selectedBookName);
    this.goToPage(lastPageRead || 1);
  },

  // ---- Navigation methods ----
  goToPage(number) {
    this.updateObservingPageNumber(Number(number));
    const targetPage = document.getElementById(
      `page${this._observingPageNumber}`
    );
    if (targetPage) targetPage.scrollIntoView();
  },

  goToPrevPage() {
    const newPage = Math.max(1, Number(this._observingPageNumber) - 1);
    this.goToPage(newPage);
  },

  goToNextPage() {
    const pageInputNumberElement = document.getElementById("PageInput");
    const maxPage = pageInputNumberElement?.max || 9999;
    const newPage = Math.min(
      Number(maxPage),
      Number(this._observingPageNumber) + 1
    );
    this.goToPage(newPage);
  },
};

export { currentBookData };
