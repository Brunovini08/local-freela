import type { User } from "@supabase/supabase-js";
import React, { createContext, useCallback, useEffect, useState } from "react";
import { supabase } from "../supabse-client"
import type { ClientType } from "@/types/ClientType";
import type { UserConfig } from "@/types/UserType";
import type { AuthContextType } from "@/types/AuthContextType";


export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    checkUser()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      listener?.subscription?.unsubscribe();
    };
  }, []);

  const siginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      console.error(error.message);
      return;
    }

    setTimeout(() => {
      window.location.href = "/home";
    }, 8000)
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  const createUser = async (dataUser: UserConfig) => {
    const { data, error } = await supabase.from("users").insert({
      name: dataUser.name,
      email: dataUser.email,
      tel: dataUser.phone,
      address: dataUser.address,
      type_service: dataUser.type_user,
      auth_id: user?.id
    }).select("id").single();

    if (error) {
      console.error(error.message);
      return null;
    }

    if (dataUser.type_user === "client") {
      const { error } = await supabase.from("client").insert({ user_id: data?.id }).single();
      if (error) return error;
    } else if (dataUser.type_user === "freelancer") {
      const { error } = await supabase.from("freelancer").insert({ user_id: data?.id }).single();
      if (error) return error;
    }
  };

  const selectUser = useCallback(async () => {
    if (!user?.id) return null;

    const { data, error } = await supabase.from("users").select("type_service").eq("auth_id", user.id).single();
    if (error) {
      console.error(error.message);
      return error;
    }
    return data;
  }, [user?.id]);

  const userConfig = useCallback(async (): Promise<ClientType | null> => {
    if (!user?.id) return null;

    const { data, error } = await supabase.from("users").select("name, email, tel, address, id, auth_id").eq("auth_id", user.id).single();
    if (error || !data) {
      console.error(error?.message);
      return null;
    }

    return {
      name: data.name,
      email: data.email,
      tel: data.tel,
      address: data.address,
      auth_id: data.auth_id,
      id: data.id
    };
  }, [user?.id]);

  const updateClient = async (dataClient: ClientType) => {
    const { error } = await supabase.from("users").update({
      name: dataClient.name,
      email: dataClient.email,
      tel: dataClient.tel,
      address: dataClient.address
    }).eq("id", dataClient.id);

    if (error) {
      console.error(error.message);
      return error;
    }
  };

  const servicesClient = async () => {
    const { data, error} = await supabase.from("order_service").select("service_id").eq("client_id", user?.id);
    if (error) {
      console.error(error.message);
      return error;
    }
    return data;
  }

  return (
    <AuthContext.Provider 
    value={{ siginWithGoogle, signOut, user, createUser, selectUser, 
    userConfig, updateClient, loading, servicesClient }}>
      {loading ? <p>Carregando...</p> : children}
    </AuthContext.Provider>
  );
};
