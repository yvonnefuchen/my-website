import { Header } from "@/sections/Header";
import { AboutSection } from "@/sections/About";
import { Footer } from "@/sections/Footer";

export default function Home() {
    return (
        <div>
            <Header />
            <div
                style={{
                    width: '500px',
                    height: '300px',
                    border: '1px solid #ccc',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: '50px auto',
                }}
            >
                Project 3
            </div>

            <Footer />
        </div>
    );
}