import React, { createContext, useContext, useState, useEffect } from "react";

interface ThemeCssContextType {
  customGlobalCss: string;
  setCustomGlobalCss: (css: string) => void;
}

const ThemeCssContext = createContext<ThemeCssContextType | undefined>(
  undefined
);

export function ThemeCssProvider({ children }: { children: React.ReactNode }) {
  const [customGlobalCss, setCustomGlobalCss] = useState(() => {
    // try loading from local storage on mount
    if (typeof window !== "undefined") {
      return localStorage.getItem("watermelon-custom-global-css") || "";
    }
    return "";
  });

  // Save to local storage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("watermelon-custom-global-css", customGlobalCss);
    }
  }, [customGlobalCss]);

  // Construct the scoped CSS
  let scopedCss = customGlobalCss || "";

  if (scopedCss) {
    // If the CSS contains standard Shadcn structure (:root / .dark), map them.
    // Otherwise, wrap it naively (assuming they just pasted bare variables).
    if (scopedCss.includes(":root") || scopedCss.includes(".dark")) {
      scopedCss = scopedCss
        // Remove at-rules that break plain CSS parsing inside a <style> tag
        .replace(/@import\s+[^;]+;/g, "")
        .replace(/@custom-variant\s+[^;]+;/g, "")
        // Map :root to the preview container
        .replace(/:root\s*\{/g, ".theme-injected {")
        // Map .dark to target the preview container when dark mode is enabled
        .replace(/\.dark\s*\{/g, ".dark .theme-injected, .theme-injected.dark {");
    } else {
      scopedCss = `
        .theme-injected {
          ${customGlobalCss}
        }
      `;
    }
  }

  return (
    <ThemeCssContext.Provider value={{ customGlobalCss, setCustomGlobalCss }}>
      {/* Inject the scoped CSS into the DOM head seamlessly */}
      <style>{scopedCss}</style>
      {children}
    </ThemeCssContext.Provider>
  );
}

export function useThemeCss() {
  const context = useContext(ThemeCssContext);
  if (context === undefined) {
    throw new Error("useThemeCss must be used within a ThemeCssProvider");
  }
  return context;
}
