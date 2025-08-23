
// //  with .innerText se only text change hota hai  
// para=document.querySelector("p");
// para.innerText="❤️<b>Ajay Singh</b>❤️<u> I am IronMan</u> ";


// //with textContent se  text change hota hai aur hidden elements bhi change hote hain
// para=document.querySelector("h1");
// para.textContent="❤️<b>Ajay Singh</b>❤️<u> I am IronMan</u> ";



// //with .innerHTML se <b> aur <u> tags bhi change hote hain aur <i> tags bhi aur hyper links,text,img,src bhi
// para=document.querySelector("h2");
// para.innerHTML="❤️<b>Ajay Singh</b>❤️<u> I am IronMan</u> ";





// change color of all links in the box to red // with help of for loop
let link = document.querySelectorAll(".box a");
for (let i = 0; i < link.length; i++) {
    link[i].style.color = "red";
}
// use for..of loop
let link1 = document.querySelectorAll(".box a"); // inline
for (let link of link1) {
    link.style.color = "green";
}




//all 

let box =document.querySelector(".box");
box.style.backgroundColor="lightyellow"; // change background color of box to yellow

// add class

let heading = document.querySelector('h1');
heading.classList.add("h1-style");





// use delete class

let box2 = document.querySelector(".box");
box2.classList.remove("h1-style");

let box1 = document.querySelector(".box");
box1.classList.remove("h2-style");



// toggle class
let box_new =document.querySelector('.box')
let show= box_new.children;
console.log(show);

let h4_new= box_new.querySelector('h4');
let show1= h4_new.parentElement;
let show2= h4_new.previousElementSibling;
console.log(show1);
console.log(show2);



// append child in element change 
let newElement0 = document.createElement('p');



//  use prepend 
let newElement1 = document.createElement('p');
newElement1.textContent = 'This is a new paragraph2.';
box_new.prepend(newElement1);


// use append
let newElement2 = document.createElement('p');
newElement2.textContent = 'This is a new paragraph3.';
box_new.appendChild(newElement2);










let box_new2 = document.querySelector('.box2');


//insertAdjacentElement beforeend
let newElement3 = document.createElement('p2');
newElement3.textContent = 'This is a new paragraph4.';
box_new2.insertAdjacentElement('beforeend', newElement3);

//insertAdjacentElement afterend
let newElement4 = document.createElement('p2');
newElement4.textContent = 'This is a new paragraph5.';
box_new2.insertAdjacentElement('afterend', newElement4);


//insertAdjacentElement beforebegin
let newElement5 = document.createElement('p2');
newElement5.textContent = 'This is a new paragraph6.';
box_new2.insertAdjacentElement('beforebegin', newElement5);

//insertAdjacentElement afterbegin
let newElement6 = document.createElement('p2');
newElement6.textContent = 'This is a new paragraph7.';
box_new2.insertAdjacentElement('afterbegin', newElement6);





//add style 
newElement0.classList.add("h1-style")
newElement1.classList.add("h1-style")
newElement2.classList.add("h1-style")
newElement3.classList.add("h1-style")
newElement4.classList.add("h1-style")
newElement5.classList.add("h1-style")
newElement6.classList.add("h1-style")
newElement7.classList.add("h1-style")