const express = require('express')
const bodyParser = require('body-parser')
const mysql = require("mysql");
const server = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
server.use(bodyParser.json());

const cors = require('cors')
server.use(cors());


const secretKey = process.env.JWTSECRETKEY;

//Establish the database connection

const db = mysql.createConnection({

  host: "localhost",
  user: "root",
  password: "",
  database: "projecti_db",

});

db.connect(function (error) {
  if (error) {
    console.log("Error Connecting to DB");
  } else {
    console.log("successfully Connected to DB");
  }
});

//Establish the Port

server.listen(9002, function check(error) {
  if (error) {
    console.log("Error....dddd!!!!");
  }

  else {
    console.log("Started....!!!! 9002");

  }
});

//Create the Records

server.post("/api/project/add", (req, res) => {
  let details = {
    titleENG: req.body.titleENG,
    titleTH: req.body.titleTH,
    st_id_1: req.body.st_id_1,
    n_ENG_1: req.body.n_ENG_1,
    n_TH_1: req.body.n_TH_1,
    st_id_2: req.body.st_id_2,
    n_ENG_2: req.body.n_ENG_2,
    n_TH_2: req.body.n_TH_2,
    st_id_3: req.body.st_id_3,
    n_ENG_3: req.body.n_ENG_3,
    n_TH_3: req.body.n_TH_3,
    st_id_4: req.body.st_id_4,
    n_ENG_4: req.body.n_ENG_4,
    n_TH_4: req.body.n_TH_4,
    advisor: req.body.advisor,
    coadvisor: req.body.coadvisor,
    description: req.body.description,
    category: req.body.category,
    year: req.body.year,
    link: req.body.link,
  };
  let sql = "INSERT INTO project SET ?";
  db.query(sql, details, (error) => {
    if (error) {
      res.send({ status: false, message: "Project created Failed" });
    } else {
      res.send({ status: true, message: "Project created successfully" });
    }
  });
});

server.post("/api/student/add", (req, res) => {
  let details = {
    st_id_1: req.body.st_id_1,
    n_ENG_1: req.body.n_ENG_1,
    n_TH_1: req.body.n_TH_1,
    st_id_2: req.body.st_id_2,
    n_ENG_2: req.body.n_ENG_2,
    n_TH_2: req.body.n_TH_2,
    st_id_3: req.body.st_id_3,
    n_ENG_3: req.body.n_ENG_3,
    n_TH_3: req.body.n_TH_3,
    st_id_4: req.body.st_id_4,
    n_ENG_4: req.body.n_ENG_4,
    n_TH_4: req.body.n_TH_4,
  };
  let sql = "INSERT INTO student SET ?";
  db.query(sql, details, (error) => {
    if (error) {
      res.send({ status: false, message: "Project created Failed" });
    } else {
      res.send({ status: true, message: "Project created successfully" });
    }
  });
});


server.post("/api/allstudent/add", (req, res) => {
  let details = {
    Student_id: req.body.Student_id,
    Name_ENG: req.body.Name_ENG,
    Name_TH: req.body.Name_TH,
  };
  let sql = "INSERT INTO allstudent SET ?";
  db.query(sql, details, (error) => {
    if (error) {
      res.send({ status: false, message: "Project created Failed" });
    } else {
      res.send({ status: true, message: "Project created successfully" });
    }
  });
});


//view the Records

server.get("/api/project", (req, res) => {
  var sql = "SELECT * FROM project";
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      res.send({ status: true, data: result });
    }
  });
});

server.get("/api/student", (req, res) => {
  var sql = "SELECT * FROM student";
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      res.send({ status: true, data: result });
    }
  });
});

server.get("/api/allstudent", (req, res) => {
  var sql = "SELECT * FROM allstudent";
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      res.send({ status: true, data: result });
    }
  });
});


//Search the Records

server.get("/api/project/:id", (req, res) => {
  var id = req.params.id;
  var sql = "SELECT * FROM project WHERE id =" + id;
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      res.send({ status: true, data: result });
    }
  });
});

server.get("/api/student/:id_team", (req, res) => {
  var id = req.params.id_team;
  var sql = "SELECT * FROM student WHERE id_team =" + id;
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      res.send({ status: true, data: result });
    }
  });
});

server.get("/api/allstudent/:Student_id", (req, res) => {
  var id = req.params.Student_id;
  var sql = "SELECT * FROM allstudent WHERE Student_id =" + id;
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      res.send({ status: true, data: result });
    }
  });
});


//Update the Records

server.put("/api/project/update/:id", (req, res) => {
  let sql =
    "UPDATE project SET titleENG='" + req.body.titleENG +
    "', titleTH='" + req.body.titleTH +
    "', st_id_1='" + req.body.st_id_1 +
    "', n_ENG_1='" + req.body.n_ENG_1 +
    "', n_TH_1='" + req.body.n_TH_1 +
    "', st_id_2='" + req.body.st_id_2 +
    "', n_ENG_2='" + req.body.n_ENG_2 +
    "', n_TH_2='" + req.body.n_TH_2 +
    "', st_id_3='" + req.body.st_id_3 +
    "', n_ENG_3='" + req.body.n_ENG_3 +
    "', n_TH_3='" + req.body.n_TH_3 +
    "', st_id_4='" + req.body.st_id_4 +
    "', n_ENG_4='" + req.body.n_ENG_4 +
    "', n_TH_4='" + req.body.n_TH_4 +
    "', advisor='" + req.body.advisor +
    "', coadvisor='" + req.body.coadvisor +
    "', description='" + req.body.description +
    "', category='" + req.body.category +
    "', year='" + req.body.year +
    "', link='" + req.body.link +
    "'  WHERE id=" + req.params.id;

  let a = db.query(sql, (error, result) => {
    if (error) {
      res.send({ status: false, message: "Project Updated Failed" });
    } else {
      res.send({ status: true, message: "Project Updated successfully" });
    }
  });
});


server.put("/api/student/update/:id_team", (req, res) => {
  let sql =
    "UPDATE student SET st_id_1='" + req.body.st_id_1 +
    "', n_ENG_1='" + req.body.n_ENG_1 +
    "', n_TH_1='" + req.body.n_TH_1 +
    "', st_id_2='" + req.body.st_id_2 +
    "', n_ENG_2='" + req.body.n_ENG_2 +
    "', n_TH_2='" + req.body.n_TH_2 +
    "', st_id_3='" + req.body.st_id_3 +
    "', n_ENG_3='" + req.body.n_ENG_3 +
    "', n_TH_3='" + req.body.n_TH_3 +
    "', st_id_4='" + req.body.st_id_4 +
    "', n_ENG_4='" + req.body.n_ENG_4 +
    "', n_TH_4='" + req.body.n_TH_4 +
    "'  WHERE id_team=" + req.params.id_team;

  let a = db.query(sql, (error, result) => {
    if (error) {
      res.send({ status: false, message: "Project Updated Failed" });
    } else {
      res.send({ status: true, message: "Project Updated successfully" });
    }
  });
});

server.put("/api/allstudent/update/:Student_id", (req, res) => {
  let sql =
    "UPDATE allstudent SET Student_id='" + req.body.Student_id +
    "', Name_ENG='" + req.body.Name_ENG +
    "', Name_TH='" + req.body.Name_TH +
    "'  WHERE Student_id=" + req.params.Student_id;

  let a = db.query(sql, (error, result) => {
    if (error) {
      res.send({ status: false, message: "Project Updated Failed" });
    } else {
      res.send({ status: true, message: "Project Updated successfully" });
    }
  });
});

//Delete the Records

server.delete("/api/project/delete/:id", (req, res) => {
  let sql = "DELETE FROM project WHERE id=" + req.params.id + "";
  let query = db.query(sql, (error) => {
    if (error) {
      res.send({ status: false, message: "Projcet Deleted Failed" });
    } else {
      res.send({ status: true, message: "project Deleted successfully" });
    }
  });
});

server.delete("/api/student/delete/:id_team", (req, res) => {
  let sql = "DELETE FROM student WHERE id_team=" + req.params.id_team + "";
  let query = db.query(sql, (error) => {
    if (error) {
      res.send({ status: false, message: "Projcet Deleted Failed" });
    } else {
      res.send({ status: true, message: "project Deleted successfully" });
    }
  });
});

server.delete("/api/allstudent/delete/:Student_id", (req, res) => {
  let sql = "DELETE FROM allstudent WHERE Student_id=" + req.params.Student_id + "";
  let query = db.query(sql, (error) => {
    if (error) {
      res.send({ status: false, message: "Projcet Deleted Failed" });
    } else {
      res.send({ status: true, message: "project Deleted successfully" });
    }
  });
});