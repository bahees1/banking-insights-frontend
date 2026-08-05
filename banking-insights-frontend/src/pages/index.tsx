import ComparisonSection from "@/components/landing/ComparisonSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import HeroSection from "@/components/landing/HeroSection";
import PrivacySection from "@/components/landing/PrivacySection";
import TechnologySection from "@/components/landing/TechnologySection";

export default function Home() {
    return (
        <main className="min-h-screen">
            <HeroSection />
            <FeaturesSection />
            <ComparisonSection />
            <PrivacySection />
            <TechnologySection />
        </main>
    );
}