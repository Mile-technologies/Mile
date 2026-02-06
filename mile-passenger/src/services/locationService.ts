import * as Location from 'expo-location';

export const locationService = {
  requestPermissions: async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    return status === 'granted';
  },

  getCurrentLocation: async () => {
    const { status } = await Location.getForegroundPermissionsAsync();
    if (status !== 'granted') {
      throw new Error('Permission to access location was denied');
    }

    const location = await Location.getCurrentPositionAsync({});
    return location;
  },

  checkPermissions: async () => {
    const { status } = await Location.getForegroundPermissionsAsync();
    return status === 'granted';
  }
};
