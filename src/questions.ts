import { Question } from "./data";
import countryByPop from "country-json/src/country-by-population.json";
import countryByArea from "country-json/src/country-by-surface-area.json";
import { shuffle } from "lodash";

export const generatePopulationQuestion = (): Question => {
  const [a, b] = shuffle(countryByPop);
  return {
    prompt: "Which population is larger?",
    solution: {
      type: "mcq",
      options: [a.country, b.country],
      answer: a.population > b.population ? 0 : 1,
    },
  };
};
export const generateAreaQuestion = (): Question => {
  const [a, b] = shuffle(countryByArea);
  return {
    prompt: "Which country's area is larger?",
    solution: {
      type: "mcq",
      options: [a.country, b.country],
      answer: a.area > b.area ? 0 : 1,
    },
  };
};

export const pickRandomQuestion = (): Question =>
  shuffle([generateAreaQuestion, generatePopulationQuestion])[0]();
