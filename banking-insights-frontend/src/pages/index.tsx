import ComparisonSection from "@/components/landing/ComparisonSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import FinalCallToAction from "@/components/landing/FinalCallToAction";
import Footer from "@/components/landing/Footer";
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
            <FinalCallToAction />
            <Footer />
        </main>
    );
}