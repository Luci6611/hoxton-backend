const Role = require("../models/role");
const Usuario = require("../models/usuarios");
const Categoria = require("../models/categorias");
const Menu = require("../models/menus")
const Pedido = require("../models/pedidos");

const esRoleValido = async (role="")=>{
   
    const existeRole = await Role.findOne({role});  
    
    if(!existeRole){
        throw new Error(`El rol ${role} no existe en la BD`);
    }
}
 
 
const emailExiste =async(email)=>{
    
const existeEmail = await Usuario.findOne({email});
if (existeEmail) {
    throw new Error(`El correo ${email} ya existe en la BD`);
};
}

const idExiste =async(id)=>{
    
    const existeId = await Usuario.findOne({_id:id});
    if (!existeId) {
        throw new Error(`El id ${id} no existe en la Base de Datos`);
    };
    }



const categoriaExiste =async(id)=>{
    
    const existeCategoria = await Categoria.findById(id);
    if (!existeCategoria) {
        throw new Error(`El id ${id} no existe en la Base de Datos`);
    };
    }

    
    const menuExiste =async(id)=>{
    
        const existeMenu = await Menu.findById(id);
        
        if (!existeMenu) {
            throw new Error(`El Menu con el id ${id} no existe en la Base de Datos`);
        };
        }

        
    const pedidoExiste =async(id)=>{
    
        const existePedido = await Pedido.findById(id);
        
        if (!existePedido) {
            throw new Error(`El Pedido con el id ${id} no existe en la Base de Datos`);
        };
        }
module.exports ={
    esRoleValido,
    emailExiste,
    idExiste,
    categoriaExiste,
    menuExiste,
    pedidoExiste
};