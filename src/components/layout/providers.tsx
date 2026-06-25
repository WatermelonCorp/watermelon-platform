import React from 'react'
import { TooltipProvider } from '@/components/ui/tooltip'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from 'next-themes'
import { TooltipProvider as TooltipProviderAnimate } from '../animate-ui/components/animate/tooltip'
import { ScrollProgressProvider } from '../animate-ui/primitives/animate/scroll-progress'
import { Analytics } from '@/components/analytics/analytics'
import { ThemeCssProvider } from '@/contexts/theme-css-context'
import { Toaster } from '@/components/base-ui/sonner'

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <HelmetProvider>
      <ScrollProgressProvider>
        <BrowserRouter>
          <Analytics />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            enableColorScheme
          >
            <TooltipProvider>
              <TooltipProviderAnimate>
                <ThemeCssProvider>
                  <Toaster />
                  {children}
                </ThemeCssProvider>
              </TooltipProviderAnimate>
            </TooltipProvider>
          </ThemeProvider>
        </BrowserRouter>
      </ScrollProgressProvider>
    </HelmetProvider>
  )
}
