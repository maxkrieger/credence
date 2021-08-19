import { Question } from "./data";
import countryByPop from "country-json/src/country-by-population.json";
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
