import {
  AnimatedTextBlockWrapper,
  DialogWrapper,
} from "@/components/DialogWrapper";
import santaVideo from "@/assets/video/gloria.mp4";

export const ConversationLoading: React.FC = () => {
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
          <p className="text-white/70">Connecting to your love coach...</p>
        </div>
      </AnimatedTextBlockWrapper>
    </DialogWrapper>
  );
};
