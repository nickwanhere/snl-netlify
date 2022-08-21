import { Link } from "@remix-run/react";
import { Fragment, useEffect, useState } from "react";
import { Popover, Transition, Menu } from "@headlessui/react";
import SocialIcon from "./_social";
import {
  BookmarkAltIcon,
  CalendarIcon,
  ChartBarIcon,
  CursorClickIcon,
  MenuIcon,
  PhoneIcon,
  PlayIcon,
  RefreshIcon,
  ShieldCheckIcon,
  SupportIcon,
  ViewGridIcon,
  XIcon,
} from "@heroicons/react/outline";

const Lang = ({ theme, lang }) => {
  const [baseurl, setBaseurl] = useState("");
  const [jpurl, setJpurl] = useState("");

  useEffect(() => {
    const b = location.pathname.replace("/jp/", "/");
    setBaseurl(b);

    let j = b.split("/");
    j[0] = "/jp";

    setJpurl(j.join("/"));
  }, []);
  return (
    <Menu as="div" className={"relative " + theme}>
      <Menu.Button>
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          className="fill-current "
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.5652 8.99999C12.5652 5.76015 11.211 2.78418 9.00016 0.597472L9.6805 0C12.05 2.3436 13.5 5.53159 13.5 8.99999C13.5 12.4684 12.05 15.6564 9.68031 18L9 17.4025C11.211 15.2158 12.5652 12.2398 12.5652 8.99999Z"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.5 8.99999C4.5 5.53158 5.95021 2.34359 8.31967 0L9 0.597472C6.78914 2.7842 5.43478 5.76016 5.43478 8.99999C5.43478 12.2398 6.78898 15.2158 8.99999 17.4025L8.31968 18C5.95003 15.6564 4.5 12.4684 4.5 8.99999Z"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9 0.857143C4.50291 0.857143 0.857143 4.50296 0.857143 9C0.857143 13.4971 4.50296 17.1429 9 17.1429C13.4971 17.1429 17.1429 13.4972 17.1429 9C17.1429 4.5029 13.4972 0.857143 9 0.857143ZM0 9C0 4.02958 4.02952 0 9 0C13.9706 0 18 4.02952 18 9C18 13.9706 13.9705 18 9 18C4.02958 18 0 13.9705 0 9Z"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M17.25 9.00007H0.75V8.18188H17.25V9.00007Z"
          />
        </svg>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Menu.Items className="font-light absolute right-0 left-0 mx-auto w-auto mt-2 origin-top flex flex-col items-center whitespace-nowrap text-[12px]">
          <Menu.Item>
            <a
              href={baseurl}
              className={
                "my-1 menu-item relative inline-block leading-normal pb-1 " +
                (theme == "text-white" ? "menu-item-white" : "")
              }
            >
              <span>EN</span>
            </a>
          </Menu.Item>
          <Menu.Item>
            <a
              href={jpurl}
              className={
                "my-1 menu-item relative inline-block leading-normal pb-1 " +
                (theme == "text-white" ? "menu-item-white" : "")
              }
            >
              <span>日本語</span>
            </a>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

const SocialMenu = ({ theme }) => {
  return (
    <Menu as="div" className={"relative " + theme}>
      <Menu.Button>
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          className="fill-current "
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="16" cy="9" r="2" transform="rotate(90 16 9)" />
          <circle cx="9" cy="9" r="2" transform="rotate(90 9 9)" />
          <circle cx="2" cy="9" r="2" transform="rotate(90 2 9)" />
        </svg>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Menu.Items className="absolute right-0 left-0 mx-auto w-auto mt-2 origin-top flex flex-col items-center whitespace-nowrap text-13px">
          <Menu.Item>
            <a
              href="https://www.facebook.com/koaniseko/"
              target="_blank"
              className={"my-1 " + theme}
            >
              <SocialIcon.FB className="w-5 h-5" />
            </a>
          </Menu.Item>
          <Menu.Item>
            <a
              href="https://open.spotify.com/user/gr1uz0qkiovsgp4yj59uy80j9"
              target="_blank"
              className={"my-1 " + theme}
            >
              <SocialIcon.Spotify className="w-5 h-5" />
            </a>
          </Menu.Item>
          <Menu.Item>
            <a
              href="https://www.instagram.com/koaniseko/"
              target="_blank"
              className={"my-1 " + theme}
            >
              <SocialIcon.Instagram className="w-4 h-4" />
            </a>
          </Menu.Item>
          <Menu.Item>
            <a
              href="https://www.youtube.com/channel/UCYtTE5fRcpUa1jHkyvgqxYw/videos"
              target="_blank"
              className={"my-1 " + theme}
            >
              <SocialIcon.Youtube className="w-4 h-4" />
            </a>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

const Logo = ({ theme }) => {
  return (
    <svg
      width="266"
      height="30"
      viewBox="0 0 266 30"
      fill="none"
      className={"max-w-[170px] lg:max-w-[266px]  fill-current " + theme}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_212_688)">
        <path d="M10.2991 18.7712C10.2991 20.1364 9.76635 21.2286 8.70093 22.0477C7.74206 22.7644 6.53458 23.1057 5.14953 23.1057C4.65234 23.1057 3.97757 22.9692 3.12523 22.7303C2.2729 22.4914 1.63364 22.3548 1.24299 22.3548C0.745794 22.3548 0.461682 22.5255 0.461682 22.8327H0V17.6791H0.603738C1.24299 20.7849 2.69907 22.3548 4.97196 22.3548C5.75327 22.3548 6.42804 22.1842 6.96075 21.7746C7.6 21.3651 7.88411 20.7507 7.88411 19.9999C7.88411 18.9419 6.99626 17.918 5.25607 16.9282L2.84112 15.5972C0.958878 14.5391 0 13.174 0 11.5699C0 10.5118 0.426168 9.5562 1.31402 8.73709C2.16636 7.91798 3.3028 7.50842 4.72336 7.50842C5.43364 7.50842 6.10841 7.64494 6.78318 7.88385C7.45794 8.12276 7.91963 8.25928 8.16822 8.25928C8.45234 8.25928 8.62991 8.12276 8.73645 7.81559H9.19813V12.3548H8.62991C7.91963 9.65859 6.67664 8.29341 4.82991 8.29341C4.11963 8.29341 3.51589 8.49818 2.98318 8.90774C2.41495 9.28317 2.13084 9.79511 2.13084 10.4436C2.13084 11.3992 2.98318 12.389 4.72336 13.3787L7.13832 14.778C9.26916 15.9726 10.2991 17.3036 10.2991 18.7712Z" />
        <path d="M30.1164 21.5699C28.5893 22.0136 26.9556 22.5255 25.2154 23.1057V20.2388C23.5818 22.1501 21.8061 23.1057 19.9238 23.1057C17.2958 23.1057 15.9818 21.3992 15.9818 17.9862V10.2729C15.9818 9.52209 15.8397 9.01014 15.5556 8.7371C15.2715 8.46407 14.6678 8.32755 13.8154 8.32755V7.84973H18.965V18.4299C18.965 19.2832 19.2136 19.9316 19.7108 20.4436C20.208 20.9214 20.8117 21.1944 21.522 21.1944C22.3388 21.1944 23.1201 20.9214 23.9014 20.4095C24.6827 19.8975 25.0734 19.3514 25.0734 18.8054V10.3753C25.0734 9.52209 24.8958 8.97601 24.5407 8.70297C24.1855 8.42994 23.5108 8.29342 22.5164 8.29342V7.84973H27.9855V19.4197C27.9855 20.6484 28.6958 21.1944 30.1164 21.1262V21.5699Z" />
        <path d="M48.8676 14.8464C48.8676 17.0989 48.1573 19.0102 46.7723 20.6143C45.3162 22.2867 43.4695 23.1058 41.3031 23.1058C40.1667 23.1058 39.1012 22.6279 38.1069 21.6723V27.4744C38.1069 28.8396 39.0657 29.5221 40.9835 29.5221V30.0341H32.6377V29.5221C34.3424 29.5221 35.1592 28.8396 35.1592 27.4744V11.0239C35.1592 10.3071 34.9816 9.86344 34.662 9.6928C34.3424 9.52215 33.6321 9.45389 32.6377 9.48802V9.04433L38.1069 7.47437V9.86344C39.3498 8.25935 40.9835 7.47437 43.0433 7.47437C44.9255 7.47437 46.3816 8.15696 47.4115 9.52215C48.4059 10.8532 48.8676 12.6279 48.8676 14.8464ZM45.8844 16.075C45.8844 14.0955 45.5648 12.4914 44.89 11.2969C44.1442 9.99996 43.0433 9.3515 41.6227 9.3515C40.2732 9.3515 39.1012 9.9317 38.1069 11.1262V19.5563C38.1069 20.1365 38.4975 20.6826 39.2433 21.2286C39.9891 21.7747 40.8059 22.0477 41.5872 22.0477C42.9368 22.0477 44.0022 21.3993 44.819 20.1365C45.5293 19.0102 45.8844 17.6791 45.8844 16.075Z" />
        <path d="M66.2333 17.5085C65.8071 19.0443 64.8838 20.3413 63.4987 21.4675C62.1137 22.5597 60.6576 23.1058 59.095 23.1058C57.2482 23.1058 55.7211 22.4573 54.4781 21.1262C53.0931 19.6928 52.3828 17.7815 52.3828 15.3583C52.3828 13.1058 53.0576 11.2286 54.3716 9.72692C55.6856 8.22522 57.3903 7.47437 59.4501 7.47437C61.3323 7.47437 62.8239 8.05457 63.9249 9.21498C65.0258 10.3754 65.594 11.8088 65.594 13.5494H54.8333C54.8333 15.6314 55.366 17.372 56.4314 18.7713C57.4968 20.1706 58.8109 20.8532 60.3735 20.8532C61.4744 20.8532 62.5753 20.4778 63.6052 19.6928C64.5641 19.0102 65.2389 18.1911 65.6651 17.2696L66.2333 17.5085ZM62.0426 12.4914C61.794 9.9317 60.6931 8.6689 58.7043 8.6689C56.4669 8.6689 55.1529 9.9317 54.7978 12.4914H62.0426Z" />
        <path d="M80.3681 9.11254C80.3681 10.1706 79.9064 10.7166 78.9831 10.7166C78.4859 10.7166 78.0597 10.5119 77.6691 10.1364C77.2784 9.76101 76.9233 9.55623 76.6392 9.55623C76.2485 9.55623 75.7868 9.86339 75.2541 10.4777C74.7214 11.0921 74.4728 11.7064 74.4728 12.3549V20.1706C74.4728 21.604 75.3607 22.3207 77.1008 22.3207V22.7985H68.9326V22.3207C70.6728 22.3207 71.5251 21.604 71.5251 20.1706V11.604C71.5251 10.3071 71.0635 9.62449 70.1756 9.5221C69.8205 9.5221 69.3943 9.59036 68.9326 9.79513V9.28319L74.4728 7.44019V10.4777C75.8578 8.46408 77.2074 7.44019 78.5569 7.44019C79.0541 7.44019 79.4803 7.61083 79.8709 7.918C80.1906 8.2593 80.3681 8.63473 80.3681 9.11254Z" />
        <path d="M99.049 22.7645H91.7331V22.2867C93.1892 22.2867 93.8995 21.5699 93.8995 20.1365V11.7747C93.8995 10.9556 93.6509 10.3413 93.1537 9.89757C92.6565 9.48802 92.0528 9.24911 91.307 9.24911C90.0285 9.24911 88.7499 9.89757 87.4714 11.1945V20.1706C87.4714 21.6041 88.2172 22.3208 89.6733 22.3208V22.7986H82.3574V22.3208C83.8135 22.3208 84.5593 21.6041 84.5593 20.1706V11.1262C84.5593 10.4095 84.4172 9.96583 84.0976 9.76105C83.8135 9.55628 83.2098 9.48802 82.3574 9.52215V9.04433L87.507 7.47437V10.2047C89.1051 8.39587 90.9163 7.47437 92.9051 7.47437C95.5686 7.47437 96.8827 9.18085 96.8827 12.5597V20.1706C96.8827 21.6041 97.5929 22.3208 99.049 22.3208V22.7645Z" />
        <path d="M117.409 15.2559C117.303 17.5426 116.486 19.4197 114.994 20.9214C113.503 22.4231 111.656 23.1398 109.454 23.1057C107.394 23.0716 105.654 22.2866 104.269 20.7849C102.849 19.2832 102.174 17.4402 102.174 15.2559C102.174 13.0033 102.849 11.1603 104.163 9.76098C105.548 8.25928 107.43 7.50842 109.809 7.50842C112.153 7.50842 114.071 8.22515 115.492 9.65859C116.877 11.1262 117.551 12.9692 117.409 15.2559ZM114.249 16.5869C114.249 14.3685 113.893 12.5596 113.183 11.1262C112.295 9.38556 110.981 8.49818 109.206 8.49818C107.963 8.49818 107.004 9.01013 106.329 10.1023C105.69 11.092 105.406 12.3548 105.406 13.9248C105.406 16.0408 105.796 17.8838 106.542 19.4197C107.43 21.1944 108.673 22.0818 110.271 22.0818C111.692 22.0818 112.757 21.4333 113.467 20.1364C113.964 19.1808 114.249 17.9862 114.249 16.5869Z" />
        <path d="M136.481 8.29342C135.735 8.29342 135.06 8.97601 134.456 10.4095L129.378 22.4231C129.2 22.8668 129.023 23.1057 128.845 23.1398C128.668 23.174 128.49 22.9351 128.241 22.4231L122.879 10.3753C122.239 9.01014 121.494 8.29342 120.57 8.29342V7.84973H127.353V8.32755C126.324 8.32755 125.791 8.63471 125.791 9.24905C125.755 9.52209 125.862 9.93164 126.039 10.4095L129.591 18.8054L132.681 10.9214C132.929 10.2388 133.071 9.69274 133.107 9.28318C133.142 8.60058 132.645 8.29342 131.615 8.29342V7.84973H136.445V8.29342H136.481Z" />
        <path d="M154.699 21.3651C154.238 21.7405 153.776 22.1159 153.314 22.4914C152.746 22.9009 152.213 23.1057 151.681 23.1057C150.26 23.1057 149.479 22.2525 149.266 20.5801C148.52 21.2627 147.632 21.8429 146.673 22.3548C145.714 22.8668 144.933 23.1398 144.365 23.1398C143.335 23.1398 142.482 22.7985 141.737 22.1501C140.991 21.5016 140.636 20.7166 140.636 19.7951C140.636 17.8497 141.772 16.3139 144.081 15.1876C145.643 14.4368 147.312 13.7542 149.195 13.1398V11.9112C149.195 9.48795 148.413 8.25928 146.886 8.25928C145.146 8.25928 144.294 8.73709 144.294 9.65859C144.294 9.86337 144.294 10.0682 144.329 10.2729C144.365 10.4777 144.4 10.7166 144.4 10.9897C144.4 11.3992 144.258 11.7746 143.939 12.1159C143.619 12.4572 143.264 12.5937 142.838 12.5937C142.376 12.5937 142.021 12.4914 141.737 12.2183C141.453 11.9794 141.311 11.6722 141.311 11.3309C141.311 10.1364 141.95 9.14665 143.228 8.42992C144.329 7.81559 145.537 7.50842 146.886 7.50842C148.733 7.50842 150.047 7.84972 150.828 8.56644C151.681 9.35143 152.107 10.6825 152.107 12.5937V19.9316C152.107 20.819 152.391 21.2286 152.924 21.2286C153.35 21.2286 153.882 20.9897 154.593 20.5118L154.699 21.3651ZM149.088 19.7951V13.9931C147.277 14.5733 146.034 15.0852 145.359 15.5289C144.187 16.2798 143.583 17.2354 143.583 18.3958C143.583 20.2388 144.436 21.1603 146.105 21.1603C147.028 21.092 148.023 20.6484 149.088 19.7951Z" />
        <path d="M197.813 13.6859H158.961V15.7678H197.813V13.6859Z" />
        <path d="M210.314 22.7645H202.075V22.2867C203.851 22.2867 204.739 21.57 204.739 20.1365V3.51536C204.739 2.90102 204.632 2.49147 204.419 2.28669C204.206 2.08191 203.815 1.94539 203.247 1.94539C202.928 1.94539 202.537 1.97952 202.075 2.01365V1.53584C203.212 1.2628 205.094 0.750853 207.686 0V20.1706C207.686 21.6041 208.574 22.3208 210.314 22.3208V22.7645Z" />
        <path d="M228.142 21.3651C227.68 21.7405 227.218 22.1159 226.757 22.4914C226.188 22.9009 225.656 23.1057 225.123 23.1057C223.702 23.1057 222.886 22.2525 222.708 20.5801C221.962 21.2627 221.074 21.8429 220.115 22.3548C219.157 22.8668 218.375 23.1398 217.807 23.1398C216.777 23.1398 215.925 22.7985 215.179 22.1501C214.433 21.5016 214.078 20.7166 214.078 19.7951C214.078 17.8497 215.215 16.3139 217.523 15.1876C219.086 14.4368 220.755 13.7542 222.637 13.1398V11.9112C222.637 9.48795 221.891 8.25928 220.364 8.25928C218.624 8.25928 217.772 8.73709 217.772 9.65859C217.772 9.86337 217.772 10.0682 217.807 10.2729C217.843 10.4777 217.843 10.7166 217.843 10.9897C217.843 11.3992 217.701 11.7746 217.381 12.1159C217.097 12.4572 216.706 12.5937 216.28 12.5937C215.818 12.5937 215.463 12.4914 215.179 12.2183C214.895 11.9794 214.753 11.6722 214.753 11.3309C214.753 10.1364 215.392 9.14665 216.671 8.42992C217.772 7.81559 218.979 7.50842 220.364 7.50842C222.211 7.50842 223.525 7.84972 224.306 8.56644C225.158 9.35143 225.585 10.6825 225.585 12.5937V19.9316C225.585 20.819 225.869 21.2286 226.401 21.2286C226.828 21.2286 227.36 20.9897 228.071 20.5118L228.142 21.3651ZM222.566 19.7951V13.9931C220.755 14.5733 219.512 15.0852 218.837 15.5289C217.665 16.2798 217.061 17.2354 217.061 18.3958C217.061 20.2388 217.914 21.1603 219.583 21.1603C220.506 21.092 221.465 20.6484 222.566 19.7951Z" />
        <path d="M246.893 22.7645H239.577V22.2867C241.034 22.2867 241.744 21.5699 241.744 20.1365V11.7747C241.744 10.9556 241.495 10.3413 240.998 9.89757C240.501 9.48802 239.862 9.24911 239.151 9.24911C237.873 9.24911 236.594 9.89757 235.351 11.1945V20.1706C235.351 21.6041 236.062 22.3208 237.553 22.3208V22.7986H230.237V22.3208C231.693 22.3208 232.439 21.6041 232.439 20.1706V11.1262C232.439 10.4095 232.297 9.96583 231.977 9.76105C231.658 9.55628 231.09 9.48802 230.237 9.52215V9.04433L235.387 7.47437V10.2047C236.985 8.39587 238.761 7.47437 240.749 7.47437C243.413 7.47437 244.727 9.18085 244.727 12.5597V20.1706C244.727 21.6041 245.437 22.3208 246.893 22.3208V22.7645Z" />
        <path d="M266 21.2627C264.295 21.7064 262.519 22.3549 260.708 23.174V20.7849C259.536 22.389 257.903 23.174 255.843 23.174C254.422 23.174 253.144 22.6279 251.972 21.5358C250.551 20.1365 249.841 18.2252 249.841 15.6996C249.841 13.4812 250.551 11.5699 251.972 9.93169C253.428 8.29347 255.168 7.47435 257.228 7.47435C258.79 7.47435 259.927 7.95217 260.708 8.87367V3.51531C260.708 2.76446 260.531 2.32077 260.175 2.18425C260.069 2.15012 259.465 2.11599 258.435 2.11599V1.4334C259.501 1.22862 261.241 0.716674 263.656 -0.0341797V19.3174C263.656 19.9999 263.833 20.4436 264.189 20.5802C264.402 20.6825 265.005 20.7508 266 20.7508V21.2627ZM260.708 19.3515V12.2184C260.708 11.0921 260.388 10.1706 259.714 9.488C259.039 8.80541 258.222 8.49824 257.263 8.49824C255.807 8.49824 254.671 9.14671 253.854 10.4778C253.215 11.604 252.86 13.0034 252.86 14.6757C252.86 16.6211 253.25 18.2593 254.031 19.5221C254.848 20.8873 255.914 21.5699 257.299 21.5699C258.187 21.5699 258.897 21.3993 259.394 21.0921C259.891 20.7849 260.317 20.2047 260.708 19.3515Z" />
      </g>
      <defs>
        <clipPath id="clip0_212_688">
          <rect width="266" height="30" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default function Header({ theme, hover, lang }) {
  const baseUrl = lang == "en" ? "/" : "/jp/";

  const menu = [
    {
      name: lang == "en" ? "About" : "スーパーノヴァ・ランドについて",
      href: baseUrl + "about",
      icon: ChartBarIcon,
    },
    {
      name: lang == "en" ? "Projects" : "プロジェクト",
      href: baseUrl + "projects",
      icon: CursorClickIcon,
    },
    {
      name: lang == "en" ? "Team" : "チーム",
      href: baseUrl + "team",
      icon: ShieldCheckIcon,
    },
    {
      name: lang == "en" ? "Press" : "プレス",
      href: baseUrl + "press",
      icon: ViewGridIcon,
    },
    {
      name: lang == "en" ? "Contact" : "お問い合わせ",
      href: baseUrl + "contact",
      icon: RefreshIcon,
    },
  ];

  return (
    <Popover className={hover ? "absolute w-full z-20 " : "relative"}>
      <div className="max-w-7xl mx-auto py-5 px-5 lg:px-3">
        <div className="flex justify-between items-center py-6 ">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link to={baseUrl}>
              <Logo theme={theme} />
            </Link>
          </div>
          <div className="-mr-2 -my-2 md:hidden ">
            <Popover.Button
              className={
                " rounded-md p-2 inline-flex items-center justify-center  focus:outline-none focus:ring-1 focus:ring-inset focus:ring-delta-400 " +
                theme
              }
            >
              <span className="sr-only">Open menu</span>{" "}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current "
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M21 18H3V17H21V18ZM21 12.5H8V11.5H21V12.5ZM21 7H3V6H21V7Z" />
              </svg>
            </Popover.Button>
          </div>
          <nav className={"hidden md:flex space-x-10 " + theme}>
            {menu.map((item, index) => {
              return (
                <Link
                  key={index}
                  className={
                    "text-[12px] menu-item relative inline-block leading-normal font-light " +
                    (theme == "text-white" ? "menu-item-white" : "")
                  }
                  to={item.href}
                >
                  <span>{item.name}</span>
                </Link>
              );
            })}

            <Lang theme={theme} lang={lang} />

            <SocialMenu theme={theme} />
          </nav>
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="fixed z-20 top-0 inset-x-0 transition transform origin-top-right md:hidden h-screen"
        >
          <div className="bg-delta-400  h-screen">
            <div className="flex flex-col items-center  pt-10 px-3 h-full">
              <div className="ml-auto">
                <Popover.Button className=" rounded-md p-2 inline-flex items-center justify-center text-gray-400  focus:outline-none focus:ring-1 focus:ring-inset focus:ring-cararra">
                  <span className="sr-only">Close menu</span>

                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="fill-current text-cararra hover:text-white"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12 11.2929L18.0104 5.28247L18.7175 5.98958L12.7071 12L18.7175 18.0104L18.0104 18.7175L12 12.7071L5.98962 18.7175L5.28251 18.0104L11.2929 12L5.2825 5.98959L5.98961 5.28249L12 11.2929Z"
                    />
                  </svg>
                </Popover.Button>
              </div>

              <div className="my-20">
                <nav className="flex flex-col items-center gap-y-8">
                  {menu.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="text-lg text-cararra font-light hover:text-white menu-item menu-item-white inline-block relative"
                    >
                      <span className="">{item.name}</span>
                    </a>
                  ))}
                </nav>
              </div>
              <div className="flex items-center justify-center font-light  mb-5">
                <a
                  href=""
                  className="mx-3 text-cararra hover:text-white text-13px menu-item menu-item-white inline-block relative"
                >
                  <span>EN</span>
                </a>
                <a
                  href=""
                  className="mx-3 text-cararra hover:text-white text-13px menu-item menu-item-white inline-block relative"
                >
                  <span>日本語</span>
                </a>
              </div>
              <div className="flex items-center  justify-center my-5">
                <a
                  href="https://www.facebook.com/supernovaland/"
                  className="mx-3 text-cararra hover:text-white"
                >
                  <SocialIcon.FB className="w-6 h-6" />
                </a>
                <a href="" className="mx-3 text-cararra hover:text-white">
                  <SocialIcon.Spotify className="w-6 h-6" />
                </a>
                <a
                  href="https://www.instagram.com/supernova__land"
                  className="mx-3 text-cararra hover:text-white"
                >
                  <SocialIcon.Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
