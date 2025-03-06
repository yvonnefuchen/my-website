import memojiAvatar1 from "@/assets/images/memoji-avatar-1.png";
import memojiAvatar2 from "@/assets/images/memoji-avatar-2.png";
import memojiAvatar3 from "@/assets/images/memoji-avatar-3.png";
import memojiAvatar4 from "@/assets/images/memoji-avatar-4.png";
import memojiAvatar5 from "@/assets/images/memoji-avatar-5.png";
import { SectionHeader } from "@/components/SectionHeader";
import Image from "next/image";
import React from "react";
import grainImage from "@/assets/images/grain.jpg";
import { Card } from "@/components/Card";
import { Fragment } from "react";

const testimonials = [
  {
    name: "Dave Yang",
    position: "VP of Operations @ Quanta Cloud Computing",
    text: "Fu is an exceptional professional with outstanding operational abilities and cross-functional communication skills. Her strategic approach to project management ensures seamless execution and delivery, even under tight deadlines. Fu's ability to bridge gaps between different teams fosters a collaborative environment where everyone works towards a common goal.",
    avatar: memojiAvatar1,
  },
  {
    name: "Fu-Tai Wei",
    position: "Director @ Taiwan Trade Center, Duabi",
    text: "Working with Fu was a pleasure. Her dedication to her work was evident during our time in Dubai, where she coordinated trade shows with meticulous attention to detail. Her organizational skills and commitment to excellence ensured that every event ran smoothly and exceeded expectations. ",
    avatar: memojiAvatar2,
  },
  {
    name: "Go Enokida",
    position: "CEO @ LossPay",
    text: "Working with Fu at HomeAway was an exceptional experience. Fu's proactiveness and data analysis skills were particularly impressive, especially in analyzing traveler traffic between Japan and Taiwan. Her dedication and precision in handling complex data sets were commendable, making her a valuable asset to the team. ",
    avatar: memojiAvatar3,
  },
  {
    name: "Szu-Yu Yang",
    position: "Product Designer @ Yahoo",
    text: "Fu has certainly earned my highest recommendation. During our time working together, Fu demonstrated outstanding product thinking and exceptional team collaboration.Fu's collaborative spirit and willingness to engage with team members at all levels made every project a seamless and enjoyable experience.",
    avatar: memojiAvatar4,
  },
  {
    name: "Lawrence Lin",
    position: "Founder @ Teachify",
    text: "I wholeheartedly endorse Fu for her exceptional product thinking and proactiveness. Fu's ability to anticipate challenges and devise innovative solutions has been a game-changer. Her keen problem-solving skills and forward-thinking approach have significantly enhanced our product development process.Her contributions have been invaluable, making her a standout team member and a true asset to Teachify.",
    avatar: memojiAvatar5,
  },
];

export const TestimonialsSection = () => {
  return (
    <div className="py-16 lg:py-24">
      <div className="container">
        <SectionHeader eyebrow="Shareholder Testimonials" title="Why am I a team player?" description="Dont' just take my word for it. See insights from former bosses & co-workers." />
        <div className="mt-12 lg:mt-20 flex overflow-x-clip [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] py-4 -my-4">
          <div className="flex gap-8 pr-8 flex-none animate-move-left [animation-duration:50s] hover:[animation-play-state:paused]">
            {[...new Array(2)].fill(0).map((_, index) => (
              <Fragment key={index}>
                {testimonials.map((testimonial) => (
                  <Card key={testimonial.name} className="max-w-xs md:max-w-md p-6 md:p-8 hover:-rotate-3 transition duration-300">
                    <div className="flex gap-4 items-center">
                      <div className="size-14 bg-gray-700 inline-flex items-center justify-center rounded-full flex-shrink-0">
                        <Image src={testimonial.avatar} alt={testimonial.name} className="max-h-full" />
                      </div>
                      <div>
                        <div className="font-seminbold">{testimonial.name}</div>
                        <div className="text-sm text-white/40">{testimonial.position}
                        </div>
                      </div>
                    </div>
                    <p className="mt-4 md:mt-6 text-sm md:text-base">{testimonial.text}</p>
                  </Card>
                ))}
              </Fragment>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
};
