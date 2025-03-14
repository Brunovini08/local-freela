import { Card } from "@/components/ui/card"
import { useCategory } from "@/hooks/useCategory"
import type { Category } from "@/types/Category"
import { useEffect, useState } from "react"
import { Link } from "react-router"

export const CategoriesPage = () => {

  const { findCategories } = useCategory()
  const [categories, setCategories] = useState<Category[]>([])
  useEffect(() => {
    findCategories()
      .then((data: Category[] | undefined) => {
        if (data) {
          setCategories(data)
        }
      })
  }, [findCategories])

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Categorias de Serviços</h1>
        <p className="text-muted-foreground">
          Navegue por todas as categorias para encontrar o freelancer perfeito para suas necessidades
        </p>
      </div>

      <div className="container flex justify-center p-10 w-507 mx-auto bg-white h-200">
        <div className="container grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 ">
          {categories.map((category: Category) => {
            return (
              <Link to={`/category/${category.id}`} key={category.id}>
                <Card className="h-full overflow-hidden transition-all hover:shadow-md cursor-pointer flex flex-col items-center justify-center p-4">
                  <h3 className="text-lg font-bold">{category.name}</h3>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}