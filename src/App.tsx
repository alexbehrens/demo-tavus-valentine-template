import { useAtom } from "jotai";
import { screenAtom } from "./store/screens";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import HeartAnimation from "./components/HeartAnimation";
import {
  IntroLoading,
  Outage,
  OutOfMinutes,
  Intro,
  UserInfo,
  Instructions,
  Conversation,
  FinalScreen,
} from "./screens";
import BackgroundAudio from "./components/BackgroundAudio";

function App() {
  const [{ currentScreen }] = useAtom(screenAtom);

  const renderScreen = () => {
    switch (currentScreen) {
      case "introLoading":
        return <IntroLoading />;
      case "outage":
        return <Outage />;
      case "outOfMinutes":
        return <OutOfMinutes />;
      case "intro":
        return <Intro />;
      case "userInfo":
        return <UserInfo />;
      case "instructions":
        return <Instructions />;
      case "conversation":
        return <Conversation />;
      case "finalScreen":
        return <FinalScreen />;
      case "sessionEnded":
        return <FinalScreen />;
      default:
        return <IntroLoading />;
    }
  };

  return (
    <main className="fixed inset-0 bg-white overflow-hidden">
      <HeartAnimation />
      
      {/* Header - Fixed at top */}
      <div className="absolute top-0 left-0 right-0 p-5 lg:p-8 z-10">
        <Header />
      </div>
      
      {/* Main Content - Centered */}
      <div className="absolute inset-0 flex items-center justify-center px-5 lg:px-8 mt-20 mb-24 sm:mt-24 sm:mb-28">
        <div className="w-full max-w-[1200px]">
          <div className="relative w-full aspect-[16/9] sm:aspect-[16/9]">
            {renderScreen()}
          </div>
        </div>
      </div>
      
      {/* Footer - Fixed at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-8 z-10">
        <Footer />
      </div>
      
      <BackgroundAudio />
    </main>
  );
}

export default App;
