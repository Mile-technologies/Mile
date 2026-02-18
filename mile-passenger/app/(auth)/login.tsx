import { View, Text, Pressable, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { GoogleLogo } from 'phosphor-react-native';
import { MotiView } from 'moti';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { useEffect, useState } from 'react';
import { useAuthStore } from '../../src/store/authStore';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const router = useRouter();
  const { login, setAuthMethod, setUserInfo } = useAuthStore();
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // You need to replace these with your actual Client IDs from Google Cloud Console
  // See: https://docs.expo.dev/guides/google-authentication/
  const [request, response, promptAsync] = Google.useAuthRequest({
    // expoClientId: 'YOUR_EXPO_CLIENT_ID',
    // iosClientId: 'YOUR_IOS_CLIENT_ID',
    // androidClientId: 'YOUR_ANDROID_CLIENT_ID',
    // webClientId: 'YOUR_WEB_CLIENT_ID',
    // For demo purposes, we'll simulate the flow if IDs aren't set, 
    // but in a real app, promptAsync() handles the redirect.
    // If you are testing in Expo Go, you might need a webClientId.
  });

  useEffect(() => {
    handleGoogleSignIn();
  }, [response]);

  const handleGoogleSignIn = async () => {
    if (response?.type === 'success') {
      setIsGoogleLoading(true);
      const { authentication } = response;
      
      try {
        const userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
          headers: { Authorization: `Bearer ${authentication?.accessToken}` },
        });
        
        const user = await userInfoResponse.json();
        
        // Update store with Google user info
        setUserInfo({
          name: user.name,
          email: user.email,
          picture: user.picture,
          id: user.id
        });
        
        setAuthMethod('google');
        login({
          name: user.name,
          email: user.email,
          picture: user.picture
        });

        // Navigate to home
        router.replace('/(app)/home');
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Failed to fetch user data from Google');
      } finally {
        setIsGoogleLoading(false);
      }
    } else if (response?.type === 'error') {
      Alert.alert('Error', 'Google Sign-In failed');
      setIsGoogleLoading(false);
    }
  };

  const onGoogleButtonPress = async () => {
    setIsGoogleLoading(true);
    // In a real scenario with valid IDs:
    if (request) {
      await promptAsync();
    } else {
      // Fallback/Simulation for demo without keys
      // Remove this block when you add actual keys
      Alert.alert(
        'Configuration Required',
        'To use Google Sign-In, you need to add your Google Client IDs in login.tsx. For now, we will simulate a successful login.',
        [
          {
            text: 'Simulate Login',
            onPress: () => {
               setUserInfo({
                name: 'Google User',
                email: 'user@gmail.com',
                picture: 'https://lh3.googleusercontent.com/a/default-user=s96-c',
              });
              setAuthMethod('google');
              login({
                 name: 'Google User',
                 email: 'user@gmail.com'
              });
              router.replace('/(app)/home');
            }
          },
          {
            text: 'Cancel',
            style: 'cancel',
            onPress: () => setIsGoogleLoading(false)
          }
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
      <MotiView
        style={styles.content}
        from={{ opacity: 0, translateY: 12 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 450 }}>
        <Text style={styles.title}>Move smarter with Mile</Text>
        <Text style={styles.subtitle}>
          Book rides in seconds, track your driver, and arrive on time.
        </Text>
      </MotiView>
      <MotiView
        style={styles.actions}
        from={{ opacity: 0, translateY: 10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 450, delay: 160 }}>
        <Pressable
          style={styles.primaryButton}
          onPress={() => router.push('/(auth)/register')}>
          <Text style={styles.primaryButtonText}>Create account</Text>
        </Pressable>
        
        <Pressable 
          style={[styles.googleButton, isGoogleLoading && styles.buttonDisabled]} 
          onPress={onGoogleButtonPress}
          disabled={isGoogleLoading}
        >
          <View style={styles.googleButtonContent}>
            {isGoogleLoading ? (
              <ActivityIndicator color="#1E293B" size="small" />
            ) : (
              <GoogleLogo size={18} color="#1E293B" weight="bold" />
            )}
            <Text style={styles.googleButtonText}>
              {isGoogleLoading ? 'Connecting...' : 'Continue with Google'}
            </Text>
          </View>
        </Pressable>

        <Pressable
          style={styles.secondaryButton}
          onPress={() => router.replace('/(app)/home')}>
          <Text style={styles.secondaryButtonText}>Sign in</Text>
        </Pressable>
      </MotiView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E293B',
    paddingHorizontal: 24,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    color: '#F8DFA6',
    marginBottom: 12,
    fontFamily: 'Inter_600SemiBold',
  },
  subtitle: {
    fontSize: 16,
    color: '#F8DFA6',
    lineHeight: 24,
    maxWidth: 280,
    fontFamily: 'Inter_400Regular',
  },
  actions: {
    paddingBottom: 40,
  },
  primaryButton: {
    backgroundColor: '#F8DFA6',
    borderRadius: 999,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  primaryButtonText: {
    color: '#1E293B',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  googleButton: {
    backgroundColor: '#F8DFA6',
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonDisabled: {
    opacity: 0.8,
  },
  googleButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  googleButtonText: {
    color: '#1E293B',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  secondaryButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#F8DFA6',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
});
