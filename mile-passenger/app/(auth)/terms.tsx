import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { MotiView } from 'moti';

export default function TermsScreen() {
  const router = useRouter();
  const [agreed, setAgreed] = useState(false);

  return (
    <View style={styles.container}>
      <MotiView
        style={styles.content}
        from={{ opacity: 0, translateY: 12 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 450 }}>
        <Text style={styles.title}>Accept Mile terms and review privacy note</Text>
        <Text style={styles.subtitle}>
          By selecting I agree below, I have reviewed and agreed to the terms of use and acknowledge the
          privacy notice. I am at least 18 years of age.
        </Text>
      </MotiView>

      <MotiView
        style={styles.agreeRow}
        from={{ opacity: 0, translateY: 8 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 450, delay: 150 }}>
        <Pressable style={[styles.checkbox, agreed && styles.checkboxChecked]} onPress={() => setAgreed(!agreed)}>
          {agreed && <View style={styles.checkboxDot} />}
        </Pressable>
        <Text style={styles.agreeText}>I agree</Text>
      </MotiView>

      <MotiView
        style={styles.footer}
        from={{ opacity: 0, translateY: 8 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 450, delay: 250 }}>
        <Pressable style={styles.navButton} onPress={() => router.back()}>
          <Text style={styles.navText}>←</Text>
        </Pressable>
        <Pressable
          style={[styles.navButton, !agreed && styles.navButtonDisabled]}
          onPress={() => router.replace('/(auth)/security')}
          disabled={!agreed}>
          <Text style={styles.navText}>Next →</Text>
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
    paddingBottom: 26,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 30,
    color: '#F8DFA6',
    marginBottom: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  subtitle: {
    fontSize: 16,
    color: '#F8DFA6',
    lineHeight: 24,
    fontFamily: 'Inter_400Regular',
  },
  agreeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#F8DFA6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: 'rgba(248, 223, 166, 0.2)',
  },
  checkboxDot: {
    width: 10,
    height: 10,
    borderRadius: 3,
    backgroundColor: '#F8DFA6',
  },
  agreeText: {
    fontSize: 16,
    color: '#F8DFA6',
    fontFamily: 'Inter_600SemiBold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navButton: {
    borderWidth: 1,
    borderColor: 'rgba(248, 223, 166, 0.4)',
    borderRadius: 999,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  navButtonDisabled: {
    opacity: 0.4,
  },
  navText: {
    color: '#F8DFA6',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
});
