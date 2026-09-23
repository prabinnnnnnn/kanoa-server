import { Router } from "express";
import { AlbumService } from "./album.service.js";
import { AlbumRepository } from "./album.repository.js";
import { AlbumApiController } from "./album.api.controller.js";

const albumApiRoute = Router()
const albumApiController = new AlbumApiController(new AlbumService(new AlbumRepository))

albumApiRoute.get("/", albumApiController.getAll);
albumApiRoute.get("/:id", albumApiController.getById);


export default albumApiRoute;