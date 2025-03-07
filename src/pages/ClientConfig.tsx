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
import { Link } from "react-router"

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

  const { userConfig, updateClient } = useAuth()
  const [client, setClient] = useState<ClientType | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
  })

  useEffect(() => {
    userConfig().then((data) => {
      form.reset({
        name: data?.name ?? "",
        email: data?.email ?? "",
        phone: data?.tel ?? "",
        address: data?.address ?? "",
      })

      setClient(data)
    })
  }, [userConfig])

  console.log(client)
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    updateClient({...data, id: client?.id ?? "", auth_id: client?.auth_id ?? "", tel: data.phone})
    .then(() => {
      toast.success("Cliente atualizado com sucesso!")
      window.location.href = "/"
    }).catch(() => {
      toast.error("Erro ao atualizar cliente.")
    })
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
          <div className="flex justify-between">
          <Button type="submit">Salvar</Button>
          <Button variant='destructive'>
            <Link to="/">Cancelar</Link>
          </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}
