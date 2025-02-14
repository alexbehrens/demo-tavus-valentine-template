import { GitFork, ExternalLink } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="flex w-full items-center justify-between gap-4">
      <a
        href="https://github.com/Tavus-Engineering/tavus-examples"
        target="_blank"
        className="relative flex items-center justify-center gap-2 rounded-3xl border border-red-500/30 bg-white/10 px-2 py-3 text-sm text-red-300 transition-all duration-200 hover:bg-white hover:text-red-500 sm:p-4 h-[44px] backdrop-blur-sm"
      >
        <GitFork className="size-4" /> Fork the demo
      </a>

      <a
        href="https://docs.tavus.io/sections/conversational-video-interface/cvi-overview"
        target="_blank"
        className="relative flex items-center justify-center gap-2 rounded-3xl border border-red-500/30 bg-white/10 px-2 py-3 text-sm text-red-300 transition-all duration-200 hover:bg-white hover:text-red-500 sm:p-4 h-[44px] backdrop-blur-sm"
      >
        How it works <ExternalLink className="size-4" />
      </a>
    </footer>
  );
};
