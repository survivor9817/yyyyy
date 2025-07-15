import { observePages } from "./6.scrollSpy.js";

const bookSection = document.getElementById("BookSection");
function generatePages(contentsOfSelectedBook) {
  bookSection.replaceChildren();
  contentsOfSelectedBook.forEach(({ id, content }) => {
    const newPage = document.createElement("section");
    newPage.classList.add("page");
    newPage.id = `page${id}`;
    const newP = document.createElement("p");
    // newP.append(content);
    newP.innerHTML = content;
    newPage.append(newP);
    bookSection.append(newPage);
  });
}

function addPageLabels() {
  const pages = document.querySelectorAll(".book-section .page");
  const persianNumberFormat = new Intl.NumberFormat("fa-IR");
  pages.forEach((page, index) => {
    const pageLabel = document.createElement("div");
    pageLabel.append(`صفحه ${persianNumberFormat.format(index + 1)}`);
    page.prepend(pageLabel);
  });
}

function updateMaxPagesOnPageInputs() {
  const pages = document.querySelectorAll(".book-section .page");
  const numberOfPagesOfCurrentBook = pages.length;
  const pageInputNumberElement = document.getElementById("PageInput");
  pageInputNumberElement.max = numberOfPagesOfCurrentBook;
  const pageInputRangeElement = document.getElementById("PageInput2");
  pageInputRangeElement.max = numberOfPagesOfCurrentBook;
}

function generateContentOfBook(contentsOfSelectedBook) {
  generatePages(contentsOfSelectedBook);
  addPageLabels();
  observePages();
  updateMaxPagesOnPageInputs();
}

export { generateContentOfBook };
