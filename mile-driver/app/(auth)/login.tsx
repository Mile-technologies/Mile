import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-xl font-bold mb-4">Driver Login</Text>
      <Button title="Login" onPress={() => router.replace('/(app)/dashboard')} />
    </View>
  );
}
