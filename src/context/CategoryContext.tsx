import { supabase } from "@/supabse-client";
import type { CategoryContextType } from "@/types/CategoryType";
import { createContext } from "react";


export const CategoryContext = createContext<CategoryContextType | undefined>(undefined)

export const CategoryProvider = ({ children}: { children: React.ReactNode }) => {
  
  const findCategories = async () => {
    const { data, error } = await supabase.from('categories').select('*')
    if (error) {
      console.error(error)
      return undefined
    }
    return data
  }

  return (
    <CategoryContext.Provider value={{ findCategories }}>
      {children}
    </CategoryContext.Provider>
  )
}