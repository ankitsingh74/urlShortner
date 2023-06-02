const urlModel = require('../model/urlModel')
const {customAlphabet}= require("nanoid")
const validator = require("validator")


 const createUrl = async (req,res) => {
   try {
//       let data = req.body
//       console.log(Object.keys(data).length);
//       if(Object.keys(data).length==0) return res.status(400).send({status:false, message:"seems like your request is empty, please add your longUrl to your request"})
//       if(Object.keys(data).length!=1) return res.status(400).send({status:false, message:"please provide only one field"})
//  if(data.longUrl.length==0) return res.status(400).send({status:false, message:"please provide a longUrl to your request"})
   
//       let findLongUrl = await urlModel.findOne({longUrl:data.longUrl})
//       if(findLongUrl) return res.status(400).send({status:false, message:"Url already exists"})
//       let shortId= customAlphabet(data.longUrl,10)
//       // console.log(shortId()) //depricated
//       let code= shortId() 
//       let shortUrl=`http:localhost:3000/${code}` 
//       req.body.shortUrl=shortUrl 
//       req.body.urlCode=code;
    
//       let result= await urlModel.create(req.body)
  
//       res.send({status:true,data:result}) 

   const longUrl = req.body.longUrl
   if(Object.keys(req.body).length!=1) return res.status(400).send({status:false,message:"please provide a mandatory field"})
   if(!longUrl) return res.status(400).send({status:false,message:"longUrl is required"})

   if(!validator.isURL(longUrl)) return res.status(400).send({status:false,message:"longUrl is invalid"})
   const data = await urlModel.findOne({longUrl:longUrl})
   if(data){
       return res.status(200).send({status:true,data:data})
   }else if(!data){
      const alphanumeric = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      const shortId = customAlphabet(alphanumeric,10);
      const code = shortId();
      const shortUrl = `http:localhost:3000/${code}`;
      req.body.shortUrl=shortUrl;
      req.body.urlCode=code;
      const newUrlData = await urlModel.create(req.body)
      return res.status(201).send({status:true,data:newUrlData})
   }
   } catch (error) {
      if (error.message.includes("undefined")){
         res.status(400).send({status:false, message:"please provide only field name longUrl"})
      }
      // if(error.message.includes("validation")) return res.status(400).send({status:false, message:"longUrl is invalid"})
      res.status(500).send({status:false, message:error.message})
   }

 } 

 const getUrl = async (req,res) => {
    let urlcode= req.params.urlCode        //taking shortUrl into prams
 
    let url= await urlModel.findOne({urlCode:urlcode})
    if(!url) return res.status(404).send({status:false, message:"longUrl not found for given shortUrl"})

    res.status(302).redirect(url.longUrl)
   //  res.send({data:url})
 
 

 }
 

module.exports = {createUrl,getUrl}