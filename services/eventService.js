import firebase from 'firebase';

window = undefined;
const eventService = {
  async getPublicEvents(latitude, longitude, distance) {
    const lat = 0.0144927536231884;
    const long = 0.0181818181818182;

    const lowerLat = latitude - (lat * distance);
    const lowerLong = longitude - (long * distance);

    const greaterLat = latitude + (lat * distance);
    const greaterLong = longitude + (long * distance);

    const lesserGeopoint = new firebase.firestore.GeoPoint(lowerLat, lowerLong);
    const greaterGeopoint = new firebase.firestore.GeoPoint(greaterLat, greaterLong);

    const events = [];

    const querySnapshot = await firebase
      .firestore()
      .collection('events')
      .where('location', '>', lesserGeopoint)
      .where('location', '<', greaterGeopoint)
      .get();


    querySnapshot.forEach(eventSnapshot => {
      console.log('eventService.js: ', eventSnapshot.data());
      events.push(eventSnapshot.data());
    });

    return events;
  },
  createEvent(eventData) {
    firebase
      .firestore()
      .collection('events')
      .add();
  }
};

export default eventService;
