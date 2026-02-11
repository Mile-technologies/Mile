import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Gift } from 'phosphor-react-native';

interface WelcomeCardProps {
  name?: string;
}

export const WelcomeCard = ({ name = "Aashard" }: WelcomeCardProps) => {
  return (
    <View style={styles.welcomeCard}>
      <View style={styles.welcomeContent}>
        <Text style={styles.welcomeTitle}>Welcome {name}</Text>
        <Text style={styles.welcomeText}>
          Rides around Nairobi are usually between KES 200-KES 1,000.
        </Text>
        
        <View style={styles.milestoneContainer}>
          <View style={styles.milestoneHeader}>
            <View style={styles.iconContainer}>
              <Gift size={20} color="#0D1522" weight="fill" />
            </View>
            <View>
              <Text style={styles.milestoneTitle}>Bonus Reward</Text>
              <Text style={styles.milestoneSubtitle}>1 ride away from your first reward</Text>
            </View>
          </View>
          <View style={styles.progressBarBg}>
            <View style={styles.progressBarFill} />
          </View>
        </View>
      </View>
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
  milestoneContainer: {
    backgroundColor: 'rgba(248, 223, 166, 0.1)',
    borderRadius: 12,
    padding: 12,
    gap: 10,
    marginTop: 4,
  },
  milestoneHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F8DFA6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  milestoneTitle: {
    color: '#F8DFA6',
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
  milestoneSubtitle: {
    color: '#94A3B8',
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
  progressBarBg: {
    height: 6,
    backgroundColor: 'rgba(248, 223, 166, 0.2)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    width: '80%',
    backgroundColor: '#F8DFA6',
    borderRadius: 3,
  },
});
