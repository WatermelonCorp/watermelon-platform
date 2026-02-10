import { Link } from "react-router-dom"

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <div className="size-7 rounded-lg bg-primary flex items-center justify-center">
        <img
          src="/logo-64.png"
          srcSet="/logo-64.png 64w, /logo-96.png 96w, /logo-128.png 128w"
          sizes="24px"
          width={24}
          height={24}
          decoding="async"
          alt="Logo"
          className="h-6 w-6"
        />
      </div>
      <span className="font-medium">Watermelon UI</span>
    </Link>
  )
}

const LogoIcon = () => {
  return (
    <Link to="/" className="flex items-center gap-2 bg-background rounded-md px-2 py-1">
      <div className="size-7 rounded-lg bg-primary flex items-center justify-center">
        <img
          src="/logo-64.png"
          srcSet="/logo-64.png 64w, /logo-96.png 96w, /logo-128.png 128w"
          sizes="24px"
          width={24}
          height={24}
          decoding="async"
          alt="Logo"
          className="h-6 w-6"
        />
      </div>
      <span className="font-medium hidden md:block text-sm">Watermelon UI</span>
    </Link>
  )
}

export { Logo, LogoIcon }
