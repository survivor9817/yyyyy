import { currentBookData } from '../book-app/2.currentBookData.js';

function generateFehrestList(fehrestOfSelectedBook) {
    const selector = document.getElementById('Where');
    selector.replaceChildren();
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.disabled = true;
    defaultOption.selected = true; 
    selector.append(defaultOption);

    fehrestOfSelectedBook.forEach(({refTitle, refPage}) => {
        const newOption = document.createElement('option');
        newOption.textContent = refTitle;
        newOption.value = refPage;
        const whereFilter = document.getElementById('Where');
        whereFilter.append(newOption);
    });
}

generateFehrestList(currentBookData.fehrestOfSelectedBook);

document.getElementById('BooksDropdownList').addEventListener('change', () => {
    generateFehrestList(currentBookData.fehrestOfSelectedBook);
}); 