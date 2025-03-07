import { useAuth } from "@/context/AuthContext";
import { UserConfig } from "./UserConfig";
import { HeaderSection } from "@/components/HeaderSection";
import { Categories } from "@/components/Categories";
import { CtaSection } from "@/components/CtaSection";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
export default function Home() {

  const { user, selectUser } = useAuth()
  const [userService, setUserService] = useState<{ typeService?: boolean } | null>(null)
  console.log(userService)
  useEffect(() => {
    selectUser()
      .then(data => {
        console.log(data)
        setUserService(data)
      })
  }, [selectUser])
  return (
    <div className="flex min-h-screen flex-col">
      {userService?.typeService === null ?
        <>
          <UserConfig />
        </> : <>
          <Navbar />
        </>}
      {!user && <>
        <HeaderSection />
        <Categories />
        <CtaSection />
      </>}
    </div>
  )
}

