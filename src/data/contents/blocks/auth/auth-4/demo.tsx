
import LoginPage  from "./index";


export default function Auth4Demo() {
  return (
    <LoginPage
      brandName="Watermelon"
      onGoogleLogin={() => console.log("Google login")}
      onLogin={(email, password, remember) =>
        console.log("Login", email, password, remember)
      }
      onForgotPassword={() => console.log("Forgot password")}
      onCreateAccount={() => console.log("Create account")}
      copyrightYear={2026}
      footerLinks={[
        { label: "Privacy", href: "#" },
        { label: "Terms", href: "#" },
        { label: "Support", href: "#" },
      ]}
    />
  );
}