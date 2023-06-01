const urlModel = require('../model/urlModel')
const { customAlphabet } = require('nanoid'); 
// const {customAlphabet}= require("nanoid")
// const shortid = require("shortid")


 const createUrl = async (req,res) => {
    let data = req.body.longUrl
    let shortId= customAlphabet(data,10)
    console.log(shortId())
    let code= shortId()
    let shortUrl=`https:localhost:3000/${code}`
    req.body.shortUrl=shortUrl
    req.body.urlCode=code;
    let result= await urlModel.create(req.body)

    res.send({status:true,data:result})
 }

 const getUrl = async (req,res) => {
    let urlcode= req.params.urlCode
    let url= await urlModel.findOne({urlCode:urlcode})
    res.send({data:url})
    // res.redirect(url.longUrl);

 }


module.exports = {createUrl,getUrl}