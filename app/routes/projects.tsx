import { Link } from "@remix-run/react";
import Layout from "../components/_layout";
import Img from "../components/_img";

import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getProjects } from "../components/api.js";

import type { LinksFunction, MetaFunction } from "@remix-run/{runtime}";

export const meta: MetaFunction = () => ({
  title: "Projects - SNL",
});

export const loader: LoaderFunction = async () => {
  // This API call will request an entry with the specified ID from the space defined at the top, using a space-specific access token.
  const response = await getProjects();

  return json(response.data);
};

export default function Index() {
  const content = useLoaderData();

  const classSwitch = [
    "w-full lg:w-6/12 px-2 mb-20 lg:mb-0 flex items-center justify-center",
    "w-8/12 mr-4 ml-auto mb-20 lg:w-4/12 px-2 lg:mx-auto lg:pt-40 lg:-mb-40 flex items-center justify-center",
    "w-8/12 ml-4 mr-auto mb-20 lg:w-4/12 px-2 lg:mx-auto flex items-center justify-center",
    "w-full mb-20 lg:w-6/12 lg:px-2 lg:pt-96 lg:pb-10 flex items-center justify-center",
  ];

  return (
    <Layout hover={false} theme={"text-black"} footer={true}>
      <div className=" text-center ">
        <h1 className="block mb-[40px] lg:mb-0 leading-zero text-chicago text-[40px] lg:text-[64px] font-timesnow text-light ">
          Projects
        </h1>

        <div className="container mx-auto overflow-hidden">
          <div className="flex -mx-2 flex-wrap lg:pb-20 ">
            {content.projectCollection.items.map((item, index) => {
              const realIndex = index % 4;

              return (
                <div
                  className={classSwitch[realIndex]}
                  key={index}
                  data-aos="moveup"
                  data-aos-duration={index * 1000}
                >
                  <div>
                    <Link to={"/project/" + item.slug}>
                      <Img src={item.thumbnail.url} className="w-full" />
                      <h2 className="text-chicago text-base text-medium mt-5 mb-2 uppercase tracking-2em">
                        {item.title}
                      </h2>
                      <p className="text-delta-400 text-xs uppercase tracking-2em">
                        {item.subTitle}
                      </p>
                    </Link>
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
