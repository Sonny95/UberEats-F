import React from "react";
import Image from "next/image";
import Link from "next/link";

function Logo() {
  return (
    <div>
      <Link href="/restaurant">
        <Image
          src="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/97c43f8974e6c876.svg"
          alt="Logo"
          width={300}
          height={150}
        />
      </Link>
    </div>
  );
}

export default Logo;
