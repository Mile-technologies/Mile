import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const router = useRouter();
  return (
    <View className="flex-1 justify-center items-center">
      <Text>Driver Profile</Text>
      <Button title="Logout" onPress={() => router.replace('/(auth)/login')} />
    </View>
  );
}
