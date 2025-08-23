



        function myFunction() {
            alert("checked");
        }






        //  Select ALL <button> elements
  
        // Function called from button onclick (inline in HTML)
        function myFunction1() {
            alert("checked1");
        }
        function myFunction2() {
            alert("checked2");
        }

        function myFunction3() {
            alert("checked3");
        }



        let btns = document.querySelectorAll("button");

        // Loop through each button and assign a click event
        for (let btn of btns) {
            btn.onclick = function () {
                console.log('Button clicked ❤️');
            }
        }



// Function that runs when the mouse enters a button
function mouseEnterHandler() {
    alert("Mouse entered!");
    console.log
}

// Select all elements with the ID 'mouse'
let mouseButtons = document.querySelectorAll("#mouse");

// Assign the mouseenter event to each button
for (let mouse of mouseButtons) {
    mouse.onmouseenter = mouseEnterHandler; // lowercase!
}
