"use client"

import React from "react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronDownIcon } from "lucide-react"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
   Popover,
   PopoverContent,
   PopoverTrigger
} from "@/components/ui/popover"
import { 
   Select,
   SelectContent,
   SelectItem, SelectTrigger,
   SelectValue
} from "@/components/ui/select"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Header from "@/components/ui/header"
import Footer from "@/components/ui/footer"
import clsx from "clsx"

const formSchema = z.object({
   name: z.string().min(2, {
      error: 'Digite seu nome completo.',
   }),
   email: z.email('Você deve usar um e-mail válido.'),
   password: z.string().min(8, {
      error: 'A senha deve conter pelo menos 8 caracteres.',
   }),
   confirmPassword: z.string(),
   phone: z.string().optional().refine((value) => {
      const phoneRegex = /^\+?[1-9]\d{1,11}$/
      if (!value) return true; // Allow empty phone number

      return phoneRegex.test(value);
   }, {
      error: 'Digite um número de telefone válido.'
   }),
   birthday: z.date().optional().refine((value) => {
      const today = new Date();
      if(!value) return true; // Allow empty date

      return value <= today;
   }, { error: 'A data de nascimento não pode ser no futuro.' }),
   gender: z.string().optional(),
   terms: z.boolean().refine((value) => value, {
      error: 'Você deve aceitar os termos de uso.',
   })
}).refine((data) => {
   return data.password === data.confirmPassword
}, { 
   path: ['confirmPassword'],
   error: 'As senhas não coincidem.'
})

export default function Home() {
   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         name: '',
         email: '',
         password: '',
         confirmPassword: '',
         phone: '',
         birthday: undefined,
         gender: undefined,
         terms: false,
      }
   });

   function onSubmit(formData: z.infer<typeof formSchema>) {
      if(formData.gender === undefined) {
         formData.gender = 'prefer-not-to-say';
      }
      console.log('Formulário enviado: ', formData);
   }

   function onError(errors: Object) {
      console.log('Erros no formulário: ', errors);
   }

   return (
      <div className="flex flex-col justify-between h-screen text-(--foreground) bg-(--background) pt-30 font-sans">
         <Header />
         <div>
            <h1 className="text-center text-5xl text-primary font-bold">Cadastro</h1>
            <p className="text-center text-sm text-(--foreground) mb-4 px-10">
               Preencha o formulário abaixo para se cadastrar
            </p>
            <Form {...form}>
               <form onSubmit={form.handleSubmit(onSubmit, onError)} className="grid lg:grid-cols-2 gap-4 lg:px-20 px-10 mt-5 items-center">
                  <FormField
                     control={form.control}
                     name="name"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel className="font-bold">Nome</FormLabel>
                           <FormControl>
                              <Input type="text" placeholder="Digite seu nome completo" { ...field } />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="email"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel className="font-bold">E-mail</FormLabel>
                           <FormControl>
                              <Input type="email" placeholder="Digite seu e-mail" { ...field } />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="password"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel className="font-bold">Senha</FormLabel>
                           <FormControl>
                              <Input type="password" placeholder="Crie sua senha" { ...field } />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="confirmPassword"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel className="font-bold">Confirmar Senha</FormLabel>
                           <FormControl>
                              <Input type="password" placeholder="Confirme a senha criada" { ...field } />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="phone"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel className="font-bold">Telefone</FormLabel>
                           <FormControl>
                              <Input type="text" placeholder="Digite seu número de telefone" { ...field } />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <div className="flex lg:flex-row flex-col gap-4">
                     <FormField
                        control={form.control}
                        name="birthday"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel className="font-bold">Data de Nascimento</FormLabel>
                              <FormControl>
                                 <Popover>
                                    <PopoverTrigger asChild>
                                       <Button
                                          variant="default"
                                          id="date"
                                          className={
                                             clsx(
                                                "w-48 justify-between font-normal [&_svg:not([class*='text-'])]:text-foreground !bg-white w-full lg:w-fit", (field.value ? "text-foreground" : "text-muted-foreground")
                                             )
                                          }
                                       >
                                          { field.value ? field.value.toLocaleDateString() : "Selecione uma data" }
                                          <ChevronDownIcon/>
                                       </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                       <Calendar
                                          mode="single"
                                          selected={field.value}
                                          captionLayout="dropdown"
                                          onSelect={(date) => {
                                             field.onChange(date)
                                          }}
                                       />
                                    </PopoverContent>
                                 </Popover>
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel className="font-bold">Gênero</FormLabel>
                              <FormControl>
                                 <Select value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger>
                                       <SelectValue placeholder="Selecione seu gênero" />
                                    </SelectTrigger>

                                    <SelectContent>
                                       <SelectItem value="male">Masculino</SelectItem>
                                       <SelectItem value="female">Feminino</SelectItem>
                                       <SelectItem value="other">Outro</SelectItem>
                                       <SelectItem value="prefer-not-to-say">Prefiro não dizer</SelectItem>
                                    </SelectContent>
                                 </Select>
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </div>
                  <FormField
                     control={form.control}
                     name="terms"
                     render={({ field }) => (
                        <FormItem>
                           <div className="flex items-center">
                              <FormControl>
                                 <Checkbox 
                                    id="terms"
                                    className="cursor-pointer border-(--foreground)"
                                    checked={ field.value} onCheckedChange={ field.onChange }
                                 />
                              </FormControl>
                              <FormLabel htmlFor="terms" className="ml-2">
                                 <a 
                                    className="ml-2 text-(--link) underline"
                                    href="https://santacasapg.com/lgpd/politica-de-privacidade/"
                                    target="_blank"
                                 >
                                    Li e aceito os Termos de uso
                                 </a>
                              </FormLabel>
                           </div>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <Button type="submit" className="cursor-pointer" size="lg">CONFIRMAR</Button>
               </form>
            </Form>
         </div>
         <Footer />
      </div>
   )
}