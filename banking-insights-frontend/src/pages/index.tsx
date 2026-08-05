import ComparisonSection from "@/components/landing/ComparisonSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import HeroSection from "@/components/landing/HeroSection";
import PrivacySection from "@/components/landing/PrivacySection";

export default function Home() {
    return (
        <main className="min-h-screen">
            <HeroSection />
            <FeaturesSection />
            <ComparisonSection />
            <PrivacySection />
        </main>
    );
}