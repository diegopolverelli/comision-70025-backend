import express from 'express';
import cookieParser from "cookie-parser"
const PORT=3000;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('./src/public'))
app.use(cookieParser("CoderCoder123"))

app.get('/',(req,res)=>{
    console.log(req.headers)

    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})

app.get('/setcookie',(req,res)=>{
    // console.log(req.headers)

    let persona={
        name: "Juan Carlos",
        theme: "Dark", 
        fontSize: 32
    }

    res.cookie("cookie01", persona, {})    
    res.cookie("cookie02conMaxAge", persona, {maxAge:1000*5})    
    res.cookie("cookie03conExpires", persona, {expires: new Date(2024, 7, 31)})    
    res.cookie("cookie04conExpiresSigned", persona, {expires: new Date(2024, 7, 31), signed:true})    

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:"cookies configuradas"});
})

app.get("/getCookie", (req, res)=>{

    let cookies=req.cookies
    console.log(req.cookies)
    let cookiesFirmadadas=req.signedCookies
    

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({cookies, cookiesFirmadadas});
})

app.get("/delCookie", (req, res)=>{

    // res.clearCookie("cookie01")
    let cookies=Object.keys(req.cookies)
    console.log(cookies)
    cookies.forEach(cookie=>{
        res.clearCookie(cookie)
    })

    cookies=Object.keys(req.signedCookies)
    console.log(cookies)
    cookies.forEach(cookie=>{
        res.clearCookie(cookie)
    })


    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:"Cookies eliminadas...!!!"});
})



const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});
