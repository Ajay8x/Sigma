const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require('express');
const app = express();
const path = require("path");
const { render } = require('ejs');
const methodOverride = require('method-override');
const e = require('express');
const { v4: uuidv4 } = require('uuid');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "/views"))


// Create a connection to the database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'delta_app',
    password: 'Ajay123@'
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

// Function to generate a random data object
let getRandomUser = () => {
    return [
        faker.string.uuid(),
        faker.internet.username(), // use userName() instead of username()
        faker.internet.email(),
        faker.internet.password(),
    ];
};


// home page route
app.get('/', (req, res) => {
    let q = `SELECT count(*) FROM user;`;
    try {
        connection.query(q, (err, result) => {
            if (err) throw err;

            let count = result[0]['count(*)'];
            res.render("home.ejs", { count });
            console.log("✅ Data fetched:");
        });
    }
    catch (err) {
        console.log("❌ Error  data:", err);
    }
});


//show all users route
app.get('/user', (req, res) => {
    let q = `SELECT * FROM user`;

    try {
        connection.query(q, (err, users) => {
            if (err) throw err;
            res.render("showusers.ejs",{users})
            console.log("✅ All users data fetched:", users.length);
        });
    }
    catch (err) {
        console.log("❌ Error  data:", err);
    }
});


//Edit route
app.get('/user/:id/edit', (req, res) => {
    let {id} = req.params;
    let q = `SELECT * FROM user WHERE id = '${id}'`;  
    console.log(id);

     try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            let user = result[0];
           res.render("edit.ejs",   {user} );  
           console.log("✅ username edit fetched:", user.username);
        });
    }
    catch (err) {
        console.log("❌ Error  data:", err);
    }
});


//UPDATE route
app.patch('/user/:id', (req, res) => {

     let {id} = req.params;
    let q = `SELECT * FROM user WHERE id = '${id}'`;  
let {password: fromPass, username: newUsername}= req.body;

        try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            let user = result[0];
            if(fromPass != user.password){
                res.send("Password is incorrect");
            }

            else{
let q2 = `UPDATE user SET username='${newUsername}' WHERE id='${id}'`;
connection.query(q2, (err, result) => {
            if (err) throw err;
            console.log("✅ Data updated:", result);
            res.redirect('/user');

        }   );

            }
              
        });
    }
    catch (err) {
        console.log("❌ Error data:", err);
    }
}); 



app.get("/user/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/user/new", (req, res) => {
  let { username, email, password } = req.body;
  let id = uuidv4();
  //Query to Insert New User
  let q = `INSERT INTO user (id, username, email, password) VALUES ('${id}','${username}','${email}','${password}') `;

  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      console.log("added new user");
      res.redirect("/user");
    });
  } catch (err) {
    res.send("some error occurred");
  }
});

app.get("/user/:id/delete", (req, res) => {
  let { id } = req.params;
  let q = `SELECT * FROM user WHERE id='${id}'`;

  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      res.render("delete.ejs", { user });
      console.log("fetched user for delete");
    });
  } catch (err) {
    res.send("some error with DB");
  }
});

app.delete("/user/:id/", (req, res) => {
  let { id } = req.params;
  let { password } = req.body;
  let q = `SELECT * FROM user WHERE id='${id}'`;

  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];

      if (user.password != password) {
        res.send("WRONG Password entered!");
      } else {
        let q2 = `DELETE FROM user WHERE id='${id}'`; //Query to Delete
        connection.query(q2, (err, result) => {
          if (err) throw err;
          else {
            console.log(result);
            console.log("deleted!");
            res.redirect("/user");
          }
        });
      }
    });
  } catch (err) {
    res.send("some error with DB");
  }
});








    // let {id} = req.params;
    // let newUser = getRandomUser();
    // let q = `UPDATE user SET id='${newUser[0]}', username='${newUser[1]}', email='${newUser[2]}', password='${newUser[3]}' WHERE id='${id}'`;  
    // console.log(id);


//  try {
//         connection.query(q, (err, result) => {
//             if (err) throw err;
// console.log(result);
// res.send(result);
//         });
//     }
//     catch (err) {
//         console.log("❌ Error inserting data:", err);
//     }