import { useState, useEffect } from 'react';
import { locationService } from '../services/locationService';
import { LocationObject } from 'expo-location';

export const useLocation = () => {
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [permissionGranted, setPermissionGranted] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  const checkPermissionAndLocation = async () => {
    try {
      const hasPermission = await locationService.checkPermissions();
      setPermissionGranted(hasPermission);
      
      if (hasPermission) {
        const currentLocation = await locationService.getCurrentLocation();
        setLocation(currentLocation);
      }
    } catch (error) {
      setErrorMsg('Error fetching location');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const requestPermission = async () => {
    try {
      const granted = await locationService.requestPermissions();
      setPermissionGranted(granted);
      if (granted) {
        const currentLocation = await locationService.getCurrentLocation();
        setLocation(currentLocation);
        setErrorMsg(null);
      } else {
        setErrorMsg('Permission to access location was denied');
      }
    } catch (error) {
      setErrorMsg('Error requesting permission');
      console.error(error);
    }
  };

  useEffect(() => {
    checkPermissionAndLocation();
  }, []);

  return {
    location,
    errorMsg,
    permissionGranted,
    loading,
    requestPermission,
  };
};
