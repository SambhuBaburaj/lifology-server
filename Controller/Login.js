
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken')
const db = require("../firebase/firebase_connect");

const loginHelper=async (req,res)=>
{
console.log(req.body);

const querySnapshot = await db
.collection("User")
.where("email", "==", req?.body?.email)
.get();
console.log(querySnapshot);
const userDoc = querySnapshot.docs[0].ref
console.log(userDoc._path,"this is path");
const userData = querySnapshot?.docs[0]?.data();
console.log(userData);
if(userData){
  bcrypt.compare(req.body.password, userData.password).then(function(result) {
    console.log(result);
    // result == true
    console.log("login success");
    if(result){
    console.log("login success");

     const AccessToken= jwt.sign(userData,process.env.accessToken)
     return res.status(200).json({AccessToken})


    }
    else{
  res.status(401).json({message:"unauthorized"})

    }
  }).catch((err)=>{
  res.status(401).json({message:"unauthorized"})

  })
}else{
  res.status(401).json({message:"unauthorized"})
}


}
const Validater=(req,res)=>
{

}


module.exports={loginHelper,Validater}