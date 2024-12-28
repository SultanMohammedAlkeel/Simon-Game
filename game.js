
// global variables
const colors = ["red", "green", "blue", "yellow"];
userPattern = 0;
gamePattern = [];
started = false;
col = "";
level = 0;

// starting the game by hitting the A or a keys 
$(document).keypress(function (event) {
   if ((event.key === "a" || event.key === "A") && started == false) {
      userPattern = 0;
      gamePattern = [];
      started = true;
      col = "";
      level = 0;
      getNewColor();
   }
});

// the function that gives new color to the pattern
function getNewColor() {
   userPattern = 0;
   level++;
   document.querySelector("#title").textContent = `Level ${level}`;
   generated = Math.floor(Math.random(0) * 4);
   gamePattern.push(colors[generated]);
   document.getElementById(colors[generated]).classList.add("flash");
   setTimeout(() => { document.getElementById(colors[generated]).classList.remove("flash") }, 100);
   playSound(colors[generated]);

}

//method of playing sounds
function playSound(s) {
   var audio = new Audio(`sound/${s}.mp3`);
   audio.play();
}

//method for wrong pattern
function wrong() {
   document.getElementById("bod").classList.add("wrong");
   playSound("wrong");
   started = false;
   document.querySelector("#title").textContent = `Press A Key to Start`;
   setTimeout(() => {
      document.getElementById("bod").classList.remove("wrong");
   }, 100);
}


// check the answer 
function checkAnswer(color) {
   if (started) {
      if (gamePattern[userPattern] == color) {
         playSound(color);
         userPattern++;
         if (userPattern == gamePattern.length) {
            setTimeout(getNewColor(), 20000);

         }
      }
      else {
         wrong();
      }
      console.log(`green ${color} clicked`);
   }
};


$("#green").on("click", function () {
   checkAnswer("green");
});

$("#red").on("click", function () {
   checkAnswer("red");
});

$("#blue").on("click", function () {
   checkAnswer("blue");
});

$("#yellow").on("click", function () {
   checkAnswer("yellow");
});
