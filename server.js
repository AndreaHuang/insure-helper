const express = require("express");
const irrHandler = require("./controller/irr");

const app = express();

var bodyParser = require("body-parser");

var cors =require("cors");

var db = require("knex")({
  client: 'pg',
  connection: {
  host: "localhost",
  port: "5432",
  user: "apple",
  password: "apple",
  database: "Insure",
 }
});



app.use(cors());
app.use(bodyParser.json());

app.get("/", (req,res)=> {res.send("Hello")});

app.get("/ci", (req,res)=> {
	var a = db.select('*').from('rate').where({product_code:'CIM',anb:30}).then((data)=>
		{	console.log(data[0]);
			res.send(data[0]);
		}

		);
	//console.log(a);
	
	//res.send("hello")
});

app.post("/irr", (req,res)=> {
	//console.log(req.body);
	let result= irrHandler.handleIRR(req.body);
	console.log(result);
	res.send(result);
});
	



//app.listen(3000, ()=>console.log('Working on port 3000!'));

const port = process.env.PORT||8080;
app.listen(port, () => console.log('Example app listening on port  ${port} !'));