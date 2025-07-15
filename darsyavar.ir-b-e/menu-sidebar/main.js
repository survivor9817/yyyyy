// states
let activeTab = 'book';
function setActiveTab(tabName) {activeTab = tabName}

let wasFehrestOpened = false;
function saveFehrestState() {
    if (activeTab === 'book') {
        wasFehrestOpened = fehrestSidebar.classList.contains("opened-sidebar");
    }
}

const tabContainers = document.getElementById('TabContainers');
const activeTabIndicator = document.getElementById('ActiveTabIndicator');
const tabsCount = tabContainers.children.length;

tabContainers.style.width = `${100 * tabsCount}%`;
activeTabIndicator.style.width = `${100 / tabsCount}%`;

const tabsArray = ["book", "exercise"];

function switchToTab(index) {
    tabContainers.style.transform = `translateX(${index * (100 / tabsCount)}%)`;
    activeTabIndicator.style.transform = `translateX(${index * -100}%)`;
    setActiveTab(tabsArray[index]);
}

// going from book to exercise
function goToExercise() {
    saveFehrestState(); 
    closeFehrest(); 
    switchToTab(1);
}

// going from exercise to book
function goToBook() {
    switchToTab(0); 
    if (wasFehrestOpened) {toggleFehrest();};
}

// toggle fehrest sidebar
const fehrestSidebar = document.getElementById('FehrestRightSidebar');
function toggleFehrest() {
    fehrestSidebar.classList.toggle("opened-sidebar"); 
    wasFehrestOpened = false;
    switchToTab(0);
}

// close fehrest sidebar
function closeFehrest() {
    fehrestSidebar.classList.remove("opened-sidebar");
}

// toggle menu sidebar
const menuSidebar = document.getElementById('MenuLeftSidebar');
function toggleMenu() {
    menuSidebar.classList.toggle("opened-sidebar");
}

// close menu sidebar
function closeMenu() {
    menuSidebar.classList.remove("opened-sidebar");
}



// bindings
const bindings = [
    { id: "ExerciseTabBtn", handler: goToExercise },
    { id: "BookTabBtn", handler: goToBook },
    { id: "FehrestBtn", handler: toggleFehrest },
    { id: "CloseFehrestBtn", handler: closeFehrest },
    { id: "MenuBtn", handler: toggleMenu },
    { id: "CloseMenuBtn", handler: closeMenu },
    { id: "MenuBackdrop", handler: closeMenu }
]

bindings.forEach(({ id, handler }) => {
  const el = document.getElementById(id);
  if (el) el.addEventListener("click", handler);
});