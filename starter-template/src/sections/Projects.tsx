import darkSaasLandingPage from "@/assets/images/dark-saas-landing-page.png";
import lightSaasLandingPage from "@/assets/images/light-saas-landing-page.png";
import aiStartupLandingPage from "@/assets/images/ai-startup-landing-page.png";
import Pinpingfang from "@/assets/images/Pinpinfang-1.png"
import Image from "next/image";
import CheckCircleIcon from "@/assets/icons/check-circle.svg"
import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg";
import grainImage from "@/assets/images/grain.jpg";
import { Card } from "@/components/Card";
import Link from 'next/link';

const portfolioProjects = [
  {
    company: "Teachify One",
    year: "2023 Dec",
    title: "AI Video Assist For SaaS Platform",
    results: [
      { title: "Enhanced user engagemet by 35%" },
      { title: "Reduce onboarding time of 28%" },
      { title: "New user growth of 40%" },
    ],
    link: "https://www.figma.com/proto/i72k4XGripET6U9e1rupoA/Case-Study-Presentation-Template?node-id=2278-9218&t=nuAw0ZzhjneCsVDY-1&scaling=contain&content-scaling=fixed&page-id=2094%3A3925&starting-point-node-id=2278%3A9218",
    image: darkSaasLandingPage,
  },
  {
    company: "RoboTaxi",
    year: "2024",
    title: "Designing Robotaxi UX for Individuals without Smartphones and Limited Mobility",
    results: [
      { title: "Boosted sales by 20%" },
      { title: "Expanded customer reach by 35%" },
      { title: "Increased brand awareness by 15%" },
    ],
    link: "https://yvonne-design.super.site/rebranding",
    image: lightSaasLandingPage,
  },
  {
    company: "Pin Pin Fang",
    year: "2019",
    title: "An Overseas Real Estate Investment Platform",
    results: [
      { title: "Pitched to angel investors for $1 Million USD fundraising" },
      { title: "Enhanced UX flows and drove 65% increase in user trust and adoption" },
      { title: "Built engineering team in silicon valley, operations team in China" },
    ],
    link: "https://yvonne-design.super.site/poster-design",
    image: Pinpingfang,
  },
];

export const ProjectsSection = () => {
  return (
    <section className="pb-16 md:py-5 lg:py-32" id="projects">
      <div className="container">
        <div className="flex justify-center">
          <p className="uppercase font-semibold tracking-widest bg-gradient-to-r
         from-emerald-300 to-sky-400 text-center bg-clip-text text-transparent
      ">Real-world Results
          </p>
        </div>

        <h2 className="font-serif text-3xl md:text-5xl text-center mt-6">Feature Projects</h2>
        <p className="text-center md:text-lg lg:text-xl text-white/60 mt-4
      max-w-md mx-auto" >
          See how I transformed business concepts into practical digital experiences with Design.
        </p>

        <div className="mt-10 md:mt-20 flex flex-col gap-20">
          {portfolioProjects.map((project, projectIndex) => (
            <Card
              key={project.title}
              className="px-8 pt-8  pb-0 md:pt-12 md:px-10 
         lg:pt-16 lg:px-20" style={{
                top: `calc(64px + ${projectIndex * 40}px)`,
              }}>
              <div className="lg:grid lg:grid-cols-2
          lg:gap-16">
                <div className="lg:pb-16">


                  <div className="bg-gradient-to-r from-emerald-300 to-sky-400
            inline-flex gap-2 font-bold uppercase tracking-widest 
            text-sm text-transparent bg-clip-text">
                    <span>{project.company}</span>
                    <span>&bull;</span>
                    <span>{project.year}</span>
                  </div>

                  <h3 className="font-serif text-2xl mt-2 md:mt-3 md:text-4xl">{project.title}</h3>
                  <hr className="border-t-s border-white/5 mt-4 md:mt-5" />
                  <ul className="flex flex-col gap-4 mt-4 md:mt-5">
                    {project.results.map((result) => (
                      <li className="flex gap-2 text-sm md:text-base text-white/50">
                        <CheckCircleIcon className="size-5 md:size-6" />
                        <span>{result.title}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={project.link} target="_blank" rel="noopener noreferrer" className="bg-white text-gray-950 h-12 w-full md:w-auto px-6 rounded-xl font-semibold inline-flex items-center justify-center gap-2 mt-8">
                    <span>Take A Look</span>
                    <ArrowUpRightIcon className="size-4" />
                  </Link>
                </div>
                <div className="relative">
                  <Image
                    src={project.image}
                    alt={project.title}
                    className="mt-8 -mb-4 md:-mb-0
            lg:mt-0 lg:absolute lg:h-full
            lg:w-auto lg:max-w-none"
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
