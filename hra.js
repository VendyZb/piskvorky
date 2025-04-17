let currentPlayer = 'circle'; 

const circleIcon = document.querySelector(".circle__icon"); 
const allButtons = document.querySelectorAll(".square"); 

const handleFieldClick = (event) => {
  const clickedField = event.target;
  
  clickedField.disabled = true; 

  if (currentPlayer === "circle") {
    clickedField.classList.add("board__field--circle");
    circleIcon.innerHTML = `<img src="cross.svg" alt="křížek" class="cross">`;
    currentPlayer = "cross";
  } else if (currentPlayer === "cross") {
    clickedField.classList.add("board__field--cross");
    circleIcon.innerHTML = `<img src="circle.svg" alt="kroužek" class="circle">`;
    currentPlayer = "circle";
  }
};

allButtons.forEach((button) => {
  button.addEventListener("click", handleFieldClick);
});

const restartButton = document.querySelector(".icon-button.blue");

restartButton.addEventListener("click", (event) => {
  const reset = confirm("Opravdu chcete hru restartovat?");
  if (!reset) {
    event.preventDefault();
  }
});

