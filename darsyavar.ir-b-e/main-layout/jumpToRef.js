import { goToBook } from "./main.js";
import { currentBookData } from "../book-app/2.currentBookData.js";

// badan bayad ba event delegation anjaamesh bedi. in movaghate
const exerciseTabContainer = document.querySelector("#ExerciseTabContainer");

exerciseTabContainer.addEventListener("click", (e) => {
  const refItem = e.target.closest(".ref-page");
  if (refItem) {
    goToBook();
    const pageNumber = parseInt(refItem.dataset.refPage);
    currentBookData.goToPage(pageNumber);
    // highlightRef(refId);
  }
});
