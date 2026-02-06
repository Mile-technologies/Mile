import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Video, ResizeMode, AVPlaybackStatus } from 'expo-av';
import { MotiView } from 'moti';
import { useRef, useEffect } from 'react';

export default function MileLaunchScreen() {
  const router = useRouter();
  const videoRef = useRef<Video>(null);

  useEffect(() => {
    // Force play on mount
    if (videoRef.current) {
      videoRef.current.playAsync();
    }
  }, []);

  return (
    <View style={styles.container}>
      <MotiView 
        from={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ type: 'timing', duration: 500 }}
        style={styles.motiContainer}
      >
        <Video
          ref={videoRef}
          style={styles.video}
          source={require('../assets/images/mile animation.mp4')}
          useNativeControls={false}
          resizeMode={ResizeMode.CONTAIN}
          isLooping={false}
          shouldPlay={true}
          isMuted={true}
          onPlaybackStatusUpdate={(status: AVPlaybackStatus) => {
            if (status.isLoaded) {
              if (status.didJustFinish) {
                router.replace('/(auth)/terms');
              }
            } else if (status.error) {
              console.error("Video playback error:", status.error);
              // Fallback to next screen if video fails
              router.replace('/(auth)/terms');
            }
          }}
          onError={(e) => {
            console.error("Video load error:", e);
            router.replace('/(auth)/terms');
          }}
        />
      </MotiView>
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
  motiContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  video: {
    width: 500,
    height: 500,
  },
});
