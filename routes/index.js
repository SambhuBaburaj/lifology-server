var express = require("express");

const { loginHelper } = require("../Controller/Login");
const {

  SendOtp,
  OTPVarify,
  GoogleAuth,
} = require("../Controller/RegisterUser");
const { GetWeeklyTask, completedTasks, TaskFinished, UserFinishedTask, getUser, TimeUpdate } = require("../Controller/TaskController");
const JWTvarify = require("../Controller/ValidateUser");

// const JWTvarify = require('../Controller/ValidateUser');

var router = express.Router();
/* GET home page. */
// router.post("/userregister", RegisterUser);
router.post("/loginuser", loginHelper);
router.post("/sendotp", SendOtp);
router.post("/varifyotp", OTPVarify);

    router.post("/googleauth", GoogleAuth);
    router.get("/getweeklychallenge",JWTvarify,GetWeeklyTask );
    router.get("/completedchallenges",JWTvarify,completedTasks );

    router.post("/taskfinished",JWTvarify,TaskFinished );
    router.get("/userfinishedtasks",JWTvarify,UserFinishedTask );
    router.get("/getuser",JWTvarify,getUser );
    router.get("/timeupdate",JWTvarify,TimeUpdate );

    module.exports = router;
