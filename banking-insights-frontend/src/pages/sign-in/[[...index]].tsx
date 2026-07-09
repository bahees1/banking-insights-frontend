import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
    return (
        <main className="flex min-h-screen items-center justify-center px-6 py-12">
            <SignIn
                fallbackRedirectUrl="/reports"
                signUpUrl="/sign-up"
                appearance={{
                    elements: {
                        card: "w-full max-w-md md:max-w-lg",
                        formButtonPrimary: "bg-blue-500 hover:bg-blue-600",
                    },
                    
                }}
            />
        </main>
    );
}