import {
  AnimatedTextBlockWrapper,
  DialogWrapper,
} from "@/components/DialogWrapper";
import { Heart } from "lucide-react";
import React from "react";
import santaVideo from "@/assets/video/gloria.mp4";

export const FinalScreen: React.FC = () => {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <DialogWrapper>
      <video
        src={santaVideo}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-red-500/20 to-red-600/20 backdrop-blur-sm" />
      
      <AnimatedTextBlockWrapper>
        <div className="relative z-10 flex flex-col items-center gap-6 py-8 px-6 rounded-xl border border-red-500/30 bg-gradient-to-b from-red-950/80 to-red-900/80 backdrop-blur-md w-full max-w-md mx-auto">
          <Heart className="text-red-500 size-10 animate-pulse" />
          
          <div className="text-center space-y-4">
            <h1 
              className="text-2xl font-bold bg-gradient-to-r from-red-300 to-red-500 bg-clip-text text-transparent"
              style={{ fontFamily: 'Source Code Pro, monospace' }}
            >
              Thanks for the Chat!
            </h1>
            <p className="text-white/70 text-sm">
              Hope you found our conversation helpful
            </p>
          </div>

          <button
            onClick={handleReload}
            className="w-full flex items-center justify-center gap-2 rounded-3xl border border-[#FF0000]/50 px-8 py-3 text-sm text-white transition-all duration-200 hover:bg-white hover:text-[#FF0000] bg-black/20"
            style={{
              transition: 'all 0.2s ease-in-out',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 24px #FF0000';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <Heart className="size-4" />
            Start New Chat
          </button>
        </div>
      </AnimatedTextBlockWrapper>
    </DialogWrapper>
  );
};
