
"use client";

import { Carousel } from "flowbite-react";

export function Slider() {
  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
      <Carousel>
      <img src="https://resource.logitechg.com/w_1800,h_1800,c_limit,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/gaming/en/products/g915-tkl/g915-white-update/g915-tkl-feature-07-desktop-w.png?v=1" alt="..." />

        <img src="https://row.hyperx.com/cdn/shop/files/bg_0aa47d22-8045-453b-b557-34fb33c329c8_2808x.jpg?v=1633111941" alt="..." />
        <img src="https://assets.xboxservices.com/assets/1d/b8/1db8a7b7-7165-4f1f-976f-ea86e9b3c1cc.jpg?n=284993_Page-Hero-1084_1920x720.jpg" alt="..." />
        <img src="https://resource.logitechg.com/content/dam/gaming/en/astro-series-lp/2024-update/astro-hero-banner-desktop.jpg" alt="..." />
        {/* <img src="https://flowbite.com/docs/images/carousel/carousel-5.svg" alt="..." /> */}
      </Carousel>
    </div>
  );
}
