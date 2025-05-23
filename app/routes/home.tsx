import { format } from "date-fns";
import { id as locale } from "date-fns/locale";
import { motion } from "framer-motion";
import { Calendar1, MailOpen, MapPin } from "lucide-react";
import React from "react";
import { data, Form, Link, useLoaderData, useSearchParams } from "react-router";
import { dataWithSuccess } from "remix-toast";

import type { Route } from "./+types/home";

import { useFullscreen } from "~/hooks/useFullscreen";

import { AnimatedShinyText } from "~/components/animated-shiny-text";
import AudioPlayer, { type AudioPlayerRef } from "~/components/audio-player";
import InteractiveBentoGallery from "~/components/blocks/interactive-bento-gallery";
import { SlidingNumber } from "~/components/sliding-number";
import { Input } from "~/components/ui/input";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Textarea } from "~/components/ui/textarea";

import { useIsVisible } from "~/hooks/useIsVisble";

import { cn } from "~/lib/utils";

import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";
import { createCommnet, getCommnet } from "~/lib/comment.server";
import { ImagesSlider } from "~/components/image-slider";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Wedding of Hanny & Ommi - 13 April 2025" },
    {
      rel: "preload",
      href: "https://res.cloudinary.com/ommiputera/image/upload/v1742736004/WhatsApp_Image_2025-03-22_at_19.24.58_1_cmpgmc.jpg",
      as: "image",
      type: "image/jpg",
    },
    {
      rel: "preload",
      href: "https://res.cloudinary.com/ommiputera/image/upload/v1742736004/WhatsApp_Image_2025-03-22_at_19.24.58_ewbeze.jpg",
      as: "image",
      type: "image/jpg",
    },
    {
      rel: "preload",
      href: "https://res.cloudinary.com/ommiputera/image/upload/v1742736004/WhatsApp_Image_2025-03-22_at_20.04.12_djbo98.jpg",
      as: "image",
      type: "image/jpg",
    },
    {
      rel: "preload",
      href: "https://res.cloudinary.com/ommiputera/image/upload/v1742736005/WhatsApp_Image_2025-03-22_at_19.41.26_e80dka.jpg",
      as: "image",
      type: "image/jpg",
    },
    {
      rel: "preload",
      href: "https://res.cloudinary.com/ommiputera/image/upload/v1742748082/WhatsApp_Image_2025-03-23_at_22.02.54_tup4ak.jpg",
      as: "image",
      type: "image/jpg",
    },
    {
      rel: "preload",
      href: "https://res.cloudinary.com/ommiputera/image/upload/v1742736005/WhatsApp_Image_2025-03-22_at_20.16.49_qvasdj.jpg",
      as: "image",
      type: "image/jpg",
    },
  ];
}

export async function action({ request }: Route.LoaderArgs) {
  if (request.method !== "POST") {
    return { success: false, error: "Method not allowed" };
  }

  const formData = await request.formData();
  const content = formData.get("content");
  const name = formData.get("name");
  const attendance = formData.get("attendance");

  if (
    typeof content !== "string" ||
    typeof name !== "string" ||
    typeof attendance !== "string"
  ) {
    return { success: false, error: "gagal" };
  }

  try {
    await createCommnet({
      content,
      name,
      attendance,
    });
    return dataWithSuccess(
      { success: true },
      "Terima Kasih with 🖤 - Hanny & Ommi",
    );
  } catch (error) {
    return data({ success: false, error: "Gagal" });
  }
}

export async function loader({ }: Route.LoaderArgs) {
  const comments = await getCommnet();
  return data({ comments });
}

const mediaItems = [
  {
    id: 1,
    type: "image",
    url: "https://res.cloudinary.com/ommiputera/image/upload/v1742736004/WhatsApp_Image_2025-03-22_at_19.24.58_1_cmpgmc.jpg",
    span: "col-span-2 row-span-4",
  },
  {
    id: 2,
    type: "image",
    url: "https://res.cloudinary.com/ommiputera/image/upload/v1742736004/WhatsApp_Image_2025-03-22_at_20.04.12_djbo98.jpg",
    span: "col-span-2 row-span-4",
  },
  {
    id: 4,
    type: "image",
    url: "https://res.cloudinary.com/ommiputera/image/upload/v1742736005/WhatsApp_Image_2025-03-22_at_19.41.26_e80dka.jpg",
    span: "col-span-2 row-span-4",
  },
  {
    id: 3,
    type: "image",
    url: "https://res.cloudinary.com/ommiputera/image/upload/v1742736004/WhatsApp_Image_2025-03-22_at_19.24.58_ewbeze.jpg",
    span: "col-span-2 row-span-4",
  },
  {
    id: 5,
    type: "image",
    url: "https://res.cloudinary.com/ommiputera/image/upload/v1742742647/WhatsApp_Image_2025-03-23_at_22.02.54_kzds5c.jpg",
    span: "col-span-2 row-span-4",
  },
  {
    id: 6,
    type: "image",
    url: "https://res.cloudinary.com/ommiputera/image/upload/v1742736005/WhatsApp_Image_2025-03-22_at_20.16.49_qvasdj.jpg",
    span: "col-span-2 row-span-4",
  },
];

export type TContextType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  audioPlayerRef: React.RefObject<AudioPlayerRef | null>;
};

type ContextValue = Partial<TContextType>;
const Context = React.createContext<ContextValue>({});
const useContext = () => React.useContext(Context);

const audioURL =
  "https://res.cloudinary.com/ommiputera/video/upload/v1743257761/John_Mayer_-_You_re_Gonna_Live_Forever_in_Me__Hydr0.org_t3ekbp.mp3";

export default function Home() {
  const [open, setOpen] = React.useState(false);
  const audioPlayerRef = React.useRef<AudioPlayerRef>(null);

  return (
    <Context.Provider value={{ open, setOpen, audioPlayerRef }}>
      <main
        className={cn(
          "w-full h-0 !overflow-hidden",
          open && "h-full !overflow-scroll",
        )}
      >
        <div className="fixed left-0 hidden xl:block xl:w-[calc(100%_-_35vw)] h-full">
          <img
            src="https://res.cloudinary.com/ommiputera/image/upload/v1742736004/WhatsApp_Image_2025-03-22_at_19.24.58_ewbeze.jpg"
            alt=""
            className="object-cover w-full h-full"
          />
        </div>
        <Gate />
        <div className="w-full xl:max-w-[35vw] absolute top-0 right-0 pb-0">
          <Opening />
          <Quotes />
          <Couple />
          <div className="bg-[#e7e2dc] text-black py-20 px-6 text-center flex flex-col gap-20 justify-center items-center max-w-[700px] xl:max-w-full mx-auto">
            <Countdown />
            <p className="text-base font-normal max-w-[300px] text-black/70">
              God has written our fate into a beautiful story. With hearts full
              of love and hope, we invite you to be part of our most cherished
              moment.
            </p>
            <Galery />
          </div>
          <Venue />
          <div className="h-full w-full -mb-32 max-w-[700px] xl:max-w-full mx-auto">
            <img
              src="https://res.cloudinary.com/ommiputera/image/upload/v1742748082/WhatsApp_Image_2025-03-23_at_22.34.10_upxasu.jpg"
              alt=""
              className="h-[60vh] w-full object-cover"
            />
          </div>
          <WeddingWishes />
          <Gift />
          <Thanks />
        </div>
        <AudioPlayer ref={audioPlayerRef} open={open} audioURL={audioURL} />
      </main>
    </Context.Provider>
  );
}

function Opening() {
  const { open } = useContext();
  const images = [
    "https://res.cloudinary.com/ommiputera/image/upload/v1742736004/WhatsApp_Image_2025-03-22_at_19.47.59_la631o.jpg",
    "https://res.cloudinary.com/ommiputera/image/upload/v1742736004/WhatsApp_Image_2025-03-22_at_19.24.58_1_cmpgmc.jpg",
    "https://res.cloudinary.com/ommiputera/image/upload/v1742742647/WhatsApp_Image_2025-03-23_at_22.02.54_kzds5c.jpg",
  ];
  return (
    <div className="w-full h-full relative max-w-[700px] xl:max-w-full mx-auto">
      <div className="relative w-full h-full">
        <ImagesSlider className="h-svh" images={images} />
      </div>
      <div className="absolute top-[42px] w-full text-center flex flex-col justify-center items-center">
        <div
          className={cn(
            "text-3xl tracking-tighter text-white leading-none antic-didone-regular",
            open && "animate-slide-down",
          )}
        >
          <p>Hanny</p>
          <p>&</p>
          <p>Ommi</p>
        </div>
        <p
          className={cn(
            "font-medium mt-4 text-base !text-white",
            open && "animate-slide-up",
          )}
        >
          Forever Begins Here
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
  const ref = React.useRef<HTMLDivElement>(null);
  const isVisible = useIsVisible(ref);
  return (
    <div className="bg-[#e7e2dc] text-black py-20 px-6 text-center max-w-[700px] xl:max-w-full mx-auto">
      <div className={cn("", isVisible && "animate-slide-down")} ref={ref}>
        <span className="inline-flex justify-center">
          <FlowerIcon />
        </span>
        <h3 className="text-3xl mb-8 antic-didone-regular">Bound by love</h3>
      </div>
      <div className={cn("", isVisible && "animate-slide-up")}>
        <p className="text-base font-normal text-black/70">
          "And one of His signs is that{" "}
          <b className="font-semibold text-black">
            He created for you spouses from among yourselves
          </b>{" "}
          so that you may find{" "}
          <b className="font-semibold text-black">tranquility in them</b>. And
          He has placed between you compassion and mercy. Surely in this are
          signs for people who reflect."
        </p>
        <p className="text-base mt-8 font-normal text-black/70">
          Surah Ar-Rum (30:21)
        </p>
      </div>
    </div>
  );
}

function Couple() {
  const ref = React.useRef<HTMLDivElement>(null);
  const isVisible = useIsVisible(ref);
  return (
    <div className="text-black bg-[#e7e2dc] pb-20 flex flex-col gap-12 w-full max-w-[700px] xl:max-w-full mx-auto">
      <Bride />
      <p className="text-4xl font-bold text-center antic-didone-regular text-black">
        &
      </p>
      <div className="flex flex-col items-center w-full" ref={ref}>
        <div className="overflow-hidden max-h-[60vh]">
          <img
            src="https://res.cloudinary.com/ommiputera/image/upload/v1742753504/WhatsApp_Image_2025-03-23_at_22.34.10_1_ajdqu1.jpg"
            alt=""
          />
        </div>
        <div
          className={cn(
            "bg-[#e7e2dc] relative shadow-lg border border-neutral-200 rounded-xl p-6 w-[85%] text-center -mt-16 flex flex-col gap-2",
            isVisible && "animate-slide-up",
          )}
        >
          <h2 className="text-2xl leading-tight font-bold antic-didone-regular">
            Ommi Putera Karunia, S.E
          </h2>
          <p className="text-2xl my-4 font-medium dancing-script">The son of</p>
          <p className="text-base font-normal">
            <span>Bapak Lukman, S.Pd</span>
            <br />
            <span>&</span>
            <br />
            <span>Ibu Ir. Nurwilis, M.Si</span>
          </p>
        </div>
      </div>
    </div>
  );
}
function Bride() {
  const ref = React.useRef<HTMLDivElement>(null);
  const isVisible = useIsVisible(ref);
  return (
    <div className="flex flex-col items-center w-full" ref={ref}>
      <div className="overflow-hidden max-h-[60vh]">
        <img
          src="https://res.cloudinary.com/ommiputera/image/upload/v1742753504/WhatsApp_Image_2025-03-23_at_23.23.26_mkio6b.jpg"
          alt=""
        />
      </div>
      <div
        className={cn(
          "bg-[#e7e2dc] relative shadow-lg border border-neutral-200 rounded-xl p-6 w-[85%] text-center -mt-16 flex flex-col gap-2",
          isVisible && "animate-slide-up",
        )}
      >
        <h2 className="text-2xl leading-tight font-bold antic-didone-regular">
          Hanny Derisca Pradita, S.E
        </h2>
        <p className="text-2xl my-4 font-medium dancing-script">
          The daugther of
        </p>
        <p className="text-sm font-normal">
          <span>Bapak Harisyah Fermana Lafri, S.H</span>
          <br />
          <span>&</span>
          <br />
          <span>Ibu Rini Hartati</span>
        </p>
      </div>
    </div>
  );
}

function Countdown() {
  const ref = React.useRef<HTMLDivElement>(null);
  const isVisible = useIsVisible(ref);

  const targetDate = new Date("2025-04-13T00:00:00").getTime();
  const [timeLeft, setTimeLeft] = React.useState(targetDate - Date.now());

  React.useEffect(() => {
    const interval = setInterval(() => {
      const remaining = targetDate - Date.now();
      if (remaining <= 0) {
        clearInterval(interval);
        setTimeLeft(0);
      } else {
        setTimeLeft(remaining);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  return (
    <div>
      <div className="flex items-center gap-3">
        <div className="relative mr-10">
          <SlidingNumber value={days} padStart={true} />
          <span className="text-neutral-600 text-base absolute -top-1 left-8 antic-didone-regular">
            Days
          </span>
        </div>
        <div className="relative mr-10">
          <SlidingNumber value={hours} padStart={true} />
          <span className="text-neutral-600 text-base absolute -top-1 left-8 antic-didone-regular">
            Hours
          </span>
        </div>
        <div className="relative mr-10">
          <SlidingNumber value={minutes} padStart={true} />
          <span className="text-neutral-600 text-base absolute -top-1 left-8 antic-didone-regular">
            Mins
          </span>
        </div>
        <div className="relative mr-10">
          <SlidingNumber value={seconds} padStart={true} />
          <span className="text-neutral-600 text-base absolute -top-1 left-8 antic-didone-regular">
            Secs
          </span>
        </div>
      </div>
      <div ref={ref}>
        <Link
          to="https://calendar.google.com/calendar/event?action=TEMPLATE&tmeid=MGE1YXZjYjVoa21vbGRxODhyYmdpZjNra3Igb21pcHV0cmFrYXJ1bmlhQG0&tmsrc=omiputrakarunia%40gmail.com"
          target="_blank"
          className={cn(
            "mt-12 rounded-full bg-neutral-700 text-white inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive h-9 px-4 py-2 has-[>svg]:px-3",
            isVisible && "animate-slide-down",
          )}
          style={{
            backgroundColor: "#404040",
            color: "#fff",
          }}
        >
          <Calendar1 className="text-white size-5" />
          <AnimatedShinyText className="transition ease-out text-white">
            Save the Date
          </AnimatedShinyText>
        </Link>
      </div>
    </div>
  );
}

function Galery() {
  return (
    <div className="h-full overflow-y-auto overflow-x-hidden w-full">
      <InteractiveBentoGallery mediaItems={mediaItems} />
    </div>
  );
}

function Venue() {
  const ref = React.useRef<HTMLDivElement>(null);
  const isVisible = useIsVisible(ref);
  return (
    <div className="bg-[#e2ddd5] py-20 px-6 text-center flex flex-col justify-center items-center max-w-[700px] xl:max-w-full mx-auto">
      <span className="inline-flex justify-center mb-2 text-black">
        <FlowerIcon />
      </span>
      <div ref={ref}>
        <h3 className="text-3xl mb-8 antic-didone-regular text-black">Venue</h3>
        <p className="text-base font-normal max-w-[300px] text-black">
          Our hearts will shine and overflow with joy if you grace us with your
          presence on this special day.
        </p>
      </div>
      <div
        className={cn(
          "bg-[#e7e2dc] text-black relative shadow-lg border border-neutral-200 rounded-xl px-6 py-12 text-center mt-20 w-full flex flex-col gap-8",
          isVisible && "animate-slide-up",
        )}
      >
        <h3 className="text-2xl antic-didone-regular text-black">Akad Nikah</h3>
        <div className="flex flex-col gap-2">
          <h4 className="text-3xl font-medium text-black dancing-script">
            Sunday
          </h4>
          <div className="mt-1 flex items-center gap-2 justify-center">
            <p className="text-4xl dancing-script">13</p>
            <span className="h-10 border-r border-black"></span>
            <div className="text-left text-sm text-black">
              <p>April</p>
              <p>2025</p>
            </div>
          </div>
          <p className="text-base font-medium text-black">
            07:30 WIB - Selesai
          </p>
        </div>
        <p className="text-sm text-black/70 font-normal">
          {" "}
          Jl. Pembangunan No. 3, Gedung Balai Prajurit Garuda Emas, Kel. Padang
          Harapan, Kec. Gading Cempaka, Kota Bengkulu, Bengkulu.
        </p>
      </div>
      <div
        className={cn(
          "bg-[#e7e2dc] text-black relative shadow-lg border border-neutral-200 rounded-xl px-6 py-12 text-center mt-6 w-full flex flex-col gap-8",
          isVisible && "animate-slide-up",
        )}
      >
        <h3 className="text-2xl antic-didone-regular text-black">Resepsi</h3>
        <div className="flex flex-col gap-2">
          <h4 className="text-3xl font-medium text-black dancing-script">
            Sunday
          </h4>
          <div className="mt-1 flex items-center gap-2 justify-center">
            <p className="text-4xl dancing-script text-black">13</p>
            <span className="h-10 border-r border-black"></span>
            <div className="text-left text-sm text-black">
              <p>April</p>
              <p>2025</p>
            </div>
          </div>
          <p className="text-base font-medium text-black">
            10:30 WIB - Selesai
          </p>
        </div>
        <p className="text-sm text-black/70 font-normal">
          {" "}
          Jl. Pembangunan No. 3, Gedung Balai Prajurit Garuda Emas, Kel. Padang
          Harapan, Kec. Gading Cempaka, Kota Bengkulu, Bengkulu.
        </p>
      </div>
      <div className="px-6 py-20">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4789.58092346745!2d102.28289341130495!3d-3.8207882961369704!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e36ba9c44ecdf4b%3A0x5d7a92fe768b62fc!2sBalai%20Prajurit%20Garuda%20Emas!5e1!3m2!1sid!2ssg!4v1742830790919!5m2!1sid!2ssg"
          width="300"
          height="300"
          className="border-none"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <Link
        to="https://maps.app.goo.gl/DjSYRBa1XmBPT7eB6"
        target="_blank"
        className="rounded-full bg-neutral-700 text-white inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive h-9 px-4 py-2 has-[>svg]:px-3"
        style={{
          backgroundColor: "#404040",
          color: "#fff",
        }}
      >
        <MapPin className="size-4" />
        <AnimatedShinyText className="transition ease-out text-white">
          Location
        </AnimatedShinyText>
      </Link>
    </div>
  );
}

function WeddingWishes() {
  const { comments } = useLoaderData<typeof loader>();

  const [formData, setFormData] = React.useState({
    name: "",
    content: "",
    attendance: "",
  });

  const formRef = React.useRef<HTMLFormElement>(null);
  const attendanceRef = React.useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAttendanceChange = (value: string) => {
    setFormData((prev) => ({ ...prev, attendance: value }));
    if (attendanceRef.current) {
      attendanceRef.current.value = value;
    }
  };

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.reset();
    }
    setFormData({ name: "", content: "", attendance: "" });
  };

  const isDisabled =
    !formData.name || !formData.content
  return (
    <div className="w-full h-full relative">
      <div className="text-black py-20 px-3 text-center z-20">
        <div className="bg-[#e7e2dc] py-12 rounded-lg border border-black/10 shadow-xl max-w-[700px] xl:max-w-full mx-auto">
          <div>
            <h3 className="text-3xl mb-8 antic-didone-regular">
              Wedding Wishes
            </h3>
          </div>
          <Form method="POST" ref={formRef} onSubmit={handleSubmit}>
            <div className="px-6 flex flex-col gap-3">
              <Input
                type="text"
                placeholder="Nama"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="bg-[#f0f0f0] text-sm h-12"
              />
              <Textarea
                placeholder="Tulis harapanmu disini"
                name="content"
                maxLength={300}
                value={formData.content}
                onChange={handleChange}
                className="bg-[#f0f0f0] text-sm h-48"
              />
              <ToggleGroup
                variant="outline"
                type="single"
                value={formData.attendance}
                defaultValue="not-attend"
                onValueChange={handleAttendanceChange}
                className="inline-flex gap-0 -space-x-px rounded-lg bg-[#f0f0f0]"
              >
                <ToggleGroupItem
                  value="not-attend"
                  className="rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10 w-full h-12"
                  style={{
                    backgroundColor: formData.attendance ? "#f0f0f0" : "#262626",
                    color: formData.attendance ? "#000" : "#fff",
                  }}
                >
                  Tidak Hadir
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="attend"
                  className="rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10 w-full h-12 border-l border-l-black/10"
                  style={{
                    backgroundColor: !formData.attendance ? "#f0f0f0" : "#262626",
                    color: !formData.attendance ? "#000" : "#fff",
                  }}
                >
                  Hadir
                </ToggleGroupItem>
              </ToggleGroup>
              <input type="hidden" name="attendance" ref={attendanceRef} />
              <button
                className="bg-[#f0f0f0] h-13 rounded-lg text-black inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive px-4 py-2 has-[>svg]:px-3"
                type="submit"
                disabled={isDisabled}
                style={{
                  backgroundColor: isDisabled ? "#f0f0f0" : "#262626",
                  color: isDisabled ? "#000" : "#fff",
                }}
              >
                Kirim
              </button>
            </div>
          </Form>
          {!!comments.length && (
            <div className="w-full mt-12">
              <ScrollArea className="h-[380px] w-full rounded-md">
                <div className="flex flex-col gap-3">
                  {comments.map((comment) => {
                    const date = format(
                      new Date(comment.createdAt),
                      "dd MMMM yyyy hh:mm",
                      {
                        locale,
                      },
                    );
                    return (
                      <div
                        key={comment.id}
                        className="bg-[#e7e2dc] w-full rounded-lg py-4 px-8 text-left"
                      >
                        <h4 className="text-lg font-semibold">{comment.name}</h4>
                        <p className="text-base font-normal mt-2">
                          {comment.content}
                        </p>
                        <p className="mt-6 text-sm">
                          {comment.attendance ? "Hadir" : "Tidak Hadir"}
                        </p>
                        <span className="text-xs font-normal mt-2 text-black/50">
                          {date}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Gift() {
  const [isCopy, setIsCopy] = React.useState(false);
  return (
    <div className="w-full h-full max-w-[700px] xl:max-w-full mx-auto">
      <div className="bg-[#e7e2dc] text-black py-20 px-6 text-center">
        <div>
          <h3 className="text-3xl mb-8 antic-didone-regular">Wedding Gift</h3>
        </div>
        <div>
          <p className="text-base font-normal text-black/70 max-w-[350px] mx-auto">
            Your wishes, blessings, and prayers are the greatest gifts of all.
            However, if you wish to honor us with a gift, please know that we
            deeply appreciate your kindness and generosity.
          </p>
        </div>
        <div className="flex flex-col gap-12 mt-14">
          <div className="flex flex-col justify-center items-center gap-12 w-full">
            <img
              src="https://ver02.rumahpiatu.org/wp-content/uploads/2020/04/logo-mandiri.png"
              alt=""
              className="h-[55px] w-full object-contain"
            />
            <Hanny />
            <Ommi />
          </div>
          <div className="flex flex-col justify-center items-center gap-12 w-full my-12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="119"
              height="32"
              fill="none"
              viewBox="0 0 119 32"
            >
              <mask
                id="mask0_645_62"
                width="119"
                height="32"
                x="0"
                y="0"
                maskUnits="userSpaceOnUse"
                style={{ maskType: "luminance" }}
              >
                <path fill="#fff" d="M0 0h118.936v32H0z"></path>
              </mask>
              <g mask="url(#mask0_645_62)">
                <path
                  fill="#1877F2"
                  d="M0 8V0h31.858v8zm0 8h6.897a9.13 9.13 0 0 0 7.197 7.815 9.2 9.2 0 0 0 3.67 0 9.1 9.1 0 0 0 4.599-2.495A9.2 9.2 0 0 0 24.961 16h6.897a16 16 0 0 1-5.797 12.345 15.8 15.8 0 0 1-8.503 3.572 16.1 16.1 0 0 1-4.839-.242 15.8 15.8 0 0 1-6.922-3.328 16 16 0 0 1-5.08-7.59A16 16 0 0 1 0 16"
                ></path>
                <path
                  fill="#000"
                  d="M46.33 24.783q-1.664 0-3.083-.631a7.3 7.3 0 0 1-2.436-1.741 8.1 8.1 0 0 1-1.587-2.598 8.9 8.9 0 0 1-.571-3.2q0-1.71.54-3.182a8.3 8.3 0 0 1 1.495-2.583 6.9 6.9 0 0 1 2.282-1.741 6.66 6.66 0 0 1 2.897-.631q1.788 0 3.222.84 1.435.842 2.235 2.193V2.56h4.133v17.298q0 .633.215.902.215.27.74.3v3.424q-1.08.21-1.758.21-1.11 0-1.82-.541a1.97 1.97 0 0 1-.8-1.41l-.094-.993a5.8 5.8 0 0 1-2.42 2.267 7 7 0 0 1-3.19.767zm1.078-3.423a4.28 4.28 0 0 0 2.343-.75q.525-.362.942-.842c.27-.31.484-.667.631-1.05v-3.755a4.4 4.4 0 0 0-.694-1.216 5 5 0 0 0-1.017-.96 5.3 5.3 0 0 0-1.202-.647 3.5 3.5 0 0 0-1.248-.24 3.8 3.8 0 0 0-1.712.39 4 4 0 0 0-1.341 1.067 5.35 5.35 0 0 0-1.17 3.348 4.77 4.77 0 0 0 1.264 3.303c.394.424.87.76 1.402.99.57.246 1.184.369 1.802.36zm12.117 3.123V8.747h4.13v15.736zm0-17.928V2.56h4.13v3.995zm17.544 18.228q-1.911 0-3.33-.827a5.95 5.95 0 0 1-2.22-2.236v9.16h-4.13V8.747h3.606v2.702a6.5 6.5 0 0 1 2.313-2.177q1.417-.795 3.268-.796 1.634 0 3.02.645a7.5 7.5 0 0 1 2.39 1.743 8.1 8.1 0 0 1 1.573 2.583 8.7 8.7 0 0 1 .57 3.137 9.7 9.7 0 0 1-.523 3.213 8.2 8.2 0 0 1-1.466 2.614 6.8 6.8 0 0 1-2.235 1.74 6.4 6.4 0 0 1-2.836.632m-1.387-3.423a3.8 3.8 0 0 0 1.711-.39 4.1 4.1 0 0 0 1.34-1.053 4.9 4.9 0 0 0 .864-1.53 5.4 5.4 0 0 0 .309-1.803 5 5 0 0 0-.34-1.847 4.6 4.6 0 0 0-.94-1.486 4.38 4.38 0 0 0-3.19-1.351 4.3 4.3 0 0 0-2.344.75c-.347.24-.663.522-.94.84a3.5 3.5 0 0 0-.633 1.053v3.693a5.4 5.4 0 0 0 1.696 2.237q1.14.886 2.467.887m15.661 3.423a6.3 6.3 0 0 1-2.189-.375 5.3 5.3 0 0 1-1.757-1.052 4.9 4.9 0 0 1-1.155-1.576 4.7 4.7 0 0 1-.417-1.983 4.3 4.3 0 0 1 .508-2.057 4.75 4.75 0 0 1 1.42-1.605q.908-.66 2.172-1.038a9.7 9.7 0 0 1 2.775-.374c.707 0 1.415.058 2.111.18a8.8 8.8 0 0 1 1.835.51v-.901q0-1.56-.91-2.403-.909-.84-2.697-.84c-.862 0-1.719.152-2.528.45-.892.337-1.741.78-2.528 1.32l-1.265-2.551q3.114-2.012 6.722-2.012 3.484 0 5.41 1.667t1.927 4.82v4.896q0 .63.231.9.232.27.756.3v3.424c-.598.129-1.207.2-1.818.21q-1.173 0-1.805-.51c-.42-.338-.7-.82-.786-1.352l-.093-.871a7.1 7.1 0 0 1-2.62 2.103 7.7 7.7 0 0 1-3.299.72m1.172-2.943a5.5 5.5 0 0 0 1.989-.36q.94-.36 1.464-.961.677-.51.678-1.142v-1.801a10.3 10.3 0 0 0-1.603-.436 9 9 0 0 0-1.665-.165q-1.603 0-2.62.706-1.018.705-1.017 1.787-.001 1.02.8 1.696.803.675 1.974.676m12.054 5.707q.503.144 1.018.224.413.067.833.076c.253.002.505-.05.739-.151q.338-.15.617-.525.338-.486.555-1.036.278-.66.584-1.652l-6.381-15.736h4.256L111.168 21l3.884-12.253h3.884l-6.783 18.86a5.64 5.64 0 0 1-2.003 2.702q-1.418 1.05-3.515 1.05a6.6 6.6 0 0 1-2.066-.33z"
                ></path>
              </g>
            </svg>
            <OmmiDipay />
          </div>
          <div>
            <h3 className="text-2xl mb-4 antic-didone-regular">Kirim Hadiah</h3>
            <p className="text-base font-normal text-black/70 max-w-[300px] mx-auto">
              Jl. Flamboyan 1 No 28, Kel. Kebung Kenanga, Kec. Ratu Agung, Kota
              Bengkulu, Bengkulu.
            </p>
            <button
              className="mt-4 rounded-full bg-neutral-700 text-white inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive h-9 px-4 py-2 has-[>svg]:px-3"
              onClick={() => {
                navigator.clipboard.writeText(
                  "Jl. Flamboyan 1 No 28, Kebung Kenanga, Kota Bengkulu",
                );
                setIsCopy(true);
              }}
              style={{
                backgroundColor: "#404040",
                color: "#fff",
              }}
            >
              <AnimatedShinyText className="transition ease-out text-white">
                {isCopy ? "Berhasil disalin" : "Salin Alamat"}
              </AnimatedShinyText>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Hanny() {
  const [isCopy, setIsCopy] = React.useState(false);
  return (
    <div>
      <p className="text-base font-semibold text-black/70">
        HANNY DERISCA PRADITA
      </p>
      <p className="text-base font-normal mt-1 text-black/70">
        Bank Mandiri - 1790002327042
      </p>
      <button
        className="mt-4 rounded-full bg-neutral-700 text-white inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive h-9 px-4 py-2 has-[>svg]:px-3"
        onClick={() => {
          navigator.clipboard.writeText("1790002327042");
          setIsCopy(true);
        }}
        style={{
          backgroundColor: "#404040",
          color: "#fff",
        }}
      >
        <AnimatedShinyText className="transition ease-out text-white">
          {isCopy ? "Berhasil disalin" : "Salin No Rekening"}
        </AnimatedShinyText>
      </button>
    </div>
  );
}

function Ommi() {
  const [isCopy, setIsCopy] = React.useState(false);
  return (
    <div>
      <p className="text-base font-semibold text-black/70">
        OMMI PUTERA KARUNIA
      </p>
      <p className="text-base font-normal mt-1 text-black/70">
        Bank Mandiri - 1790003043853
      </p>
      <button
        className="mt-4 rounded-full bg-neutral-700 text-white inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive h-9 px-4 py-2 has-[>svg]:px-3"
        onClick={() => {
          navigator.clipboard.writeText("1790003043853");
          setIsCopy(true);
        }}
        style={{
          backgroundColor: "#404040",
          color: "#fff",
        }}
      >
        <AnimatedShinyText className="transition ease-out text-white">
          {isCopy ? "Berhasil disalin" : "Salin No Rekening"}
        </AnimatedShinyText>
      </button>
    </div>
  );
}

function OmmiDipay() {
  const [isCopy, setIsCopy] = React.useState(false);
  return (
    <div>
      <p className="text-base font-semibold text-black/70">
        Ommi Putera Karunia
      </p>
      <p className="text-base font-normal mt-1 text-black/70">
        No Dipay - 089508182045
      </p>
      <button
        className="mt-4 rounded-full bg-neutral-700 text-white inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive h-9 px-4 py-2 has-[>svg]:px-3"
        onClick={() => {
          navigator.clipboard.writeText("089508182045");
          setIsCopy(true);
        }}
        style={{
          backgroundColor: "#404040",
          color: "#fff",
        }}
      >
        <AnimatedShinyText className="transition ease-out text-white">
          {isCopy ? "Berhasil disalin" : "Salin No Dipay"}
        </AnimatedShinyText>
      </button>
    </div>
  );
}

function Thanks() {
  const ref = React.useRef<HTMLDivElement>(null);
  const isVisible = useIsVisible(ref);
  return (
    <div className="w-full h-full">
      <div className="bg-[#e7e2dc] text-black py-20 px-6 text-center">
        <div className={cn("", isVisible && "animate-slide-down")} ref={ref}>
          <span className="inline-flex justify-center">
            <FlowerIcon />
          </span>
          <h3 className="text-3xl mb-8 antic-didone-regular">Thank You</h3>
        </div>
        <div className={cn("", isVisible && "animate-slide-up")}>
          <p className="text-base font-normal text-black/70 max-w-[300px] mx-auto">
            Your presence is a treasure beyond words. As we embark on this
            journey of forever, we are grateful to have you by our side.
          </p>
        </div>
      </div>
      <img
        src="https://res.cloudinary.com/ommiputera/image/upload/v1742736004/WhatsApp_Image_2025-03-22_at_20.08.58_bqg4qr.jpg"
        alt=""
        className="h-[220px] w-full object-cover"
      />
      <div className="py-4 px-6 text-center">
        <p className="text-sm font-normal">
          Created with 🖤 by Ommi
        </p>
      </div>
    </div>
  );
}

function Gate() {
  const [moveUp, setMoveUp] = React.useState(false);

  const { enterFullscreen } = useFullscreen<HTMLDivElement>();
  const { setOpen, audioPlayerRef } = useContext();

  const [searchParams] = useSearchParams();
  const to = searchParams.get("to");
  return (
    <motion.div
      className="w-full h-screen fixed xl:max-w-[35vw] top-0 right-0 z-50"
      initial={{ x: 0 }}
      animate={{ x: moveUp ? 1500 : 0 }}
      transition={{ duration: 2, ease: "easeInOut" }}
    >
      <div className="absolute top-0 w-full mx-auto">
        <div className="relative w-full h-full">
          <img
            src="https://res.cloudinary.com/ommiputera/image/upload/v1742736005/WhatsApp_Image_2025-03-22_at_20.17.12_nzl2q6.jpg"
            alt=""
            className="h-svh object-cover w-full"
          />
          <div className="h-svh w-full bg-black/20 absolute top-0 left-0"></div>
        </div>
      </div>
      <div className="relative text-center h-svh w-full">
        <div className="absolute bottom-[5svh] w-full">
          <div className="w-full">
            <h1 className="text-sm mulish font-bold !text-white">
              WEDDING INVITATION
            </h1>
            <p className="text-sm mulish font-medium mt-1 !text-white">
              You are invited to The Wedding of
            </p>
          </div>
          <div className="w-full mt-6 mb-6">
            <p className="text-4xl font-medium dancing-script !text-white">
              Hanny & Ommi
            </p>
          </div>
          <div className="text-sm mulish mt-12 !text-white">
            Kepada Yth.
            <br />
            Bapak/Ibu/Saudara/i:
          </div>
          <div className="text-base font-semibold mt-2 text-white">
            {to || "Nama Undangan"}
          </div>
          <button
            className="mt-6 rounded-full bg-neutral-700 text-white inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive h-9 px-4 py-2 has-[>svg]:px-3"
            onClick={() => {
              setMoveUp(true);
              setOpen?.(true);
              enterFullscreen();
              audioPlayerRef?.current?.playAudio();
            }}
            style={{
              background: "#404040",
              color: "#fff",
            }}
          >
            <MailOpen className="size-4" style={{ color: "#fff" }} />
            <span className="!text-white" style={{ color: "#fff" }}>Open the Invitation</span>
          </button>
        </div>
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
    fill="currentColor"
    version="1.1"
    viewBox="0 0 511.999 511.999"
  >
    <path d="M255.531 410.099a7.604 7.604 0 0 0-7.604 7.604v31.935a7.604 7.604 0 0 0 15.208 0v-31.935a7.605 7.605 0 0 0-7.604-7.604M164.099 170.088l-19.579-16.249a7.604 7.604 0 0 0-9.712 11.702l19.579 16.249a7.57 7.57 0 0 0 4.852 1.753 7.605 7.605 0 0 0 4.86-13.455M133.23 322.321a7.606 7.606 0 0 0-10.307-3.066l-28.106 15.219a7.604 7.604 0 1 0 7.241 13.372l28.106-15.219a7.603 7.603 0 0 0 3.066-10.306M392.432 367.721l-20.262-18.066a7.604 7.604 0 0 0-10.12 11.35l20.262 18.066c1.45 1.293 7.088 3.485 10.735-.615a7.605 7.605 0 0 0-.615-10.735M255.707 53.568a7.604 7.604 0 0 0-7.604 7.604v32.112a7.604 7.604 0 0 0 15.208 0V61.171a7.604 7.604 0 0 0-7.604-7.603"></path>
    <path d="M489.585 312.969c-5.064-19.121-17.266-35.049-35.287-46.062-7.237-4.422-15.365-8.059-24.357-10.904 10.397-3.289 19.64-7.639 27.681-13.039 18.179-12.206 29.719-29.619 33.376-50.357 7.658-43.433-20.883-92.869-62.327-107.953-19.788-7.202-40.638-5.914-60.298 3.726-8.694 4.263-17.081 10.09-25.124 17.446 2.348-10.645 3.202-20.821 2.547-30.481-1.482-21.846-10.792-40.547-26.923-54.083-33.786-28.349-90.87-28.349-124.654 0-16.132 13.535-25.44 32.237-26.923 54.083-.658 9.701.205 19.922 2.576 30.615-13.504-12.368-27.924-20.471-42.849-23.943-20.863-4.853-41.868-.737-60.745 11.905a7.603 7.603 0 0 0-2.087 10.549 7.6 7.6 0 0 0 10.549 2.087c10.664-7.141 27.795-14.624 48.839-9.73 24.401 5.677 47.791 26.849 67.639 61.226a7.6 7.6 0 0 0 10.386 2.783 7.6 7.6 0 0 0 2.783-10.386c-15.998-27.71-23.372-52.633-21.919-74.077 1.195-17.62 8.639-32.65 21.525-43.463 27.995-23.491 77.109-23.491 105.104 0 12.887 10.813 20.33 25.842 21.525 43.463 1.455 21.444-5.92 46.368-21.919 74.077a7.602 7.602 0 0 0 2.783 10.387 7.6 7.6 0 0 0 10.386-2.783c15.998-27.71 33.896-46.558 53.195-56.02 15.857-7.775 32.593-8.844 48.402-3.09 34.341 12.499 58.898 55.033 52.552 91.023-2.921 16.567-12.215 30.528-26.877 40.373-17.844 11.981-43.115 18.057-75.112 18.057a7.604 7.604 0 0 0 0 15.208c55.94 0 91.756 18.915 100.853 53.258 8.628 32.576-9.79 73.569-41.057 91.381a7.603 7.603 0 1 0 7.527 13.212c17.714-10.09 32.504-26.676 41.644-46.7 9.364-20.52 11.703-42.463 6.586-61.788M56.533 111.455a7.604 7.604 0 0 0-10.714.913 107 107 0 0 0-3.547 4.444 7.604 7.604 0 0 0 1.481 10.65c1.373 1.037 6.697 3.333 10.65-1.481 1.028-1.252 2.001-2.576 3.043-3.812a7.604 7.604 0 0 0-.913-10.714"></path>
    <path d="m389.912 295.47-68.077-24.112q.753-3.188 1.192-6.484h18.38a7.604 7.604 0 0 0 0-15.208h-18.083a66.4 66.4 0 0 0-6.587-23.205l74.694-47.161a7.605 7.605 0 0 0-8.119-12.859L308.5 213.677a67.6 67.6 0 0 0-11.492-11.057l11.096-19.886a7.604 7.604 0 0 0-13.28-7.41l-10.915 19.561a66.3 66.3 0 0 0-20.6-5.468v-60.65a7.604 7.604 0 0 0-15.208 0v60.895c-14.738 1.905-27.985 8.612-38.114 18.512l-26.16-21.713a7.603 7.603 0 0 0-10.707.995 7.6 7.6 0 0 0 .995 10.707l26.269 21.803a67 67 0 0 0-3.825 6.773l-82.041-29.384a7.605 7.605 0 0 0-9.722 4.594 7.6 7.6 0 0 0 4.595 9.721l82.117 29.412a67 67 0 0 0-1.253 7.315h-25.919a7.604 7.604 0 0 0 0 15.208h25.919a66.4 66.4 0 0 0 4.224 16.904l-38.856 21.041a7.605 7.605 0 0 0-3.066 10.307c3.033 5.607 9.157 3.689 10.307 3.066l38.773-20.995a67.5 67.5 0 0 0 15.943 16.294l-11.529 19.456c-2.141 3.612-1.083 8.524 2.665 10.417 5.126 2.589 8.998-.269 10.417-2.665l11.693-19.732a66.4 66.4 0 0 0 17.079 4.618l.022 63.457a7.603 7.603 0 0 0 7.604 7.601h.003a7.603 7.603 0 0 0 7.601-7.606l-.022-63.165c14.334-1.365 27.356-7.276 37.622-16.265l41.776 37.248c1.45 1.293 6.507 3.364 10.735-.615 3.058-2.878 2.519-7.941-.615-10.735l-41.655-37.141a67 67 0 0 0 5.701-9.429l68.158 24.141c.839.297 7.27 1.957 9.706-4.629 1.457-3.941-.67-8.305-4.629-9.708m-133.191 12.235c-28.51 0-51.704-23.194-51.704-51.704s23.195-51.704 51.704-51.704c28.51 0 51.704 23.194 51.704 51.704s-23.194 51.704-51.704 51.704"></path>
    <path d="M414.176 423.638a7.606 7.606 0 0 0-8.124-7.048c-21.483 1.528-53.711-8.114-85.193-62.644a7.6 7.6 0 0 0-10.386-2.783 7.6 7.6 0 0 0-2.783 10.386c15.998 27.71 23.372 52.633 21.919 74.077-1.195 17.62-8.639 32.65-21.524 43.463-27.995 23.491-77.109 23.491-105.105 0-12.887-10.813-20.33-25.842-21.525-43.463-1.455-21.444 5.92-46.368 21.919-74.077a7.602 7.602 0 0 0-2.783-10.387 7.6 7.6 0 0 0-10.386 2.783c-15.998 27.71-33.896 46.558-53.194 56.02-15.857 7.775-32.594 8.844-48.402 3.09-34.341-12.499-58.898-55.033-52.552-91.023 2.922-16.567 12.215-30.528 26.877-40.373 17.844-11.981 43.115-18.057 75.112-18.057a7.604 7.604 0 0 0 0-15.208c-45.442 0-77.646-12.423-93.129-35.927-12.169-18.474-13.205-42.897-2.845-67.01a7.604 7.604 0 0 0-3.984-9.988 7.603 7.603 0 0 0-9.988 3.984c-12.416 28.897-10.916 58.558 4.117 81.379 8.283 12.574 23.187 26.705 49.917 35.163-10.395 3.289-19.638 7.639-27.679 13.038-18.179 12.206-29.719 29.62-33.376 50.357-7.658 43.433 20.885 92.869 62.327 107.953 19.789 7.202 40.639 5.914 60.298-3.726 8.694-4.263 17.081-10.09 25.125-17.446-2.348 10.645-3.202 20.821-2.547 30.481 1.481 21.846 10.791 40.547 26.923 54.083 16.892 14.174 39.609 21.262 62.327 21.262s45.435-7.088 62.327-21.262c16.131-13.535 25.441-32.237 26.923-54.083.655-9.668-.2-19.85-2.551-30.501 4.568 4.181 9.246 7.869 14.025 11.056 16.326 10.887 33.439 15.776 50.872 14.55a7.6 7.6 0 0 0 7.048-8.119"></path>
  </svg>
);
