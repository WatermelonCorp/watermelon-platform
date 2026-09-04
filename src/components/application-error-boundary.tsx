import { Component, type ErrorInfo, type ReactNode } from 'react';

interface ApplicationErrorBoundaryProps {
  children: ReactNode;
}

interface ApplicationErrorBoundaryState {
  hasError: boolean;
}

export class ApplicationErrorBoundary extends Component<
  ApplicationErrorBoundaryProps,
  ApplicationErrorBoundaryState
> {
  state: ApplicationErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ApplicationErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Watermelon UI failed to render.', error, info);
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <main className="flex min-h-screen items-center justify-center bg-neutral-950 px-6 text-neutral-50">
        <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-neutral-900 p-8 shadow-2xl">
          <p className="mb-3 text-sm font-medium text-lime-400">Watermelon UI</p>
          <h1 className="text-2xl font-semibold tracking-tight">
            This page could not finish loading
          </h1>
          <p className="mt-3 text-sm leading-6 text-neutral-400">
            Your catalog is safe. Reload the page, or use the component index
            while we recover this view.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="rounded-xl bg-lime-400 px-4 py-2 text-sm font-medium text-neutral-950 hover:bg-lime-300"
            >
              Reload page
            </button>
            <a
              href="/animated-components"
              className="rounded-xl border border-white/10 px-4 py-2 text-sm font-medium hover:bg-white/5"
            >
              Browse components
            </a>
          </div>
        </div>
      </main>
    );
  }
}
