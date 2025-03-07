import { Link } from "react-router"
import { Button } from "./ui/button"
import { Search } from "lucide-react"
import { Input } from "./ui/input"

export const HeaderSection = () => {
  return(
    <section className="flex justify-center bg-gradient-to-r from-primary/10 to-primary/5 py-20 md:py-28">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Descubra Freelancers Talentosos na Sua Região
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Conecte-se com profissionais qualificados perto de você. Apoie sua comunidade local enquanto recebe
                  serviços de qualidade.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Qual serviço você está procurando?" className="w-full pl-9" />
                </div>
                <Button>Buscar Serviços</Button>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <p className="text-sm text-muted-foreground">Popular: </p>
                <div className="flex flex-wrap gap-2">
                  <Link to="/category/web-design" className="text-sm text-primary hover:underline">
                    Design Web
                  </Link>
                  <Link to="/category/photography" className="text-sm text-primary hover:underline">
                    Fotografia
                  </Link>
                  <Link to="/category/home-repair" className="text-sm text-primary hover:underline">
                    Reparos Domésticos
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <img
                alt="Freelancers locais colaborando"
                className="aspect-video overflow-hidden rounded-xl object-cover object-center"
                height="310"
                src="../../public/freelancer.webp"
                width="540"
              />
            </div>
          </div>
        </div>
      </section>
  )
}