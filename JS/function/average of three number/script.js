function avgOfThreeNumbers(a, b, c) {
    // Calculate the average of three numbers
   let d= (a + b + c) / 3;
   console.log(d);
   alert("The average is: " + d);
}

let a = parseFloat(prompt("Enter the first number:"));
let b = parseFloat(prompt("Enter the second number:"));
let c = parseFloat(prompt("Enter the third number:"));

avgOfThreeNumbers(a, b, c);

