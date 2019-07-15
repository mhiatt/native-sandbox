import firebase from 'firebase';

window = undefined;

const eventAttendeeService = {
  async requestEventPermission(userId, eventId) {
    const updateObj = {};

    updateObj[`users.${userId}`] = 0;

    updateObj
    const docRef = await firebase
      .firestore()
      .collection('eventAttendees')
      .doc(eventId)
      .update(updateObj);

    console.log('eventService.js 71:', docRef);
  },
  async getEventAttendeeByEventId(eventId) {
    const docRef = await firebase
      .firestore()
      .collection('eventAttendees')
      .doc(eventId)
      .get();

    if (docRef.exist) {
      return docRef.data();
    } else {
      throw new Error();
    }
  }
};

export default eventAttendeeService;
