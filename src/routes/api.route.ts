import { Request, Response, Router } from "express";
import { ArtistController } from "../modules/artist/artist.controller.js";
import { ArtistService } from "../modules/artist/artist.service.js";
import { ArtistRepository } from "../modules/artist/artist.repository.js";

const apiRouter = Router()
const artistController = new ArtistController(new ArtistService(new ArtistRepository))


apiRouter.get("/", (req: Request, res: Response) => {
    res.json({
        message: "API is working",
    });
})
apiRouter.get("/artists", artistController.getAll);
apiRouter.get("/artists/:slug", artistController.getBySlug);
// apiRouter.get("/artists/:id", artistController.getById);

export default apiRouter