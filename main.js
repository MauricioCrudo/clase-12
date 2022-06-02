const express = require("express");
const io = require("socket.io");
const { Server: IOServer } = require("socket.io");
const { Server: HttpServer } = require("http");
const { engine } = require("express-handlebars");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// API
const Contenedor = require("./class");
const container = new Contenedor("api");

// HANDLEBARS
app.engine(
	"hbs",
	engine({
		extname: ".hbs",
		defaultLayout: `${__dirname}/viewsHBS/index.hbs`,
		layoutsDir: `${__dirname}/viewsHBS/layouts`,
		partialsDir: `${__dirname}/viewsHBS/partials`,
	})
);
app.set("views", "./viewsHBS");
app.set("view engine", "hbs");

// metodos
app.get("/", (req, res) => {
	const data = {
		alumno: "Mauricio Crudo",
	};
	res.render("layouts/main", data);
});
app.get("/productos", async (req, res) => {
	const content = await container.getAll();
	const data = {
		content: content,
	};

	console.log(data);
	return res.render("layouts/items", data);
});
app.post("/productos", async (req, res) => {
	const items = await container.getAll();
	const id = items.length;
	let newItem = req.body;
	newItem.id = id;
	await container.save(newItem);
	return res.redirect("/productos");
});

// PORT
app.use(express.static(__dirname + "/public"));
const PORT = 8080;
const server = app.listen(PORT, () => {
	console.log(`listen on ${PORT}`);
});
server.on("error", () => {
	console.log(error);
});
