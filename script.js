let gameContainer = document.getElementById("gameContainer");
let startingDiv = document.querySelector(".startingDiv");
let moves = document.querySelector(".moves");
let time = document.querySelector(".time");
let count = 0;
let moveCount = 0;
let matchCount = 0;
let audio = new Audio('clapping.mp3')
let cardsArray = [
  "⚽",
  "🍕",
  "💷",
  "🏏",
  "❤️ ",
  "🍒",
  "🎸",
  "🎹",
  "⚽",
  "🍕",
  "💷",
  "🏏",
  "❤️",
  "🍒",
  "🎸",
  "🎹",
];
// for medium level
let midLevelArray = cardsArray.concat(
  "🧨",
  "🧨",
  "👔",
  "👔",
  "♟",
  "♟",
  "🎩",
  "🎩"
);

// for hard level
let mediumLevelArray = cardsArray.concat(
  "🧑",
  "🧑",
  "🎁",
  "💎",
  "🎃",
  "🎲",
  "⌚",
  "🎁",
  "💎",
  "🎃",
  "🎲",
  "⌚",
  "🧨",
  "🧨",
  "👔",
  "👔",
  "♟",
  "♟",
  "🎩",
  "🎩"
);
let timer;
let checkArray = []; // it will contain card.innerHTML
let htmlArray = []; // it will contain html of cards

function ShuffleCards(array = []) {
  let n = Math.floor(Math.random() * array.length);
  for (let i = array.length - 1; i >= 0; i--) {
    let j = n % (i + 1);
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

function generateCards(arr) {
  ShuffleCards(arr);
  // creating cards using javascript
  arr.forEach((item) => {
    let cardElm = document.createElement("div");
    cardElm.classList.add("card", "back");
    gameContainer.appendChild(cardElm);

    // main logic----------------

    cardElm.addEventListener("click", (e) => {
      moveCount++;
      moves.innerText = moveCount;
      e.target.innerText = item;
      e.target.classList.remove("back");
      e.target.style.transform = "rotateY(180deg)";
      if (count >= 2) {
        count = 1;
        checkArray.length = 0;
        htmlArray.length = 0;
        checkArray.push(e.target.innerText);
        htmlArray.push(e.target);
      } else if (count <= 1) {
        count++;
        checkArray.push(e.target.innerText);
        htmlArray.push(e.target);
      }

      if (checkArray.length == 2) {
        if (checkArray[0] != checkArray[1]) {
          htmlArray.forEach((html) => {
            html.style.background = "darkred";
            setTimeout(() => {
              html.classList.add("back");
              html.innerText = "";
              html.style.background = "";
            }, 500);
          });
        } else {
          htmlArray.forEach((html) => {
            html.classList.add("green");
            matchCount++;
            if (matchCount == arr.length) {
              getResult();
            }
          });
        }
      }
    });
  });
}
//------------------------------

// timer in seconds
function StartTimer() {
  let i = 1;
  timer = setInterval(() => {
    time.innerHTML = `${i}s`;
    i++;
  }, 1000);
}

// starting button
let start = document.querySelector(".start");
start.addEventListener(
  "click",
  (StartGame = () => {
    let button = document.createElement("button");
    button.innerHTML = "Play";
    button.classList.add("play");
    startingDiv.innerHTML = `<h2>Choose Your Level</h2>
                          <div><input type="radio" name="levels" class="level" value="Easy"><label for="level">Easy(contains 16 cards)</label></div>
                          <br>
                          <div>  <input type="radio" name="levels" class="level" value="Medium"><label for="level">Medium(contains 24 cards)</label></div>
                          <br>
                          <div>  <input type="radio" name="levels" class="level" value="Hard"><label for="level">Hard(contains 36 cards)</label></div>`;
    startingDiv.appendChild(button);
    button.addEventListener(
      "click",
      (Play = () => {
        let level = document.querySelectorAll(".level");
        level.forEach((item) => {
          if (item.checked) {
            if (item.value == "Easy") {
              startingDiv.style.display = "none";
              document.body.style.opacity = "1";
              ShuffleCards(cardsArray);
              generateCards(cardsArray);
              StartTimer();
            } else if (item.value == "Hard") {
              startingDiv.style.display = "none";
              document.body.style.opacity = "1";
              ShuffleCards(mediumLevelArray);
              generateCards(mediumLevelArray);
              gameContainer.style.height = "auto";
              gameContainer.style.width = "auto";
              StartTimer();
            } else if (item.value == "Medium") {
              startingDiv.style.display = "none";
              document.body.style.opacity = "1";
              ShuffleCards(midLevelArray);
              generateCards(midLevelArray);
              gameContainer.style.height = "auto";
              gameContainer.style.width = "auto";
              StartTimer();
            }
          }
        });
      })
    );
  })
);

let cardsDiv = document.querySelectorAll(".card");

// result at last when all the cards are face up
function getResult() {
  clearInterval(timer);
  audio.play();
  startingDiv.innerHTML = `<h1>GameOver!</h1>
                                    <br>
                                    <span>Time Taken : ${time.innerHTML}</span>
                                    <br>
                                    <br>
                                    <br>
                                   <span> Total Moves : ${parseInt(
                                     moves.innerHTML
                                   )}</span>
                                   <br>
                                   <br>
                                   <p class="para">Congratulations🔥🔥</p>
                                   <br>
                                   <button class="btn" onclick="window.location.reload()">Play Again</button>`;

  setTimeout(() => {
    startingDiv.style.zIndex = 2;
    gameContainer.innerHTML = "";
    startingDiv.style.display = "block";
  }, 500);
  setTimeout(()=>{
    audio.pause();
  },4000)
}

// alternative way of starting the game
window.onkeydown = Go = (e) => {
  if (e.keyCode == 13) {
    StartGame();
  }
};
