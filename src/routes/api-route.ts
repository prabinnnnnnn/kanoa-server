import { Request, Response, Router } from "express";

const apiRouter = Router()

apiRouter.get("/", (req: Request, res: Response) => {
    res.json({
        message: "API is working",
    });
})

export default apiRouter