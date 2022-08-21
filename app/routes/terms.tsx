import { Link } from "remix";
import Layout from "../components/_layout";

import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getPage } from "../components/api.js";

import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import type { LinksFunction, MetaFunction } from "@remix-run/{runtime}";

export const meta: MetaFunction = () => ({
  title: "Terms - SNL",
});

export const loader: LoaderFunction = async () => {
  // This API call will request an entry with the specified ID from the space defined at the top, using a space-specific access token.
  const response = await getPage("terms");

  return json(response.data);
};

export default function Index() {
  const content = useLoaderData();

  const page = content.staticPageCollection.items[0];

  return (
    <Layout hover={false} theme={"text-black"} footer={true} lang={"en"}>
      <div className=" text-center">
        <h1 className="block lg:mb-14 leading-zero text-chicago text-[40px] lg:text-[48px] font-timesnow text-light ">
          {page.title}
        </h1>

        <div className="container mx-auto max-w-6xl pt-10 pb-40  px-4">
          <div
            className="px-4 text-chicago font-timesnow text-base w-full ml-auto rich-text text-left"
            dangerouslySetInnerHTML={{
              __html: documentToHtmlString(page.content.json),
            }}
          ></div>
        </div>
      </div>
    </Layout>
  );
}
