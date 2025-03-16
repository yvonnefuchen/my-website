import memojiImage from '@/assets/images/memoji girl behind computer.png';
import Image from "next/image";
import ArrowDown from '@/assets/icons/arrow-down.svg';
import grainImage from "@/assets/images/grain.jpg";
import StarIcon from '@/assets/icons/star.svg';
import SparkleIcon from '@/assets/icons/sparkle.svg';
import Airplane from '@/assets/icons/Airplane.svg'
import { HeroOrbit } from '@/components/HeroOrbit';
import React from "react";


export const HeroSection = () => {
  return (
    <div className="py-24 md:py-40 lg:py-44 relative z-0 overflow-x-clip
  ">
      <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_70%,transparent)]">
        <div
          className="absolute inset-0 -z-30 opacity-5"
          style={{
            backgroundImage: `url(${grainImage.src})`,
          }}
        ></div>
        <div className='size-[640px] hero-ring'></div>
        <div className='size-[840px] hero-ring'></div>
        <div className='size-[1040px] hero-ring'></div>
        <div className='size-[1240px] hero-ring'></div>

        <HeroOrbit size={430} rotation={-14} shouldOrbit orbitDuration="20s">
          <SparkleIcon className="size-8 text-emerald-200/20" />
        </HeroOrbit>
        <HeroOrbit size={440} rotation={79} shouldOrbit orbitDuration="32s">
          <SparkleIcon className="size-5 text-emerald-200/20" />
        </HeroOrbit>
        <HeroOrbit size={510} rotation={20} shouldOrbit orbitDuration="34s" shouldSpin spinDuration="6s">
          <StarIcon className="size-12 text-emerald-200" />
        </HeroOrbit>
        <HeroOrbit size={520} rotation={-41} shouldOrbit orbitDuration="36s">
          <div className="size-2 rounded-full bg-emerald-200/20" />
        </HeroOrbit>
        <HeroOrbit size={530} rotation={178} shouldOrbit orbitDuration="38s">
          <SparkleIcon className="size-10 text-emerald-200/20" />
        </HeroOrbit>
        <HeroOrbit size={590} rotation={98} shouldOrbit orbitDuration="40s" shouldSpin spinDuration="6s">
          <StarIcon className="size-8 text-emerald-200" />
        </HeroOrbit>
        <HeroOrbit size={650} rotation={-5} shouldOrbit orbitDuration="42s">
          <div className="size-2 rounded-full bg-emerald-200/20" />
        </HeroOrbit>
        <HeroOrbit size={710} rotation={144} shouldOrbit orbitDuration="44s">
          <SparkleIcon className="size-14 text-emerald-200/20" />
        </HeroOrbit>

        <HeroOrbit size={748} rotation={85} shouldOrbit orbitDuration="46s">
          <div className="size-3 rounded-full bg-emerald-200/20" />
        </HeroOrbit>

        <HeroOrbit size={560} rotation={-60} shouldOrbit orbitDuration="30s">
          <Airplane className="size-28 text-emerald-200" />
        </HeroOrbit>


      </div>

      <div className="container relative z-100" >
        <div className="flex flex-col items-center">
          <Image src={memojiImage}
            className="size-[100px]"
            alt="Girl behind computer" />
          <div className="bg-gray-950 border border-gray-800 px px-4 py-1.5 inline-flex items-center gap-3 rounded-lg">
            <div className='bg-green-500 size-2.5 rounded-full relative'>
              <div className='bg-green-500 absolute inset-0 rounded-full animate-ping-large'></div>
            </div>
            <div className="text-sm font-medium">Available for new projects</div>
          </div>
        </div>

        <div className='max-w-lg mx-auto'>
          <h1 className='font-serif text-2xl md:text-5xl text-center mt-7 tracking-wide'>
            Welcome to Fu&apos;s PM & UX Design Space</h1>
          <p className='mt-4 text-center font-serif text-emerald-200 tracking-widest' >Where Ideas Take Flight</p>
          <p className='mt-4 text-center text-white/70 '>
            I specialized in transforming complex problems into desinged solutions. Enjoying crafting products, interactions and stories.
          </p>
        </div>
        <div className='flex flex-col md:flex-row justify-center items-center mt-8 gap-4'>
          <button className='inline-flex items-center gap-2 border border-white/15 px-6 h-12 rounded-xl'>
            <span className='font-semibold'>Explore My Works</span>
            <ArrowDown className="size-4" />
          </button>


          <a href="https://www.linkedin.com/in/yvonne-fu-chen/" target="_blank" className="inline-flex items-center gap-2 border border-white/30 bg-white text-gray-900 px-6 h-12 rounded-lg">
            <span>👋🏽</span>
            <span className="font-semibold">Let&apos;s Connect</span>
          </a>
        </div>
      </div>
    </div>
  );
};
