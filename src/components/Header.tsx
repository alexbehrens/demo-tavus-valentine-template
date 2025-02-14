import { memo } from "react";
import { Heart } from "lucide-react";

export const Header = memo(() => {
  return (
    <header className="flex w-full items-start justify-between">
      <a 
        href="https://tavus.io" 
        target="_blank" 
        rel="noopener noreferrer"
        className="transition-opacity hover:opacity-80"
      >
        <img
          src="/images/tavus_heart.png"
          alt="Tavus"
          className="h-10 w-auto sm:h-12"
        />
      </a>
      <div className="relative">
        <Heart className="size-6 text-red-600" />
      </div>
    </header>
  );
});
