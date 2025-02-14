import { cn } from "@/utils";
import { motion } from "framer-motion";
import { cardio } from 'ldrs';

cardio.register();

export const DialogWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={cn(
        "relative overflow-y-auto overflow-x-hidden rounded-2.5xl border-2 border-red-500/60 bg-gradient-to-b from-red-950/80 to-red-900/80 shadow-[0_8px_48px_rgba(255,0,0,0.8)] backdrop-blur-sm w-full h-full min-h-[500px]",
      )}
    >
      <img
        src="/images/dialogBlur.svg"
        alt="background"
        className="absolute inset-0 h-full w-full object-cover opacity-30"
      />
      {children || (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
          <l-cardio
            size="50"
            stroke="4"
            speed="2"
            color="#FF0000"
          ></l-cardio>
          <p className="text-red-200 text-lg">Loading...</p>
        </div>
      )}
    </div>
  );
};

export const AnimatedWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        scale: {
          duration: 0.5,
          ease: [0.34, 1.56, 0.64, 1],
        },
      }}
      className={cn(
        "relative overflow-y-auto overflow-x-hidden rounded-2.5xl border-2 border-red-500/60 bg-gradient-to-b from-red-950/80 to-red-900/80 shadow-[0_8px_48px_rgba(255,0,0,0.8)] backdrop-blur-sm w-full h-full min-h-[500px]",
      )}
    >
      <img
        src="/images/dialogBlur.svg"
        alt="background"
        className="absolute inset-0 h-full w-full object-cover opacity-30"
      />
      {children}
    </motion.div>
  );
};

export const TextBlockWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="relative flex size-full flex-col items-center justify-center px-2.5 py-6 sm:p-8">
      {children}
    </div>
  );
};

export const AnimatedTextBlockWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        scale: {
          duration: 0.5,
          ease: [0.34, 1.56, 0.64, 1],
        },
      }}
      className="relative flex min-h-full w-full flex-col items-center justify-center px-4 py-8 sm:px-8"
    >
      {children}
    </motion.div>
  );
};

export const StaticTextBlockWrapper = ({
  imgSrc,
  title,
  titleClassName,
  description,
  descriptionClassName,
  children,
}: {
  imgSrc: string;
  title: string;
  titleClassName?: string;
  description: string;
  descriptionClassName?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <img
        src={imgSrc}
        alt="icon"
        className="mb-4 size-20 sm:mb-8 lg:size-30"
      />
      <h2
        className={cn(
          "mb-4 bg-gradient-to-r from-red-300 to-red-500 bg-clip-text pt-1 text-center font-santa text-4.5xl text-transparent sm:max-w-[650px] sm:text-6.5xl lg:text-7xl",
          titleClassName,
        )}
      >
        {title}
      </h2>
      <p
        className={cn(
          "max-w-[650px] text-center text-base text-red-100 sm:text-lg",
          descriptionClassName,
        )}
      >
        {description}
      </p>
      {children}
    </div>
  );
};
