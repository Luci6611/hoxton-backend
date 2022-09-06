const { Router } = require("express");
const { check } = require("express-validator");
const { menuExiste } = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const { esAdminRole } = require("../middlewares/validar-rol");
const {
  obtenerLosMenus,
  actualizarMenu,
  borrarMenu,
  obtenerMenu,
  CrearMenu,
} = require("../controllers/menus");

const router = Router();

router.get("/", obtenerLosMenus);

// LISTAR MENU POR ID
router.get(
  "/:id",
  [
    check("id", "No es un id de mongo valido").isMongoId(),
    check("id").custom(menuExiste), //"validando si producto exite por id"
    validarCampos,
  ],
  obtenerMenu
);

router.post(
  "/",
  [
    validarJWT,
    esAdminRole,
    check("nombre", "El nombre es obligatorio").notEmpty(),
   
    validarCampos,
  ],
  CrearMenu
);

router.put(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un id de mongo valido").isMongoId(),
    check("id").custom(menuExiste), //"validando si producto exite por id"
    validarCampos,
  ],
  actualizarMenu
);

router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un id de mongo valido").isMongoId(),
    check("id").custom(menuExiste), //"validando si producto exite por id"
    validarCampos,
  ],
  borrarMenu
);

module.exports= router;