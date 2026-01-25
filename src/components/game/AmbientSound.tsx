import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const AmbientSound = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Create audio context with a simple ambient tone
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    const createAmbientSound = () => {
      const oscillator1 = audioContext.createOscillator();
      const oscillator2 = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      const filterNode = audioContext.createBiquadFilter();
      
      oscillator1.type = 'sine';
      oscillator1.frequency.setValueAtTime(60, audioContext.currentTime);
      
      oscillator2.type = 'sine';
      oscillator2.frequency.setValueAtTime(90, audioContext.currentTime);
      
      filterNode.type = 'lowpass';
      filterNode.frequency.setValueAtTime(200, audioContext.currentTime);
      
      gainNode.gain.setValueAtTime(isMuted ? 0 : 0.03, audioContext.currentTime);
      
      oscillator1.connect(filterNode);
      oscillator2.connect(filterNode);
      filterNode.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      return { oscillator1, oscillator2, gainNode, audioContext };
    };

    let sound: ReturnType<typeof createAmbientSound> | null = null;

    if (isPlaying && !isMuted) {
      sound = createAmbientSound();
      sound.oscillator1.start();
      sound.oscillator2.start();
    }

    return () => {
      if (sound) {
        sound.oscillator1.stop();
        sound.oscillator2.stop();
        sound.audioContext.close();
      }
    };
  }, [isMuted, isPlaying]);

  const toggleSound = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      setIsMuted(false);
    } else {
      setIsMuted(!isMuted);
    }
  };

  return (
    <button
      onClick={toggleSound}
      className="fixed bottom-20 right-4 z-50 w-10 h-10 rounded-full glass-panel border border-primary/30 flex items-center justify-center hover:bg-primary/20 transition-colors"
      aria-label={isMuted ? "Unmute ambient sound" : "Mute ambient sound"}
    >
      {isMuted || !isPlaying ? (
        <VolumeX className="w-4 h-4 text-muted-foreground" />
      ) : (
        <Volume2 className="w-4 h-4 text-primary" />
      )}
    </button>
  );
};

export default AmbientSound;
