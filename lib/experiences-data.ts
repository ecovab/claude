import type { IconType } from "react-icons";
import {
  GiBarbecue,
  GiCampfire,
  GiMartini,
  GiPartyPopper,
  GiSofa,
  GiTrophyCup,
} from "react-icons/gi";

export interface Experience {
  id: string;
  title: string;
  description: string;
  icon: IconType;
}

export const EXPERIENCES: Experience[] = [
  {
    id: "grill",
    title: "Fire & Grill",
    description:
      "Steaks, ribs and sosaties straight off the open flame — the heart of the Gecko kitchen.",
    icon: GiBarbecue,
  },
  {
    id: "terrace",
    title: "Terrace Sundowners",
    description:
      "Paarl's golden hour, best enjoyed from our outdoor terrace with a cocktail in hand.",
    icon: GiCampfire,
  },
  {
    id: "cocktails",
    title: "Cocktails & Drinks",
    description:
      "A full bar, local wine list and house cocktails mixed by people who enjoy doing it.",
    icon: GiMartini,
  },
  {
    id: "sports",
    title: "Game Days",
    description:
      "Big screens, cold draughts and a crowd that turns every match into an occasion.",
    icon: GiTrophyCup,
  },
  {
    id: "family",
    title: "Family Friendly",
    description:
      "Easy-going, welcoming and built for big tables — kids included.",
    icon: GiSofa,
  },
  {
    id: "events",
    title: "Private Events",
    description:
      "Birthdays, celebrations and after-work gatherings hosted with zero fuss.",
    icon: GiPartyPopper,
  },
];
