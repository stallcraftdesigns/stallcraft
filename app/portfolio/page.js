import { Box } from "@mui/material";
import PortfolioPage from "./portfolio";
import TopBar from "../TopBar";

export default function Home() {
  return (
    <Box>
      <TopBar />
      <PortfolioPage />
    </Box>
  );
}
