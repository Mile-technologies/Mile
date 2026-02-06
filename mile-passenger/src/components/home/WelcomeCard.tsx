import { View, Text, StyleSheet, Pressable } from 'react-native';

interface WelcomeCardProps {
  name?: string;
}

export const WelcomeCard = ({ name = "Aashard" }: WelcomeCardProps) => {
  return (
    <View style={styles.welcomeCard}>
      <View style={styles.welcomeContent}>
        <Text style={styles.welcomeTitle}>Welcome {name}</Text>
        <Text style={styles.welcomeText}>
          Take your first ride. Rides are usually between US$ 16-US$ 40 in San Francisco Bay Area.
        </Text>
        <View style={styles.welcomeActions}>
          <Pressable style={styles.pillButton}>
            <Text style={styles.pillText}>FAQs</Text>
          </Pressable>
          <Pressable style={styles.pillButton}>
            <Text style={styles.pillText}>Safety features</Text>
          </Pressable>
        </View>
      </View>
      {/* Illustration placeholder - could use an icon or leave empty for now */}
    </View>
  );
};

const styles = StyleSheet.create({
  welcomeCard: {
    backgroundColor: '#0D1522',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#F8DFA6',
  },
  welcomeContent: {
    gap: 12,
  },
  welcomeTitle: {
    fontSize: 22,
    color: '#F8DFA6',
    fontFamily: 'Inter_700Bold',
  },
  welcomeText: {
    fontSize: 15,
    color: '#F8DFA6',
    lineHeight: 22,
    fontFamily: 'Inter_400Regular',
    marginBottom: 8,
  },
  welcomeActions: {
    flexDirection: 'row',
    gap: 12,
  },
  pillButton: {
    backgroundColor: '#0D1522',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#F8DFA6',
  },
  pillText: {
    color: '#F8DFA6',
    fontSize: 13,
    fontFamily: 'Inter_600SemiBold',
  },
});
