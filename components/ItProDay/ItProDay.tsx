import { ComponentProps } from "@uniformdev/canvas-react";
import Splitter from "../Splitter";

import { ContentstackEnhancerResult } from "@uniformdev/canvas-contentstack";

type ItProDayProps = ComponentProps<{
  itproday: ContentstackEnhancerResult<{
    title: string;
    description: string;
  }>;
}>;

export function ItProDay({ itproday }: ItProDayProps) {
  return (
    <>
      <div className="py-24">
        <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
          <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
            <p className="uppercase tracking-loose w-full">{itproday.title}</p>
          </div>
          <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
            <p className="tracking-loose w-full">{itproday.description}</p>
          </div>
          <div></div>
        </div>
      </div>
      <Splitter />
    </>
  );
}
