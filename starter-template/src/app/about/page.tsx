import { Header } from "@/sections/Header";
import { AboutSection } from "@/sections/About";
import { Footer } from "@/sections/Footer";
import { TestimonialsSection } from "@/sections/Testimonials";
import Experience from "@/components/Experience"

export default function Home() {
    return (
        <div>
            <Header />
            <AboutSection />
            <TestimonialsSection />
            <Experience />
            <Footer />
        </div>
    );
}