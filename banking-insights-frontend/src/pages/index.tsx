import { useEffect } from "react";
import { useRouter } from "next/router";
import { useUser } from "@clerk/nextjs";

import ComparisonSection from "@/components/landing/ComparisonSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import FinalCallToAction from "@/components/landing/FinalCallToAction";
import Footer from "@/components/landing/Footer";
import HeroSection from "@/components/landing/HeroSection";
import PrivacySection from "@/components/landing/PrivacySection";
import TechnologySection from "@/components/landing/TechnologySection";

export default function Home() {
    const router = useRouter();

    const {
        user,
        isLoaded,
    } = useUser();

    useEffect(() => {
        if (!isLoaded) {
            return;
        }

        if (user) {
            router.replace("/reports");
        }
    }, [isLoaded, user, router]);

    if (!isLoaded || user) {
        return (
            <main className="flex min-h-screen items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500" />
            </main>
        );
    }

    return (
        <>
            <main className="min-h-screen">
                <HeroSection />
                <FeaturesSection />
                <ComparisonSection />
                <PrivacySection />
                <TechnologySection />
                <FinalCallToAction />
            </main>

            <Footer />
        </>
    );
}