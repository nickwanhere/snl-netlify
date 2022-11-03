import { Link } from "remix";
import Layout from "~/components/_layout";
import CusSlider from "~/components/slider";

import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getTeam } from "~/components/api.js";

import { useState } from "react";

import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import type { LinksFunction, MetaFunction } from "@remix-run/{runtime}";

export const meta: MetaFunction = () => ({
  title: "团队 - SNL",
});

export const loader: LoaderFunction = async () => {
  // This API call will request an entry with the specified ID from the space defined at the top, using a space-specific access token.
  const response = await getTeam("cn");

  return json(response.data);
};

const TeamCard = ({ item, showmore }: { item: any; showmore: any }) => {
  const [opened, setOpened] = useState(false);
  return (
    <div className=" w-full lg:w-6/12 pb-10 mb-10  lg:pb-0 lg:mb-20 border-b lg:px-10  lg:border-b-0 lg:even:border-l border-[#DBDBCF]">
      <h3 className="text-3xl text-chicago font-timesnow mb-3">{item.name}</h3>
      <p className="text-[10px] uppercase text-delta-400 tracking-[.2em]">
        {item.jobTitle}
      </p>
      <div
        className={
          "font-timesnow text-base my-4 leading-8 overflow-hidden transition-all text-ellipsis    " +
          (opened ? "max-h-[auto]" : "max-h-[220px] readmore")
        }
        dangerouslySetInnerHTML={{
          __html: documentToHtmlString(item.bio?.json),
        }}
      ></div>
      {showmore && (
        <button
          className="uppercase text-xs font-medium tracking-[.2em] flex items-center"
          onClick={() => {
            setOpened(!opened);
          }}
        >
          展开
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={
              "h-4 w-4 transform transition-all " + (opened ? "rotate-180" : "")
            }
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>
      )}
    </div>
  );
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
    <Layout hover={false} theme={"text-black"} footer={true} lang={"cn"}>
      <div className=" text-center ">
        <h1 className="block  leading-zero text-chicago text-[40px] lg:text-[48px]  font-timesnow text-light mb-10">
          {teamPage.title}
        </h1>
        <div className="half-bg half-bg-team">
          <div className="w-full lg:w-6/12 mx-auto text-base font-timesnow text-chicago px-4 relative z-[1] pb-[30px] lg:pb-[50px]">
            <div className="mx-auto block ">
              <CusSlider slides={teamPage.galleryCollection.items} />
            </div>{" "}
            <div
              className="mt-14 lg:mb-[100px]"
              dangerouslySetInnerHTML={{
                __html: documentToHtmlString(teamPage.subText.json),
              }}
            ></div>
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
            <i className="font-extralight">幕后</i>英雄
          </h2>
          <div className="flex flex-wrap text-chicago lg:-mx-10">
            {teamPage.teamMembersCollection.items.map((_item, index) => {
              return (
                <TeamCard item={_item} key={index} showmore={index == 0} />
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}
