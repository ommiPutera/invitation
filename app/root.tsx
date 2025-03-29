import React from "react";
import {
  data,
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "react-router";
import { getToast } from "remix-toast";

import { Toaster } from "./components/ui/toaster";

import { useToast } from "./hooks/useToast";

import type { Route } from "./+types/root";

import appStyles from "./app.css?url";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Antic+Didone&family=Dancing+Script:wght@400..700&family=Mulish:ital,wght@0,200..1000;1,200..1000&display=swap",
  },
  { rel: "stylesheet", href: appStyles },
  { rel: "manifest", href: "/site.webmanifest" },
];

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { toast, headers } = await getToast(request);
  return data({ toastData: toast }, { headers });
};

export function Layout({ children }: { children: React.ReactNode }) {
  const { toastData } = useLoaderData<typeof loader>();

  const { toast } = useToast();
  React.useEffect(() => {
    switch (toastData?.type) {
      case "success":
        toast({ title: toastData?.message, variant: "success" });
        break;
      case "error":
        toast({ title: toastData?.message, variant: "destructive" });
        break;
      case "info":
        toast({ title: toastData?.message, variant: "default" });
        break;
      default:
        break;
    }
  }, [toast, toastData]);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover,maximum-scale=1" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <Toaster />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
