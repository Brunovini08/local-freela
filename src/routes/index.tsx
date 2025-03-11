import { LandingPage } from "@/pages/LandingPage"
import { Route, Routes } from "react-router"
import { PrivateRoutes } from "./PrivateRoutes"
import Home from "@/pages/Home"
import { ClientConfig } from "@/pages/ClientConfig"
import { Profile } from "@/pages/Profile"

export const Approuter = () => {
  return(
    <Routes>
      <Route path="/" element={<LandingPage />}/>
      <Route path="/home" element={<PrivateRoutes><Home /></PrivateRoutes>} />
      <Route path="/settings" element={<PrivateRoutes><ClientConfig /></PrivateRoutes>} />
      <Route path="/profile" element={<PrivateRoutes><Profile /></PrivateRoutes>} />
    </Routes>
  )
}