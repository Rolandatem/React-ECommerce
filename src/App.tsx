import { BrowserRouter, Route, Routes } from "react-router"
import NotFound404 from "./pages/NotFound404"
import CommonLayout from "./pages/layouts/common/CommonLayout"
import Home from "./pages/home/Home"
import 'primeicons/primeicons.css';
import { useMediaQuery } from "react-responsive";
import type { ISiteSettings } from "./tools/interfaces";
import { SiteSettingsContext } from "./tools/contexts";

function App() {
  const siteSettings : ISiteSettings = {
    isMobile: useMediaQuery({maxWidth: 768})
  }

  return (
    <SiteSettingsContext.Provider value={siteSettings}>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFound404 />} />
          <Route path="/" element={<CommonLayout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SiteSettingsContext.Provider>
  )
}

export default App
