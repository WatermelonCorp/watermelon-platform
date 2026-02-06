import React from 'react'
import { TooltipProvider } from '@/components/ui/tooltip'
import { SidebarProvider } from '@/components/ui/sidebar'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from 'next-themes'
import { ScrollProgressProvider } from '../animate-ui/primitives/animate/scroll-progress'

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <HelmetProvider>
      <ScrollProgressProvider>
        <BrowserRouter>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <TooltipProvider>
              <SidebarProvider>
                {children}
              </SidebarProvider>
            </TooltipProvider>
          </ThemeProvider>
        </BrowserRouter>
      </ScrollProgressProvider>
    </HelmetProvider>
  )
}
