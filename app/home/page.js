import Layout from "../../layout/layout";
import { Box, Grid } from "@mui/material";
import Carousel from "./Carousel";
import Brands from "./Brands";
import Count from "./Count";
import Portfolio from "./Portfolio";
import Testimonials from "./Testimonial";
import WhatWeDo from "./Whatwedo";
import Services from "./services";
import Steps from "./Steps";

export default function Home() {
  return (
    <Layout title="Home">
      <Box>
        <Carousel />

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
