"use client";

import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

interface ThreeDCardDemoProps {
  item: {
    title: string;
    description: string;
    image: string;
  };
}
export function ThreeDCardDemo({ item }: ThreeDCardDemoProps) {
  return (
    <CardContainer>
      <CardBody className="border-2 rounded-3xl relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1]  w-auto sm:w-[30rem] h-auto p-6 py-10  ">
        <CardItem translateZ="50" className="text-3xl font-semiBold text-white">
          {item.title}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-300 text-sm max-w-sm mt-2"
        >
          {item.description}
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <img
            src={item.image}
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        {/* <div className="flex justify-between items-center mt-10">
          <CardItem
            translateZ={20}
            as="a"
            href={item.linkUrl}
            target="__blank"
            className="px-4 py-2 rounded-xl text-xs font-normal text-white"
          >
            {item.linkText}
          </CardItem>
        </div> */}
      </CardBody>
    </CardContainer>
  );
}
