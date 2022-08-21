import { Link } from "remix";
import Layout from "~/components/_layout";

import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getAbout } from "~/components/api.js";

import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import type { LinksFunction, MetaFunction } from "@remix-run/{runtime}";

export const meta: MetaFunction = ({ data }) => ({
  title: `${data.aboutCollection.items[0].title} - SNL`,
});

export const loader: LoaderFunction = async () => {
  // This API call will request an entry with the specified ID from the space defined at the top, using a space-specific access token.
  const response = await getAbout("jp");

  return json(response.data);
};

export default function Index() {
  const content = useLoaderData();

  const aboutPage = content.aboutCollection.items[0];

  return (
    <Layout hover={false} theme={"text-black"} footer={true} lang={"jp"}>
      <div className=" text-center">
        <h1 className="block lg:mb-14 leading-zero text-chicago text-[40px] lg:text-[48px] font-timesnow text-light ">
          {aboutPage.title}
        </h1>
        <div className="px-4 half-bg">
          <img
            src={aboutPage.image.url}
            className="mx-auto block relative z-[1]"
            alt=""
          />
        </div>
      </div>
      <div className="bg-mercury2 pb-[50px] lg:pb-[100px] ">
        <div
          className="container mx-auto max-w-6xl pt-10 lg:pt-20 px-4"
          data-aos="moveup"
          data-aos-duration={1000}
        >
          <div className="flex   flex-wrap -mx-4">
            <div className="w-full px-4 ">
              <h3 className="text-medium text-[10px] lg:text-xs text-delta-400 mb-5 uppercase tracking-[.2em]">
                Supernova Land
              </h3>
            </div>
            <div className="px-4 w-full lg:w-4/12 ">
              <h2
                className="text-chicago text-[32px] lg:text-[56px] leading-none text-light font-timesnow mb-8"
                dangerouslySetInnerHTML={{
                  __html: documentToHtmlString(aboutPage.leftText.json),
                }}
              ></h2>
            </div>
            <div
              className="px-4 text-chicago font-timesnow text-base w-full lg:w-6/12 ml-auto rich-text"
              dangerouslySetInnerHTML={{
                __html: documentToHtmlString(aboutPage.rightText.json),
              }}
            ></div>
          </div>
        </div>
      </div>
      <div
        className="container mx-auto px-4"
        data-aos="moveup"
        data-aos-duration={1000}
      >
        <div className="lg:w-6/12 w-full mx-auto my-14  lg:my-120px text-delta-400">
          <div
            className="italic mb-4 text-chicago font-timesnow font-extralight text-lg lg:text-2xl text-chicago"
            dangerouslySetInnerHTML={{
              __html: documentToHtmlString(aboutPage.quote.json),
            }}
          ></div>
          <p className="text-medium text-[10px] lg:text-sm uppercase tracking-[.2em]">
            {aboutPage.quotePerson}
          </p>
        </div>
      </div>
    </Layout>
  );
}
