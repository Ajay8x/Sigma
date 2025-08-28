const figlet = require("figlet");

figlet("Hello Ajay!", (err, data) => {
  if (err) {
    console.log("Error:", err);
    return;
  }
  console.log(data);
});
