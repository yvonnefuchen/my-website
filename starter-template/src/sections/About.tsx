"use client";
import { SectionHeader } from "@/components/SectionHeader";
import { Card } from "@/components/Card";
import bookImage from "@/assets/images/book-cover.png";
import Image from "next/image";
import { title } from "process";
import JavascriptIcon from "@/assets/icons/square-js.svg";
import HTMLIcon from "@/assets/icons/html5.svg";
import CssIcon from "@/assets/icons/css3.svg";
import ReactIcon from "@/assets/icons/react.svg";
import FigmaIcon from "@/assets/icons/figma.svg";
import BlenderIcon from "@/assets/icons/blender.svg";
import UnrealEngineIcon from "@/assets/icons/unreal-engine.svg";
import { TechIcon } from "@/components/TechIcon";
import mapImage from "@/assets/images/map.png";
import FamilyMemoji from "@/assets/images/FamilyMemoji.png";
import { CardHeader } from "@/components/CardHeader";
import { ToolboxItems } from "@/components/Toolboxitems";
import { motion } from "framer-motion";
import { useRef } from "react";
import ProfileImage from "../assets/images/Profile-picture.png";



const toolboxItems = [
  {
    title: 'Javascript',
    iconType: JavascriptIcon,
  },
  {
    title: 'HTML',
    iconType: HTMLIcon,
  },
  {
    title: 'CSS3',
    iconType: CssIcon,
  },
  {
    title: 'React',
    iconType: ReactIcon,
  },
  {
    title: 'Figma',
    iconType: FigmaIcon,
  },
  {
    title: 'Blender',
    iconType: BlenderIcon,
  },
  {
    title: 'Unreal Engine',
    iconType: UnrealEngineIcon,
  },
];

const hobbies = [
  {
    title: 'Painting',
    emoji: '🎨',
    left: "5%",
    top: "5%",

  },
  {
    title: 'Piano',
    emoji: '🎹',
    left: "50%",
    top: "5%",
  },
  {
    title: 'Cello',
    emoji: '🎻',
    left: "5%",
    top: "35%",
  },
  {
    title: 'Swimming',
    emoji: '🏊🏽',
    left: "35%",
    top: "40%",
  },
  {
    title: 'Concerts',
    emoji: '🎭',
    left: "70%",
    top: "35%",
  },
  {
    title: 'Reading',
    emoji: '📖',
    left: "5%",
    top: "65%",
  },
  {
    title: 'Crafting',
    emoji: '🧵',
    left: "35%",
    top: "70%",
  },
  {
    title: 'Cooking',
    emoji: '👩‍🍳',
    left: "70%",
    top: "75%",
  },
];




export const AboutSection = () => {
  const constraintRef = useRef(null);
  return (
    <div className="py-20 lg:py-28" id="about">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start py-5">
          <Image src={ProfileImage} alt="Profile picture" width={600} className="w-full md:w-1/2 lg:w-1/3 mx-auto md:mx-0" />
          <div className="flex flex-col sm:grid-cols-1 md:w-1/2 lg:w-2/3">
            <h3 className="font-serif text-3xl py-5 text-center md:text-left">Hi, I'm Fu👋🏽 </h3>
            <h1 className="text-center md:text-left">A{" "}
              <b className="font-semibold tracking-widest bg-gradient-to-r from-emerald-300 to-sky-400 text-center bg-clip-text text-transparent">UX Designer</b> with 3P powers
              <div className="flex justify-center md:justify-start py-5">
                <ol className="font-semibold tracking-widest bg-gradient-to-r from-emerald-300 to-sky-400 bg-clip-text text-transparent">
                  <li className="flex items-center">
                    <span className="mr-2">✔️</span>
                    Product Design</li>
                  <li className="flex items-center">
                    <span className="mr-2">✔️</span>
                    Product Management</li>
                  <li className="flex items-center">
                    <span className="mr-2">✔️</span>
                    Program Management</li>
                </ol>
              </div>
              Experienced in travel, self-driving car, and e-commerce industry. Eager to bring my resilient and growth-oriented approach to drive innovation and efficiency through user-friendly design solutions.</h1>
          </div>
        </div>



        <div className="mt-20 flex flex-col gap-8">
          <div className="grid grid-col-1 gap-8 md:grid-cols-5 lg:grid-cols-3">
            <Card className="h-[320px] md:col-span-2 lg:col-span-1">
              <CardHeader title="My Reads" description="Explore the books shaping my perspectives." />
              <div className="w-40 mx-auto mt-2 md:mt-0">
                <Image src={bookImage} alt="Book cover" />
              </div>
            </Card>

            <Card className="h-[320px] md:col-span-3 lg:col-span-2">
              <CardHeader title="My Toolbox" description="Explore the technologies and tools I use to craft expectional digital experience." className="px-6 pt-6 -mb-4" />
              <ToolboxItems items={toolboxItems} />
            </Card>
          </div>


          <div className="grid grid-col-1 gap-8 md:grid-cols-5 lg:grid-cols-3">


            <Card className="h-[320px] p-0 flex flex-col md:col-span-3 lg:col-span-2">
              <CardHeader title="My Stress Reliever" description="Discovering joy and finding calm in my hobbies beyond codes." className="px-6 py-6" />

              <div className="relative flex-1" ref={constraintRef}>
                {hobbies.map(hobby => (
                  <motion.div key={hobby.title} className="inline-flex items-center gap-2 px-6 
              bg-gradient-to-r from-emerald-300 to-sky-400 rounded-full py-1.5 absolute" style={{
                      left: hobby.left,
                      top: hobby.top,
                    }}
                    drag
                    dragConstraints={constraintRef}
                  >
                    <span className="font-medium text-gray-950">{hobby.title}</span>
                    <span>{hobby.emoji}</span>
                  </motion.div>
                ))}
              </div>
            </Card>

            <Card className="h-[320px] p-0 relative md:col-span-2 lg:col-span-1">
              <Image src={mapImage} alt="map" className="h-full w-full object-cover object-left-top" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-32 rounded-xl after:content-[''] after:absolute after:inset-0 after:outline after:rounded-full after:outline-white/50">
                <div className="absolute inset-0 rounded-full bg-gradient=to-r from-emerald-300 to-sky-400 -z-40 animate-ping [animation-duration:2s]"></div>
                <div className="absolute inset-0 rounded-full bg-gradient=to-r from-emerald-300 to-sky-400 -z-30"></div>
                <Image src={FamilyMemoji} alt="family" className="size-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
};
