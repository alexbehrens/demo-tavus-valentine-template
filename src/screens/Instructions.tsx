import { createConversation } from "@/api";
import {
  DialogWrapper,
  AnimatedTextBlockWrapper,
  StaticTextBlockWrapper,
} from "@/components/DialogWrapper";
import { screenAtom } from "@/store/screens";
import { conversationAtom } from "@/store/conversation";
import React, { useCallback, useMemo, useState } from "react";
import { useAtom } from "jotai";
import { AlertTriangle, Mic, Video, Heart } from "lucide-react";
import { useDaily, useDailyEvent, useDevices } from "@daily-co/daily-react";
import { ConversationError } from "./ConversationError";
import zoomSound from "@/assets/sounds/zoom.mp3";
import { quantum } from 'ldrs';
import santaVideo from "@/assets/video/gloria.mp4";
import { userPreferencesAtom } from "@/store/userPreferences";

// Register the quantum loader
quantum.register();

const useCreateConversationMutation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [, setScreenState] = useAtom(screenAtom);
  const [, setConversation] = useAtom(conversationAtom);
  
  const createConversationRequest = async () => {
    try {
      setIsLoading(true);
      const conversation = await createConversation();
      setConversation(conversation);
      setScreenState({ currentScreen: "conversation" });
    } catch (error) {
      console.error('Conversation creation error:', error);
      setError(error as string);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    createConversationRequest,
  };
};

export const Instructions: React.FC = () => {
  const daily = useDaily();
  const { currentMic, setMicrophone, setSpeaker } = useDevices();
  const { createConversationRequest } = useCreateConversationMutation();
  const [getUserMediaError, setGetUserMediaError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingConversation, setIsLoadingConversation] = useState(false);
  const [error, setError] = useState(false);
  const [preferences] = useAtom(userPreferencesAtom);
  const audio = useMemo(() => {
    const audioObj = new Audio(zoomSound);
    audioObj.volume = 0.7;
    return audioObj;
  }, []);
  const [isPlayingSound, setIsPlayingSound] = useState(false);

  useDailyEvent(
    "camera-error",
    useCallback(() => {
      setGetUserMediaError(true);
    }, []),
  );

  const handleClick = async () => {
    try {
      setIsLoading(true);
      setIsPlayingSound(true);
      
      audio.currentTime = 0;
      await audio.play();
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsPlayingSound(false);
      setIsLoadingConversation(true);
      
      let micDeviceId = currentMic?.device?.deviceId;
      if (!micDeviceId) {
        const res = await daily?.startCamera({
          startVideoOff: false,
          startAudioOff: false,
          audioSource: "default",
        });
        // @ts-expect-error deviceId exists in the MediaDeviceInfo
        const isDefaultMic = res?.mic?.deviceId === "default";
        // @ts-expect-error deviceId exists in the MediaDeviceInfo
        const isDefaultSpeaker = res?.speaker?.deviceId === "default";
        // @ts-expect-error deviceId exists in the MediaDeviceInfo
        micDeviceId = res?.mic?.deviceId;

        if (isDefaultMic) {
          if (!isDefaultMic) {
            setMicrophone("default");
          }
          if (!isDefaultSpeaker) {
            setSpeaker("default");
          }
        }
      }
      if (micDeviceId) {
        await createConversationRequest();
      } else {
        setGetUserMediaError(true);
      }
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setIsLoading(false);
      setIsLoadingConversation(false);
    }
  };

  if (isPlayingSound || isLoadingConversation) {
    return (
      <DialogWrapper>
        <video
          src={santaVideo}
          autoPlay
          muted
          loop
          playsInline
          className="fixed inset-0 h-full w-full object-cover"
        />
        <div className="fixed inset-0 bg-gradient-to-b from-red-500/20 to-red-600/20 backdrop-blur-sm" />
        
        <AnimatedTextBlockWrapper>
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="w-24 h-24 sm:w-32 sm:h-32">
              <img 
                src="/images/heart.gif" 
                alt="Beating Heart"
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-white/70">Starting your love coaching session...</p>
          </div>
        </AnimatedTextBlockWrapper>
      </DialogWrapper>
    );
  }

  if (error) {
    return <ConversationError onClick={handleClick} />;
  }

  return (
    <DialogWrapper>
      <video
        src={santaVideo}
        autoPlay
        muted
        loop
        playsInline
        className="fixed inset-0 h-full w-full object-cover"
      />
      <div className="fixed inset-0 bg-gradient-to-b from-red-500/20 to-red-600/20 backdrop-blur-sm" />
      
      <AnimatedTextBlockWrapper>
        <div className="flex justify-center items-center gap-8 mb-2">
          <div className="w-24 h-24 sm:w-32 sm:h-32">
            <img 
              src="/images/heart.gif" 
              alt="Beating Heart"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <h1 
          className="mb-4 pt-1 text-center text-3xl sm:text-4xl lg:text-5xl font-semibold"
          style={{
            fontFamily: 'Source Code Pro, monospace'
          }}
        >
          <span className="text-white">Need Love Advice</span>{" "}
          {preferences.name ? (
            <span style={{ color: '#FF0000' }}>{preferences.name}?</span>
          ) : (
            <span style={{ color: '#FF0000' }}>?</span>
          )}
        </h1>

        <p className="max-w-[650px] text-center text-base sm:text-lg text-white/90 mb-12">
          Have a heart-to-heart conversation with an AI relationship coach who understands love's complexities. Get personalized advice, insights, and guidance for your romantic journey.
        </p>

        <button
          onClick={handleClick}
          className="inline-flex items-center justify-center gap-2 rounded-3xl border border-[#FF0000]/50 px-8 py-3 text-sm text-white transition-all duration-200 hover:bg-white hover:text-[#FF0000] disabled:opacity-50 disabled:cursor-not-allowed bg-black/20 mb-12"
          disabled={isLoading}
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
          Start Love Coaching
          {getUserMediaError && (
            <div className="absolute -top-1 left-0 right-0 flex items-center gap-1 text-wrap rounded-lg border border-[#FF0000] bg-[#FF0000] p-2 text-white backdrop-blur-sm">
              <AlertTriangle className="text-white size-4" />
              <p>
                To chat with your love coach, please allow microphone access. Check your
                browser settings.
              </p>
            </div>
          )}
        </button>

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:gap-8 text-white/90 justify-center">
          <div className="flex items-center gap-3 bg-[rgba(0,0,0,0.2)] px-4 py-2 rounded-full">
            <Mic className="size-5" style={{ color: '#FF0000' }} />
            Voice chat enabled
          </div>
          <div className="flex items-center gap-3 bg-[rgba(0,0,0,0.2)] px-4 py-2 rounded-full">
            <Video className="size-5" style={{ color: '#FF0000' }} />
            Face-to-face coaching
          </div>
        </div>

        <span className="absolute bottom-6 px-4 text-sm text-white/70 sm:bottom-8 sm:px-8 text-center">
          By starting a conversation, I accept the{' '}
          <a href="#" style={{ color: '#FF0000' }} className="hover:underline">Terms of Use</a> and acknowledge the{' '}
          <a href="#" style={{ color: '#FF0000' }} className="hover:underline">Privacy Policy</a>.
        </span>
      </AnimatedTextBlockWrapper>
    </DialogWrapper>
  );
};

export const PositiveFeedback: React.FC = () => {
  return (
    <DialogWrapper>
      <AnimatedTextBlockWrapper>
        <StaticTextBlockWrapper
          imgSrc="/images/positive.png"
          title="Great Conversation!"
          titleClassName="sm:max-w-full bg-[linear-gradient(91deg,_#43BF8F_16.63%,_#FFF_86.96%)]"
          description="Thanks for the engaging discussion. Feel free to come back anytime for another chat!"
        />
      </AnimatedTextBlockWrapper>
    </DialogWrapper>
  );
};
