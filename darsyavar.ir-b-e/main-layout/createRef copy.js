// 1. moghe e mousedown ya selectionchange ya touchstart, toolbar baayad baste beshe
// 2.

import { goToBook, goToExercise, states } from "./main.js";

// states:
let isReferencing = false;
function setReferencingState(state) {
  isReferencing = state;
}

let selectedText = "";
const textSelectionToolbarB = document.querySelector("#textSelectionToolbarB");
const copy = textSelectionToolbarB;
textSelectionToolbarB.remove();
document.querySelector("#BookSection").appendChild(copy);
const textSelectionToolbarE = document.querySelector("#textSelectionToolbarE");
const exerciseTabContainer = document.querySelector("#ExerciseTabContainer");
const bookTabContainer = document.querySelector("#BookSection");
let debounceTimeoutE;
let debounceTimeoutB;

function hideTextSelectionToolbar(element) {
  element.style.display = "none";
}
// functionesho besaaz
document.addEventListener("mousedown", (e) => {
  if (!textSelectionToolbarE.contains(e.target)) {
    hideTextSelectionToolbar(textSelectionToolbarE);
  }
});

document.addEventListener("selectionchange", () => {
  if (states.getActiveTab() === "exercise") {
    showToolbarOf(
      textSelectionToolbarE,
      debounceTimeoutE,
      exerciseTabContainer
    );
  } else if (states.getActiveTab() === "book") {
    if (isReferencing === false) return;
    showToolbarOf(textSelectionToolbarB, debounceTimeoutB, bookTabContainer);
  }
});

function showToolbarOf(toolbar, timeOut, container) {
  if (toolbar.style.display !== "none") {
    hideTextSelectionToolbar(toolbar);
  } else {
    clearTimeout(timeOut);
    timeOut = setTimeout(() => {
      const selection = window.getSelection();
      selectedText = selection.toString().trim();
      if (selectedText.length > 0) {
        showTextSelectionToolbar(selection, container, toolbar);
      }
    }, 500);
  }
}

// containere on toolbar bayad reletive bashe vali khodesh bayad absolute bashe
function showTextSelectionToolbar(selection, containerElement, toolbarElement) {
  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    console.log(range);
    const rects = range.getClientRects();
    const lastRect = rects[rects.length - 1] || range.getBoundingClientRect();

    const containerRect = containerElement.getBoundingClientRect();
    const scrollbarWidth =
      containerElement.offsetWidth - containerElement.clientWidth;

    const top =
      lastRect.bottom - containerRect.top + containerElement.scrollTop + 8;
    const left = lastRect.left - containerRect.left - scrollbarWidth;

    toolbarElement.style.top = top + "px";
    toolbarElement.style.left = left + "px";
    toolbarElement.style.display = "block";
  }
}

// ino bayad azash estefade konim baraye dokme sabt.
function getClosestPageId() {
  const selection = window.getSelection();
  if (!selection.rangeCount || selection.isCollapsed) return null;

  const range = selection.getRangeAt(0);
  let node = range.commonAncestorContainer;
  if (node.nodeType === Node.TEXT_NODE) {
    node = node.parentElement;
  }

  const closestPage = node.closest('[id^="page"]');
  return closestPage ? closestPage.id : null;
}

// reference injector

function isWordChar(char) {
  return /[\wآ-ی‌]/.test(char); // شامل حروف فارسی، لاتین، عدد و نیم‌فاصله
}

function expandToWordEnd(node, offset) {
  if (node.nodeType !== Node.TEXT_NODE) return offset;

  const text = node.nodeValue;
  let i = offset;
  if (text[i - 1] === " ") return i - 1;
  while (i < text.length && isWordChar(text[i])) {
    i++;
  }

  return i; // اندیس بعد از آخرین کاراکتر کلمه
}

let endContainer = null;
let endOffset = null;
let expandedOffset = null;
let selection = null;
function saveCitationPosition() {
  const selection = window.getSelection();
  if (!selection.rangeCount || selection.isCollapsed) {
    alert("لطفاً بخشی از متن را انتخاب کنید.");
    return;
  }

  const range = selection.getRangeAt(0);
  endContainer = range.endContainer;
  endOffset = range.endOffset;
  console.log(endOffset, endContainer, endContainer.nodeValue);

  // اگه به نود غیر متنی ختم بشه، دنبال اولین نود متنی توی اون می‌گردیم
  if (
    endContainer.nodeType !== Node.TEXT_NODE &&
    endContainer.childNodes.length > 0
  ) {
    for (let child of endContainer.childNodes) {
      if (child.nodeType === Node.TEXT_NODE) {
        endContainer = child;
        endOffset = 0;
        break;
      }
    }
  }

  // اگر آخرین کاراکتر وسط یک کلمه‌ست، به انتهای کلمه برو
  expandedOffset = expandToWordEnd(endContainer, endOffset);
  console.log(expandedOffset, endContainer);
}

function injectRefNumber(container, offset) {
  // ساخت و درج ستاره
  const citation = document.createElement("span");
  citation.dataset.refPage = getClosestPageId().replace("page", "");
  const persianNumberFormat = new Intl.NumberFormat("fa-IR");
  citation.textContent = persianNumberFormat.format(citation.dataset.refPage);
  citation.className = "ref-page";

  const newRange = document.createRange();
  newRange.setStart(container, offset);
  newRange.collapse(true); // insertion point

  newRange.insertNode(citation);

  selection?.removeAllRanges(); // پاک‌کردن انتخاب

  // const refsContainer = document.querySelector(".pages");
  // const newRef = document.createElement("li");
  // newRef.classList = "ref-page";
  // newRef.dataset.refPage = citation.dataset.refPage;
  // newRef.textContent = persianNumberFormat.format(citation.dataset.refPage);
  // refsContainer.append(newRef);
}

function addRef() {
  setReferencingState(true);
  goToBook();
  saveCitationPosition();
  console.log(endContainer, expandedOffset);
}

document.getElementById("addRefBtn").addEventListener("click", () => {
  addRef();
  hideTextSelectionToolbar(textSelectionToolbarE);
});

function submitRef() {
  setReferencingState(false);
  goToExercise();
  injectRefNumber(endContainer, expandedOffset);
  hideTextSelectionToolbar(textSelectionToolbarB);
}

document.getElementById("submitRefBtn").addEventListener("click", () => {
  submitRef();
});
