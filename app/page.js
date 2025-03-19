import Layout from "../layout/layout";
import { Box } from "@mui/material";
import Carousel from "./home/Carousel";
import Brands from "./home/Brands";
import Count from "./home/Count";
import Portfolio from "./home/Portfolio";
import Testimonials from "./home/Testimonial";
import WhatWeDo from "./home/Whatwedo";
import Services from "./home/services";
import Steps from "./home/Steps";
import TopBar from "./TopBar";

export default function Home() {
  return (
    <Layout title="Home">
      <Box>
        <Carousel />
        <TopBar />
        {/* What We Do - Updated Design with Image */}
        <WhatWeDo />

        {/* Process Steps - Left to Right Flow */}
        <Steps />

        {/* Counts Section */}
        <Count />

        {/* Our Services */}
        <Services />

        {/* Our Portfolio Carousel */}
        <Portfolio />

        {/* Testimonials Slider */}
        <Testimonials />

        {/* Trusted Brands  */}
        <Brands />
      </Box>
    </Layout>
  );
}
