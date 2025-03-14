import { LandingPage } from "@/pages/LandingPage"
import { Route, Routes } from "react-router"
import { PrivateRoutes } from "./PrivateRoutes"
import Home from "@/pages/Home"
import { ClientConfig } from "@/pages/ClientConfig"
import { Profile } from "@/pages/Profile"
import { CategoriesPage } from "@/pages/CategoriesPage"
import { CategoryPage } from "@/pages/CategoryPage"
import AuthCallback from "@/utils/AuthCallback"
import { UserConfig } from "@/pages/UserConfig"

export const Approuter = () => {
  return(
    <Routes>
      <Route path="/" element={<LandingPage />}/>
      <Route path="/home" element={<PrivateRoutes route={"/home"}><Home /></PrivateRoutes>} />
      <Route path="/settings" element={<PrivateRoutes route={"/config"}><ClientConfig /></PrivateRoutes>} />
      <Route path="/profile" element={<PrivateRoutes route={"/profile"}><Profile /></PrivateRoutes>} />
      <Route path="/categories" element={<CategoriesPage />} />
      <Route path="/category/:id" element={<CategoryPage />} />
      <Route path="/auth/callback" element={<AuthCallback />}/>
      <Route path="/user-config" element={<PrivateRoutes route={"/user-config"}><UserConfig /></PrivateRoutes>} />
    </Routes>
  )
}