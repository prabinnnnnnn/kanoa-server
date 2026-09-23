import { Router } from "express";
import { ArtistService } from "./artist.service.js";
import { ArtistRepository } from "./artist.repository.js";
import { ArtistApiController } from "./artist.api.controller.js";

const artistApiRoute = Router()
const artistApiController = new ArtistApiController(new ArtistService(new ArtistRepository))

artistApiRoute.get("/", artistApiController.getAll);
artistApiRoute.get("/:slug", artistApiController.getBySlug);
artistApiRoute.get("/:id", artistApiController.getById);

export default artistApiRoute;