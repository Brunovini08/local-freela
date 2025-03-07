import { Link } from "react-router"
import { Button } from "./ui/button"
import { ArrowRight } from "lucide-react"
import React from "react"

export const Categories = () => {
  return(
    <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Navegue por Categoria</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                Explore serviços oferecidos por freelancers talentosos na sua região
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 py-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

          <div className="flex justify-center">
            <Button variant="outline" asChild>
              <Link to="/categories" className="flex items-center gap-1">
                Ver Todas as Categorias <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
  )
}