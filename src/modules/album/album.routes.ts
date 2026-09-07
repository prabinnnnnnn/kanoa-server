import { Router } from "express";
import { AlbumController } from "./album.controller.js";
import { AlbumService } from "./album.service.js";
import { AlbumRepository } from "./album.repository.js";

const albumRoute = Router()
const albumController = new AlbumController(new AlbumService(new AlbumRepository))

// albumRoute.get("/", albumController.getAll);
// albumRoute.get("/:id", albumController.getById);
albumRoute.post("/create", albumController.create);
albumRoute.post("/update/:id", albumController.update);
albumRoute.post("/create/:id", albumController.delete);

export default albumRoute;