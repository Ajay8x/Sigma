
let form=document.querySelector("form")

form.addEventListener("submit",function(event){
    event.preventDefault();


});


let user =document.querySelector("#user");
user.addEventListener("input",function(){
console.log("input change");
console.log(`input value = ${user.value}`);
});



user.addEventListener("change",function(){
console.log("input change");
console.log(`final value = ${user.value}`);
});