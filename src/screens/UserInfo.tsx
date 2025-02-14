import {
  DialogWrapper,
  AnimatedTextBlockWrapper,
} from "@/components/DialogWrapper";
import { cn } from "@/utils";
import { useAtom } from "jotai";
import { screenAtom } from "@/store/screens";
import { userPreferencesAtom } from "@/store/userPreferences";
import { Heart } from "lucide-react";
import * as React from "react";
import santaVideo from "@/assets/video/gloria.mp4";

// Input Component
const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <input
      className={cn(
        "flex h-10 w-full rounded-3xl border border-red-500/30 bg-black/20 px-4 py-2 text-sm text-white ring-offset-background placeholder:text-white/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/50 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

// Select Component
const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, ...props }, ref) => {
  return (
    <select
      className={cn(
        "flex h-10 w-full rounded-3xl border border-red-500/30 bg-black/20 px-4 py-2 text-sm text-white ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-white/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/50 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Select.displayName = "Select";

// Label Component
const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => {
  return (
    <label
      ref={ref}
      className={cn(
        "text-sm font-medium text-white/90 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className
      )}
      {...props}
    />
  );
});
Label.displayName = "Label";

// Add persona IDs
const PERSONA_IDS = {
  male: "pcd8c14acf46", // Male coach persona
  female: "pb241984797f"  // Female coach persona
} as const;

type CoachGender = keyof typeof PERSONA_IDS;

export const UserInfo: React.FC = () => {
  const [, setScreenState] = useAtom(screenAtom);
  const [preferences, setPreferences] = useAtom(userPreferencesAtom);
  const [selectedGender, setSelectedGender] = React.useState<CoachGender>("male");

  // Remove name from validation
  const isFormValid = preferences.context?.trim() && selectedGender;

  const handleContinue = () => {
    // Remove name check from validation
    if (!preferences.context?.trim()) {
      return;
    }

    // Format the conversational context
    const formattedContext = `User ${preferences.name.trim()} needs relationship advice about: ${preferences.context.trim()}. Please provide empathetic, thoughtful guidance while maintaining appropriate boundaries. Communicate in ${preferences.language.trim()}.`;

    // Create settings object with all necessary data
    const settings = {
      ...preferences,
      greeting: `Hi ${preferences.name.trim()}! I'm your AI relationship coach. I'm here to help you navigate the complexities of love and relationships.`,
      conversational_context: formattedContext,
      context: preferences.context.trim(),
      persona_id: PERSONA_IDS[selectedGender]
    };

    console.log('Saving settings with persona:', settings.persona_id);
    localStorage.setItem('tavus-settings', JSON.stringify(settings));
    setScreenState({ currentScreen: "instructions" });
  };

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
        <div className="relative w-full max-w-md mx-auto px-4">
          <div className="flex flex-col items-center mb-8">
            <Heart className="size-8 text-[#FF0000] mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Choose Your Coach</h2>
            <p className="text-white/70 text-center text-sm">Select your preferred coach and share what you'd like to discuss</p>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Choose Your Coach</Label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedGender("male")}
                  className={cn(
                    "flex flex-col items-center justify-center gap-2 rounded-xl border border-red-500/30 p-4 transition-all duration-200",
                    selectedGender === "male" 
                      ? "bg-red-500/20 border-red-500" 
                      : "bg-black/20 hover:bg-red-500/10"
                  )}
                >
                  <span className="text-2xl">👨</span>
                  <span className="text-sm text-white">Male Coach</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedGender("female")}
                  className={cn(
                    "flex flex-col items-center justify-center gap-2 rounded-xl border border-red-500/30 p-4 transition-all duration-200",
                    selectedGender === "female" 
                      ? "bg-red-500/20 border-red-500" 
                      : "bg-black/20 hover:bg-red-500/10"
                  )}
                >
                  <span className="text-2xl">👩</span>
                  <span className="text-sm text-white">Female Coach</span>
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="context">What would you like advice about?</Label>
              <Input
                id="context"
                required
                value={preferences.context || ''}
                onChange={(e) => setPreferences(prev => ({ ...prev, context: e.target.value }))}
                placeholder="e.g., dating, relationships, breakup"
                style={{ fontFamily: "'Source Code Pro', monospace" }}
              />
            </div>

            <button
              onClick={handleContinue}
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
              Continue to Love Coaching
            </button>
          </div>
        </div>
      </AnimatedTextBlockWrapper>
    </DialogWrapper>
  );
}; 