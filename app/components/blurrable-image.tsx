import * as React from "react";

import { cn } from "~/lib/utils";

const isServer = typeof document === "undefined";

function BlurrableImage({
  img,
  blurDataUrl,
  ...props
}: {
  img: React.ReactElement<React.ComponentProps<"img">>;
  blurDataUrl?: string;
} & React.HTMLAttributes<HTMLDivElement>) {
  let id = React.useId();
  let jsImgElRef = React.useRef<HTMLImageElement>(null);

  let [visible, setVisible] = React.useState(() => {
    if (isServer) return false;
    let el = document.getElementById(id);
    return (
      el instanceof HTMLImageElement && !el.classList.contains("opacity-0")
    );
  });

  React.useEffect(() => {
    if (!jsImgElRef.current) return;
    if (jsImgElRef.current.complete) {
      setVisible(true);
      return;
    }
    let current = true;
    jsImgElRef.current.addEventListener("load", () => {
      if (!jsImgElRef.current || !current) return;
      setTimeout(() => {
        setVisible(true);
      }, 0);
    });
    return () => {
      current = false;
    };
  }, []);

  let jsImgEl = React.cloneElement(img, {
    ref: jsImgElRef,
    id,
    suppressHydrationWarning: true,
    // @ts-expect-error
    "data-evt-onload": isServer
      ? "this.classList.remove('opacity-0')"
      : undefined,
    className: cn(
      "absolute h-full w-full",
      img.props.className,
      "transition-opacity",
      {
        "opacity-0": !visible,
      },
    ),
  });

  return (
    <div {...props} className={props.className}>
      {blurDataUrl ? (
        <>
          <img
            key={blurDataUrl}
            src={blurDataUrl}
            className={cn("absolute h-full w-full", img.props.className)}
            alt={img.props.alt}
          />
          <div
            className={cn(
              "absolute h-full w-full",
              img.props.className,
              "backdrop-blur-xl",
            )}
          />
        </>
      ) : null}
      {jsImgEl}
      <noscript className="absolute z-10 h-full w-full">{img}</noscript>
    </div>
  );
}

export { BlurrableImage };
