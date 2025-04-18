import { Suspense } from "react";
import dynamic from "next/dynamic";

const Slider = dynamic(() => import("./Slider").then((mod) => mod.Slider), {
  ssr: false,
});

export const Portfolio = () => (
  <>
    <Suspense fallback={null}>
      <Slider />
    </Suspense>
  </>
);
