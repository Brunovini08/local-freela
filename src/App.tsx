import { Routes, Route } from "react-router"
import Home from "./pages/Home"
import { ClientConfig } from "./pages/ClientConfig"
function App() {



  return (
    <div>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/config" element={<Home />} />
          <Route path="/settings" element={<ClientConfig />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
