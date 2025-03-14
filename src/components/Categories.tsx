import { useCategory } from "@/hooks/useCategory"
import type { Category } from "@/types/Category"
import { useEffect, useState } from "react"
import { Card } from "./ui/card"
import { Link } from "react-router"
import { Button } from "./ui/button"

export const Categories = () => {

  const { findCategories } = useCategory()
  const [categoriesArray, setCategoriesArray] = useState<Category[]>([])
  useEffect(() => {
    findCategories()
      .then((data: Category[] | undefined) => {
        if (data) {
          setCategoriesArray(data);
        }
      })
  }, [findCategories])


  return (
    <section className="py-12 md:py-16">
      <div className="md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Navegue por Categoria</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
              Explore serviços oferecidos por freelancers talentosos na sua região
            </p>
          </div>
        </div>
      </div>
      <div className="grid py-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:space-y-2 lg:space-x-2">
        {categoriesArray.length > 8 ? categoriesArray.slice(0, 8).map((category: Category) => {
          return (
            <>
              <Link to={`/category/${category.id}`} key={category.id}>
                <div className="w-full flex justify-center mb-4">
                  <Card className="cursor-pointer flex flex-col items-center justify-center w-100 h-20 p-4">
                    <h3 className="text-center font-bold">{category?.name}</h3>
                  </Card>
                </div>
              </Link>
            </>
          )
        }) : categoriesArray.map((category: Category) => {
          return (
            <Link to={`/category/${category.id}`} key={category.id}>
              <Card className="cursor-pointer flex flex-col items-center justify-center w-100 h-20 p-4 ">  
                <h3 className="">{category?.name}</h3>
              </Card>
            </Link>
          )
        }
        )}
      </div>
      <div className="flex justify-center">
        <Link to="/categories">
          <Button size={"lg"} className="cursor-pointer">Ver todas as categorias</Button>
        </Link>
      </div>
    </section>
  )
}