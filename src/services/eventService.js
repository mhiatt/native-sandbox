import firebase from 'firebase';

window = undefined;
const eventService = {
  async getEvents(latitude, longitude, distance) {
    const lat = 0.0144927536231884;
    const long = 0.0181818181818182;

    const lowerLat = latitude - (lat * distance);
    const lowerLong = longitude - (long * distance);

    const greaterLat = latitude + (lat * distance);
    const greaterLong = longitude + (long * distance);

    const lesserGeopoint = new firebase.firestore.GeoPoint(lowerLat, lowerLong);
    const greaterGeopoint = new firebase.firestore.GeoPoint(greaterLat, greaterLong);

    const publicEvents = [];
    const privateEvents = [];

    const querySnapshot = await firebase
      .firestore()
      .collection('events')
      .where('location', '>', lesserGeopoint)
      .where('location', '<', greaterGeopoint)
      .get();


    querySnapshot.forEach(eventSnapshot => {
      let event = eventSnapshot.data();
      event.id = eventSnapshot.id;

      if (event.private) {
        privateEvents.push(event);
      } else {
        publicEvents.push(event);
      }
    });

    return { public: publicEvents, private: privateEvents };
  },
  async createEvent(eventData) {
    const event = {
      name: eventData.name,
      description: eventData.description,
      location: new firebase.firestore.GeoPoint(
        eventData.location.latitude,
        eventData.location.longitude
      ),
      private: eventData.private
    };

    const docRef = await firebase
      .firestore()
      .collection('events')
      .add(event);

    event.id = docRef.id;

    return event;
  }
};

export default eventService;
