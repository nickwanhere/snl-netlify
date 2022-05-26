import type { MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import styles from "./styles/app.css";
import { useState, useEffect } from "react";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "SNL",
  viewport: "width=device-width,initial-scale=1",
  "msapplication-TileColor": "#da532c",
  "theme-color": "#ffffff",
});

import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";

import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader: LoaderFunction = async () => {
  return json({
    RECAPTCHA_PUBLIC: process.env.RECAPTCHA_PUBLIC,
  });
};

export default function App() {
  const [bClass, setBClass] = useState("");
  const env = useLoaderData();

  useEffect(() => {
    setBClass(window.location.href.split("/").pop());
  });

  return (
    <GoogleReCaptchaProvider reCaptchaKey={env.RECAPTCHA_PUBLIC}>
      <html lang="en">
        <head>
          <Meta />
          <Links />
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
        </head>
        <body className={bClass}>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    </GoogleReCaptchaProvider>
  );
}
