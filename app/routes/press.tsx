import { Link } from "remix";
import Layout from "../components/_layout";

import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getPress } from "../components/api.js";

import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import type { LinksFunction, MetaFunction } from "@remix-run/{runtime}";

export const meta: MetaFunction = () => ({
  title: "Press - SNL",
});

export const loader: LoaderFunction = async () => {
  // This API call will request an entry with the specified ID from the space defined at the top, using a space-specific access token.
  const response = await getPress();

  return json(response.data);
};

export default function Index() {
  const content = useLoaderData();

  const press_items = content.pressCollection.items;
  return (
    <Layout hover={false} theme={"text-black"} footer={true}>
      <div className=" text-center pb-20 lg:pb-40">
        <h1 className="block mb-[40px] lg:mb-14 leading-zero text-chicago text-[40px] lg:text-[64px] font-timesnow text-light ">
          Press
        </h1>

        <div className="container mx-auto">
          <div className="w-full  mx-auto text-base  text-chicago px-4 lg:px-7 overflow-hidden">
            {press_items.map((item, index) => {
              const left = index % 2 === 0;
              return (
                <div
                  className="border-b border-[#DBDBCF] pb-14 mb-14 lg:pb-20 lg:mb-20"
                  key={index}
                  data-aos="moveup"
                  data-aos-duration="1000"
                >
                  <div className="mx-auto block text-left flex flex-wrap -mx-4 lg:-mx-8   ">
                    <div
                      className={
                        "px-4 lg:px-8 w-full lg:w-7/12 " +
                        (left ? "" : "lg:order-2 lg:ml-auto")
                      }
                    >
                      <img src="/assets/press.png" className="w-full" />
                    </div>
                    <div
                      className={
                        "px-4 w-full lg:w-5/12 flex items-center mt-10 lg:mt-0 " +
                        (left ? "lg:pr-20" : "lg:order-1 lg:pl-20")
                      }
                    >
                      <div className="w-full">
                        <h2 className="text-xs font-beviet text-delta-400 uppercase tracking-[.2em] mb-6">
                          {item.title}
                        </h2>
                        <div
                          className="font-timesnow text-chicago text-[24px] lg:text-[32px] leading-tight mb-5"
                          dangerouslySetInnerHTML={{
                            __html: documentToHtmlString(item.text.json),
                          }}
                        ></div>
                        <a
                          href={item.linnk}
                          target="_blank"
                          className="uppercase text-xs font-medium tracking-[.2em]"
                        >
                          Read more
                          <svg
                            width="13"
                            height="13"
                            viewBox="0 0 13 13"
                            className="stroke-current inline-block ml-1"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M2.82843 11.8284L11.3136 3.34308L5.6244 3.3756"
                              stroke="#616153"
                            />
                            <path d="M12 6.5V12H6" stroke="#616153" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}
