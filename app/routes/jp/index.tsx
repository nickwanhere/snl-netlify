import { Link } from "@remix-run/react";
import Layout from "~/components/_layout";
import { useState, useEffect } from "react";
import Img from "~/components/_img";
import Flickity from "react-flickity-component";

import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getHome } from "~/components/api.js";
import type { LinksFunction, MetaFunction } from "@remix-run/{runtime}";

import { documentToHtmlString } from "@contentful/rich-text-html-renderer";

export const meta: MetaFunction = () => ({
  title: "Homepage - SNL",
});

const HpSlider = ({ mobile, children, setCurrentIndex }) => {
  const flickityOptions = {
    //contain: true,
    // freeScroll: true,
    // freeScrollFriction: 0.03,
    autoPlay: 5000,
    pauseAutoPlayOnHover: false,
    cellAlign: "left",
  };

  const [glide, setGlide] = useState(null);

  const setupFlicty = (el) => {
    el.on("change", function () {
      setCurrentIndex(el.selectedIndex);
    }).on("ready", function () {
      setCurrentIndex(0);
    });

    setGlide(el);
  };

  return (
    <>
      {!mobile && (
        <Flickity
          flickityRef={(c) => setupFlicty(c)}
          className={"carousel max-h-[800px] w-full "} // default ''
          elementType={"div"} // default 'div'
          options={flickityOptions} // takes flickity options {}
          disableImagesLoaded={false} // default false
          reloadOnUpdate={false} // default false
          static={true} // default false
        >
          {children}
        </Flickity>
      )}

      {mobile && <>{children}</>}
    </>
  );
};

export const loader: LoaderFunction = async () => {
  // This API call will request an entry with the specified ID from the space defined at the top, using a space-specific access token.
  const response = await getHome("jp");

  return json(response.data);
};

export default function Index() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mobile, setMobile] = useState(false);

  const content = useLoaderData();

  useEffect(() => {
    if (window.innerWidth < 768) {
      setMobile(true);
    } else {
      setMobile(false);
    }

    window.addEventListener(
      "resize",
      () => {
        if (window.innerWidth < 768) {
          setMobile(true);
        } else {
          setMobile(false);
        }
      },
      false
    );
  }, []);

  return (
    <Layout hover={true} theme={"text-black"} footer={false} lang={"jp"}>
      <div className="lg:h-[100vh]  relative overflow-hidden flex items-center pt-20 xxl:pt-0">
        <div className="pt-[30rem] lg:pt-0 hp-slider w-full lg:pl-[200px] overflow-hidden relative ">
          <div className="overflow-hidden">
            <HpSlider mobile={mobile} setCurrentIndex={setCurrentIndex}>
              {content.projectCollection.items.map((item, index) => {
                return (
                  <div className="slide lg:px-24" key={index}>
                    <div className=" flex justify-center lg:h-screen py-10 lg:py-24    ">
                      <div className="text-center">
                        <Link to={"/project/" + item.slug}>
                          <Img
                            className="no-drag max-h-[60vh] w-full"
                            src={item.thumbnail.url}
                          />
                          <h2 className="text-chicago text-base text-medium mt-5 mb-2 uppercase tracking-2em">
                            {item.title}
                          </h2>
                          <p className="text-delta-400 text-xs uppercase tracking-2em">
                            {item.subTitle}
                          </p>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </HpSlider>
          </div>
          <div
            className="absolute font-timesnow text-[28px]  lg:text-[48px] text-chicago font-light  left-3 lg:left-20 z-10 top-10 lg:top-24 h-[300px] lg:h-[400px] hptext"
            dangerouslySetInnerHTML={{
              __html: content.homeCollection.items[0].heading,
            }}
          ></div>
        </div>

        <div>
          <div></div>
          {/* <div className="absolute bottom-10 right-10  justify-end -mx-1 mt-2 hidden lg:flex">
            {content.projectCollection.items.map((item, index) => {
              return (
                <svg
                  role="alert"
                  aria-live="assertive"
                  key={index}
                  className={"progress progress-bar mx-1 "}
                >
                  <rect x="1" y="1" className="border" rx="15" ry="15" />
                  <rect
                    x="1"
                    y="1"
                    className={
                      (currentIndex == index ? " filling" : " ") +
                      (currentIndex > index ? " done" : " ")
                    }
                    rx="15"
                    ry="15"
                  />
                </svg>
              );
            })}
          </div> */}
          <div className="absolute italic right-10 lg:right-auto lg:left-20 xs:top-96 lg:bottom-10 text-[13px] text-chicago font-timesnow flex items-center xs:transform xs:rotate-90 xs:origin-right  ">
            スクロールして探す
            <svg
              width="22"
              height="5"
              viewBox="0 0 22 5"
              fill="none"
              className="ml-2"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 4.5L20 4.5L16 0.5" stroke="#616153" />
            </svg>
          </div>
          <div
            className="xs:top-[29rem] absolute left-0 right-0 mx-auto text-lg lg:bottom-5 px-10 lg:w-6/12 leading-[1.4em] font-timesnow text-center text-chicago"
            dangerouslySetInnerHTML={{
              __html: documentToHtmlString(
                content.homeCollection.items[0].footer.json
              ),
            }}
          ></div>
        </div>
      </div>
    </Layout>
  );
}
