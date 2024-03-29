const {request, response, json} = require("express");
const Menu = require("../models/menus");


const  obtenerLosMenus = async(req= request, res= response)=>{
    const {limite= 6, desde = 0} = req.query;
    const query = {estado:true};

    const[total,menus] = await Promise.all([
        Menu.countDocuments(query),
        Menu.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
        .populate("categoria", "nombre")
        .populate("usuario", "nombre"),

    ]);

    res.json({
        total,
        menus,
    });
};




const obtenerMenu = async(req= request, res= response)=>{
    const {id} = req.params;
    const menu = await Menu.findById(id)
    .populate("categoria", "nombre")
    .populate("usuario", "nombre");

res.json({
    menu,
});

};


const CrearMenu = async(req,res) =>{
const { precio, categoria, detalle , img } = req.body;

const nombre = req.body.nombre.toUpperCase(); 

const menuDB = await Menu.findOne({nombre});


if(menuDB){
    return res.status(400).json({
    msg:`El menu ${menuDB.nombre} ya existe`,

    });
}


const data ={
    nombre,
    categoria,
    precio,
    detalle,
    img,
    usuario: req.usuario._id,
};

const menu = new Menu(data);


await  menu.save();

res.status(201).json({
    msg:"se agrego correctamente nuevo menu",
});

};


const actualizarMenu = async(req,res) =>{
    const {id} = req.params;

    const {precio, categoria, detalle, disponible, img} =  req.body;

    const usuario = req.usuario._id;
    let data={
        precio,
        detalle,
        categoria,
        disponible,
        img,
        usuario,
        img
    };
    
    if(req.body.nombre){
        data.nombre = req.body.nombre.toUpperCase();
    };

    const menu = await Menu.findByIdAndUpdate(id, data,{new:true});

    res.status(200).json({
        msg:"menu actualizado correctamente",
        menu
    });

};


const borrarMenu = async(req,res) =>{
    const { id } = req.params;

    const menuBorrado = await Menu.findByIdAndUpdate(
        id,
        { estado:false},
        {new:true}    
        );

        res.json({
            msg:"menu inactivado",
            menuBorrado

        });
};



module.exports={
    obtenerLosMenus,
    obtenerMenu,
    CrearMenu,
    actualizarMenu,
    borrarMenu

};

