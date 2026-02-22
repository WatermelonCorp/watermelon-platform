import { Link } from "react-router-dom";
import { SEOHead } from "@/components/seo-head";

export default function NotFoundPage() {
  return (
    <>
      <SEOHead
        title="Page Not Found"
        description="The page you're looking for doesn't exist or has been moved."
        noindex
      />

      <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
        <p className="text-8xl font-bold tracking-tighter text-foreground/10">
          404
        </p>

        <h1 className="mt-4 text-2xl font-semibold tracking-tight text-foreground">
          Page not found
        </h1>
        <p className="mt-2 text-sm text-muted-foreground max-w-md">
          The page you're looking for doesn't exist or has been moved.
          Try checking the URL or head back to the homepage.
        </p>

        <div className="flex items-center gap-3 mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center h-9 px-4 text-sm font-medium rounded-md bg-foreground text-background hover:bg-foreground/90 transition-colors"
          >
            Go Home
          </Link>
          <Link
            to="/components"
            className="inline-flex items-center justify-center h-9 px-4 text-sm font-medium rounded-md border border-border text-foreground hover:bg-muted transition-colors"
          >
            Browse Components
          </Link>
        </div>

        <p className="mt-10 text-xs text-muted-foreground/60">
          Think this is a bug?{" "}
          <a
            href="mailto:watermeloncorpui@gmail.com"
            className="underline underline-offset-4 hover:text-muted-foreground transition-colors"
          >
            Let us know
          </a>
        </p>
      </div>
    </>
  );
}
