const express = require("express");
const cors = require("cors");

const { dbconnection } = require("../database/config");
class server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosEndPoint = "/api/usuarios";
    this.authPath = "/api/auth";
    this.categoriasPath = "/api/categorias";
    this.menuPath = "/api/menus";
    this.buscarPath = "/api/buscar";
    this.pedidosPath = "/api/pedidos";

    this.conectarDb();
    this.middleware();
    this.routes();
  }
  
  async conectarDb() {
    await dbconnection();
  }

  middleware() {
    
     this.app.use(cors( ));

    
    this.app.use(express.json());
    
    this.app.use(express.static("public"));
    console.log(process.env.CORS_DEV_CLIENT);
  }
 
  routes() {
    this.app.use(this.usuariosEndPoint, require("../routes/usuarios"));
    this.app.use(this.categoriasPath, require("../routes/categorias"));
    this.app.use(this.authPath, require("../routes/auth"));
    this.app.use(this.menuPath, require("../routes/menus"));
    this.app.use(this.buscarPath, require("../routes/buscar"));
    this.app.use(this.pedidosPath, require("../routes/pedidos"));
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log("sevidor inicializado... en el puerto", this.port);
    });
  }
}

module.exports = server;
