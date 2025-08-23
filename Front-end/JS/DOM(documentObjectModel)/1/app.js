// create paragraph
let para1 = document.createElement("p");
para1.innerText = "This is the first paragraph.";
document.querySelector("body").appendChild(para1);  


para1.classList.add("red");

// create heading
let heading = document.createElement("h3");
heading.innerText = "This is a heading.";
document.querySelector("body").appendChild(heading);

heading.classList.add("blue");

//create div
let div = document.createElement("div");
let h1 = document.createElement("h1");
let para2 = document.createElement("p");


h1.innerText = "This is a div heading.";
para2.innerText = "This is a paragraph inside a div.";
div.append(h1);
div.append(para2);
div.classList.add("box");
document.querySelector("body").appendChild(div);
