let btn =document.querySelector("button")


btn.addEventListener("click",function(){


    // Update the heading with the new color and text
let h3 = document.querySelector("h3");
let randomColor = getRandomColor();
h3.innerText = randomColor;
h3.style.color = randomColor;


//div color update
let div = document.querySelector("div");
div.style.backgroundColor = randomColor;

console.log("Color updated");
});




function getRandomColor(){
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);
  let color = `rgb(${red}, ${green}, ${blue})`;
  return color;
}