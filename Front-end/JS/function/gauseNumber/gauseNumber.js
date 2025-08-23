const max = parseInt(prompt("Enter the maximum number:"));
const random = Math.floor(Math.random() * max) + 1;

while (true) {
    let guess = prompt("  Guessing Game Started!\n     Guess a number \n  1 ---> max N   \n    👉  Type 'quit' or 'exit' to Stop ");

    if (guess === "quit" || guess === "exit") {
        console.log("User Exited");
        alert("User Exited");
        break;
    }

    let guessedNumber = parseInt(guess);

    if (isNaN(guessedNumber)) {
      console.log("Wrong input. Please enter a correct number.");
        alert("Wrong input. Please enter a correct number.");
        continue;
    }

    if (guessedNumber === random) {
        console.log("Congratulations! You guessed it right!");
        alert("😎Congratulations! You guessed it right!")    ;
        break;
    } else if (guessedNumber < random) {
        console.log("Your guess is too small! Try again.");
        alert("Your guess is too small! Try again.");
    } else {
        console.log("Your guess is too large! Try again.");
        alert("Your guess is too large! Try again.");
    }
}