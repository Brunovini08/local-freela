import { CategoryContext } from "@/context/CategoryContext"
import type { CategoryContextType } from "@/types/CategoryType"
import { useContext } from "react"

export const useCategory = (): CategoryContextType => {
  const context = useContext(CategoryContext)
  if (context === undefined) {
    throw new Error("useCategory must be used within an CategoryProvider")
  }
  return context
}
