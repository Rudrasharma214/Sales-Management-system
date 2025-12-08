import { BrowserRouter, Routes, Route } from "react-router-dom";
import SalesPage from "../pages/SalesPage.jsx";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SalesPage />} />
      </Routes>
    </BrowserRouter>
  );
}