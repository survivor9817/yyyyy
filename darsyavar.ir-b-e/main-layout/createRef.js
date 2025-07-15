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

localStorage.setItem(
  "refs",
  `{"ref1":{"page46":{"start":588,"end":759}},"ref2":{"page19":{"start":1758,"end":2046}},"ref3":{"page57":{"start":74,"end":295}},"ref4":{"page25":{"start":891,"end":1110}}}`
);
document.querySelectorAll(".ref-page").forEach((refrens) => {
  refrens.onclick = () => {
    if (refrens.dataset.refId) {
      goToBook();
      setTimeout(() => {
        highlightRef(refrens.dataset.refId);
      }, 100);
    }
  };
});

// اضافه کردن سیستم ذخیره مراجع برای هایلایت
let refs = JSON.parse(localStorage.getItem("refs") || "{}");
let nextRefId = Object.keys(refs).length + 1;

function hideTextSelectionToolbar(element) {
  element.style.display = "none";
}

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

// توابع مربوط به هایلایت متن در کتاب
function findClosestIdParent(node) {
  const container = document.getElementById("BookSection");
  while (node && node !== container) {
    if (node.nodeType === 1 && node.id) return node;
    node = node.parentNode;
  }
  return null;
}

function getTextNodeOffsets(parent, targetNode) {
  let offset = 0;
  const walker = document.createTreeWalker(parent, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (node === targetNode) return offset;
    offset += node.textContent.length;
  }
  return -1;
}

function saveBookSelection() {
  const sel = window.getSelection();
  if (!sel.rangeCount) {
    return null;
  }

  const range = sel.getRangeAt(0);
  const refData = {};

  // پیدا کردن همه نودهای متنی داخل کل BookSection - مثل کد HTML اولیه
  const walker = document.createTreeWalker(
    document.getElementById("BookSection"),
    NodeFilter.SHOW_TEXT
  );

  let nodes = [];
  while (walker.nextNode()) {
    const node = walker.currentNode;
    // بررسی اینکه آیا این نود با range انتخاب تداخل دارد
    const nodeRange = document.createRange();
    nodeRange.selectNodeContents(node);
    if (
      range.compareBoundaryPoints(Range.END_TO_START, nodeRange) < 0 &&
      range.compareBoundaryPoints(Range.START_TO_END, nodeRange) > 0
    ) {
      nodes.push(node);
    }
  }

  // اگر انتخاب در یک نود بود که فقط همون نود رو اضافه کن
  if (nodes.length === 0) nodes = [range.startContainer];

  nodes.forEach((node) => {
    if (node.nodeType !== 3) return; // فقط نود متنی

    const parent = findClosestIdParent(node);
    if (!parent) return;

    const startInParent = getTextNodeOffsets(parent, node);
    if (startInParent === -1) return;

    let nodeStartOffset = 0;
    let nodeEndOffset = node.textContent.length;

    // تنظیم شروع و پایان نسبت به انتخاب اصلی
    if (node === range.startContainer) nodeStartOffset = range.startOffset;
    if (node === range.endContainer) nodeEndOffset = range.endOffset;

    const start = startInParent + nodeStartOffset;
    const end = startInParent + nodeEndOffset;

    // اگر قبلا برای این والد محدوده ذخیره شده، اونها رو ادغام کن
    if (refData[parent.id]) {
      refData[parent.id].start = Math.min(refData[parent.id].start, start);
      refData[parent.id].end = Math.max(refData[parent.id].end, end);
    } else {
      refData[parent.id] = { start, end };
    }
  });

  if (Object.keys(refData).length === 0) {
    return null;
  }

  const refId = `ref${nextRefId++}`;
  refs[refId] = refData;
  localStorage.setItem("refs", JSON.stringify(refs));

  return refId;
}

function createRangeFromOffsets(el, start, end) {
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  let offset = 0;
  let startNode = null,
    endNode = null;
  let startOffset = 0,
    endOffset = 0;

  while (walker.nextNode()) {
    const node = walker.currentNode;
    const len = node.textContent.length;

    if (!startNode && offset + len >= start) {
      startNode = node;
      startOffset = start - offset;
    }

    if (!endNode && offset + len >= end) {
      endNode = node;
      endOffset = end - offset;
      break;
    }

    offset += len;
  }

  if (startNode && endNode) {
    const range = document.createRange();
    range.setStart(startNode, startOffset);
    range.setEnd(endNode, endOffset);
    return range;
  }
  return null;
}

function clearHighlights() {
  document.querySelectorAll(".highlight").forEach((span) => {
    const parent = span.parentNode;
    while (span.firstChild) parent.insertBefore(span.firstChild, span);
    parent.removeChild(span);
  });
}

function highlightRef(refId) {
  clearHighlights();
  const refData = refs[refId];
  if (!refData) return;

  let first = true;

  for (const id in refData) {
    const el = document.getElementById(id);
    if (!el) continue;

    const { start, end } = refData[id];
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    let offset = 0;

    while (walker.nextNode()) {
      const node = walker.currentNode;
      const len = node.textContent.length;

      const nodeStart = offset;
      const nodeEnd = offset + len;

      // بررسی اینکه این نود داخل بازهٔ هایلایت هست یا نه
      const hlStart = Math.max(start, nodeStart);
      const hlEnd = Math.min(end, nodeEnd);

      if (hlStart < hlEnd) {
        const relativeStart = hlStart - nodeStart;
        const relativeEnd = hlEnd - nodeStart;

        const before = node.splitText(relativeStart);
        const middle = before.splitText(relativeEnd - relativeStart);

        const highlightSpan = document.createElement("span");
        highlightSpan.className = "highlight";
        highlightSpan.style.backgroundColor = "yellow";
        highlightSpan.style.transition = "background-color 0.3s ease";
        highlightSpan.appendChild(before.cloneNode(true));

        before.parentNode.replaceChild(highlightSpan, before);

        if (first) {
          highlightSpan.scrollIntoView({ behavior: "smooth", block: "center" });
          first = false;
        }
      }

      offset += len;
    }
  }

  setTimeout(() => {
    clearHighlights();
  }, 2000);
}

// reference injector
function isWordChar(char) {
  return /[\wآ-ی‌]/.test(char);
}

function expandToWordEnd(node, offset) {
  if (node.nodeType !== Node.TEXT_NODE) return offset;

  const text = node.nodeValue;
  let i = offset;
  if (text[i - 1] === " ") return i - 1;
  while (i < text.length && isWordChar(text[i])) {
    i++;
  }

  return i;
}

let endContainer = null;
let endOffset = null;
let expandedOffset = null;
let selection = null;
let savedRefId = null; // برای ذخیره ID مرجع

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

  expandedOffset = expandToWordEnd(endContainer, endOffset);
  console.log(expandedOffset, endContainer);
}

function injectRefNumber(container, offset) {
  const citation = document.createElement("span");
  citation.dataset.refPage = getClosestPageId().replace("page", "");
  citation.dataset.refId = savedRefId;
  const persianNumberFormat = new Intl.NumberFormat("fa-IR");
  citation.textContent = persianNumberFormat.format(citation.dataset.refPage);
  citation.className = "ref-page";
  citation.style.cursor = "pointer";
  // citation.style.color = "blue";
  // citation.style.textDecoration = "underline";

  // اضافه کردن event listener برای کلیک روی مرجع
  // citation.addEventListener("click", () => {
  //   if (citation.dataset.refId) {
  //     goToBook();
  //     setTimeout(() => {
  //       highlightRef(citation.dataset.refId);
  //     }, 100);
  //   }
  // });

  citation.onclick = () => {
    if (citation.dataset.refId) {
      goToBook();
      setTimeout(() => {
        highlightRef(citation.dataset.refId);
      }, 100);
    }
  };

  const newRange = document.createRange();
  newRange.setStart(container, offset);
  newRange.collapse(true);

  newRange.insertNode(citation);
  selection?.removeAllRanges();
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
  // ذخیره موقعیت متن انتخاب شده در کتاب
  savedRefId = saveBookSelection();

  setReferencingState(false);
  goToExercise();
  injectRefNumber(endContainer, expandedOffset);
  hideTextSelectionToolbar(textSelectionToolbarB);
}

document.getElementById("submitRefBtn").addEventListener("click", () => {
  submitRef();
});
