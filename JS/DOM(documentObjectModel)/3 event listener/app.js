// event listener
let btns = document.querySelectorAll("#btn");

for (let btn of btns) {





    
    btn.addEventListener("click", myFunction);
    btn.addEventListener("click", myFunction1);
    btn.addEventListener("click", myFunction2);
    btn.addEventListener("click", myFunction3);
}

function myFunction() {
    alert("checked");
}

function myFunction1() {
    alert("checked1");
}

function myFunction2() {
    alert("checked2");
}

function myFunction3() {
    alert("checked3");
}