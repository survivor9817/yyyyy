import { currentBookData } from "./2.currentBookData.js"; 


// 4- scrollspy
function activate(title) {title.classList.add("active");} // mitoone ye check ham dashte bashe ghablesh k aya dare ya na

function deactivate(title) {title.classList.remove("active");}

function expand(olArticles) {olArticles.classList.add("expanded")}; 

function collapse(olArticles) {olArticles.classList.remove("expanded")};

function findRefTitlePageNumber(pageNumber) {
  const fehrestArray = currentBookData.fehrestRefTitlePagesArray;
  if (fehrestArray.includes(pageNumber)) {
    return pageNumber;
  } else {
    return fehrestArray.reduce(
      (acc, curr) => (curr < pageNumber && curr > acc ? curr : acc),
      -Infinity
    );
  }
}

let lastActiveRefTitlePageNumber = null; 
function updateFehrestUI(pageNumber) {
  const newActiveRefTitlePageNumber = findRefTitlePageNumber(pageNumber);
  if (newActiveRefTitlePageNumber === lastActiveRefTitlePageNumber) return;
  lastActiveRefTitlePageNumber = newActiveRefTitlePageNumber;

  document.querySelectorAll(".toc-list li.active").forEach(deactivate);
  document.querySelectorAll('.toc-list ol.articles').forEach(collapse);
  const newActiveRefTitle = document.querySelector(`.toc-list li[data-ref-page="${newActiveRefTitlePageNumber}"]`);
  activate(newActiveRefTitle);
  
  // toye fehrest haaye bi indent class expand ezafe mishe ke laazem nist
  if (newActiveRefTitle.classList.contains('article')) { // subsections-container
    expand(newActiveRefTitle.parentElement);
    activate(newActiveRefTitle.parentElement.previousElementSibling);
  } else {
    expand(newActiveRefTitle.nextElementSibling);
  }
}

function observerCallback(entries) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    currentBookData.updateObservingPageNumber(Number(entry.target.id.replace("page", "")));
    updateFehrestUI(currentBookData.observingPageNumber);
  });
}

let observer = null;
function observePages() {
  if (observer) {observer.disconnect()};
  
  lastActiveRefTitlePageNumber = null;
  
  const observerOptions = { 
    root: document.querySelector('.book-section'), 
    rootMargin: "-49% 0% -49% 0%", // mitoone in mahdoode bere baalaa tar
    threshold: 0 
  };

  observer = new IntersectionObserver(observerCallback, observerOptions);
  const pages = document.querySelectorAll('.book-section .page');
  pages.forEach(page => observer.observe(page));
}

export { observePages, updateFehrestUI };