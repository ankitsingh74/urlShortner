const urlModel = require('../model/urlModel')
const {customAlphabet}= require("nanoid")
const validator = require("validator")
const {SET_ASYNC, GET_ASYNC} = require("../redis/redis")


 const createUrl = async (req,res) => {
   try { 

   const {longUrl} = req.body
   if(Object.keys(req.body).length!=1) return res.status(400).send({status:false,message:"please provide a mandatory field"})
   if(!longUrl) return res.status(400).send({status:false,message:"longUrl is required"})

   if(!validator.isURL(longUrl)) return res.status(400).send({status:false,message:"longUrl is invalid"})
   //using getex redis
  const redisSearch = await GET_ASYNC(`${longUrl}`)
  if(redisSearch) {
   return res.status(200).send({status: true, msg: JSON.parse(redisSearch)})}
   const data = await urlModel.findOne({longUrl:longUrl})
      //using setex redis
        await SET_ASYNC(`${longUrl}`, JSON.stringify(data))
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
      //using setex redis
      await SET_ASYNC(`${longUrl}`, JSON.stringify(newUrlData))
      return res.status(201).send({status:true,data:newUrlData})
   }
   } catch (error) {
    
      res.status(500).send({status:false, message:error.message})
   }

 } 

 const getUrl = async (req,res) => {
    let urlCode= req.params.urlCode        //taking shortUrl into prams
    if(!urlCode) return res.status(400).send({status: false, msg: "please provide urlCode"})

    const redisSearch = await GET_ASYNC(`${urlCode}`)
    console.log(redisSearch);
    const parseUrl = JSON.parse(redisSearch);
    if(parseUrl) { 
        return res.redirect(302,parseUrl.longUrl)
    }
    let url= await urlModel.findOne({urlCode:urlCode})

    if(!url) return res.status(404).send({status:false, message:"longUrl not found for given shortUrl"})
    await SET_ASYNC(`${urlCode}`, JSON.stringify(url))

    res.status(302).redirect(url.longUrl)
  
 
 } 
 

module.exports = {createUrl,getUrl}