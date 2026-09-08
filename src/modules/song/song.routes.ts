import { Router } from "express";
import { songUpload } from "../../middlewares/multer-config.js";
import { SongRepository } from "./song.repository.js";
import { SongService } from "./song.service.js";
import { SongController } from "./song.controller.js";

const songRoute = Router()
const songController = new SongController(new SongService(new SongRepository))

// songRoute.get("/", songController.getAll);
// songRoute.get("/:id", songController.getById);
songRoute.post("/create", songUpload.fields([{ name: "image", maxCount: 1 }, { name: "coverImage", maxCount: 1 }]), songController.create);
songRoute.post("/update/:id", songUpload.fields([{ name: "image", maxCount: 1 }, { name: "coverImage", maxCount: 1 }]), songController.update);
songRoute.post("/delete/:id", songController.delete);

export default songRoute;