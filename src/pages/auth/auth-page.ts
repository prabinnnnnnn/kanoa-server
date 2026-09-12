import { Request, Response } from "express";

export class AuthPage {
    renderRegisterPage = async (req: Request, res: Response) => {
        res.render("auth/register.ejs", {
            title: "Register Account",
            page_title: 'Register',
            messages: req.flash(),
            layout: "layouts/layout-without-nav"
        })
    }

    renderLoginPage = async (req: Request, res: Response) => {
        res.render("auth/login.ejs", {
            title: "Login Account",
            page_title: 'Login',
            messages: req.flash(),
            layout: "layouts/layout-without-nav"
        })
    }

    renderProfilePage = async (req: Request, res: Response) => {
        res.render("auth/profile.ejs", {
            title: "Profile",
            page_title: 'Profile',
            messages: req.flash(),
        })
    }
} 