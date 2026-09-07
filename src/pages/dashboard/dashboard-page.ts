import { Request, Response } from "express";

export const renderDashboard = async (req: Request, res: Response) => {
    res.render("dashboard.ejs", {
        title: 'Dashboard',
        page_title: 'Dashboard',
        messages: req.flash(),
    })
}
