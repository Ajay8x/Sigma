let btn = document.querySelector("button");
btn.addEventListener("click", function (event) {
    console.log(event);
    console.log("button clicked");
});


let inp = document.querySelector("input");
inp.addEventListener("keydown", function (event) {


    console.log(event.key); //ArrowUp Arrowdown ArrowLeft ,ArrowRight
    console.log(event.code);
    console.log("key was pressed");
    if (event.code == "ArrowUp") {
        console.log("character moved forward")
    } else if (event.code == "ArrowDown") {
        console.log("character moved backward")
    } else if (event.code == "ArrowLeft") {
        console.log("character moved left")
    } else if (event.code == "ArrowRight") {
        console.log("character moved backward")
    }
});