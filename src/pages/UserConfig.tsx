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
import { SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, Select } from "@/components/ui/select"
import { useAuth } from "@/hooks/useAuth"
import { useEffect, useState } from "react"
import { normalizeSkill } from "@/utils/normalizeSkill"

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
  description: z.string().nonempty({
    message: "Por favor, insira uma descrição.",
  }),
  profile_picture: z.any().optional(),
  skills: z.array(z.string()).optional(),
})

export const UserConfig = () => {

  const { createUser, user } = useAuth()

  const [skills, setSkills] = useState<string[]>([])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      type_user: "",
      description: "",
    },
  })

  useEffect(() => {
    const fetchSkills = async () => {
      const skillsFetch = form.watch("skills")
      if (skillsFetch) {
        const normalizedSkills = await normalizeSkill(skills)
        setSkills(normalizedSkills)
      }
    }
    fetchSkills()
  }, [form.watch("skills")])

  const typeUser = form.watch("type_user")

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const user = await createUser({ ...values, authId: null })
    console.log(user)
  }
  return (
    <Form {...form}>
      <div className="container mx-auto h-250 p-4  flex flex-col items-center justify-center space-y-8">
        <h1 className="text-2xl font-bold">Configuração de Usuario</h1>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-100">
          <FormField
            control={form.control}
            name="profile_picture"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Foto de Perfil</FormLabel>
                <FormControl>
                  <Input type="file" accept="image/*" placeholder="Selecione uma foto" onChange={(e) => {
                    if (e.target.files?.[0]) {
                      field.onChange(e.target.files[0]);
                    }
                  }} />
                </FormControl>
              </FormItem>
            )}
          />
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
                  <Input placeholder="Email..." {...field} value={user?.email} disabled={true} />
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
          {typeUser === "freelancer" && (
            <>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Input placeholder="Descrição..." {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="skills"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Skills</FormLabel>
                    <FormControl>
                      <Input placeholder="Skills..." {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </>

          )}
          <Button type="submit">Enviar</Button>
        </form>

      </div>
    </Form>
  )
}
