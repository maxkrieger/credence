import { Question } from "./data";

const questions: Question[] = [
  {
    prompt: "Which population is larger?",
    solution: {
      type: "mcq",
      options: ["Kolkata", "Moscow"],
      answer: 0,
    },
  },
  {
    prompt: "Which population is larger?",
    solution: {
      type: "mcq",
      options: ["Ecuador", "Shanghai"],
      answer: 1,
    },
  },
  {
    prompt: "Which population is larger?",
    solution: {
      type: "mcq",
      options: ["Tokyo", "Massachusetts"],
      answer: 0,
    },
  },
  {
    prompt: "Which country is furthest north?",
    solution: {
      type: "mcq",
      options: ["Uzbekistan", "Turkmenistan", "Kazakhstan"],
      answer: 2,
    },
  },
  {
    prompt: "Which country is further south?",
    solution: {
      type: "mcq",
      options: ["Uruguay", "Paraguay"],
      answer: 0,
    },
  },
  /*{
    prompt: "Population of Nicaragua",
    solution: {
      type: "num",
      range: [2e4, 1e8],
      answer: 6.546e6,
    },
  },
  {
    prompt: "Population of Seoul",
    solution: {
      type: "num",
      range: [1e5, 1e8],
      answer: 9.776e6,
    },
  },
  {
    prompt: "Population of Brazil",
    solution: {
      type: "num",
      range: [1e5, 1e9],
      answer: 211e6,
    },
  },
  {
    prompt: "Population of Shanghai",
    solution: {
      type: "num",
      range: [1e5, 1e8],
      answer: 26.32e6,
    },
  },
  {
    prompt: "DARPA Budget ($)",
    solution: {
      type: "num",
      range: [1e6, 1e11],
      answer: 3.427e9,
    },
  },*/
];
export default questions;
