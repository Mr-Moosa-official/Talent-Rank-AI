"use client";

import Link from "next/link";
import { useState } from "react";
import { BrainCircuit, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/pricing", label: "Pricing" },
    { href: "/reviews", label: "Reviews" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="flex items-center gap-2 font-bold">
            <BrainCircuit className="h-6 w-6 text-primary" />
            <span className="font-headline text-lg">TalentRank AI</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === link.href ? "text-foreground" : "text-foreground/60"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end gap-2">
          <Button variant="ghost" asChild>
            <Link href="/dashboard">Sign In</Link>
          </Button>
          <Button asChild className="hidden sm:flex bg-primary hover:bg-primary/90 text-primary-foreground">
             <Link href="/dashboard">Get Started</Link>
          </Button>
        </div>

        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden ml-4">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs bg-background">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between border-b pb-4">
                 <Link href="/" className="flex items-center gap-2 font-bold" onClick={() => setIsMenuOpen(false)}>
                    <BrainCircuit className="h-6 w-6 text-primary" />
                    <span className="font-headline text-lg">TalentRank AI</span>
                </Link>
                <SheetTrigger asChild>
                   <Button variant="ghost" size="icon">
                        <X className="h-5 w-5" />
                        <span className="sr-only">Close Menu</span>
                    </Button>
                </SheetTrigger>
              </div>
              <nav className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                    <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                        "text-lg font-medium transition-colors hover:text-primary",
                        pathname === link.href ? "text-primary" : "text-foreground/70"
                    )}
                    >
                    {link.label}
                    </Link>
                ))}
              </nav>
               <div className="mt-auto flex flex-col gap-4">
                 <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>Get Started</Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
