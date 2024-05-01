const jwt = require("jsonwebtoken");
const db = require("../firebase/firebase_connect");
const bcrypt = require("bcrypt");
const otplib = require("otplib");
const { v4: uuidv4 } = require("uuid");
const nodemailer = require("nodemailer");
const { authenticator, totp, hotp } = require("otplib");
const SendOtp = async (req, res) => {
  const querySnapshot = await db
    .collection("User")
    .where("email", "==", req?.body?.email)
    .get();
  authenticator.options = { digits: 4 };
  totp.options = { digits: 4 };
  hotp.options = { digits: 4 };

  // Generate a secret
  const secret = authenticator.generateSecret();

  // Generate a 4-digit OTP
  const otp = authenticator.generate(secret);
  const userData = querySnapshot?.docs[0]?.data();
  if (userData && userData.otpvarified == true) {
    res.status(409).json({ message: "email already exist" });
  } else if (userData && userData.otpvarified == false) {
    let transporter = nodemailer.createTransport({
      service: "gmail",

      // true for 465, false for other ports
      auth: {
        user: "pulse.messenger.io@gmail.com",
        pass: "mrmylndgjjvyttvf",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    console.log(req.body);

    console.log(otp);
    console.log(otp);
    const user = req.body.email.toString();
    let info = await transporter.sendMail({
      from: "pulse.messenger.io@gmail.com",
      to: user,
      subject: "Pulse",
      text: `Your one time password is ${otp}`,
    });

    const userDoc = querySnapshot.docs[0].ref;
    const randomUUID = uuidv4();
    // Update the OTP field
    await userDoc.update({
      username: req.body.username,
      email: req.body.email,
      otp: parseInt(otp),
      otpvarified: false,
      completedweeks: 0,
      id: randomUUID,
      initialize: false,
      totalTask: false,
    });
    res.status(200).json({ message: "otp send" });
  } else {
    let transporter = nodemailer.createTransport({
      service: "gmail",

      // true for 465, false for other ports
      auth: {
        user: "pulse.messenger.io@gmail.com",
        pass: "mrmylndgjjvyttvf",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    console.log(req.body);

    console.log(otp);
    console.log(otp);
    const user = req.body.email.toString();
    let info = await transporter.sendMail({
      from: "pulse.messenger.io@gmail.com",
      to: user,
      subject: "Task Mater",
      text: `Your one time password is ${otp}`,
    });

    const HashedPassword = await bcrypt.hash(req.body.password, 10);
    console.log(req.body);
    const randomUUID = uuidv4();

    await db.collection("test").add({ f1: "ijfwife" });

    await db.collection("User").add({
      username: req.body.username,
      email: req.body.email,
      otp: parseInt(otp),
      otpvarified: false,
      password: HashedPassword,
      completedweeks: 0,
      id: randomUUID,
      initialize: false,
      totalTask: false,
    });

    res.status(200).json({ message: "otp sended" });
  }
};

// const RegisterUser = async (req, res) => {
//   console.log("ge09dr8jigesg");

//   await db.collection("test").add({
//     f1: "samb",
//     f2: "22",
//   });

//   res.json(true);
// };

const OTPVarify = async (req, res) => {
  console.log(req.body);

  const querySnapshot = await db
    .collection("User")
    .where("email", "==", req?.body?.email)
    .get();
  const userData = querySnapshot?.docs[0]?.data();
  if (userData?.otp == req.body.otp) {
    const userDoc = querySnapshot.docs[0].ref;
    await userDoc.update({
      otpvarified: true,
    });

    res.status(200).json({ message: "register Success" });
  } else {
    res.status(400).json({ message: "wrong otp" });
  }
};

const GoogleAuth = async (req, res) => {
  console.log(req.body);
  console.log("fswoighfserg");

  const querySnapshot = await db
    .collection("User")
    .where("email", "==", req?.body?.email)
    .get();
  console.log(querySnapshot, "snap");
  const userData = querySnapshot?.docs[0]?.data();

  if (userData) {
    const AccessToken = jwt.sign(userData, process.env.accessToken);
    return res.status(200).json({ AccessToken });
  } else {
    console.log("working");
    const randomUUID = uuidv4();
    const dataToAdd = {
      username: req.body.name,
      email: req.body.email,
      otp: 1111,
      otpvarified: true,
      password: "1234567",
      completedweeks: 0,
      id: randomUUID,
      initialize: false,
      totalTask: false,
    };

    // Add data to Firestore
    const docRef = await db.collection("User").add(dataToAdd);

    // Get the newly added document by its ID
    const docSnapshot = await docRef.get();

    // Get the document data
    const userData = docSnapshot.data();

    const AccessToken = jwt.sign(userData, process.env.accessToken);
    return res.status(200).json({ AccessToken });
  }
};
module.exports = { SendOtp, OTPVarify, GoogleAuth };
