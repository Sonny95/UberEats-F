import React from "react";
import Logo from "../Logo";
import Image from "next/image";
import facebook from "../../../public/images/facebook.png";
import instagram from "../../../public/images/instagram.png";
import gitHub from "../../../public/images/gitHub.png";

function Footer() {
  return (
    <div className="ml-8 mr-8">
      <div className="w-1/2 h-5/6 inline-block float-left">
        <Logo />
        <div className="mt-56">
          {/* <Image
            src="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/783bb4a82e5be29e.svg"
            alt="AppStore"
            width={150}
            height={120}
            className="inline-block mr-4"
            style={{ width: "auto", height: "auto" }}
          />
          <Image
            src="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/163bdc9b0f1e7c9e.png"
            alt="googlePlayStore"
            width={150}
            height={120}
            className="inline-block"
            style={{ width: "auto", height: "auto" }}
          /> */}
        </div>
      </div>

      {/* //TODO */}

      <div className="inline-block w-1/2 h-60 ">
        <div className="grid grid-cols-2 gap-4">
          <p className="mb-5 cursor-pointer">Get help</p>
          <p className="mb-5 cursor-pointer">Buy gift cards</p>
          <p className="mb-5 cursor-pointer">Add your restaurant</p>
          <p className="mb-5 cursor-pointer">Sign up to deliver</p>
          <p className="mb-5 cursor-pointer">Create a business account</p>
          <p className="mb-5 cursor-pointer">Promotions</p>
          <p className="mb-5 cursor-pointer">Restaurants near me</p>
          <p className="mb-5 cursor-pointer">View all cities</p>
          <p className="mb-5 cursor-pointer">Pick-up near me</p>
          <p className="mb-5 cursor-pointer">About Uber Eats</p>
        </div>
      </div>
      <div className="w-full bg-gray-300 h-0.5 mt-24 mb-16"></div>

      <div className="w-1/2 h-5/6 inline-block float-left ">
        {/* <Image src={facebook} alt="facebook" className="w-8 h-8 inline-block mr-4" />
        <Image src={instagram} alt="instagram" className="w-8 h-8 inline-block mr-4" />
        <Image src={gitHub} alt="github" className="w-8 h-8 inline-block mr-4" /> */}
      </div>

      <div className="inline-block w-1/4 h-28 float-right">
        <div className="grid grid-cols-3 gap-4">
          <p className="mb-5 cursor-pointer">Policy</p>
          <p className="mb-5 cursor-pointer">Terms</p>
          <p className="mb-5 cursor-pointer">Pricing</p>
        </div>
        <div className="float-right mt-4">© 2023 Uber Technologies Inc.</div>
      </div>
    </div>
  );
}

export default Footer;
