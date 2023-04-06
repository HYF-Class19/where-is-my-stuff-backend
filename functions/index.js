/* eslint-disable indent */
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

exports.sendNotification = functions.firestore
  .document("messages/{messageId}")
  .onCreate((snap, context) => {
    const message = snap.data();
    const payload = {
      notification: {
        title: message.name,
        body: message.message,
        sound: "default",
      },
    };
    return admin.messaging().sendToTopic("chat", payload);
  });

exports.addUserToTopic = functions.firestore
  .document("users/{userId}")
  .onCreate((snap, context) => {
    const user = snap.data();
    return admin.messaging().subscribeToTopic(user.token, "chat");
  });

exports.removeUserFromTopic = functions.firestore
    .document("users/{userId}")
    .onDelete((snap, context) => {
        const user = snap.data();
        return admin.messaging().unsubscribeFromTopic(user.token, "chat");
    });

// // Create and Deploy Your First Cloud Functions

// // https://firebase.google.com/docs/functions/write-firebase-functions

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
