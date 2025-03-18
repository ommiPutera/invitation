import { Pause, Play } from "lucide-react";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";

import { Button } from "~/components/ui/button";

import { cn } from "~/lib/utils";

export type AudioPlayerRef = {
  playAudio: () => void;
};

type AudioPlayerProps = {
  open: boolean;
  audioURL: string;
};

const AudioPlayer = forwardRef<AudioPlayerRef, AudioPlayerProps>(
  ({ open, audioURL }, ref) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const togglePlay = () => {
      if (!audioRef.current) return;

      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    };

    useImperativeHandle(ref, () => ({
      playAudio: () => {
        if (audioRef.current) {
          audioRef.current.play();
          setIsPlaying(true);
        }
      },
    }));

    return (
      <div className="fixed right-4 bottom-4 bg-transparent">
        <audio ref={audioRef} src={audioURL} preload="metadata" />
        <Button
          variant="default"
          size="icon"
          className={cn(
            "size-12 rounded-full bg-rose-100",
            !open && "hidden",
            isPlaying && "animate-pulse",
          )}
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </Button>
      </div>
    );
  },
);

const PlayIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    viewBox="0 0 32 32"
    className="fill-rose-500"
  >
    <g id="SVGRepo_iconCarrier">
      <g id="music">
        <path d="M9 22.347c0 .55-.443 1.1-.98 1.221l-3.042.69c-.538.121-.978.671-.978 1.221V28c0 .55.433.877.962.728l6.069-1.716c.53-.15.969-.723.969-1.273V11.913c0-.55.437-1.077.979-1.171L24 8.823c.542-.094 1 .279 1 .829v12.695c0 .55-.457 1.1-.994 1.221l-3.035.69c-.537.121-.971.671-.971 1.221V28c0 .55.418.877.947.728l6.077-1.716c.53-.15.976-.723.976-1.273V4c0-.55-.465-.921-1.006-.824L9.99 6.215c-.541.097-.99.626-.99 1.176z"></path>
        <path d="M20.697 29.764C19.729 29.764 19 29.006 19 28v-2.521c0-1.027.753-1.972 1.751-2.196l3.033-.689c.093-.021.215-.173.216-.246V9.837l-10.85 1.889c-.058.01-.15.115-.15.186v13.827c0 1.001-.729 1.962-1.697 2.234l-6.068 1.716q-.262.075-.523.074C3.735 29.764 3 29.006 3 28v-2.521c0-1.01.772-1.974 1.758-2.196l3.04-.69c.084-.02.202-.164.202-.246V7.391c0-1.029.797-1.979 1.814-2.16l17.004-3.04A1.82 1.82 0 0 1 29 4v21.739c0 1-.732 1.961-1.704 2.234l-6.077 1.716q-.261.075-.522.075M27 4.19 10.166 7.2c-.07.012-.166.133-.166.191v14.956c0 1.009-.773 1.974-1.761 2.196l-3.04.69c-.083.019-.199.163-.199.246v2.203l5.759-1.632c.1-.028.241-.211.241-.311V11.913c0-1.033.794-1.98 1.808-2.157l11.021-1.918C25.028 7.629 26 8.508 26 9.652v12.695c0 1.007-.779 1.972-1.774 2.196l-3.033.689c-.081.019-.193.164-.193.247v2.195l5.753-1.624c.109-.031.247-.22.247-.311z"></path>
      </g>
    </g>
  </svg>
);

const PauseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    viewBox="0 0 32 32"
    className="fill-rose-500"
  >
    <g id="SVGRepo_iconCarrier">
      <g id="pause">
        <path d="M6 4c-.55 0-1 .45-1 1v22c0 .55.45 1 1 1h3c.55 0 1-.45 1-1V5c0-.55-.45-1-1-1z"></path>
        <path d="M9 29H6c-1.103 0-2-.897-2-2V5c0-1.103.897-2 2-2h3c1.103 0 2 .897 2 2v22c0 1.103-.897 2-2 2m0-2v1zM6 5v22h2.997L9 5zM23 4c-.55 0-1 .45-1 1v22c0 .55.45 1 1 1h3c.55 0 1-.45 1-1V5c0-.55-.45-1-1-1z"></path>
        <path d="M26 29h-3c-1.103 0-2-.897-2-2V5c0-1.103.897-2 2-2h3c1.103 0 2 .897 2 2v22c0 1.103-.897 2-2 2m0-2v1zM23 5v22h2.997L26 5z"></path>
      </g>
    </g>
  </svg>
);

AudioPlayer.displayName = "AudioPlayer";
export default AudioPlayer;
