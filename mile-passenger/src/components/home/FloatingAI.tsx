import { Pressable, StyleSheet } from 'react-native';
import { MotiView } from 'moti';
import { Brain } from 'phosphor-react-native';
import { useRouter } from 'expo-router';

export const FloatingAI = () => {
  const router = useRouter();

  const onPress = () => {
    router.push({
      pathname: '/(app)/book-ride',
      params: { serviceType: 'ai' },
    });
  };

  // Position it just above the tab bar.
  // The screen typically ends above the tab bar, so we just need a small margin.
  const bottomOffset = 16;

  return (
    <MotiView
      from={{ translateY: 0, opacity: 0.9 }}
      animate={{ translateY: -8, opacity: 1 }}
      transition={{ type: 'timing', duration: 1500, loop: true, repeatReverse: true }}
      style={[styles.container, { bottom: bottomOffset }]}
    >
      <Pressable onPress={onPress} style={styles.button} android_ripple={{ color: '#1E293B' }}>
        <Brain size={28} color="#F8DFA6" weight="fill" />
      </Pressable>
    </MotiView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 24,
    zIndex: 20,
  },
  button: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#0D1522',
    borderWidth: 1,
    borderColor: '#F8DFA6',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
});
