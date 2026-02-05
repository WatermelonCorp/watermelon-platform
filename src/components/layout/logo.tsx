
export const Logo = () => {
  return (
    <a href="/" className="flex items-center gap-2">
      <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
        <img src="/logo.png" alt="Logo" className="h-6 w-6" />
      </div>
      <span className="text-xl font-bold">Watermelon UI</span>
    </a>
  )
}
