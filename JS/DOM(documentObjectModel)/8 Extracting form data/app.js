let form=document.querySelector("form")

form.addEventListener("submit",function(event){
    event.preventDefault();



// let user= document.querySelector("#user")
// let pass= document.querySelector("#pass")
// console.log("username=: ",user.value);
// console.log("password=: ",pass.value);




//Or



console.dir(form);

let user= this.elements[0];
let pass= this.elements[1];



console.log("username=: ",user.value);
console.log("password=: ",pass.value);



alert(`username: ${user.value} password: ${pass.value}`);
});