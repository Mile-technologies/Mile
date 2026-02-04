import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-xl font-bold mb-4">Login Screen</Text>
      <Button title="Go to Register" onPress={() => router.push('/(auth)/register')} />
      <View className="mt-4">
        <Button title="Login (Go to Home)" onPress={() => router.replace('/(app)/home')} />
      </View>
    </View>
  );
}
