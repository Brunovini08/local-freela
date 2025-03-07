import type { User } from "@supabase/supabase-js";
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { supabase } from "../supabse-client"
import type { ClientType } from "@/types/ClientType";
import type { UserConfig } from "@/types/UserType";
interface AuthContextType {
  user: User | null;
  siginWithGoogle: () => void;
  signOut: () => void;
  createUser: (dataUser: UserConfig) => Promise<any>;
  selectUser: () => Promise<any>;
  userConfig: Promise<ClientType | null>;
  updateClient: (dataClient: ClientType) => Promise<any>;
}



const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      listener?.subscription?.unsubscribe()
    }
  }, [])

  const siginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    })
  }

  const createUser = async (dataUser: UserConfig) => {
    const { data, error } = await supabase.from("users").insert({
      name: dataUser.name,
      email: dataUser.email,
      tel: dataUser.phone,
      address: dataUser.address,
      type_service: dataUser.type_user,
      auth_id: user?.id
    }).select("id").single()
    if (error) {
      return null
    }

    if (dataUser.type_user === "client") {
      const { error } = await supabase.from("client").insert({
        user_id: data?.id
      }).single()
      if (error) {
        return error
      }
    } else if (dataUser.type_user === "freelancer") {
      const { error } = await supabase.from("freelancer").insert({
        user_id: data?.id
      }).single()
      if (error) {
        return error
      }
    }
  }
  const signOut = async () => {
    supabase.auth.signOut()
  }

  const selectUser = useCallback(async () => {
    if (!user?.id) return null
    const { data, error } = await supabase.from("users").select("type_service").eq("auth_id", user.id).single()
    if (error) {
      return error
    }
    return data
  }, [user?.id])

  const userConfig = useMemo(async (): Promise<ClientType | null> => {
    if (!user?.id) return null
    const { data, error } = await supabase.from("users").select("name, email, tel, address, id, auth_id").eq("auth_id", user.id).single()
    if (error || !data) {
      return null
    }
    return {
      name: data.name,
      email: data.email,
      tel: data.tel,
      address: data.address,
      auth_id: data.auth_id,
      id: data.id
    }
  }, [user?.id])

  const updateClient = async (dataClient: ClientType) => {
    console.log(dataClient)
    userConfig.then(async (dataInfo) => {
      const { data, error } = await supabase.from("users").update(dataClient).eq("id", dataInfo?.id).single()
      if (error) {
        return error
      }
      return data
    }
    )
  }

  return <AuthContext.Provider value={{ siginWithGoogle, signOut, user, createUser, selectUser, userConfig, updateClient }}>
    {""}
    {children}
  </AuthContext.Provider>
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}