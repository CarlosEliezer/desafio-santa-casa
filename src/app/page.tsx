"use client"

import React, { useState } from "react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import { CheckCircle2Icon, ChevronDownIcon } from "lucide-react"
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
import { cn } from "@/lib/utils"
import { Alert, AlertTitle } from "@/components/ui/alert"

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
   const [showAlert, setShowAlert] = useState(false);

   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         name: "",
         email: "",
         password: "",
         confirmPassword: "",
         phone: "",
         birthday: undefined,
         gender: "",
         terms: false,
      }
   });

   function handleAlert() {
      setShowAlert(true);
   }
   
   if (showAlert) {
      setTimeout(() => {
         setShowAlert(false);
      }, 3000);
   }

   function onSubmit(formData: z.infer<typeof formSchema>) {
      if(!formData.gender) {
         formData.gender = 'prefer-not-to-say';
      }

      console.log('Formulário enviado: ', formData);
      handleAlert();

      // Reset the form after submission
      form.reset({
         name: "",
         email: "",
         password: "",
         confirmPassword: "",
         phone: "",
         birthday: undefined,
         gender: "",
         terms: false,
      })
   }

   function onError(errors: Object) {
      console.log('Erros no formulário: ', errors);
   }

   return (
      <div className="flex flex-col justify-between h-screen text-(--foreground) bg-(--background) font-sans">
         <Header />
         <div className="flex flex-col px-10 lg:px-20 pt-30">
            <h1 className="text-center text-5xl text-primary font-bold">Cadastro</h1>
            <p className="text-center text-sm text-(--foreground) mb-4">
               Preencha o formulário abaixo para se cadastrar
            </p>
            <Form {...form}>
               <form onSubmit={form.handleSubmit(onSubmit, onError)} className="grid lg:grid-cols-2 gap-4 mt-5 items-start">
                  <FormField
                     control={form.control}
                     name="name"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel className="font-bold">Nome <span className="text-(--error) font-normal">*</span></FormLabel>
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
                           <FormLabel className="font-bold">E-mail <span className="text-(--error) font-normal">*</span></FormLabel>
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
                     defaultValue=""
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel className="font-bold">Senha <span className="text-(--error) font-normal">*</span></FormLabel>
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
                     defaultValue=""
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel className="font-bold">Confirmar Senha <span className="text-(--error) font-normal">*</span></FormLabel>
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
                  <div className="grid lg:grid-cols-2 gap-4">
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
                                             cn(
                                                "justify-between font-normal [&_svg:not([class*='text-'])]:text-foreground !bg-white w-full", (field.value ? "text-foreground" : "text-muted-foreground")
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
                        defaultValue=""
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
                        <FormItem className="lg:self-center">
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
                                 <span className="text-(--error) font-normal">*</span>
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
         <div className={cn("h-screen w-screen bg-black/80", (showAlert ? "absolute" : "hidden"))}>
            <Alert className={cn("items-center w-fit text-(--chart-2) fixed min-w-max left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2")} variant="default">
               <CheckCircle2Icon />
               <AlertTitle>Cadastro realizado com sucesso!</AlertTitle>
            </Alert>
         </div>
         <Footer />
      </div>
   )
}