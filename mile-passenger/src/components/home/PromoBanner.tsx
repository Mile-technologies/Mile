import { View, Text, StyleSheet } from 'react-native';

export const PromoBanner = () => {
  return (
    <View style={styles.promoBanner}>
      <Text style={styles.promoTitle}>Securing your safety</Text>
      <View style={styles.promoCircle} />
    </View>
  );
};

const styles = StyleSheet.create({
  promoBanner: {
    backgroundColor: '#0D1522',
    marginHorizontal: 20,
    borderRadius: 16,
    height: 120,
    padding: 20,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#F8DFA6',
  },
  promoTitle: {
    color: '#F8DFA6',
    fontSize: 20,
    maxWidth: '60%',
    fontFamily: 'Inter_700Bold',
  },
  promoCircle: {
    position: 'absolute',
    right: -40,
    bottom: -40,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(248, 223, 166, 0.1)',
  },
});
