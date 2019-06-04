import firebase from 'firebase';

import { AsyncStorage } from 'react-native';
import { Google } from 'expo';


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
  signOut: async () => {
    await AsyncStorage.removeItem('userToken');
  },
  googleSignIn: async () => {
    try {
      return await Google.logInAsync({
        clientId: '298863796991-tu9r4ov0kpklji5b02agtoc07mds26dl.apps.googleusercontent.com'
      });

      // TODO: need to instead of return store in variable and handle response
      // Then call onSignIn with the new google user, calling param signedInUser
      // because of future use of FaceBook sign in.
      // https://github.com/nathvarun/Expo-Google-Login-Firebase/blob/master/screens/LoginScreen.js
      // good reference for this process
    } catch (e) {
      console.log('error: ', e);
    }
  },
  onSignin: async (signedInUser) => {
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
            console.log('User signed in');
            if (result.additionalUserInfo.isNewUser) {
              // First time user set their data in firebase
              firebase
                .database()
                .ref(`/users/${result.user.uid}`)
                .set({

                })
                .then((snapshot) => {
                  console.log('New User Snapshot', snapshot);
                })
            } else {
              firebase
                .database()
                .ref(`/users/${result.user.uid}`)
                .update({
                  lastLoggedIn: Date.now() // This needs to be added to the users table
                });
            }
          })
          .catch((error) => {
            console.log('Error with signInAndRetrieveDataWithCredential', error);
          });
      } else {
        console.log('User is already signed-in to Firebase.');
      }
    }); // might have to bind inner function to this .bind(this)
  }
};

export default authService;
