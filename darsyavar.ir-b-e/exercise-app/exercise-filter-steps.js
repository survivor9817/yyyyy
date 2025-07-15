
const startExerciseBtnContainer = document.querySelector(".btn-container");
const filtersContainer = document.querySelector(".exercise-filter-container");

filtersContainer.children[0].firstElementChild.addEventListener("change", () => {
    if (filtersContainer.children[1].firstElementChild.value === "") {
        filtersContainer.style.height = "195px";
    };
    filtersContainer.children[1].firstElementChild.focus({preventScroll: true});
})

filtersContainer.children[1].firstElementChild.addEventListener("change", () => {
    if (filtersContainer.children[2].firstElementChild.value === "") {
        filtersContainer.style.height = "280px";
    };
    filtersContainer.children[2].firstElementChild.focus({preventScroll: true});
})

filtersContainer.children[2].firstElementChild.addEventListener("change", () => {
    if (filtersContainer.children[1].firstElementChild.value !== "") {
        filtersContainer.style.height = "315px";
        startExerciseBtnContainer.style.visibility = "visible";
        startExerciseBtnContainer.style.opacity = "1";
        startExerciseBtnContainer.style.transform = "translateY(-27px)";
    };
    filtersContainer.children[2].firstElementChild.blur();
})

const startExerciseBtn = document.querySelector("#StartExerciseBtn");
const exercisesContainer = document.querySelector("#ExercisesContainer");
startExerciseBtn.addEventListener("click", () => {
    filtersContainer.parentElement.style.display = "none";
    exercisesContainer.style.display = "flex";
});

const nextExerciseBtn = document.querySelector(".btn--exercise-next");
nextExerciseBtn.addEventListener("click", () => {
    exercisesContainer.style.display = "none";
    filtersContainer.parentElement.style.display = "flex";
    // filtersContainer.style.height = "195px";
    // startExerciseBtnContainer.style.visibility = "hidden";
    // startExerciseBtnContainer.style.opacity = "0";
    // startExerciseBtnContainer.style.transform = "translateY(0)";
});