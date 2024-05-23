import express from "express";
import { User } from "../public/interfaces/user";
import { login } from "../public/db/database";


export function loginRouter(){
    const router = express.Router();

    router.get('/login',(req, res) => {
        res.render('login', {
          error_message: ""
        })
      });

    router.post("/login", async(req, res)=>{
        const {email , password} = req.body
        try {
            let user:User = await login(email,password);
            delete user.password; 
            req.session.user = user;
            res.redirect("/main");
        } catch (error: any) {
          res.render("login", {error_message: error});
        }
    
    });

    router.post("/logout", async(req, res) => {
        req.session.destroy(() => {
            res.redirect("/login");
        });
      });


      return router;

}