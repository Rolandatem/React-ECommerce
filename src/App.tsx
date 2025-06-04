import { BrowserRouter, Route, Routes } from "react-router"
import NotFound404 from "./pages/NotFound404"
import CommonLayout from "./pages/layouts/common/CommonLayout"
import Home from "./pages/home/Home"
import 'primeicons/primeicons.css';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound404 />} />
        <Route path="/" element={<CommonLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
