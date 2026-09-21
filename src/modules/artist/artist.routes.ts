import { Router } from "express";
import { ArtistController } from "./artist.controller.js";
import { ArtistService } from "./artist.service.js";
import { ArtistRepository } from "./artist.repository.js";
import { artistUpload } from "../../config/multer.config.js";

const artistRoute = Router()
const artistController = new ArtistController(new ArtistService(new ArtistRepository))

artistRoute.get("/", artistController.getAll);
artistRoute.get("/:id", artistController.getById);
artistRoute.post("/create", artistUpload.fields([{ name: "image", maxCount: 1 }, { name: "coverImage", maxCount: 1 }]), artistController.create);
artistRoute.post("/update/:id", artistUpload.fields([{ name: "image", maxCount: 1 }, { name: "coverImage", maxCount: 1 }]), artistController.update);
artistRoute.post("/delete/:id", artistController.delete);

export default artistRoute;