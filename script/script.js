const wordText = document.querySelector(".word"),
  hintText = document.querySelector(".hint span"),
  timeText = document.querySelector(".time b"),
  inputField = document.querySelector("input"),
  refreshBtn = document.querySelector(".refresh-word"),
  checkBtn = document.querySelector(".check-word");
closeBtn = document.querySelector(".close-btn");
backdrop = document.querySelector(".backdrop");
modalContent = document.querySelector(".modal-content");

let correctWord, timer;

const initTimer = (maxTime) => {
  clearInterval(timer);
  timer = setInterval(() => {
    if (maxTime > 0) {
      if (inputField.value == "" && maxTime == 0) {
        backdrop.style.visibility = "visible";
        modalContent.innerText = "Vaxt bitdi. Uduzdun!!!";
        clearInterval(timer);
        return initGame();
      }
      maxTime--;
      return (timeText.innerText = maxTime);
    }
    if (inputField.value == "" && maxTime == 0) {
      backdrop.style.visibility = "visible";
      modalContent.innerText = "Vaxt bitdi. Uduzdun!!!";
      clearInterval(timer);
      return initGame();
    }
    initGame();
  }, 1000);
};

const initGame = () => {
  // backdrop.style.visibility = "visible";
  initTimer(30);
  let randomObj = words[Math.floor(Math.random() * words.length)]; // Getting random object from words array
  let wordArray = randomObj.word.split(""); // Splitting the word
  for (let i = wordArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
  }
  wordText.innerText = wordArray.join("");
  hintText.innerText = randomObj.hint;
  correctWord = randomObj.word;
  inputField.value = "";
  inputField.setAttribute("maxLength", correctWord.length);
};
initGame();

const checkWord = () => {
  let userWord = inputField.value.toLowerCase();
  if (!userWord) {
    backdrop.style.visibility = "visible";
    modalContent.innerText = "Yoxlamaq istədiyin sözü daxil et!";
  }
  if (userWord !== correctWord) {
    backdrop.style.visibility = "visible";
    modalContent.innerText = `Oops! ${userWord.toUpperCase()} doğru söz deyil`;
    return;
  } else {
    backdrop.style.visibility = "visible";
    modalContent.innerText = `Təbriklər! ${userWord.toUpperCase()} doğru sözdür`;
    clearInterval(timer);

    document.addEventListener('keypress', function(event) {
      // Check if the pressed key is Enter (key code 13 or 'Enter') and if the focus is on the checkBtn
      if ((event.key === 'Enter' || event.keyCode === 13)) {
        // Prevent the default form submission behavior
        event.preventDefault();
          window.location.reload();
      }
    });
  }
  initGame();
};

refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener('click', function () {
  if (inputField.value !== '') {
    checkWord();
  }
 });


// Add an event listener to the document for 'keypress' event to handle Enter key press
let enterPressed = 0;

document.addEventListener('keypress', function(event) {
  if ((event.key === 'Enter' || event.keyCode === 13)) {
    event.preventDefault();

    if (inputField.value === '') {
      return;
    }

    enterPressed++;

    if (enterPressed === 2) {
      checkWord();
      window.location.reload();
      enterPressed = 0;
    } else {
      checkWord();
    }
  }
});


closeBtn.addEventListener("click", () => {
  backdrop.style.visibility = "hidden";
});
