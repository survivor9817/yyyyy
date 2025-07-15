// function createFilter


document.querySelectorAll('.filters-dropdown-list').forEach(selectElement => {
  function updateClass() {
    if (selectElement.value !== "") {
      selectElement.classList.add('notEmpty');
    } else {
      selectElement.classList.remove('notEmpty');
    }
  }

  // Initial check
  updateClass();

  // Update on change
  selectElement.addEventListener('change', updateClass);
});