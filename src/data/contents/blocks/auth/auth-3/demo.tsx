import { Auth3 } from "./index";

export default function Auth3Demo() {
  return (
    <Auth3
      onSignIn={(email, password) =>
        console.log("Sign in:", { email, password })
      }
      onSignUp={(name, email, password) =>
        console.log("Sign up:", { name, email, password })
      }
      onForgotPassword={() => console.log("Forgot password")}
    />
  );
}
