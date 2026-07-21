import FeaturesSection from "@/components/landing/FeaturesSection";
import HeroSection from "@/components/landing/HeroSection";

export default function Home() {
    return (
        <main className="min-h-screen ">
            <HeroSection />
            <FeaturesSection />
        </main>
    );
}