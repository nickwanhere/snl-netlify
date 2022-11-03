import Layout from "~/components/_layout";
import { useForm } from "react-hook-form";

import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { useState, useEffect, useCallback } from "react";

import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

import axios from "axios";

import type { LinksFunction, MetaFunction } from "@remix-run/{runtime}";

export const meta: MetaFunction = () => ({
  title: "联系我们 - SNL",
});
export const loader: LoaderFunction = async () => {
  // This API call will request an entry with the specified ID from the space defined at the top, using a space-specific access token.
  return json({
    ENV: {
      FORM_SPREE_END_POINT: process.env.FORM_SPREE_END_POINT,
      RECAPTCHA_PUBLIC: process.env.RECAPTCHA_PUBLIC,
    },
  });
};

const Form = ({ env }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [serverRes, setServerRes] = useState("");
  const [gtoken, setGToken] = useState("");

  function onSubmit(data) {
    if (gtoken) {
      const payload = { ...data, ...{ "g-recaptcha-response": gtoken } };
      axios({
        method: "POST",
        url: env.ENV.FORM_SPREE_END_POINT,
        data: payload,
      })
        .then((response) => {
          setServerRes("ありがとうございます。メッセージが送信されました。");
        })
        .catch((error) => {
          console.log(error);
          // setServerRes(error.response.data.error);
        });
    }
  }

  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      console.log("Execute recaptcha not yet available");
      return;
    }

    const token = await executeRecaptcha("contact");

    // Do whatever you want with the token
    setGToken(token);
  }, [executeRecaptcha]);

  useEffect(() => {
    handleReCaptchaVerify();
  }, [handleReCaptchaVerify]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-10">
        <label className="text-chicago font-timesnow text-lg block mb-1">
          名字
        </label>
        <input
          className="border-b border-delta-400 appearance-none bg-transparent block w-full placeholder:text-xs font-beviet placeholder:text-delta-400 py-3 focus:outline-none tracking-[.2em] text-sm"
          autoComplete="off"
          placeholder="请输入名字"
          {...register("first_name", { required: true })}
        />
        {errors.first_name && (
          <p className="text-sm text-red-600 text-beviet">这是一个必填字段。</p>
        )}
      </div>
      <div className="mb-10">
        <label className="text-chicago font-timesnow text-lg block mb-1">
          姓氏
        </label>
        <input
          className="border-b border-delta-400 appearance-none bg-transparent block w-full placeholder:text-xs font-beviet placeholder:text-delta-400 py-3 focus:outline-none tracking-[.2em] text-sm"
          autoComplete="off"
          placeholder="请输入姓氏"
          {...register("last_name", { required: true })}
        />
        {errors.last_name && (
          <p className="text-sm text-red-600 text-beviet">这是一个必填字段。</p>
        )}
      </div>

      <div className="mb-10">
        <label className="text-chicago font-timesnow text-lg block mb-1">
          电子邮箱
        </label>
        <input
          className="border-b border-delta-400 appearance-none bg-transparent block w-full placeholder:text-xs font-beviet placeholder:text-delta-400 py-3 focus:outline-none tracking-[.2em] text-sm"
          autoComplete="off"
          placeholder="请输入电子邮件"
          type="email"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <p className="text-sm text-red-600 text-beviet">这是一个必填字段。</p>
        )}
      </div>

      <div className="mb-10">
        <label className="text-chicago font-timesnow text-lg block mb-1">
          主题
        </label>
        <input
          className="border-b border-delta-400 appearance-none bg-transparent block w-full placeholder:text-xs font-beviet placeholder:text-delta-400 py-3 focus:outline-none tracking-[.2em] text-sm"
          autoComplete="off"
          placeholder="请输入主题"
          type="text"
          {...register("subject", { required: true })}
        />
        {errors.email && (
          <p className="text-sm text-red-600 font-beviet">这是一个必填字段。</p>
        )}
      </div>

      <div className="mb-10">
        <label className="text-chicago font-timesnow text-lg block mb-1">
          内容
        </label>
        <textarea
          className="border-b border-delta-400 appearance-none bg-transparent block w-full placeholder:text-xs font-beviet placeholder:text-delta-400 py-3 focus:outline-none tracking-[.2em] text-sm"
          autoComplete="off"
          placeholder="请输入内容"
          rows={4}
          {...register("message", { required: true })}
        ></textarea>
        {errors.message && (
          <p className="text-sm text-red-600 text-beviet">这是一个必填字段。</p>
        )}
      </div>
      <button
        type="submit"
        className="w-8/12 lg:w-4/12 bg-chicago text-cararra mx-auto py-5 uppercase font-beviet text-xs tracking-[.2em] block mt-10 "
      >
        提出
      </button>

      {serverRes && (
        <p className="font-timesnow my-5 font-bold text-center">{serverRes}</p>
      )}
      <p className="italic font-timesnow text-base mt-8 lg:w-10/12 mx-auto leading-relaxed text-center text-extralight">
        本网站受reCAPTCHA保护，适用谷歌隐私政策和服务条款。
      </p>
    </form>
  );
};

export default function Index() {
  const env = useLoaderData();

  return (
    <Layout hover={false} theme={"text-black"} footer={true} lang={"cn"}>
      <div className=" text-center pb-20 lg:pb-40 px-4">
        <h1 className="block mb-[40px] lg:mb-14 leading-zero text-chicago text-[40px] lg:text-[48px]  font-timesnow text-light ">
          联系我们
        </h1>
        <div className="w-full lg:w-6/12 mx-auto text-base font-timesnow text-chicago mb-10 lg:mb-20">
          <p className="">
            如欲进一步了解我们的开发活动和项目地点，敬请联系我们。我们的团队将尽速回复您的咨询，也期待能与您面谈。
          </p>
        </div>
        <div className="w-full lg:w-4/12 mx-auto text-base font-timesnow text-chicago lg:px-7">
          <div className="mx-auto block text-left">
            <Form env={env} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
