import { StyleSheet } from 'react-native';
import { Video, ResizeMode, AVPlaybackStatus } from 'expo-av';
import { MotiView } from 'moti';
import { useRef, useEffect } from 'react';

interface IntroVideoProps {
  onFinish: () => void;
}

export const IntroVideo = ({ onFinish }: IntroVideoProps) => {
  const videoRef = useRef<Video>(null);

  useEffect(() => {
    // Force play on mount
    if (videoRef.current) {
      videoRef.current.playAsync();
    }
  }, []);

  return (
    <MotiView 
      from={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ type: 'timing', duration: 500 }}
      style={styles.motiContainer}
    >
      <Video
        ref={videoRef}
        style={styles.video}
        source={require('../../../assets/images/mile animation.mp4')}
        useNativeControls={false}
        resizeMode={ResizeMode.CONTAIN}
        isLooping={false}
        shouldPlay={true}
        isMuted={true}
        onPlaybackStatusUpdate={(status: AVPlaybackStatus) => {
          if (status.isLoaded) {
            if (status.didJustFinish) {
              onFinish();
            }
          } else if (status.error) {
            console.error("Video playback error:", status.error);
            // Fallback to next screen if video fails
            onFinish();
          }
        }}
        onError={(e) => {
          console.error("Video load error:", e);
          onFinish();
        }}
      />
    </MotiView>
  );
};

const styles = StyleSheet.create({
  motiContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  video: {
    width: 500,
    height: 500,
  },
});
