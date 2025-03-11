import { Card } from "@/components/ui/card"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/hooks/useAuth"
import { Navbar } from "@/components/Navbar"
import { useEffect, useState } from "react"

export const Profile = () => {
  
  const { user, servicesClient } = useAuth()

  const [services, setServices] = useState<unknown[]>([])
  useEffect(() => {
    const fetchServices = async () => {
      const response = await servicesClient()
      setServices(response)
    }
    fetchServices()
  })
return( 
  <div>
    <Navbar />
    <div className="container mx-auto p-4 flex justify-center">
      <main className="grid grid- grid-rows-3 md:grid-cols-2">
        <Card className="p-4">
          <Avatar>
            <AvatarImage src={user?.user_metadata?.avatar_url} alt={user?.user_metadata?.full_name} />
          </Avatar>
          <p className="font-bold">Nome: {user?.user_metadata?.full_name}</p>
          <p className="font-bold">Email: {user?.email}</p>
          <p className="font-bold">Servicos: {services?.length}</p>
        </Card>
      </main>
      <main className="grid grid-cols-2 gap-4 md:grid-cols-2 border">
      <Card className="p-4 col-span-2">
          <h2 className="text-2xl font-bold">Meus Projetos</h2>
          <p>Meus Projetos Aqui</p>
        </Card>
        <Card className="p-4">
          <h2 className="text-2xl font-bold">Contatos</h2>
          <p>Contatos Aqui</p>
        </Card>
        <Card className="p-4">
          <h2 className="text-2xl font-bold">Pagamentos</h2>
          <p>Meios de Pagamento</p>
        </Card>
      </main>
    </div>
  </div>)
}