import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Phone, FingerprintSimple } from 'phosphor-react-native';
import { MotiView } from 'moti';

type Method = 'phone' | 'passkey';

export default function SecurityScreen() {
  const router = useRouter();
  const [method, setMethod] = useState<Method>('passkey');

  return (
    <View style={styles.container}>
      <MotiView
        style={styles.content}
        from={{ opacity: 0, translateY: 12 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 450 }}>
        <Text style={styles.title}>Keep your account secure</Text>
        <Text style={styles.subtitle}>
          To prevent unauthorized access to your account, choose an authentication method to protect your
          account.
        </Text>

        <MotiView
          from={{ opacity: 0, translateY: 10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 450, delay: 120 }}>
          <Pressable
            style={[styles.card, method === 'phone' ? styles.cardActive : styles.cardInactive]}
            onPress={() => setMethod('phone')}>
            <View style={styles.cardHeader}>
              <View style={styles.cardTitleRow}>
                <Phone size={20} color="#F8DFA6" weight="regular" />
                <Text style={styles.cardTitle}>Phone</Text>
              </View>
              <View style={[styles.radio, method === 'phone' && styles.radioActive]}>
                {method === 'phone' && <View style={styles.radioDot} />}
              </View>
            </View>
            <Text style={styles.cardDescription}>Provide a phone number to use at log in</Text>
            <Text style={styles.cardHint}>Recommended</Text>
          </Pressable>
        </MotiView>

        <MotiView
          from={{ opacity: 0, translateY: 10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 450, delay: 220 }}>
          <Pressable
            style={[styles.card, method === 'passkey' ? styles.cardActiveStrong : styles.cardInactive]}
            onPress={() => setMethod('passkey')}>
            <View style={styles.cardHeader}>
              <View style={styles.cardTitleRow}>
                <FingerprintSimple size={20} color="#F8DFA6" weight="regular" />
                <Text style={styles.cardTitle}>Passkey</Text>
              </View>
              <View style={[styles.radio, method === 'passkey' && styles.radioActive]}>
                {method === 'passkey' && <View style={styles.radioDot} />}
              </View>
            </View>
            <Text style={styles.cardDescription}>
              Passkeys allow you to log in with your face, fingerprint, or device pin
            </Text>
          </Pressable>
        </MotiView>
      </MotiView>

      <MotiView
        style={styles.footer}
        from={{ opacity: 0, translateY: 8 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 450, delay: 300 }}>
        <Pressable style={styles.nextButton} onPress={() => router.replace('/(auth)/login')}>
          <Text style={styles.nextText}>Next →</Text>
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
    paddingTop: 40,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    color: '#F8DFA6',
    marginBottom: 16,
    maxWidth: 280,
    fontFamily: 'Inter_600SemiBold',
  },
  subtitle: {
    fontSize: 16,
    color: '#F8DFA6',
    lineHeight: 24,
    marginBottom: 28,
    maxWidth: 320,
    fontFamily: 'Inter_400Regular',
  },
  card: {
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
  },
  cardInactive: {
    borderWidth: 1,
    borderColor: 'rgba(248, 223, 166, 0.25)',
    backgroundColor: 'rgba(248, 223, 166, 0.06)',
  },
  cardActive: {
    borderWidth: 1,
    borderColor: 'rgba(248, 223, 166, 0.5)',
    backgroundColor: 'rgba(248, 223, 166, 0.08)',
  },
  cardActiveStrong: {
    borderWidth: 2,
    borderColor: '#F8DFA6',
    backgroundColor: 'rgba(248, 223, 166, 0.1)',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#F8DFA6',
    fontFamily: 'Inter_600SemiBold',
  },
  cardDescription: {
    fontSize: 14,
    color: '#F8DFA6',
    lineHeight: 20,
    marginBottom: 8,
    fontFamily: 'Inter_400Regular',
  },
  cardHint: {
    fontSize: 12,
    color: '#F8DFA6',
    fontFamily: 'Inter_400Regular',
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#F8DFA6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioActive: {
    backgroundColor: 'rgba(248, 223, 166, 0.2)',
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#F8DFA6',
  },
  footer: {
    paddingBottom: 26,
    alignItems: 'flex-end',
  },
  nextButton: {
    backgroundColor: '#F8DFA6',
    borderRadius: 28,
    paddingHorizontal: 26,
    paddingVertical: 12,
  },
  nextText: {
    color: '#1E293B',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter_600SemiBold',
  },
});
