import { Router } from 'express';
import passport from 'passport';
export const router=Router()

router.get("/error", (req, res)=>{
    res.setHeader('Content-Type','application/json');
    return res.status(500).json({error:`Error passport...!!!`})
})

router.get('/github', passport.authenticate("github", {}),(req,res)=>{})

router.get('/callbackGithub', passport.authenticate("github", {failureRedirect:"/api/sessions/error"}),(req,res)=>{

    // passport deja (si todo sale OK) un req.user
    req.session.usuario=req.user
    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:"login exitoso", usuario:req.user});


})