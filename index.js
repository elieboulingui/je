const e = require('express')
const express = require('express')
const server = express()
const port  = process.env.PORT || 3000
server.use(express.json())
server.use(express.urlencoded({extended:true}))
server.set("views engine","ejs")
server.listen(port,()=>{
    console.log(`je suis la ${port}`)
})
const etudiant = [{

}]
 server.get("/boulingui",(req,res)=>{
    res.render('index.ejs')
 })
 server.post("/venusia",(req,res)=>{
    const user ={
        id : etudiant.length+-1,
         nom : req.body.nom,
         prenom:req.body.prenom,
         email:req.body.email,
         programation:req.body.programation,
         amour:req.body.amour
    }

    etudiant.push(user)
    res.json({message:"voici l amour dont tu la port",user})
 })
server.get("/josue",(req,res)=>{
    res.json({message:"voicib votre coeur",etudiant})
})
server.get("/josue/:id",(req,res)=>{
    const {id} = req.params.id *1
    const create = etudiant.find((etudiant)=> etudiant.id === id)
    res.send(create)
})
server.get("/josuet/:first_name",(req,res)=>{
    const {first_name}= req.params.first_name
    if(first_name){
       const create = etudiant.find((etudiant)=> etudiant.first_name === first_name)
       res.send(create)
    }else{
        res.status(404)
    }
})
server.get("/josues/:id",(req,res)=>{
    const {id}= req.params.id 
    const parsID = parseInt(id)
    if(!isNaN(parsID))
{
    const create = etudiant.filter((etudiant)=> etudiant.id <= parsID)
    res.send(create)
}    else{
    res.status(404)
}
})
server.post("/josue",(req,res)=>{
    if(!req.body.email){
        return (res.json({error:"nous avons besoin de l 'email"}))
    }
    const user ={
        id : etudiant.length +-1,
        first_name : req.body.first_name,
        last_name :req.body.last_name,
        email:req.body.email,

    }
    res.json({message:"voici votre creation",user})
    etudiant.push(user)
    
})
server.put("/josue/:id",(req,res)=>{
    let id= req.params.id
    let first_name = req.body.first_name
    let last_name =  req.body.last_name
    let email = req.body.email
    let index = etudiant.findIndex((etudiant)=>{
        return (etudiant.id == Number.parseInt(id))
    })
    if(index >= 0){
        let josue = etudiant[index]
        josue.first_name= first_name
        josue.last_name = last_name
        josue.email = email
        res.json({message:"voici ce que vous m avez demande",josue})

    }else{
        res.status(404)
    }
})
server.delete("/josue/:id",(req,res)=>{
    const id= req.params.id
    let index = etudiant.findIndex((etudiant)=>{
        return ((etudiant.id== Number.parseInt(id)))
    })
    if(index >= 0){
        let josue = etudiant[index]
        etudiant.splice(index,1)
        res.json({message:"voici le membre que vous voulez enleve ou tue",josue})
    }
    else{
        res.status(404)
    }
})
server.patch("/josue/:id",(req,res)=>{
    let {id} = req.params.id
    const  create = etudiant.find((etudiant)=> etudiant.id === id)
    const etudiant_index = etudiant.indexOf(create)
    const etudiant_update = Object.assign(create,req.body)
    etudiant[etudiant_index]= etudiant_update
    res.status(201).json({
     message:"voici ce  que vous voules",
     data:{
        etudiant : etudiant_update
     }
    })
})