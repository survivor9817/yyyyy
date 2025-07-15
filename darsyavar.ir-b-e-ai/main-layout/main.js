// state management for the main layout
const states = {
  activeTab: null,
  isFehrestOpen: null,
  isMenuOpen: null,
  wasFehrestOpened: null,

  getActiveTab() {
    return this.activeTab;
  },
  // isPracticing: false,
  // isReferencing: false,

  setActiveTab(tabName) {
    this.activeTab = tabName;
    localStorage.setItem("activeTab", tabName);
  },
  setFehrestState(boolyan) {
    this.isFehrestOpen = boolyan;
    localStorage.setItem("isFehrestOpen", boolyan);
  },
  setMenuState(boolyan) {
    this.isMenuOpen = boolyan;
    localStorage.setItem("isMenuOpen", boolyan);
  },
  saveFehrestState() {
    if (this.activeTab === "book") {
      this.wasFehrestOpened = this.isFehrestOpen;
      localStorage.setItem("wasFehrestOpened", this.wasFehrestOpened);
    }
  },
};

const mediaQuery = window.matchMedia("(max-width: 1440px)");
// toggle fehrest sidebar
const fehrestSidebar = document.getElementById("FehrestRightSidebar");
const fehrestBackdrop = document.querySelector(".fehrest-backdrop");
function toggleFehrest() {
  const newState = !states.isFehrestOpen;
  states.setFehrestState(newState);

  if (newState) {
    history.pushState({ fehrestOpen: true }, ""); // فقط وقتی باز میشه
  } else {
    history.back(); // وقتی بسته میشه
  }

  fehrestSidebar.style.transform = newState
    ? "translateX(0%)"
    : "translateX(+105%)";

  fehrestBackdrop.style.display =
    mediaQuery.matches && newState ? "block" : "none";

  switchToTab(0);
}

mediaQuery.addEventListener("change", () => {
  fehrestBackdrop.style.display =
    mediaQuery.matches && states.isFehrestOpen ? "block" : "none";
});

// close fehrest sidebar
function closeFehrest() {
  states.setFehrestState(false);
  fehrestSidebar.style.transform = "translateX(+105%)";
  fehrestBackdrop.style.display = "none";
}

document.getElementById("CloseFehrestBtn").addEventListener("click", () => {
  if (states.isFehrestOpen) {
    history.back(); // یک مرحله به عقب
  }
});

document.getElementById("FehrestBackdrop").addEventListener("click", () => {
  if (states.isFehrestOpen) {
    history.back(); // یک مرحله به عقب
  }
});

// window.addEventListener("popstate", () => {
//   if (states.isFehrestOpen) {
//     closeFehrest(); // یک مرحله به عقب
//   }
// });

// toggle menu sidebar
const menuSidebar = document.getElementById("MenuLeftSidebar");
const menuBackdrop = document.querySelector(".menu-backdrop");
function toggleMenu() {
  const newState = !states.isMenuOpen;
  states.setMenuState(newState);

  if (newState) {
    history.pushState({ menuOpen: true }, ""); // فقط وقتی باز میشه
  } else {
    history.back(); // وقتی بسته میشه
  }

  menuSidebar.style.transform = states.isMenuOpen
    ? "translateX(0%)"
    : "translateX(-105%)";

  menuBackdrop.style.display = states.isMenuOpen ? "block" : "none";
}

// close menu sidebar
function closeMenu() {
  states.setMenuState(false);
  menuSidebar.style.transform = "translateX(-105%)";
  menuBackdrop.style.display = "none";
}

document.getElementById("CloseMenuBtn").addEventListener("click", () => {
  if (states.isMenuOpen) {
    history.back(); // یک مرحله به عقب
  }
});

document.getElementById("MenuBackdrop").addEventListener("click", () => {
  if (states.isMenuOpen) {
    history.back(); // یک مرحله به عقب
  }
});

window.addEventListener("popstate", () => {
  if (states.isMenuOpen) {
    closeMenu(); // یک مرحله به عقب
  } else if (states.isFehrestOpen) {
    closeFehrest(); // یک مرحله به عقب
  }
});

// tab switching logic
const tabsContainer = document.getElementById("TabsContainer");
const activeTabIndicator = document.getElementById("ActiveTabIndicator");
const tabsCount = tabsContainer.children.length;

tabsContainer.style.width = `${100 * tabsCount}%`;
activeTabIndicator.style.width = `${100 / tabsCount}%`;

const tabsArray = ["book", "exercise", "ai"];

function switchToTab(index) {
  states.setActiveTab(tabsArray[index]);
  tabsContainer.style.transform = `translateX(${index * (100 / tabsCount)}%)`;
  activeTabIndicator.style.transform = `translateX(${index * -100}%)`;
}

// going from book to exercise
function goToExercise() {
  states.saveFehrestState();
  closeFehrest();
  switchToTab(1);
}

// going from exercise to book
function goToBook() {
  switchToTab(0);
  if (states.wasFehrestOpened) {
    toggleFehrest();
    states.wasFehrestOpened = false;
  }
}

function goToAi() {
  states.saveFehrestState();
  closeFehrest();
  switchToTab(2);
}

// bindings
const bindings = [
  { id: "ExerciseTabBtn", handler: goToExercise },
  { id: "BookTabBtn", handler: goToBook },
  { id: "FehrestBtn", handler: toggleFehrest },
  // { id: "CloseFehrestBtn", handler: closeFehrest },
  // { id: "FehrestBackdrop", handler: closeFehrest },
  { id: "MenuBtn", handler: toggleMenu },
  // { id: "CloseMenuBtn", handler: closeMenu },
  // { id: "MenuBackdrop", handler: closeMenu },
  { id: "aiTabBtn", handler: goToAi },
];

bindings.forEach(({ id, handler }) => {
  const el = document.getElementById(id);
  if (el) el.addEventListener("click", handler);
});

export { goToBook, goToExercise, states };
