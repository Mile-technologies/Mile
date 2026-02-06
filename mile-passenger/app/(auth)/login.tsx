import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { GoogleLogo } from 'phosphor-react-native';
import { MotiView } from 'moti';

export default function LoginScreen() {
  const router = useRouter();

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
        <Pressable style={styles.googleButton} onPress={() => router.push('/(auth)/register')}>
          <View style={styles.googleButtonContent}>
            <GoogleLogo size={18} color="#1E293B" weight="bold" />
            <Text style={styles.googleButtonText}>Continue with Google</Text>
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
    fontWeight: '600',
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
    fontWeight: '600',
    fontFamily: 'Inter_600SemiBold',
  },
  googleButton: {
    backgroundColor: '#F8DFA6',
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 16,
  },
  googleButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  googleButtonText: {
    color: '#1E293B',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter_600SemiBold',
  },
  secondaryButton: {
    backgroundColor: '#F8DFA6',
    borderRadius: 999,
    paddingVertical: 16,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#1E293B',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter_600SemiBold',
  },
});
