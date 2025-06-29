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
import AllFAQs from "./pages/faqs/AllFAQS";
import { ToastProvider } from "./behaviors/toastification/ToastProvider";
import ListPage from "./pages/listPage/ListPage";
import ProductPage from "./pages/productPage/ProductPage";
import Checkout from "./pages/checkout/Checkout";
import ThankYou from "./pages/thankyou/ThankYou";

function App() {
  const siteSettings : ISiteSettings = {
    isMobile: useMediaQuery({maxWidth: 768}),
    webAPIUrl: window.location.origin.includes('localhost')
      ? 'http://localhost:5000/api'
      : '<production url>'
  }

  return (
    <SiteSettingsContext.Provider value={siteSettings}>
      <ToastProvider isMobile={siteSettings.isMobile}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<CommonLayout />}>
              <Route index element={<Home />} />
              <Route path='/aboutus' element={<AboutUs />} />
              <Route path='/contactus' element={<ContactUs />} />
              <Route path='/faqs' element={<FAQs />} />
              <Route path='/faqs/all' element={<AllFAQs />} />
              <Route path='/list/:option?' element={<ListPage />} />
              <Route path='/product/:sku?' element={<ProductPage />} />
              <Route path='/checkout' element={<Checkout />} />
              <Route path='/thankyou' element={<ThankYou />} />
              <Route path="*" element={<NotFound404 />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </SiteSettingsContext.Provider>
  )
}

export default App
