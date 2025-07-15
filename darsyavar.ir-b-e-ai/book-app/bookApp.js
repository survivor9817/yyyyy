// 1- load data of book and toc lists
import { fehrestsOfPurchasedBooks, contentOfBooks } from "./0.data.js";
import { addBooks } from "./1.addBooks.js";
import { currentBookData } from "./2.currentBookData.js";
import { generateFehrestList } from "./3.generateFehrest.js";
import { generateContentOfBook } from "./4.generatePages.js";
import { activatePageNavTools } from "./5.pageNavi.js";

// 1- ezaafe kardan ketaabha be dropdown list
const bookNames = Object.keys(fehrestsOfPurchasedBooks);
addBooks(bookNames);

// 2- raftan be akharin ketaabi ke karbar khaandeh
// (darsoorate mojood budan mire age mojood nabod hamon value book selector ro mizaare)
currentBookData.goToLastSelectedBook();

// age user az linke birooni, yani age az masalan safhe landing ye ketabi ro entekhaab
// karde bashe, bayad inja ghabl az saakhte shodane fehrest va mohtavaye ketab
// uptadeSelectedBook ba value ketaabe morede nazare user jaygozin beshe.
// yaa mitooni ye taabe jadid haminja besaazi va default name ketaab ro bezaari
// roye chizi ke az url miaad, yaa inke age chizi nabud ye componenti bayad besaazi
// ke aval az hame roye hame chiz neshaan dade beshe ke to ketab ro entekhaab koni
// badesh value on ketaab roye bookselector.value set beshe va edame maajera.

// 3- baargiri ketabe entekhaab shode az server
const bookSelector = document.getElementById("BooksDropdownList");
// currentBookData.updateSelectedBook(bookSelector.value);

// 4- ezaafe kardane fehreste ketaabe entekhaab shode be DOM
generateFehrestList(currentBookData.fehrestOfSelectedBook);

// fa al kardan ghabeliat click baraye fehrest
const fehrestListContainer = document.getElementById("TocList");
fehrestListContainer.addEventListener("click", (event) => {
  const item = event.target.closest(".toc-list li");
  if (item) currentBookData.goToPage(item.dataset.refPage);
});

// 5- alaan mohtavaye ketaab bayad load she az server
generateContentOfBook(currentBookData.contentsOfSelectedBook);

currentBookData.goToLastPageRead();

bookSelector.addEventListener("change", () => {
  currentBookData.updateSelectedBook(bookSelector.value);
  generateFehrestList(currentBookData.fehrestOfSelectedBook);
  generateContentOfBook(currentBookData.contentsOfSelectedBook);

  currentBookData.goToLastPageRead();
});

activatePageNavTools();
