const {request, response} = require("express");
const Usuario = require("../models/usuarios");
const bcrypt = require("bcryptjs");
const {generarJWT} = require("../helpers/generar-jwt")

const login= async (req=request, res=response)=>{

 const {email, password} = req.body;
try {
 //  verificar si email existe
const usuario = await Usuario.findOne({email});

if(!usuario){
    return res.status(400).json({
        msg:"Email | Password son incorrectos"  
      });
}
// verificar si usuario esta activo 
if(!usuario.estado){
    return res.status(400).json({
        msg:"Usuario inactivo"  
      });
}

// verificar contraseña
const validaPassword=bcrypt.compareSync(password,usuario.password);
if(!validaPassword){
    return res.status(400).json({
        msg:"Email | Password son incorrectos"  
      });
}

// generar un token 

const token = await generarJWT(usuario.id);

res.json({
   usuario,
   token,
});

} catch (error) {
  console.log(error);
  res.status(500).json({
    msg:"comuniquese con el administrador"
  });  
}


}


module.exports ={
    login
}
  