import { Link } from "remix";
import Layout from "../components/_layout";
import CusSlider from "~/components/slider";

import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getTeam } from "../components/api.js";

import { documentToHtmlString } from "@contentful/rich-text-html-renderer";

export const loader: LoaderFunction = async () => {
  // This API call will request an entry with the specified ID from the space defined at the top, using a space-specific access token.
  const response = await getTeam();

  return json(response.data);
};

export default function Index() {
  const content = useLoaderData();

  const teamPage = content?.team;
  var slides = [
    {
      image: "/assets/team.png",
      caption:
        "From left: Justin Potter, Joseph Luk, Jason Cheung and Jason Kuok",
    },
    {
      image: "/assets/team.png",
      caption:
        "From left: Justin Potter, Joseph Luk, Jason Cheung and Jason Kuok2",
    },
    {
      image: "/assets/team.png",
      caption:
        "From left: Justin Potter, Joseph Luk, Jason Cheung and Jason Kuok3",
    },
    {
      image: "/assets/team.png",
      caption:
        "From left: Justin Potter, Joseph Luk, Jason Cheung and Jason Kuok4",
    },
  ];

  return (
    <Layout hover={false} theme={"text-black"} footer={true}>
      <div className=" text-center ">
        <h1 className="block  leading-zero text-chicago text-[40px] lg:text-[64px] font-timesnow text-light ">
          {teamPage.title}
        </h1>
        <div className="w-full lg:w-6/12 mx-auto text-base font-timesnow text-chicago px-4">
          <div
            className="mb-14 lg:mb-[100px]"
            dangerouslySetInnerHTML={{
              __html: documentToHtmlString(teamPage.subText.json),
            }}
          ></div>
        </div>
        <div className="half-bg half-bg-team">
          <div className="w-full lg:w-8/12 mx-auto text-base font-timesnow text-chicago px-4 relative z-[1] pb-[50px] lg:pb-[100px]">
            <div className="mx-auto block ">
              <CusSlider slides={teamPage.galleryCollection.items} />
            </div>
          </div>
        </div>
      </div>

      <div
        className="container mx-auto px-4"
        data-aos="moveup"
        data-aos-duration="2000"
      >
        <div className="lg:w-9/12 w-full mx-auto my-20 lg:my-120px text-delta-400">
          <h2 className="font-timesnow text-[32px] lg:text-5xl text-chicago text-center mb-20 ">
            Behind the <i className="font-extralight">curtains</i>
          </h2>
          <div className="flex flex-wrap text-chicago lg:-mx-10">
            {teamPage.teamMembersCollection.items.map((_item, index) => {
              return (
                <div
                  className=" w-full lg:w-6/12 pb-10 mb-10  lg:pb-0 lg:mb-20 border-b lg:px-10  lg:border-b-0 lg:even:border-l border-[#DBDBCF]"
                  key={index}
                >
                  <h3 className="text-3xl text-chicago font-timesnow mb-3">
                    {_item.name}
                  </h3>
                  <p className="text-[10px] uppercase text-delta-400 tracking-[.2em]">
                    {_item.jobTitle}
                  </p>
                  <div
                    className="font-timesnow text-base my-4 leading-8"
                    dangerouslySetInnerHTML={{
                      __html: documentToHtmlString(_item.bio?.json),
                    }}
                  ></div>
                  <a className="uppercase text-xs font-medium tracking-[.2em]">
                    Read more
                    <svg
                      width="17"
                      height="5"
                      viewBox="0 0 17 5"
                      className="stroke-current inline-block ml-1"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M0 4.5L15 4.5L11 0.5" />
                    </svg>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}