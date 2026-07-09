import { useUser } from "@clerk/nextjs";

export function useDemoMode() {
    const { user } = useUser();

    const isDemoUser =
        user?.id === process.env.NEXT_PUBLIC_DEMO_USER_ID;

    return {
        isDemoUser,
    };
}