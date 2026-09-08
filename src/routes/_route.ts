import { Router } from "express"
import pageRouter from "./page-route.js"
import albumRoute from "../modules/album/album.routes.js";
import artistRoute from "../modules/artist/artist.routes.js";
import apiRouter from "./api-route.js";
import songRoute from "../modules/song/song.routes.js";
const router = Router();

router.use("/", pageRouter);
router.use("/api/v1", apiRouter);

router.use("/album", albumRoute);
router.use("/artist", artistRoute);
router.use("/song", songRoute);

export default router;