import { ComponentType } from "react";
import { ComponentInstance } from "@uniformdev/canvas";
import {
  DefaultNotImplementedComponent,
  ComponentProps,
} from "@uniformdev/canvas-react";

import { Hero } from "./Hero";
import TalkList from "./TalkList";
import { WhyAttend } from "./WhyAttend";
import { Talk } from "./Talk";
import { RegisterForm } from "./RegisterForm";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { FinalPlea } from "./SolarWinds/FinalPlea";
import { ItProDay } from "./ItProDay/ItProDay";
import { ItProDayHero } from "./ItProDay/ItProDayHero";

const mappings: ComponentMapping = {
  hero: Hero,
  talklist: TalkList,
  talk: Talk,
  whyattend: WhyAttend,
  registrationForm: RegisterForm,
  header: Navbar,
  footer: Footer,
  finalplea: FinalPlea,
  itproday: ItProDay,
  itproday_hero: ItProDayHero
};

type ComponentMapping = Record<string, ComponentType<any>>;

export function resolveRenderer(
  component: ComponentInstance
): ComponentType<ComponentProps<any>> | null {
  const componentImpl = mappings[component.type];
  return componentImpl ? componentImpl : DefaultNotImplementedComponent;
}

export default mappings;
