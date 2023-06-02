const express = require("express");
const router = express.Router();
const urlModel = require('../model/urlModel')
const {createUrl,getUrl} = require('../controller/urlContoller')



router.post("/url/shorten", createUrl );
router.get("/:urlCode", getUrl )

module.exports = router;

