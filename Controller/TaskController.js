const db = require("../firebase/firebase_connect");
const firebase = require("firebase-admin");

const GetWeeklyTask = async (req, res) => {
  console.log("here it is");

  const userId = req.LoggeDInUser.id;
  const Week = req.LoggeDInUser.completedweeks;
  let documentsWithWeekOne = [];
  const querySnapshot1 = await db
    .collection("User")
    .where("id", "==", userId)
    .get();

  const userData = querySnapshot1?.docs[0]?.data();
  await db
    .collection("weeklytasks")
    .where("week", "==", userData.completedweeks)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const documentData = {
          id: doc.id,
          data: doc.data(),
        };

        documentsWithWeekOne.push(documentData);
      });

      console.log("Documents with week 1:", documentsWithWeekOne);
      res.status(200).json(documentsWithWeekOne);
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
  // console.log(querySnapshot,"snap");
  // const userData = querySnapshot?.docs[0]?.data();
  console.log("im here");

  // console.log(userData);
};

const completedTasks = (req, res) => {
  const userId = req.LoggeDInUser.id;
  const Week = req.LoggeDInUser.completedweeks;
};
const TaskFinished = async (req, res) => {
  try {
    const userId = req.LoggeDInUser.id;

    const querySnapshot1 = await db
      .collection("User")
      .where("id", "==", userId)
      .get();
    const userDoc = querySnapshot1.docs[0].ref;
    const userData = querySnapshot1?.docs[0]?.data();
    console.log(userData);
    console.log(req.body);
    let documentsWithWeekOne = [];
    let completedtask = await db
      .collection("completedTasks")
      .where("week", "==", userData.completedweeks)
      .where("user", "==", userId)
      .get()
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
    const taskscompleted = completedtask?.docs[0]?.data();

    console.log(taskscompleted, "this is workign");
    if (taskscompleted) {
      await completedtask.docs[0].ref.update({
        taskdone: [...taskscompleted?.taskdone, req.body.id],
      });

      const unsubscribe = completedtask.docs[0].ref.onSnapshot(
        async (snapshot) => {
          const updatedData = snapshot.data();
          console.log(updatedData, "data");
          if (!updatedData.processed && updatedData.taskdone.length >= 4) {
            // Set the flag to true to avoid reprocessing
            await completedtask.docs[0].ref.update({ processed: true });
            // Update other documents
            // await userDoc.update({
            //   completedweeks: userData.completedweeks + 1,
            // });
            await completedtask.docs[0].ref.update({
              taskFinishedTime: firebase.firestore.FieldValue.serverTimestamp(),
            });
            console.log("finished");

            // Unsubscribe from further snapshot updates
            unsubscribe();
          }
        }
      );
      res.json(true);
    } else {
      // console.log("else working");
      // const dataToAdd = {
      //   week: userData.completedweeks,
      //   taskdone: [req.body.id],
      //   taskbegan: firebase.firestore.FieldValue.serverTimestamp(),
      //   user: userId,
      //   taskFinishedTime: "",
      // };

      // await db
      //   .collection("completedTasks")
      //   .add(dataToAdd)
      //   .then((Data) => {
      //     console.log("else working", Data);
      //     res.json(true);

      //     // res.status(200).json({ message: "task completed" });
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    }
  } catch (error) {
    console.log(error);
  }
};

const UserFinishedTask = async (req, res) => {
  try {
    const userId = req.LoggeDInUser.id;
    const Week = req.LoggeDInUser.completedweeks;

    const querySnapshot1 = await db
      .collection("User")
      .where("id", "==", userId)
      .get();
    const userData = querySnapshot1?.docs[0]?.data();

    const comptedTasks = await db
      .collection("completedTasks")
      .where("week", "==", userData.completedweeks)
      .where("user", "==", userId)
      .get();
    const taskhistory = comptedTasks?.docs[0]?.data();
    console.log(taskhistory);
    res.status(200).json(taskhistory);
  } catch (error) {
    console.log(error);
  }
};
const getUser=async (req,res)=>{
  console.log("checking data");
const userId=req.LoggeDInUser.id
console.log(userId);
  const querySnapshot1 = await db
  .collection("User")
  .where("id", "==", userId)
  .get();
  const userData = querySnapshot1?.docs[0]?.data();
console.log(userData,"dat is here");
  res.status(200).json(userData)

}
const TimeUpdate=async (req,res)=>
{
  const userId = req.LoggeDInUser.id;

  const querySnapshot1 = await db
    .collection("User")
    .where("id", "==", userId)
    .get();


  const userData = querySnapshot1?.docs[0]?.data();



  const userDoc = querySnapshot1.docs[0].ref;
   await userDoc.update({
              completedweeks: userData.completedweeks + 1,
            }).then(async(data)=>
          {

            await userDoc.update({
              initialize:true
            });
          console.log(userData.completedweeks);
          if(userData.completedweeks>=2){
            await userDoc.update({
              totalTask:true
            });

              res.json(true);

          }
          else{
            const dataToAdd = {
              week: userData.completedweeks+1,
              taskdone: [],
              taskbegan: firebase.firestore.FieldValue.serverTimestamp(),
              user: userId,
              taskFinishedTime: "",
            };
            await db
            .collection("completedTasks")
            .add(dataToAdd)
            .then((Data) => {
              console.log("else working", Data);
              res.json(true);

              // res.status(200).json({ message: "task completed" });
            })


          }


          })





}



module.exports = {
  GetWeeklyTask,
  completedTasks,
  TaskFinished,
  UserFinishedTask,
  getUser,
  TimeUpdate
};
