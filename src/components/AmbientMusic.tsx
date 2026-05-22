import { useRef, useState, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { Button } from './ui/button';

const AmbientMusic = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const [showTooltip, setShowTooltip] = useState(true);

  useEffect(() => {
    // A soft, reflective piano track that sets an empathetic, emotional tone
    audioRef.current = new Audio('https://assets.mixkit.co/music/preview/mixkit-sad-piano-mood-512.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = volume;

    // Show tooltip for 6 seconds then hide
    const timer = setTimeout(() => setShowTooltip(false), 6000);

    return () => {
      clearTimeout(timer);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => {
        console.log("Audio play blocked by browser policy, user interaction required first.", err);
      });
    }
    setIsPlaying(!isPlaying);
    setShowTooltip(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center bg-white/95 backdrop-blur-md shadow-2xl rounded-full p-2 border border-hope-gold/30 hover:border-hope-gold/60 transition-all duration-300">
      {showTooltip && (
        <div className="absolute right-14 bg-hope-blue text-white text-xs py-1.5 px-3 rounded-lg shadow-xl whitespace-nowrap mr-2 animate-bounce">
          ✨ Play emotional theme music
          <div className="absolute top-1/2 -right-1 transform -translate-y-1/2 w-2 h-2 bg-hope-blue rotate-45"></div>
        </div>
      )}

      <Button
        size="icon"
        variant="ghost"
        className={`rounded-full w-10 h-10 transition-all duration-300 ${
          isPlaying ? 'bg-hope-red/10 text-hope-red animate-pulse' : 'text-hope-gray hover:text-hope-blue'
        }`}
        onClick={togglePlay}
        title="Toggle ambient background theme"
      >
        <Music className={`w-5 h-5 ${isPlaying ? 'scale-110' : ''}`} />
      </Button>

      {isPlaying && (
        <div className="flex items-center px-2 space-x-2 animate-fade-in">
          <span className="text-[10px] font-bold text-hope-gray uppercase tracking-wider">Soundtrack</span>
          <button 
            onClick={() => setVolume(volume === 0 ? 0.4 : 0)}
            className="text-hope-gray hover:text-hope-red transition-colors"
          >
            {volume === 0 ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-14 h-1 bg-hope-gold/20 rounded-lg appearance-none cursor-pointer accent-hope-red"
          />
        </div>
      )}
    </div>
  );
};

export default AmbientMusic;
