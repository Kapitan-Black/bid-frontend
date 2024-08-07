import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./layout/Layout";
import BidFormPage from "./pages/BidFormPage";
import HotelsPage from "./pages/HotelsPage";
import ReadyBidPage from "./pages/ReadyBidPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route
        path="/bid-page"
        element={
          <Layout>
            <BidFormPage />
          </Layout>
        }
      />

      <Route
        path="/ready-bids"
        element={
          <Layout>
            <ReadyBidPage />
          </Layout>
        }
      />

      <Route
        path="/hotels"
        element={
          <Layout>
            <HotelsPage />
          </Layout>
        }
      />

      <Route path="/ready-form" element={<span>Huivam</span>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
