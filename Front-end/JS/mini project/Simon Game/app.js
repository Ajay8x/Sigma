let gamesSeq = [];
let userSeq = [];
let started=false;
let level = 0;
let h2 = document.querySelector("h2");

document.addEventListener("keydown", function(event) {
    if(started === false) {
        console.log("Game started");
        started = true;
        levelUp();
        
    }
});

function levelUp() {
    level++;
h2.innerText=`Level ${level}`;
  
}

