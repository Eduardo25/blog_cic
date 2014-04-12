//Importa librerias
var express = require("express");
var nunjucks = require("nunjucks");

//Crendo el Servidor Web
var app = express();

//Configuarcion de Express
app.use("/css", express.static(__dirname + "/css"));
app.use("/css", express.directory(__dirname + "/css"));

app.use("/imagenes", express.static(__dirname + "/imagenes"));
app.use("/imagenes", express.directory(__dirname + "/imagenes"));

app.use("/videos", express.static(__dirname + "/videos"));
app.use("/javascript", express.static(__dirname + "/javascript"));

//Habilita recibir parametros post
app.use(express.urlencoded());

nunjucks.configure(__dirname + "/vistas", {
	express:app
});

//Levanta el servidor en el puerto 8000
app.listen(8000);
app.get("/", function(request, response){
	
	response.render("index.html", {
		configuracion:{
			saludo:"Desarrollo ágil con HTML5 dinamico"
		}
	});
});

app.get("/contacto", function(request, response){
	response.render("contacto.html");
});

app.get("/blog", function(request, response){
	
	var postEncontrados = [{
		titulo:"Post 1",
		descripcion:"Descripcion de Post 1"
	},{
		titulo:"Post 2",
		descripcion:"Descripcion de Post 2"
	}];
	
	//Se simula que la base no tiene artículos
	//postEncontrados = [];
	
	response.render("blog.html", {
		posts:postEncontrados
		});
});

app.post("/suscribir", function(request, response){
	//body tiene todos los parametros del formulario que se envia por un http post
	console.log("Email. del usuario:" + request.body.email);
	response.send("Email. del usuario:" + request.body.email);
});

app.post("/contactar", function(request, response){
	console.log("Nombre del usuario:" + request.body.nombre);
	console.log("Email del usuario:" + request.body.email);
	console.log("Website del usuario:" + request.body.website);
	console.log("Edad del usuario:" + request.body.edad);
	console.log("Comentario del usuario:" + request.body.comentario);
	
	/* var datosEncontrados = [{
		nombre:request.body.nombre,
		email:request.body.email,
		website:request.body.website,
		edad:request.body.edad,
		comentario:request.body.edad
	}];
	
	response.send("/contactar", {
		posts:datosEncontrados
	});
	
	*/
	
	response.send("Nombre: " + request.body.nombre 
	+ "<br>Email: " + request.body.email
	+ "<br>Website: " + request.body.website
	+ "<br>Edad: " + request.body.edad
	+ "<br>Comentario: " + request.body.comentario);
	
});
	
console.log("Arrancando servidor");
