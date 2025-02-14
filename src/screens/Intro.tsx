import { AnimatedWrapper } from "@/components/DialogWrapper";
import React from "react";
import { useAtom } from "jotai";
import { screenAtom } from "@/store/screens";
import { userPreferencesAtom } from "@/store/userPreferences";
import { Heart } from "lucide-react";
import AudioButton from "@/components/AudioButton";
import santaVideo from "@/assets/video/gloria.mp4";
import { Input } from "@/components/ui/input";
import { apiTokenAtom } from "@/store/tokens";

export const Intro: React.FC = () => {
  const [, setScreenState] = useAtom(screenAtom);
  const [preferences, setPreferences] = useAtom(userPreferencesAtom);
  const [token, setToken] = useAtom(apiTokenAtom);

  const isFormValid = preferences.name?.trim() && 
    preferences.language?.trim() && 
    token?.trim();

  const handleClick = () => {
    if (!isFormValid) return;
    localStorage.setItem('tavus-token', token || '');
    setScreenState({ currentScreen: "userInfo" });
  };

  return (
    <AnimatedWrapper>
      <div className="flex size-full flex-col items-center justify-center">
        <video
          src={santaVideo}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-red-500/20 to-red-600/20 backdrop-blur-sm" />
        <div 
          className="relative z-10 flex flex-col items-center gap-6 py-8 px-6 rounded-xl border border-red-500/30 bg-gradient-to-b from-red-950/80 to-red-900/80 backdrop-blur-md w-full max-w-md mx-auto"
        >
          <Heart className="text-red-500 size-10 animate-pulse" />

          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-red-300 to-red-500 bg-clip-text text-transparent" 
              style={{ fontFamily: 'Source Code Pro, monospace' }}>
              Love Coach AI
            </h1>
            <p className="text-white/70 text-sm">
              Your personal guide to navigating love and relationships
            </p>
          </div>

          <div className="w-full space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/90">Your Name</label>
              <Input
                type="text"
                value={preferences.name || ""}
                onChange={(e) => setPreferences(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter your name"
                className="w-full bg-black/20 text-white rounded-3xl border border-red-500/30 px-4 py-3 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                style={{ 
                  fontFamily: 'Source Code Pro, monospace',
                }}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/90">API Key</label>
              <Input
                type="text"
                value={token || ""}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Enter your Tavus API key"
                className="w-full bg-black/20 text-white rounded-3xl border border-red-500/30 px-4 py-3 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                style={{ 
                  fontFamily: 'Source Code Pro, monospace',
                }}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/90">Preferred Language</label>
              <select
                value={preferences.language || 'en'}
                onChange={(e) => setPreferences(prev => ({ ...prev, language: e.target.value }))}
                className="w-full bg-black/20 text-white rounded-3xl border border-red-500/30 px-4 py-3 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                style={{ fontFamily: 'Source Code Pro, monospace' }}
              >
                <option value="" className="bg-black text-white">Select a language</option>
                <option value="en" className="bg-black text-white">English</option>
                <option value="es" className="bg-black text-white">Spanish</option>
                <option value="fr" className="bg-black text-white">French</option>
                <option value="de" className="bg-black text-white">German</option>
                <option value="it" className="bg-black text-white">Italian</option>
                <option value="pt" className="bg-black text-white">Portuguese</option>
              </select>
            </div>

            <AudioButton 
              onClick={handleClick}
              disabled={!isFormValid}
              className="w-full flex items-center justify-center gap-2 rounded-3xl border border-[#FF0000]/50 px-8 py-3 text-sm text-white transition-all duration-200 hover:bg-white hover:text-[#FF0000] disabled:opacity-50 disabled:cursor-not-allowed bg-black/20"
              style={{
                transition: 'all 0.2s ease-in-out',
              }}
              onMouseEnter={(e) => {
                if (!e.currentTarget.disabled) {
                  e.currentTarget.style.boxShadow = '0 4px 24px #FF0000';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <Heart className="size-4" />
              Start Your Journey
            </AudioButton>
          </div>
        </div>
      </div>
    </AnimatedWrapper>
  );
};
