import { Link } from "react-router"
import { Button } from "./ui/button"
import { useAuth } from "@/hooks/useAuth"


export const CtaSection = () => {
  const {siginWithGoogle, user, loading} = useAuth()
  
  return (
    <section className="bg-primary/5 py-12 md:py-16 ">
      <div className="md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Pronto para Começar?</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
              Junte-se à nossa comunidade de freelancers e clientes locais hoje
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
           {loading ? (
              <Button variant="default" disabled={true} >Carregando...</Button>
            ) : user ? (
              <Button variant="default">
                <Link to={"/home"}>
                Painel de Controle
                </Link>
              </Button>
            ) : (
              <Button onClick={siginWithGoogle}>Entrar com Google</Button>
           )}
          </div>
        </div>
      </div>
    </section>
  )
}