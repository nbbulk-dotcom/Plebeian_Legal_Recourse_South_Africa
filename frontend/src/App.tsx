import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DocumentGenerator from "./pages/DocumentGenerator";
import ConstitutionalAnalyzer from "./pages/ConstitutionalAnalyzer";
import LawyerAccountability from "./pages/LawyerAccountability";
import CaseTracker from "./pages/CaseTracker";
import PublicDashboard from "./pages/PublicDashboard";
import ShakiraChoonaraCase from "./pages/ShakiraChoonaraCase";
import AboutPage from "./pages/AboutPage";

export default function App(){
  return (
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/documents/generate" element={<DocumentGenerator/>} />
      <Route path="/analysis" element={<ConstitutionalAnalyzer/>} />
      <Route path="/lawyers" element={<LawyerAccountability/>} />
      <Route path="/cases" element={<CaseTracker/>} />
      <Route path="/dashboard" element={<PublicDashboard/>} />
      <Route path="/shakira-choonara" element={<ShakiraChoonaraCase/>} />
      <Route path="/about" element={<AboutPage/>} />
    </Routes>
  );
}
