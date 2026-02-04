import { Redirect } from 'expo-router';

export default function Index() {
  // TODO: Check driver auth state
  return <Redirect href="/(auth)/login" />;
}
