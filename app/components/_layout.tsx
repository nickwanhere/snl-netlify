import { Link } from "remix";
import Header from "./_header";
import SocialIcon from "./_social";
import AOS from "aos";
import { useEffect } from "react";

const Footer = ({ footer }) => {
  return (
    <footer className={footer ? "" : "block lg:hidden"}>
      <div className={"bg-delta-400 py-5 "}>
        <div className="containner px-3 text-cararra text-center py-8">
          <div className="mb-8">
            <a href="/privacy" className="mx-4 text-13px text-medium">
              Privacy Policy
            </a>{" "}
            <a href="/terms" className="mx-4 text-13px text-medium">
              Terms & Condition
            </a>
          </div>
          <div className="my-8 flex justify-center items-center">
            <a className="mx-3 text-cararra">
              <SocialIcon.FB className="w-6 h-6" />
            </a>
            <a className="mx-3 text-cararra">
              <SocialIcon.Spotify className="w-6 h-6" />
            </a>
            <a className="mx-3 text-cararra">
              <SocialIcon.Instagram className="w-5 h-5" />
            </a>
          </div>
          <div className="text-sm">
            <p>
              Supernova Land Ltd <br />
              Unit 2, G/F., Aberdeen Marina Tower
              <br /> 8 Shum Wan Road, Aberdeen, Hong Kong
            </p>
          </div>
        </div>
      </div>
      <div className="bg-delta-500 text-sm text-center text-cararra py-4">
        All Rights Reserved © Supernova Land Ltd
      </div>
    </footer>
  );
};

const Layout = ({ children, theme, footer, hover }) => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <div>
      <Header theme={theme} hover={hover} />

      {children}
      <Footer footer={footer} />
    </div>
  );
};

export default Layout;
