import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { IntroVideo } from '../src/components/mile/IntroVideo';

export default function MileLaunchScreen() {
  const router = useRouter();

  const handleFinish = () => {
    router.replace('/(auth)/terms');
  };

  return (
    <View style={styles.container}>
      <IntroVideo onFinish={handleFinish} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C2335',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
