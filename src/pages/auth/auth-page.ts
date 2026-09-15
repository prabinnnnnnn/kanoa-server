import { Request, Response } from "express";
import { AuthRepository } from "../../modules/auth/auth.repository.js";
import { AuthService } from "../../modules/auth/auth.service.js";

export class AuthPage {

    private users = new AuthService(new AuthRepository);

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
        const user = req.session
        res.render("auth/profile.ejs", {
            title: "Profile",
            page_title: 'Profile',
            messages: req.flash(),
            user: user.user,
        })
    }

    renderUserListPage = async (req: Request, res: Response) => {
        res.render("auth/user-list.ejs", {
            title: "User List",
            page_title: 'User List',
            messages: req.flash(),
            users: await this.users.getAll()
        })
    }

    renderEmailVerifyPage = async (req: Request, res: Response) => {
        res.render("auth/email-verification.ejs", {
            title: "Email Verification",
            page_title: 'Email Verification',
            messages: req.flash(),
            layout: "layouts/layout-without-nav"
        })
    }
} 