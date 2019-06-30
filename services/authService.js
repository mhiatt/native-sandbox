import firebase from 'firebase';
//import 'firebase/firestore';

import { AsyncStorage } from 'react-native';
import { Google } from 'expo';

window = undefined; // temp workaround for https://github.com/firebase/firebase-js-sdk/issues/1824
const authService = {
  isUserEqual: (signedInUser, firebaseUser) => {
    if (firebaseUser) {
      const providerData = firebaseUser.providerData;

      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === signedInUser.user.id
        ) {
          // don't need to reauth the firebase connection
          return true;
        }
      }
    }

    return false;
  },
  async signOut() {
    await AsyncStorage.removeItem('userToken');
  },
  async googleSignIn() {
    try {
      const result = await Google.logInAsync({
        behavior: 'web',
        androidClientId: '667748137982-iojmftn7mdojoldr9ifog2hb0i4mmrk8.apps.googleusercontent.com'
      });
      // TODO: need to instead of return store in variable and handle response
      // Then call onSignIn with the new google user, calling param signedInUser
      // because of future use of FaceBook sign in.
      // https://github.com/nathvarun/Expo-Google-Login-Firebase/blob/master/screens/LoginScreen.js
      // good reference for this process

      if (result.type === 'success') {
        // console.log(result);
        this.onSignin(result);

        return result;
      }
    } catch (e) {
      console.log('error: ', e);
    }
  },
  getCurrentUser() {
    return firebase.auth().currentUser;
  },
  async onSignin(signedInUser) {
    const unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
      unsubscribe();

      if (!this.isUserEqual(signedInUser, firebaseUser)) {
        const credential = firebase.auth.GoogleAuthProvider.credential(
          signedInUser.idToken,
          signedInUser.accessToken
        );

        firebase
          .auth()
          .signInAndRetrieveDataWithCredential(credential)
          .then((result) => {
            // console.log('User signed in');

            if (result.additionalUserInfo.isNewUser) {
              // First time user set their data in firebase
              // console.log(result);
              firebase
                .firestore()
                .collection('users')
                .doc(result.user.uid) // Might need to use a different id --> when deleting out of firebase auth then signing in again it creates a duplicate user --> maybe use google user id (signedInUser.user.id)
                .set({
                  firstName: signedInUser.user.givenName,
                  lastName: signedInUser.user.familyName,
                  lastLoggedIn: Date.now()
                })
                .then((snapshot) => {
                  // console.log('New User Snapshot', snapshot);
                  return snapshot;
                })
            } else {
              firebase
                .database()
                .ref(`/users/${result.user.id}`)
                .update({
                  lastLoggedIn: Date.now() // This needs to be added to the users table
                })
                .then((snapshot) => {
                  // console.log('Not a new users updated lastLoggedIn', snapshot);
                });
            }
          })
          .catch((error) => {
            // console.log('Error with signInAndRetrieveDataWithCredential', error);
          });
      } else {
        // console.log('User is already signed-in to Firebase.');
        firebase
          .firestore()
          .collection('users')
          .doc(result.user.uid)
          .get()
          .then((document) => {
            if (document.exists) {
              return document;
            }
          });
      }
    }); // might have to bind inner function to this .bind(this)
  }
};

export default authService;
