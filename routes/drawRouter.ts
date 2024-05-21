import express from "express";
import { secureMiddleware } from "../public/middleware/secureMiddleware";


export function drawRouter(){
    const router = express.Router();

   
    router.get('/overview', secureMiddleware,(req, res) => {
        res.render('overview', {
          activePage: 'draw'
        })
      });

      return router;

}