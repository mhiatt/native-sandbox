const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

 exports.useLocale = functions.https.onCall((data, context) => {

   var corx = data.corx;
   var cory = data.cory;

   return {
     corx: corx,
     cory: cory,
     corz: corx + " - " + cory
   }
 });
