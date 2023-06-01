const express = require("express");
const router = express.Router();
const urlModel = require('../model/urlModel')
const {createUrl,getUrl} = require('../controller/urlContoller')



router.get("/url/shorten", createUrl );
router.get("/url/:urlCode", getUrl )

module.exports = router;

