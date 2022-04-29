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

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "SNL",
  viewport: "width=device-width,initial-scale=1",
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
  const env = useLoaderData();
  return (
    <GoogleReCaptchaProvider reCaptchaKey={env.RECAPTCHA_PUBLIC}>
      <html lang="en">
        <head>
          <Meta />
          <Links />
        </head>
        <body>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    </GoogleReCaptchaProvider>
  );
}
