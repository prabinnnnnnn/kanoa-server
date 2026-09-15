import { Router } from "express";
import { AlbumController } from "./album.controller.js";
import { AlbumService } from "./album.service.js";
import { AlbumRepository } from "./album.repository.js";
import { albumUpload } from "../../middlewares/multer-config.js";

const albumRoute = Router()
const albumController = new AlbumController(new AlbumService(new AlbumRepository))

// albumRoute.get("/", albumController.getAll);
// albumRoute.get("/:id", albumController.getById);
albumRoute.post("/create", albumUpload.single("coverImage"), albumController.create);
albumRoute.patch("/update/:id", albumUpload.single("coverImage"), albumController.update);
albumRoute.post("/delete/:id", albumController.delete);

export default albumRoute;