import Glide from "@glidejs/glide";
import { useState, useEffect } from "react";

const CusSlider = ({ slides }) => {
  const [slider, setSlider] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  var settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    arrows: false,
    slidesToScroll: 1,
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 5000,
    afterChange: (current) => {
      setCurrentSlide(current);
      slider.slickGoTo(current);
    },
  };

  var capsettings = {
    dots: false,
    infinite: false,
    speed: 800,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    cssEase: "linear",
  };

  useEffect(() => {
    let caption = new Glide(".caption-slider", {
      keyboard: false,
    }).mount();

    let mainGlide = new Glide(".main-slider", {
      autoplay: 5000,
      animationDuration: 1200,
    });

    mainGlide.on("move", function () {
      setCurrentSlide(mainGlide.index);
      caption.go("=" + mainGlide.index);
    });

    mainGlide.mount();
  }, []);

  return (
    <div className="relative">
      <div className="glide main-slider">
        <div data-glide-el="track" className="glide__track">
          <ul className="glide__slides">
            {slides.map((item, index) => {
              return (
                <li className="glide__slide" key={index}>
                  <img src={item.url} className="w-full" />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap">
        <div className="captions text-center lg:text-left text-base font-timesnow text-chicago italic w-full lg:w-6/12">
          <div className="glide caption-slider pointer-events-none">
            <div data-glide-el="track" className="glide__track">
              <ul className="glide__slides fade">
                {slides.map((item, index) => {
                  return (
                    <li className="glide__slide" key={index}>
                      {item.description}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-6/12 flex justify-center lg:justify-end -mx-1 mt-5 lg:mt-2">
          {slides.map((item, index) => {
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
                    (currentSlide == index ? " filling" : " ") +
                    (currentSlide > index ? " done" : " ")
                  }
                  rx="15"
                  ry="15"
                />
              </svg>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CusSlider;
