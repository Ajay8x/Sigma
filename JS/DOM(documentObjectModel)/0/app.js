// Change h1 text by using document.all 

document.all[9].innerText="Peter Parker";
console.log(document.all[9]);
console.log(document.all);



//how to getElementId   accessing the DOM

let mainVarimg = document.getElementById("mainImg");

console.log(mainVarimg);
console.log(mainVarimg.src);
console.log(mainVarimg.tagName);


// how to getElementsByClassName
let newelementsOldImg = document.getElementsByClassName("oldImg");
console.log(newelementsOldImg);




//for loop to change old img to main img 

// for (let i = 0; i < newelementsOldImg.length; i++) {
//     newelementsOldImg[i].src = mainVarimg.src;
//     console.log(newelementsOldImg[i]);
// }


//query Selector

//class
let newelementsOldImgQuery = document.querySelectorAll(".oldImg");
console.log(newelementsOldImgQuery);    


//id 
let newelementsMainImgQuery = document.querySelector("#mainImg");
console.log(newelementsMainImgQuery);

//tag
let newelementsImgQuery = document.querySelectorAll("img");
console.log(newelementsImgQuery);

//element
let newelementsElementQuery = document.querySelectorAll("p");
console.log(newelementsElementQuery);

//div
let newelementsDivQuery = document.querySelectorAll("div");
console.log(newelementsDivQuery);





console.dir(document.querySelector("div.box"));
console.dir(document.querySelector("div a"));
console.dir(document.querySelectorAll("div a"));

