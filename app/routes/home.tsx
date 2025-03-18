import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import React from "react";

import type { Route } from "./+types/home";

import { useFullscreen } from "~/hooks/useFullscreen";

import AudioPlayer, { type AudioPlayerRef } from "~/components/audio-player";
import { Button } from "~/components/ui/button";

import { cn } from "~/lib/utils";

export function meta({ }: Route.MetaArgs) {
  return [{ title: "Wedding of Hanny & Ommi - 13 April 2025" }];
}

export type TContextType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  audioPlayerRef: React.RefObject<AudioPlayerRef | null>;
};

type ContextValue = Partial<TContextType>;
const Context = React.createContext<ContextValue>({});
const useContext = () => React.useContext(Context);

const audioURL =
  "https://petra.viding.co/music/43880818-675c05d35577a-1734084051.mp3";

export default function Home() {
  const [open, setOpen] = React.useState(false);
  const audioPlayerRef = React.useRef<AudioPlayerRef>(null);

  return (
    <Context.Provider value={{ open, setOpen, audioPlayerRef }}>
      <main className="container mx-auto">
        <Opening />
        <InvitationLayout>
          <Bride />
          <Quotes />
        </InvitationLayout>
        <AudioPlayer ref={audioPlayerRef} open={open} audioURL={audioURL} />
      </main>
    </Context.Provider>
  );
}

function InvitationLayout({ children }: React.HTMLAttributes<HTMLDivElement>) {
  const { open } = useContext();
  return <div className={cn("", open ? "" : "fixed")}>{children}</div>;
}

function Bride() {
  const { open } = useContext();
  return (
    <div className="w-full h-full">
      <div className="relative w-full h-full">
        <img src="/hero.png" alt="" className="h-svh object-cover w-full" />
        <div className="h-svh w-svw bg-black/20 absolute top-0"></div>
      </div>
      <div className="absolute top-8 w-full text-center flex flex-col justify-center items-center">
        <h1
          className={cn(
            "text-3xl tracking-tighter leading-none antic-didone-regular",
            open && "animate-slide-down",
          )}
        >
          <span>Hanny</span>
          <br />
          <span>&</span>
          <br />
          <span>Ommi</span>
        </h1>
        <p
          className={cn("font-medium mt-4 text-sm", open && "animate-slide-up")}
        >
          Forever Starts Here
        </p>
      </div>
      <div
        className={cn(
          "absolute bottom-12 w-full flex justify-center",
          open && "animate-slide-up",
        )}
      >
        <ScrollIcon />
      </div>
    </div>
  );
}

function Quotes() {
  return (
    <div className="bg-[#e7e2dc] text-black py-20 px-6 text-center">
      <span className="inline-flex justify-center">
        <FlowerIcon />
      </span>
      <h3 className="text-3xl mb-4 antic-didone-regular">Bound by love</h3>
      <p className="text-sm font-normal">
        And one of His signs is that He created for you spouses from among
        yourselves so that you may find tranquility in them. And He has placed
        between you compassion and mercy. Surely in this are signs for people
        who reflect.
      </p>
    </div>
  );
}

function Opening() {
  const [moveUp, setMoveUp] = React.useState(false);

  const { enterFullscreen } = useFullscreen<HTMLDivElement>();
  const { setOpen, audioPlayerRef } = useContext();
  return (
    <motion.div
      className="w-full h-full fixed top-0 left-0 z-50"
      initial={{ x: 0 }}
      animate={{ x: moveUp ? 1000 : 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <div className="fixed top-0 left-0">
        <div className="relative w-full h-full">
          <img
            src="/opening.png"
            alt=""
            className="h-svh object-cover w-full"
          />
          <div className="h-svh w-svw bg-black/20 absolute top-0"></div>
        </div>
      </div>
      <div className="relative top-[53svh] text-center">
        <div className="w-full h-full">
          <h1 className="text-lg mulish font-medium">WEDDING INVITATION</h1>
          <p className="text-base mulish font-medium mt-1">
            You are invited to The Wedding of
          </p>
        </div>
        <div className="w-full h-full my-8">
          <h2 className="caveat text-5xl">Hanny & Ommi</h2>
        </div>
        <div className="flex flex-col">
          <p className="text-center text-sm">
            <span>Kepada Yth;</span>
            <br />
            <span>Bapak/Ibu/Saudara/i</span>
          </p>
          <h3 className="text-lg mt-2 font-normal text-center">
            Naufal Ghifari
          </h3>
        </div>
        <Button
          className="mt-8"
          onClick={() => {
            setMoveUp(true);
            setOpen?.(true);
            enterFullscreen();
            audioPlayerRef?.current?.playAudio();
          }}
        >
          <Mail className="w-4 h-4" />
          <span>Open the Invitation</span>
        </Button>
      </div>
    </motion.div>
  );
}

const ScrollIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="42"
    fill="none"
    viewBox="0 0 28 42"
  >
    <rect
      width="27"
      height="41"
      x="0.5"
      y="0.5"
      stroke="#fff"
      opacity="0.6"
      rx="13.5"
    ></rect>
    <rect
      className="animate-scroll-animate"
      width="4"
      height="9.333"
      x="12"
      y="6.667"
      fill="#fff"
      opacity="0.6"
      rx="2"
    ></rect>
  </svg>
);

const FlowerIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    id="Layer_1"
    width="28"
    height="28"
    fill="#000"
    version="1.1"
    viewBox="0 0 511.999 511.999"
  >
    <path d="M255.531 410.099a7.604 7.604 0 0 0-7.604 7.604v31.935a7.604 7.604 0 0 0 15.208 0v-31.935a7.605 7.605 0 0 0-7.604-7.604M164.099 170.088l-19.579-16.249a7.604 7.604 0 0 0-9.712 11.702l19.579 16.249a7.57 7.57 0 0 0 4.852 1.753 7.605 7.605 0 0 0 4.86-13.455M133.23 322.321a7.606 7.606 0 0 0-10.307-3.066l-28.106 15.219a7.604 7.604 0 1 0 7.241 13.372l28.106-15.219a7.603 7.603 0 0 0 3.066-10.306M392.432 367.721l-20.262-18.066a7.604 7.604 0 0 0-10.12 11.35l20.262 18.066c1.45 1.293 7.088 3.485 10.735-.615a7.605 7.605 0 0 0-.615-10.735M255.707 53.568a7.604 7.604 0 0 0-7.604 7.604v32.112a7.604 7.604 0 0 0 15.208 0V61.171a7.604 7.604 0 0 0-7.604-7.603"></path>
    <path d="M489.585 312.969c-5.064-19.121-17.266-35.049-35.287-46.062-7.237-4.422-15.365-8.059-24.357-10.904 10.397-3.289 19.64-7.639 27.681-13.039 18.179-12.206 29.719-29.619 33.376-50.357 7.658-43.433-20.883-92.869-62.327-107.953-19.788-7.202-40.638-5.914-60.298 3.726-8.694 4.263-17.081 10.09-25.124 17.446 2.348-10.645 3.202-20.821 2.547-30.481-1.482-21.846-10.792-40.547-26.923-54.083-33.786-28.349-90.87-28.349-124.654 0-16.132 13.535-25.44 32.237-26.923 54.083-.658 9.701.205 19.922 2.576 30.615-13.504-12.368-27.924-20.471-42.849-23.943-20.863-4.853-41.868-.737-60.745 11.905a7.603 7.603 0 0 0-2.087 10.549 7.6 7.6 0 0 0 10.549 2.087c10.664-7.141 27.795-14.624 48.839-9.73 24.401 5.677 47.791 26.849 67.639 61.226a7.6 7.6 0 0 0 10.386 2.783 7.6 7.6 0 0 0 2.783-10.386c-15.998-27.71-23.372-52.633-21.919-74.077 1.195-17.62 8.639-32.65 21.525-43.463 27.995-23.491 77.109-23.491 105.104 0 12.887 10.813 20.33 25.842 21.525 43.463 1.455 21.444-5.92 46.368-21.919 74.077a7.602 7.602 0 0 0 2.783 10.387 7.6 7.6 0 0 0 10.386-2.783c15.998-27.71 33.896-46.558 53.195-56.02 15.857-7.775 32.593-8.844 48.402-3.09 34.341 12.499 58.898 55.033 52.552 91.023-2.921 16.567-12.215 30.528-26.877 40.373-17.844 11.981-43.115 18.057-75.112 18.057a7.604 7.604 0 0 0 0 15.208c55.94 0 91.756 18.915 100.853 53.258 8.628 32.576-9.79 73.569-41.057 91.381a7.603 7.603 0 1 0 7.527 13.212c17.714-10.09 32.504-26.676 41.644-46.7 9.364-20.52 11.703-42.463 6.586-61.788M56.533 111.455a7.604 7.604 0 0 0-10.714.913 107 107 0 0 0-3.547 4.444 7.604 7.604 0 0 0 1.481 10.65c1.373 1.037 6.697 3.333 10.65-1.481 1.028-1.252 2.001-2.576 3.043-3.812a7.604 7.604 0 0 0-.913-10.714"></path>
    <path d="m389.912 295.47-68.077-24.112q.753-3.188 1.192-6.484h18.38a7.604 7.604 0 0 0 0-15.208h-18.083a66.4 66.4 0 0 0-6.587-23.205l74.694-47.161a7.605 7.605 0 0 0-8.119-12.859L308.5 213.677a67.6 67.6 0 0 0-11.492-11.057l11.096-19.886a7.604 7.604 0 0 0-13.28-7.41l-10.915 19.561a66.3 66.3 0 0 0-20.6-5.468v-60.65a7.604 7.604 0 0 0-15.208 0v60.895c-14.738 1.905-27.985 8.612-38.114 18.512l-26.16-21.713a7.603 7.603 0 0 0-10.707.995 7.6 7.6 0 0 0 .995 10.707l26.269 21.803a67 67 0 0 0-3.825 6.773l-82.041-29.384a7.605 7.605 0 0 0-9.722 4.594 7.6 7.6 0 0 0 4.595 9.721l82.117 29.412a67 67 0 0 0-1.253 7.315h-25.919a7.604 7.604 0 0 0 0 15.208h25.919a66.4 66.4 0 0 0 4.224 16.904l-38.856 21.041a7.605 7.605 0 0 0-3.066 10.307c3.033 5.607 9.157 3.689 10.307 3.066l38.773-20.995a67.5 67.5 0 0 0 15.943 16.294l-11.529 19.456c-2.141 3.612-1.083 8.524 2.665 10.417 5.126 2.589 8.998-.269 10.417-2.665l11.693-19.732a66.4 66.4 0 0 0 17.079 4.618l.022 63.457a7.603 7.603 0 0 0 7.604 7.601h.003a7.603 7.603 0 0 0 7.601-7.606l-.022-63.165c14.334-1.365 27.356-7.276 37.622-16.265l41.776 37.248c1.45 1.293 6.507 3.364 10.735-.615 3.058-2.878 2.519-7.941-.615-10.735l-41.655-37.141a67 67 0 0 0 5.701-9.429l68.158 24.141c.839.297 7.27 1.957 9.706-4.629 1.457-3.941-.67-8.305-4.629-9.708m-133.191 12.235c-28.51 0-51.704-23.194-51.704-51.704s23.195-51.704 51.704-51.704c28.51 0 51.704 23.194 51.704 51.704s-23.194 51.704-51.704 51.704"></path>
    <path d="M414.176 423.638a7.606 7.606 0 0 0-8.124-7.048c-21.483 1.528-53.711-8.114-85.193-62.644a7.6 7.6 0 0 0-10.386-2.783 7.6 7.6 0 0 0-2.783 10.386c15.998 27.71 23.372 52.633 21.919 74.077-1.195 17.62-8.639 32.65-21.524 43.463-27.995 23.491-77.109 23.491-105.105 0-12.887-10.813-20.33-25.842-21.525-43.463-1.455-21.444 5.92-46.368 21.919-74.077a7.602 7.602 0 0 0-2.783-10.387 7.6 7.6 0 0 0-10.386 2.783c-15.998 27.71-33.896 46.558-53.194 56.02-15.857 7.775-32.594 8.844-48.402 3.09-34.341-12.499-58.898-55.033-52.552-91.023 2.922-16.567 12.215-30.528 26.877-40.373 17.844-11.981 43.115-18.057 75.112-18.057a7.604 7.604 0 0 0 0-15.208c-45.442 0-77.646-12.423-93.129-35.927-12.169-18.474-13.205-42.897-2.845-67.01a7.604 7.604 0 0 0-3.984-9.988 7.603 7.603 0 0 0-9.988 3.984c-12.416 28.897-10.916 58.558 4.117 81.379 8.283 12.574 23.187 26.705 49.917 35.163-10.395 3.289-19.638 7.639-27.679 13.038-18.179 12.206-29.719 29.62-33.376 50.357-7.658 43.433 20.885 92.869 62.327 107.953 19.789 7.202 40.639 5.914 60.298-3.726 8.694-4.263 17.081-10.09 25.125-17.446-2.348 10.645-3.202 20.821-2.547 30.481 1.481 21.846 10.791 40.547 26.923 54.083 16.892 14.174 39.609 21.262 62.327 21.262s45.435-7.088 62.327-21.262c16.131-13.535 25.441-32.237 26.923-54.083.655-9.668-.2-19.85-2.551-30.501 4.568 4.181 9.246 7.869 14.025 11.056 16.326 10.887 33.439 15.776 50.872 14.55a7.6 7.6 0 0 0 7.048-8.119"></path>
  </svg>
);
