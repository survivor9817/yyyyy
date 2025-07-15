
const fehrestListContainer = document.getElementById('TocList');

function generateFehrestList(fehrestOfSelectedBook) {
  fehrestListContainer.replaceChildren();
  fehrestOfSelectedBook.forEach(({refTitle, refPage, indent}, index) => {
    const newLi = document.createElement('li');
    newLi.append(refTitle);
    newLi.dataset.refPage = refPage;
    
    if (indent === 0) {
      newLi.classList.add('chapter');
      fehrestListContainer.append(newLi);
    } else if (indent === fehrestOfSelectedBook[index - 1].indent + 1) {
      const newContainerOfArticles = document.createElement('ol');
      newContainerOfArticles.classList.add('articles');
      newLi.classList.add('article');
      newContainerOfArticles.append(newLi);
      fehrestListContainer.append(newContainerOfArticles);
    } else if (indent === fehrestOfSelectedBook[index - 1].indent) {
      newLi.classList.add('article');
      fehrestListContainer.lastElementChild.append(newLi);
    }
  });
}

export { generateFehrestList };