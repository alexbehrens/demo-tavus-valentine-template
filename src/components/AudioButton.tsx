import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/utils";
import buttonBell from "@/assets/sounds/beep.mp3";
import { useCallback, useMemo } from "react";

interface AudioButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

const AudioButton = forwardRef<
  HTMLButtonElement,
  AudioButtonProps
>(({ className, children, ...props }, ref) => {
  const audio = useMemo(() => {
    const audioObj = new Audio(buttonBell);
    audioObj.volume = 0.7;
    return audioObj;
  }, []);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      audio.currentTime = 0;
      audio.play().catch((error) => {
        console.warn("Audio playback failed:", error);
      });

      props.onClick?.(event);
    },
    [audio, props.onClick],
  );

  return (
    <button
      ref={ref}
      className={cn(
        "relative z-20 flex items-center justify-center gap-2 rounded-3xl border border-red-500/30 px-4 py-2 text-sm text-red-300 transition-all duration-200 mt-4 disabled:opacity-50 bg-white/10 hover:bg-white hover:text-red-500",
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
});

AudioButton.displayName = "AudioButton";

export default AudioButton;
