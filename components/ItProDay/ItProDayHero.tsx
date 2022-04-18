import { ComponentProps } from "@uniformdev/canvas-react";
import { ContentstackEnhancerResult } from "@uniformdev/canvas-contentstack";
import classes from "../css/ItProDayHero.module.css";

export type bannerImageProps = ComponentProps<{
  url: string;
}>;

type ItProDayHeroProps = ComponentProps<{
  itproday_hero: ContentstackEnhancerResult<{
    header: string;
    subheader: string;
    banner_image: bannerImageProps;
  }>;
}>;

export function ItProDayHero({ itproday_hero }: ItProDayHeroProps) {
  return (
    <>
      <div className="py-24">
        <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
          {itproday_hero.banner_image ? (
            <img
              src={itproday_hero.banner_image.url}
              alt={itproday_hero.header}
              loading="lazy"
              className={classes.headerImage}
            />
          ) : null}
          <div className={classes.homeIntroHeader}>{itproday_hero.header}</div>
          <div className={classes.homeIntroSubheader}>{itproday_hero.subheader}</div>
        </div>
      </div>
    </>
  );
}
