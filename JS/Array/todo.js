let todo = [];
while (true) {
    let req = prompt("Please enter a request (list, add/new, quit):");

    if (req === "quit" || req === "exit") {
        console.log("You have exited the todo list.");
        break;
    } else if (req === "list") {
        console.log("Your todo list:");
        for (let i=0; i < todo.length; i++) {
            console.log(i,todo[i]);
        }
        console.log("---------");
    } else if (req === "add" || req === "new") {
        let task = prompt("Please enter a new task: ");
        todo.push(task);
        console.log(`"${task}" has been added to your todo list.`);
    }
    
    else if (req === "delete"){
        let index =prompt("Please enter the index of the task to delete: ");
        todo.splice(index, 1);
        console.log(`Task at index ${index} has been deleted from your todo list.`);

    }
    
    
    
    else {
        console.log("Unknown wrong command. Please enter: list, add/new, or quit/exit.");
    }
}
