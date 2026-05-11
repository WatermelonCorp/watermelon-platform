import { Auth5 } from ".";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaMicrosoft } from "react-icons/fa";

export default function Auth5Demo() {
    return (

            <Auth5
            
                brandName="Astra"
                brandDescriptor="Cloud infrastructure platform"
                badgeText="Secure login"
                heading="Welcome back, team"
                subheading="Access your projects and manage your deployments."
                emailLabel="Your workspace email"
                emailPlaceholder="[EMAIL_ADDRESS]"
                passwordLabel="Password"    
                passwordPlaceholder="••••••••••"
                submitLabel="Sign in to dashboard"
                socialProviders={[
                    {
                        name: "Google",
                        icon: <FaGoogle className="h-4 w-4" />,
                        onClick: () => console.log("Google login"),
                    },
                    {
                        name: "GitHub",
                        icon: <FaGithub className="h-4 w-4" />,
                        onClick: () => console.log("GitHub login"),
                    },
                    {
                        name: "Microsoft",
                        icon: <FaMicrosoft className="h-4 w-4" />,
                        onClick: () => console.log("Microsoft login"),
                    },
                ]}
                dividerText="or sign in with your email"
                forgotPasswordText="Reset password"
                onForgotPassword={() => console.log("Forgot password")}
                bottomPromptText="Need access?"
                bottomPromptLinkText="Request an account"
                onBottomPromptClick={() => console.log("Request account")}
                onSubmit={(email, password) => console.log("Login:", email, password)}
                footerNote="Enterprise-grade authentication since 2024"
            />
    );
}