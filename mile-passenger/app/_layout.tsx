import { Stack } from 'expo-router';
import 'react-native-reanimated';
import '../global.css';
import { useEffect } from 'react';
import { 
  useFonts, 
  Inter_400Regular, 
  Inter_500Medium,
  Inter_600SemiBold, 
  Inter_700Bold 
} from '@expo-google-fonts/inter';
import { Feather, Ionicons } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';
import { Text } from 'react-native';

SplashScreen.preventAutoHideAsync();
let defaultsApplied = false;

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    ...Feather.font,
    ...Ionicons.font,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  if (!defaultsApplied) {
    Text.defaultProps = Text.defaultProps ?? {};
    Text.defaultProps.style = [{ fontFamily: 'Inter_400Regular' }, Text.defaultProps.style];
    defaultsApplied = true;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(app)" />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
