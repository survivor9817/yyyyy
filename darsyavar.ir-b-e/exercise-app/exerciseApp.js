// show or hide the answer
const exerciseTabContainer = document.getElementById("ExerciseTabContainer");
function showAnswer() {
  exerciseTabContainer.classList.toggle("open");
}
const showAnswerBtn = document.getElementById("ShowAnswerBtn");
showAnswerBtn.addEventListener("click", () => showAnswer());

// scroll to left in tags container
const tagsContainer = document.querySelector(".tags-container");
if (tagsContainer) {
  tagsContainer.addEventListener("mouseleave", () => {
    tagsContainer.scrollLeft = 0;
  });
}

// input buttons behavior
const userAnswer = {
  answer: null,
  like: false,
  star: false,
  report: false,
};

function toggleFill(btn) {
  btn.classList.toggle("filled");
}
function removeFill(btn) {
  btn.classList.remove("filled");
}
function removeFeedback(feedbackElement) {
  feedbackElement?.classList.remove("tooltip-pop-in");
}
function addFeedback(feedbackElement) {
  feedbackElement?.classList.add("tooltip-pop-in");
}
let tooltipTimeoutId = null;
const inputBtnsContainer = document.querySelector(".exercise-inputBtns");
inputBtnsContainer.addEventListener("click", (e) => {
  const clickedBtn = e.target.closest("button");
  if (!clickedBtn) return;

  const correspondingTooltip = document.getElementById(
    clickedBtn.dataset.tooltipid
  );
  const previousTooltip = document.querySelector(
    ".tooltips-list .tooltip-pop-in"
  );
  const isOn = clickedBtn.classList.contains("filled");

  if (!isOn) {
    removeFeedback(previousTooltip);
    if (tooltipTimeoutId) clearTimeout(tooltipTimeoutId);
    addFeedback(correspondingTooltip);
    tooltipTimeoutId = setTimeout(() => {
      removeFeedback(correspondingTooltip);
    }, 1500);
  } else if (isOn && previousTooltip === correspondingTooltip) {
    removeFeedback(correspondingTooltip);
    if (tooltipTimeoutId) clearTimeout(tooltipTimeoutId);
  }
  console.log(tooltipTimeoutId);

  if (clickedBtn.name.includes("answer")) {
    const isTrue = clickedBtn.name.includes("true");
    userAnswer.answer = userAnswer.answer === isTrue ? null : isTrue;
    removeFill(document.querySelector(`button[name*=${!isTrue}]`));
    toggleFill(clickedBtn);
  } else {
    userAnswer[clickedBtn.name] = !userAnswer[clickedBtn.name];
    toggleFill(clickedBtn);
  }
  console.log(userAnswer);
  console.log(clickedBtn.name);
});

// const correctBtn = document.querySelector(".btn--correct");
// const incorrectBtn = document.querySelector(".btn--incorrect");
// const likeBtn = document.querySelector(".btn--like");
// const starBtn = document.querySelector(".btn--star");
// const reportBtn = document.querySelector(".btn--report");

// correctBtn.addEventListener("click", () => {
//     userAnswer.answer = userAnswer.answer === true ? null : true;
//     removeFill(incorrectBtn);
//     toggleFill(correctBtn);
// });

// incorrectBtn.addEventListener("click", () => {
//     userAnswer.answer = userAnswer.answer === false ? null : false;
//     removeFill(correctBtn);
//     toggleFill(incorrectBtn);
// });

// likeBtn.addEventListener("click", () => {
//     userAnswer.like = !userAnswer.like;
//     toggleFill(likeBtn);
// });

// starBtn.addEventListener("click", () => {
//     userAnswer.star = !userAnswer.star;
//     toggleFill(starBtn);
// });

// reportBtn.addEventListener("click", () => {
//     userAnswer.report = !userAnswer.report;
//     toggleFill(reportBtn);
// });
