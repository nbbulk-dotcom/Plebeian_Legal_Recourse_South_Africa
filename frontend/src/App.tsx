import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import DocumentGenerator from './pages/DocumentGenerator'
import ConstitutionalAnalyzer from './pages/ConstitutionalAnalyzer'
import LawyerAccountability from './pages/LawyerAccountability'
import CaseTracker from './pages/CaseTracker'
import PublicDashboard from './pages/PublicDashboard'
import ShakiraChoonaraCase from './pages/ShakiraChoonaraCase'
import AboutPage from './pages/AboutPage'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/documents" element={<DocumentGenerator />} />
          <Route path="/constitutional-analyzer" element={<ConstitutionalAnalyzer />} />
          <Route path="/lawyer-accountability" element={<LawyerAccountability />} />
          <Route path="/case-tracker" element={<CaseTracker />} />
          <Route path="/dashboard" element={<PublicDashboard />} />
          <Route path="/shakira-choonara-case" element={<ShakiraChoonaraCase />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
