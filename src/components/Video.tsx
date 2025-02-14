import { cn } from "@/lib/utils";
import { DailyVideo, useVideoTrack } from "@daily-co/daily-react";

export default function Video({
  id,
  className,
  tileClassName,
}: {
  id: string;
  className?: string;
  tileClassName?: string;
}) {
  const videoState = useVideoTrack(id);

  return (
    <div
      className={cn("bg-red-950/10 rounded-lg", className, {
        "hidden size-0": videoState.isOff,
      })}
    >
      <DailyVideo
        automirror
        sessionId={id}
        type="video"
        className={cn("size-full object-cover rounded-lg", tileClassName, {
          hidden: videoState.isOff,
        })}
      />
    </div>
  );
}
