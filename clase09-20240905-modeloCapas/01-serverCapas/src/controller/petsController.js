

export const getPets=(req, res)=>{

    let pets="mascotas..."

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:pets});
}

export const getPetById=(req, res)=>{
    let{id}=req.params
    let pet=`mascota ${id}`

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:pet});
}