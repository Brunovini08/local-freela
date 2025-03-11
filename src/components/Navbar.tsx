"use client"

import { useState } from "react"
import { Bell, Menu, Search, User, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Link } from "react-router"
import { useAuth } from "@/hooks/useAuth"

export function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { user, signOut } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background flex items-center justify-center">
      <div className="container flex h-16 items-center px-4 sm:px-6">
        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild className="mr-2 block md:hidden">
            <Button variant="ghost" size="icon" aria-label="Menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px] sm:w-[350px]">
            <nav className="flex flex-col gap-4 py-4">
              <Link to="/" className="flex items-center gap-2 text-lg font-semibold">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
                <span>FreelancerLocal</span>
              </Link>
              <div className="space-y-1">
                <Link to="/dashboard" className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-muted">
                  Dashboard
                </Link>
                <Link to="/freelancers" className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-muted">
                  Freelancers
                </Link>
                <Link to="/categories" className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-muted">
                  Categorias
                </Link>
                <Link to="/projects" className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-muted">
                  Meus Projetos
                </Link>
                <Link to="/messages" className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-muted">
                  Mensagens
                </Link>
              </div>
            </nav>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link to="/" className="mr-4 flex items-center gap-2 md:mr-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
          <span className="hidden text-lg font-semibold sm:inline-block">FreelancerLocal</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:flex-1 md:items-center md:gap-4 md:text-sm">
          <Link to="/dashboard" className="rounded-md px-3 py-2 font-medium transition-colors hover:text-primary">
            Dashboard
          </Link>
          <Link to="/freelancers" className="rounded-md px-3 py-2 font-medium transition-colors hover:text-primary">
            Freelancers
          </Link>
          <Link to="/categories" className="rounded-md px-3 py-2 font-medium transition-colors hover:text-primary">
            Categorias
          </Link>
          <Link to="/messages" className="rounded-md px-3 py-2 font-medium transition-colors hover:text-primary">
            Mensagens
          </Link>
        </nav>

        {/* Search (Mobile) */}
        <div className="flex flex-1 items-center justify-end gap-2 md:hidden">
          {isSearchOpen ? (
            <div className="flex w-full items-center">
              <Input type="search" placeholder="Buscar..." className="h-9 w-full" />
              <Button variant="ghost" size="icon" className="ml-2" onClick={() => setIsSearchOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
          ) : (
            <Button variant="ghost" size="icon" aria-label="Buscar" onClick={() => setIsSearchOpen(true)}>
              <Search className="h-5 w-5" />
            </Button>
          )}
        </div>

        {/* Search (Desktop) */}
        <div className="w-full flex max-w-md relative hidden md:block ">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Buscar freelancers, projetos..." className="w-full pl-9" />
        </div>

        {/* Right Side Actions */}
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="icon" aria-label="Notificações" className="relative">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs">3</Badge>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full" aria-label="Perfil">
                <Avatar className="h-8 w-8">
                  <AvatarImage 
                  src={user?.user_metadata?.avatar_url} 
                  alt="Usuário"
                  />
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile" className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  Perfil
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings" className="cursor-pointer">
                  Configurações
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild >
                <Button variant="destructive" className="w-full " onClick={signOut}>
                  Sair
                </Button>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

