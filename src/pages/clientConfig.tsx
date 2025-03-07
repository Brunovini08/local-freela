"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/context/AuthContext"
import { useEffect, useState } from "react"
import type { ClientType } from "@/types/ClientType"
import { toast } from "sonner"
import { set } from "date-fns"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Por favor, insira um nome válido.",
  }),
  email: z.string().email({
    message: "Por favor, insira um email válido.",
  }),
  phone: z.string().nonempty({
    message: "Por favor, insira um telefone.",
  }),
  address: z.string().nonempty({
    message: "Por favor, insira um endereço.",
  }),
})

export const ClientConfig = () => {

  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
  })

  

  const onSubmit = (data: z.infer<typeof formSchema>) => {
   console.log(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="w-full max-w-md mx-auto space-y-4 pt-8">
          <h1 className="text-center text-2xl font-bold">Configurações do Cliente</h1>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Nome..." {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email..." {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone</FormLabel>
                <FormControl>
                  <Input placeholder="Telefone..." {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Endereco</FormLabel>
                <FormControl>
                  <Input placeholder="Endereco..." {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit">Salvar</Button>
        </div>
      </form>
    </Form>
  )
}
