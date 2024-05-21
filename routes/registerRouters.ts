import express from "express";
import { register } from "../public/db/database";


export function registerRouter(){
    const router = express.Router();

      router.get('/register', async (req, res) => {
        res.render('register', {});
      });

      router.post('/register', async (req, res) => {
        const { email, password} = req.body;
        try {
            const userId = await register(email,password)
            res.redirect("login"); 
        } catch (error: any) {
            res.render("register", {message:error})
        }
      });


    return router;
}