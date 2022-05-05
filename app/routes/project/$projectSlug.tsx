import { Link } from "remix";
import Layout from "../../components/_layout";
import CusSlider from "../../components/slider";
import Img from "../../components/_img";

import invariant from "tiny-invariant";

import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getProject } from "../../components/api.js";

import { documentToHtmlString } from "@contentful/rich-text-html-renderer";

import type { LinksFunction, MetaFunction } from "@remix-run/{runtime}";

export const meta: MetaFunction = ({ data, params }) => {
  if (!data) {
    return {
      title: "Missing Project",
    };
  }

  const project = data.projectCollection.items[0];
  return {
    title: `${project.title} - SNL`,
    // description: shake.summary,
  };
};

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.projectSlug, "Expected params.projectSlug");

  // This API call will request an entry with the specified ID from the space defined at the top, using a space-specific access token.
  const response = await getProject(params.projectSlug);

  return json(response.data);
};

export default function Index() {
  const content = useLoaderData();

  const project = content.projectCollection.items[0];

  return (
    <Layout theme={"text-white"} footer={true} hover={true}>
      <div className="  overflow-hidden ">
        <div
          className="text-white h-[90vh] lg:h-screen flex items-center justify-center lg:mb-10 bg-no-repeat bg-center bg-cover"
          style={{ backgroundImage: "url(" + project.heroBanner.url + ")" }}
        >
          <div>
            <h1 className="block text-center leading-zero text-white text-[40px] lg:text-[48px] font-timesnow text-light ">
              {project.title}
            </h1>
            <p className="uppercase text-xs lg:text-base tracking-[.2em] text-center">
              {project.subTitle}
            </p>
          </div>
        </div>

        {project.blocksCollection.items.map((item, index) => {
          const layout = item?.bottomText ? "layout1" : "layout2";

          return (
            <>
              {item.__typename == "ImageLeftTextRight" && (
                <div
                  className="container mx-auto  px-4 lg:px-0 my-24"
                  data-aos="moveup"
                  data-aos-duration={1000}
                >
                  <div className="w-10/12 mx-auto">
                    <div className="flex -mx-4 flex-wrap justify-between -mx-20">
                      <div className="w-full lg:w-6/12 px-20 order-2 lg:order-1 mt-10 lg:mt-0">
                        <Img src={item.image.url} />
                      </div>
                      <div className="w-full lg:w-6/12 px-20 items-center flex justify-center  order-1 lg:order-2">
                        <div>
                          <div
                            className="text-left rich-text"
                            dangerouslySetInnerHTML={{
                              __html: documentToHtmlString(item.text.json),
                            }}
                          ></div>
                          {item.link && item.link != "" && (
                            <a
                              href={item.link}
                              target="_blank"
                              className="uppercase text-xs font-medium font-beviet tracking-[.2em] mt-5 inline-block text-chicago inline-flex items-center border-b pb-1 border-transparent hover:border-chicago transition"
                            >
                              VISIT SITE{" "}
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
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {item.__typename == "MagazineRow" && (
                <div
                  className="container mx-auto  px-4 lg:px-0 my-24"
                  data-aos="moveup"
                  data-aos-duration={1000}
                >
                  <div className="w-10/12 mx-auto">
                    <div className="flex -mx-20 flex-wrap font-timesnow text-base text-chicago">
                      <div className="w-full lg:w-6/12 flex flex-col  px-20">
                        {item.topText && (
                          <div
                            className={
                              "pb-10  w-full lg:w-10/12 mx-auto text-left leading-relaxed " +
                              (layout == "layout1"
                                ? "lg:py-24 "
                                : "lg:pt-24 lg:pb-14 ")
                            }
                            dangerouslySetInnerHTML={{
                              __html: documentToHtmlString(item.topText.json),
                            }}
                          ></div>
                        )}
                        <div className="text-center ">
                          {item.imagesCollection.items.map((item, index) => {
                            return (
                              <>
                                {layout == "layout1" && (
                                  <Img
                                    src={
                                      index == 0
                                        ? item.size1
                                        : index == 1
                                        ? item.size2
                                        : item.size3
                                    }
                                    className={
                                      "mb-10 " +
                                      (index == 1 ? " " : " block lg:hidden")
                                    }
                                  />
                                )}
                                {layout == "layout2" && (
                                  <figure
                                    className={
                                      " aniimg mb-10 inline-block " +
                                      (index == 1
                                        ? "  mb-10 lg:mb-[90px] "
                                        : " block lg:hidden mb-10")
                                    }
                                  >
                                    <img
                                      className="img mx-auto block"
                                      src={index == 2 ? item.size2 : item.size1}
                                    />
                                  </figure>
                                )}
                              </>
                            );
                          })}
                        </div>

                        {item.bottomText && (
                          <div
                            className=" lg:py-24 w-full lg:w-10/12 mx-auto text-left   leading-relaxed"
                            dangerouslySetInnerHTML={{
                              __html: documentToHtmlString(
                                item.bottomText.json
                              ),
                            }}
                          ></div>
                        )}
                      </div>
                      <div
                        className={
                          "w-6/12 px-4 hidden lg:flex flex-wrap " +
                          (layout == "layout1"
                            ? "justify-center"
                            : "justify-end ")
                        }
                      >
                        {item.imagesCollection.items.map((item, index) => {
                          return (
                            <>
                              {layout == "layout1" &&
                                (index != 1 ? (
                                  <figure
                                    className={
                                      " aniimg mb-10 last:mb-0 " +
                                      (index == 1 ? " " : " mb-20")
                                    }
                                  >
                                    <img
                                      className="img mx-auto block"
                                      src={index == 0 ? item.size1 : item.size3}
                                    />
                                  </figure>
                                ) : (
                                  <></>
                                ))}
                              {layout == "layout2" &&
                                (index != 1 ? (
                                  <figure
                                    className={
                                      " aniimg mb-10 last:mb-0 " +
                                      (index == 1 ? " " : " mb-20")
                                    }
                                  >
                                    <img
                                      className="img mx-auto block"
                                      src={index == 0 ? item.size1 : item.size2}
                                    />
                                  </figure>
                                ) : (
                                  <></>
                                ))}
                            </>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {item.__typename == "ImagesRow" && (
                <div
                  className="container mx-auto px-4 lg:px-0 my-24"
                  data-aos="moveup"
                  data-aos-duration={1000}
                >
                  <div className="w-full lg:w-10/12  mx-auto ">
                    <div className="flex flex-wrap lg:flex-nowrap -mx-4   font-timesnow text-base text-chicago">
                      {item.imagesCollection.items.map((item, index) => {
                        return (
                          <div className="w-full lg:w-auto px-4 mb-8 lg:mb-0 grow">
                            <Img src={item.url} alt="" />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {item.__typename == "Gallery" && (
                <div
                  className="container mx-auto my-24 "
                  data-aos="moveup"
                  data-aos-duration={1000}
                >
                  <div className="w-full lg:w-10/12 mx-auto">
                    <CusSlider slides={item.galleryCollection.items} />
                  </div>
                </div>
              )}

              {item.__typename == "ExternalBlock" && (
                <div
                  className="bg-cover bg-center bg-no-repeat mt-24 py-24 lg:py-0 lg:min-h-[30em] flex items-center justify-center"
                  style={{ backgroundImage: "url(" + item.image.url + ")" }}
                  data-aos="moveup"
                  data-aos-duration={1000}
                >
                  <div className="w-11/12 lg:w-6/12 text-center">
                    <h4
                      className="font-timesnow text-[32px] lg:text-5xl text-white leading-tight"
                      dangerouslySetInnerHTML={{
                        __html: documentToHtmlString(item.text.json),
                      }}
                    ></h4>
                    {item.linnk && item.linnk != "" && (
                      <a
                        href={item.linnk}
                        target="_blank"
                        className="transition  uppercase border py-4 text-xs px-10 inline-block mt-5 text-white mx-auto border-white  hover:bg-white hover:text-chicago text-medium tracking-[.2em]"
                      >
                        Visit site
                      </a>
                    )}
                  </div>
                </div>
              )}
            </>
          );
        })}
        <div className="container mx-auto my-6 px-4 ">
          <div className="w-full lg:w-10/12  mx-auto flex justify-center  ">
            <div className="w-6/12 border-r border-chicago">
              <a className="inline-flex text-chicago text-lg lg:text-[32px] items-center font-timesnow">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-[30px]"
                >
                  <circle
                    opacity="0.5"
                    r="19.5"
                    transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 20 20)"
                    stroke="#616153"
                  />
                  <path opacity="0.5" d="M28 22L13 22L17 18" stroke="#616153" />
                </svg>
                Koa House Furano
              </a>
            </div>
            <div className="w-6/12 text-right">
              <a className="inline-flex text-chicago text-lg lg:text-[32px] items-center font-timesnow">
                Koa House Furano
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  className="ml-[30px]"
                >
                  <circle
                    opacity="0.5"
                    cx="20"
                    cy="20"
                    r="19.5"
                    transform="rotate(-90 20 20)"
                    stroke="#616153"
                    className="ml-2"
                  />
                  <path opacity="0.5" d="M12 22L27 22L23 18" stroke="#616153" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
