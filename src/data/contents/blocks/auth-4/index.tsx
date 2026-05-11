'use client';

import { useState } from 'react';
import { FaGoogle, FaEye, FaEyeSlash, FaLeaf } from 'react-icons/fa';
import { Button } from '@/components/base-ui/button';
import { Input } from '@/components/base-ui/input';
import { Label } from '@/components/base-ui/label';
import { Switch } from '@/components/base-ui/switch';
import { Separator } from '@/components/base-ui/separator';
import { FcGoogle } from 'react-icons/fc';

interface LoginFormProps {
  brandName?: string;
  brandTagline?: string;
  onGoogleLogin?: () => void;
  onLogin?: (email: string, password: string, remember: boolean) => void;
  onForgotPassword?: () => void;
  onCreateAccount?: () => void;
  copyrightYear?: number;
  footerLinks?: { label: string; href: string }[];
}

export default function LoginPage({
  brandName = 'Watermelon',
  onGoogleLogin,
  onLogin,
  onForgotPassword,
  onCreateAccount,
  copyrightYear = 2026,
  footerLinks = [
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' },
    { label: 'Support', href: '#' },
  ],
}: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  const handleSubmit = () => {
    onLogin?.(email, password, remember);
  };

  return (
    <div className="bg-background flex min-h-screen flex-col">
      <div className="flex flex-1 flex-col lg:flex-row">
        <div className="bg-background/50 relative hidden flex-col justify-between overflow-hidden p-12 lg:flex lg:w-1/2">
          <div
            style={{
              background:
                'linear-gradient(99.09deg, rgba(236, 255, 236, 0.15) 12.86%, rgba(210, 255, 180, 0.15) 15.34%, rgba(180, 240, 120, 0.15) 17.82%, rgba(150, 220, 90, 0.15) 18.64%, rgba(132, 204, 22, 0.15) 19.47%, rgba(120, 190, 30, 0.15) 22.77%, rgba(140, 210, 60, 0.15) 26.9%, rgba(170, 225, 90, 0.15) 32.68%, rgba(200, 240, 140, 0.15) 38.46%, rgba(220, 250, 180, 0.15) 41.76%, rgba(210, 245, 160, 0.15) 43.41%, rgba(190, 235, 120, 0.15) 45.06%, rgba(170, 220, 90, 0.15) 46.71%, rgba(145, 205, 55, 0.15) 49.19%, rgba(120, 185, 35, 0.15) 50.84%, rgba(125, 190, 40, 0.15) 52.49%, rgba(145, 205, 60, 0.15) 54.97%, rgba(170, 220, 90, 0.15) 57.45%, rgba(190, 235, 120, 0.15) 59.1%, rgba(200, 240, 135, 0.15) 59.92%, rgba(210, 245, 150, 0.15) 63.23%, rgba(225, 252, 190, 0.15) 70.66%, rgba(255, 255, 255, 0.15) 78.91%, rgba(220, 250, 180, 0.15) 81.39%, rgba(110, 160, 40, 0.15) 87.17%, rgba(70, 100, 20, 0.15) 90.47%, rgba(90, 125, 28, 0.15) 91.3%, rgba(120, 170, 40, 0.15) 92.12%, rgba(150, 200, 60, 0.15) 92.95%, rgba(190, 235, 120, 0.15) 94.6%, rgba(240, 255, 220, 0.15) 95.43%), linear-gradient(0deg, var(--color-lime-400), var(--color-lime-400)), var(--color-lime-100)',
              backgroundBlendMode: 'hard-light, normal, normal',
            }}
            className="absolute inset-0"
          />
        </div>

        <div className="flex flex-1 items-center justify-center px-6 py-12 sm:px-12">
          <div className="w-full max-w-md space-y-8">
            <div className="space-y-1">
              <h2 className="text-foreground text-3xl font-bold tracking-tight">
                Welcome back
              </h2>
              <p className="text-muted-foreground text-sm">
                Sign in to pick up right where you left off.
              </p>
            </div>

            <Button
              variant="outline"
              className="bg-muted w-full gap-2 border-0 font-medium"
              onClick={onGoogleLogin}
            >
              <FcGoogle className="text-base" />
              Continue with Google
            </Button>

            <div className="flex items-center gap-3">
              <Separator className="flex-1" />
              <span className="text-muted-foreground text-sm font-medium tracking-widest">
                or
              </span>
              <Separator className="flex-1" />
            </div>

            <div className="space-y-1">
              <Label htmlFor="email" className="text-sm font-medium">
                Work Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-muted focus-visible:ring-primary/20 focus-visible:border-primary/50 h-10 border-transparent ring-0"
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <button
                  type="button"
                  onClick={onForgotPassword}
                  className="text-primary text-xs underline-offset-4 transition-all hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-muted focus-visible:ring-primary/20 focus-visible:border-primary/50 h-10 border-transparent pr-10 ring-0"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Switch
                id="remember"
                checked={remember}
                onCheckedChange={setRemember}
              />
              <Label
                htmlFor="remember"
                className="text-muted-foreground cursor-pointer text-sm select-none"
              >
                Keep me signed in for 30 days
              </Label>
            </div>

            <Button
              className="h-11 w-full text-base font-semibold"
              onClick={handleSubmit}
            >
              Sign In
            </Button>

            <p className="text-muted-foreground text-center text-sm">
              New here?{' '}
              <button
                type="button"
                onClick={onCreateAccount}
                className="text-primary font-medium underline-offset-4 transition-all hover:underline"
              >
                Create a free account
              </button>
            </p>
          </div>
        </div>
      </div>

      <footer className="border-border text-muted-foreground flex flex-col items-center justify-between gap-2 border-t px-6 py-4 text-xs sm:flex-row">
        <span>
          © {copyrightYear} {brandName}. All rights reserved.
        </span>
        <div className="flex items-center gap-4">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}
