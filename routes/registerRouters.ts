import express from "express";
import { findUserByEmail, register } from "../public/db/database";


export function registerRouter(){
    const router = express.Router();

      router.get('/register', async (req, res) => {
        res.render('register', {error_message: ""});
      });

      router.post('/register', async (req, res) => {
        const { email, password, passwordConfirm} = req.body;
        if(password != passwordConfirm){res.render("register", {error_message: "passworden zijn niet gelijk"})}

        try {
            await register(email,password,passwordConfirm)
            res.redirect("login"); 
 
        } catch (error: any) {
            res.render("register", {error_message:error})
        }
      });


    return router;
}