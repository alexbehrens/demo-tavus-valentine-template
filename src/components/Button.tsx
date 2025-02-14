import { FC, PropsWithChildren } from "react";
import { motion, TapHandlers } from "framer-motion";

import { cn } from "@/utils";

const Button: FC<PropsWithChildren<{ onTap?: TapHandlers["onTap"]; variant?: 'default' | 'outline' }>> = ({
  children,
  onTap,
  variant = 'default'
}) => {
  return (
    <motion.button
      className="group relative cursor-pointer p-1"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      onTap={onTap}
    >
      <motion.div
        variants={{
          initial: { backgroundPosition: "0 50%" },
          animate: { backgroundPosition: ["0, 50%", "100% 50%", "0 50%"] },
        }}
        initial="initial"
        animate="animate"
        transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
        style={{ backgroundSize: "400% 400%" }}
        className={cn(
          "absolute inset-0 z-[1] rounded-2xl opacity-60 blur-xl transition duration-300 group-hover:opacity-100",
          "bg-[radial-gradient(circle_farthest-side_at_0_100%,#ff0000,transparent),radial-gradient(circle_farthest-side_at_100%_0,#ff1a1a,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ff3333,transparent),radial-gradient(circle_farthest-side_at_0_0,#ff1a1a,#141316)]",
        )}
      />
      <motion.div
        variants={{
          initial: { backgroundPosition: "0 50%" },
          animate: { backgroundPosition: ["0, 50%", "100% 50%", "0 50%"] },
        }}
        initial="initial"
        animate="animate"
        transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
        style={{ backgroundSize: "400% 400%" }}
        className={cn(
          "absolute inset-[2px] z-[1] rounded-[12px]",
          "bg-[radial-gradient(circle_farthest-side_at_0_100%,#ff0000,transparent),radial-gradient(circle_farthest-side_at_100%_0,#ff1a1a,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ff3333,transparent),radial-gradient(circle_farthest-side_at_0_0,#ff1a1a,#141316)]",
        )}
      />

      <div className={cn(
        "relative z-10 rounded-[10px] px-4 py-2",
        variant === 'default' ? "bg-[#282c34] text-white" : "bg-white/90 text-red-600"
      )}>
        <span className="flex items-center gap-2">
          {variant === 'default' && <span className="text-red-400">❤</span>}
          {children}
          {variant === 'default' && <span className="text-red-400">❤</span>}
        </span>
      </div>
    </motion.button>
  );
};

export default Button;
