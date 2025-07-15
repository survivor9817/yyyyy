import { currentBookData } from "./2.currentBookData.js";

function activatePageNavTools() {
  // 5- page navigator
  const pageInputNumberElement = document.getElementById("PageInput");
  const pageInputRangeElement = document.getElementById("PageInput2");

  // pageInputNumberElement.addEventListener("keydown", (e) => {
  //   if (["+", "-", ".", "e", "E"].includes(e.key)) {
  //     e.preventDefault();
  //   }
  // });

  // e.target.value = e.target.value.replace(/[^۰-۹0-9]/g, "");

  function convertToEnglishDigits(input) {
    return input.toString().replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
  }

  pageInputNumberElement.addEventListener("input", () => {
    const inputEngNumVal = convertToEnglishDigits(pageInputNumberElement.value);
    const value = Number(inputEngNumVal);
    const max = Number(pageInputNumberElement.max);
    if (value > max || isNaN(value)) {
      pageInputNumberElement.value = pageInputNumberElement.value.slice(0, -1);
      pageInputNumberElement.style.backgroundColor = "rgb(255, 124, 124)";
      setTimeout(() => {
        pageInputNumberElement.style.backgroundColor = "white";
      }, 300);
    } else {
      currentBookData.goToPage(value);
    }
  });

  pageInputRangeElement.addEventListener("input", () => {
    currentBookData.goToPage(pageInputRangeElement.value);
  });

  document
    .getElementById("PrevPageBtn")
    .addEventListener("click", () => currentBookData.goToPrevPage());

  document
    .getElementById("NextPageBtn")
    .addEventListener("click", () => currentBookData.goToNextPage());

  // inja age khaasti mitooni kaari koni ke inputet baa enter kaar kone
  let selectedPageNumberOnFocus = currentBookData.observingPageNumber;
  pageInputNumberElement.addEventListener("focus", () => {
    selectedPageNumberOnFocus = currentBookData.observingPageNumber;
    pageInputNumberElement.select();
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth", // برای اسکرول نرم
    });
  });

  pageInputNumberElement.addEventListener("blur", () => {
    if (pageInputNumberElement.value === "") {
      currentBookData.goToPage(selectedPageNumberOnFocus);
    }
  });
}

export { activatePageNavTools };
