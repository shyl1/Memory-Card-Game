import { ICard } from "./card.model";

export interface IPrepare {
  cards: ICard[];
  startBtn?: HTMLElement | null;
  resetBtn?: HTMLElement | null;
  progressBarLeft?:HTMLElement | null;
  progressBarRight?:HTMLElement| null;
  totalPairs:number;
}