import { useCategory } from "@/hooks/useCategory"
import type { Category } from "@/types/Category"
import { useEffect, useState } from "react"
import { Card } from "./ui/card"

export const Categories = () => {

  const {findCategories} = useCategory()
  const [categoriesArray, setCategoriesArray] = useState<Category[]>([])
  useEffect(() => {
    findCategories()
    .then((data: Category[] | undefined) => {
      if (data) {
        setCategoriesArray(data);
      }
    })
  }, [findCategories])


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
          {categoriesArray.map((category) => (
            <div key={category.id} className="flex items-center justify-center">
              <Card className="flex items-center justify-center p-4 space-y-2 w-70">
                <p className="text-lg font-semibold">{category.name}</p>
              </Card>
            </div>
          ))}
        </div>
      </section>
  )
}