import { Request, Response, Router } from "express";
import { apiMiddleware } from "../middlewares/api.middleware.js";

import authApiRouter from "../modules/auth/auth.api.routes.js";
import artistApiRoute from "../modules/artist/artist.api.router.js";
import albumApiRoute from "../modules/album/album.api.routes.js";

const apiRouter = Router()

apiRouter.use("/auth", authApiRouter)
apiRouter.use(apiMiddleware)

apiRouter.get("/", (req: Request, res: Response) => {
    res.json({ message: "API is working" })
})
apiRouter.use("/artists", artistApiRoute);
apiRouter.use("/albums", albumApiRoute)


export default apiRouter