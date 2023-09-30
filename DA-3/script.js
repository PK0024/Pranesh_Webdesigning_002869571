//Title constructor function that creates a Title object
function Title(t1) {
  this.mytitle = t1;
}

Title.prototype.getName = function () {
  return this.mytitle;
};

const checkboxes = document.querySelectorAll("#myTable input[type='checkbox']");
const submitButton = document.getElementById("button");
const table = document.getElementById("myTable");

document.addEventListener("DOMContentLoaded", function () {
  submitButton.disabled = true;
  submitButton.style.backgroundColor = "gray";

  const expandRows = document.querySelectorAll(".dropDownTextArea");
  expandRows.forEach((row) => {
    row.style.display = "none";
  });

  let studentCount = 4;

  document.getElementById("add").addEventListener("click", () => {
    const addRow = table.insertRow(-1);

    const cells = [];

    for (let i = 0; i < 10; i++) {
      cells.push(addRow.insertCell(i));
    }

    const [checkboxCell, studentCell, advisorCell, awardStatusCell, semesterCell, typeCell, budgetCell, percentageCell, deleteCell, editCell] = cells;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkboxCell.appendChild(checkbox);

    const img = document.createElement("img");
    img.src = "down.png";
    img.width = "25";
    checkboxCell.appendChild(document.createElement("br"));
    checkboxCell.appendChild(document.createElement("br"));
    checkboxCell.appendChild(img);

    studentCell.textContent = `Student ${studentCount}`;
    advisorCell.textContent = `Teacher ${studentCount}`;
    awardStatusCell.textContent = "Approved";
    semesterCell.textContent = "Fall";
    typeCell.textContent = "TA";
    budgetCell.textContent = `1234${studentCount}`;
    percentageCell.textContent = "100%";
    deleteCell.innerHTML = "";
    editCell.innerHTML = "";

    const expandRow = table.insertRow(-1);
    expandRow.classList.add("dropDownTextArea");
    expandRow.style.display = "none";
    const expandCell = expandRow.insertCell(0);
    expandCell.colSpan = 8;
    expandCell.innerHTML = `
    Advisor:<br /><br />
    Award Details<br />
    Summer 1-2014(TA)<br />
    Budget Number: <br />
    Tuition Number: <br />
    Comments:<br /><br /><br />
    Award Status:<br /><br /><br />
   `;

    hideDeleteEditColumns();
    alert(`Student ${studentCount} Record added successfully`);
    studentCount++;
  });

  table.addEventListener("change", (event) => {
    if (event.target.type === "checkbox") {
      const checkbox = event.target;
      const row = checkbox.parentElement.parentElement;

      if (checkbox.checked) {
        row.classList.add("yellow");
        const deleteCell = row.cells[8];
        deleteCell.innerHTML = "<button>Delete</button>";
        deleteCell.querySelector("button").addEventListener("click", () => {
          const studentName = row.cells[1].textContent;
          row.remove();
          alert(`${studentName} Record deleted successfully`);
          hideDeleteEditColumns();
        });

        const editCell = row.cells[9];
        editCell.innerHTML = "<button>Edit</button>";
        editCell.querySelector("button").addEventListener("click", () => {
          const studentName = row.cells[1].textContent;
          const userInput = prompt(`Edit details of ${studentName}:`, "");
          if (userInput !== null) {
            alert(`Edited details of ${studentName}: ${userInput}`);
          }
        });
      } else {
        row.classList.remove("yellow");
        const deleteCell = row.cells[8];
        deleteCell.innerHTML = "";
        const editCell = row.cells[9];
        editCell.innerHTML = "";
      }
    }
  });

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      if (![...checkboxes].some((cb) => cb.checked)) {
        submitButton.disabled = true;
        submitButton.style.backgroundColor = "gray";
      }
    });
  });

  table.addEventListener("click", (event) => {
    if (event.target.tagName === "IMG") {
      const icon = event.target;
      const row = icon.parentElement.parentElement.nextElementSibling;
      if (row.style.display === "none") {
        row.style.display = "table-row";
      } else {
        row.style.display = "none";
      }
    }
  });

  function hideDeleteEditColumns() {
    const isAnyCheckboxChecked = [...checkboxes].some((checkbox) => checkbox.checked);

    checkboxes.forEach((checkbox) => {
      const row = checkbox.parentElement.parentElement;
      const deleteCell = row.cells[8];
      const editCell = row.cells[9];

      deleteCell.style.display = isAnyCheckboxChecked ? "table-cell" : "none";
      editCell.style.display = isAnyCheckboxChecked ? "table-cell" : "none";
    });

    const headerRow = table.querySelector("#myTable tr:first-child");
    const deleteHeader = headerRow.cells[8];
    const editHeader = headerRow.cells[9];

    deleteHeader.style.display = isAnyCheckboxChecked ? "table-cell" : "none";
    editHeader.style.display = isAnyCheckboxChecked ? "table-cell" : "none";

    submitButton.disabled = !isAnyCheckboxChecked;
    submitButton.style.backgroundColor = isAnyCheckboxChecked ? "orange" : "gray";
  }

  table.addEventListener("change", (event) => {
    if (event.target.type === "checkbox") {
      hideDeleteEditColumns();
    }
  });

  hideDeleteEditColumns();
});
