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
import { Select } from "@radix-ui/react-select"
import { SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/hooks/useAuth"

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
  type_user: z.string().nonempty({
    message: "Por favor, insira um tipo de usuário.",
  }),
})

export const UserConfig = () => {

  const { createUser } = useAuth()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      type_user: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const user = await createUser({ ...values, authId: null })
    console.log(user)
  }
  return (
    <Form {...form}>
      <div className="container mx-auto p-4">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-100">
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
        <FormField
          control={form.control}
          name="type_user"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Selecione o tipo de Usuario</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Selecione o tipo de Usuario" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Usuario</SelectLabel>
                      <SelectItem value="freelancer">Freelancer</SelectItem>
                      <SelectItem value="client">Cliente</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Enviar</Button>
      </form>
  
      </div>  
    </Form>
  )
}
