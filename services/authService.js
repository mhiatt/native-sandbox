import { AsyncStorage } from 'react-native';

const authService = {
  signOut: async () => {
    await AsyncStorage.removeItem('userToken');
  }
};

export default authService;
