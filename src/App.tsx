import { BrowserRouter, Route, Routes } from "react-router"
import NotFound404 from "./pages/NotFound404"
import CommonLayout from "./pages/layouts/common/CommonLayout"
import Home from "./pages/home/Home"
import 'primeicons/primeicons.css';
import { useMediaQuery } from "react-responsive";
import AboutUs from "./pages/aboutus/AboutUs";
import ContactUs from "./pages/contactus/ContactUs";
import type ISiteSettings from "./tools/interfaces/ISiteSettings";
import SiteSettingsContext from "./tools/contexts/SiteSettingsContext";
import FAQs from "./pages/faqs/FAQs";

function App() {
  const siteSettings : ISiteSettings = {
    isMobile: useMediaQuery({maxWidth: 768}),
    webAPIUrl: window.location.origin.includes('localhost')
      ? 'http://localhost:5000/api'
      : '<production url>'
  }

  return (
    <SiteSettingsContext.Provider value={siteSettings}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CommonLayout />}>
            <Route index element={<Home />} />
            <Route path='/aboutus' element={<AboutUs />} />
            <Route path='/contactus' element={<ContactUs />} />
            <Route path='/faqs' element={<FAQs />} />
            <Route path="*" element={<NotFound404 />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SiteSettingsContext.Provider>
  )
}

export default App
