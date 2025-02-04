import inquirer, { Answers, QuestionCollection } from "inquirer";

import { ConsumerDataConfig, CREPOConfig } from "../types";
import { CustomScriptFramework, CustomScriptLanguage } from "../types/enum.js";

const inq = {
  askIfWantToStartDevEnv: async (): Promise<boolean> => {
    const question: QuestionCollection = [
      {
        name: "startDevEnv",
        type: "confirm",
        message:
          "Your settings were successfully processed. Do you want to start the development environment?",
        default: false,
      },
    ];

    const answer = await inquirer.prompt(question);

    return answer?.startDevEnv ?? false;
  },
  askIfWantToOverrideChanges: ():
    | Promise<{ confirmOverride: boolean }>
    | Promise<Answers> => {
    const question: QuestionCollection = [
      {
        name: "confirmOverride",
        type: "confirm",
        message: "Do you want to continue and override your changes?",
        default: false,
      },
    ];

    return inquirer.prompt(question);
  },
  askIfUsingCREPO: async (): Promise<CREPOConfig> => {
    const questions: QuestionCollection = [
      {
        name: "useCREPO",
        type: "confirm",
        message: "Are you going to use the CREPO (COntent REPOsitory)?",
        default: false,
      },
      {
        name: "crepoKeyStg",
        type: "input",
        when: (answers) => {
          return answers.useCREPO;
        },
        message:
          "Please provide your CREPO API key for the staging environment:",
      },
      {
        name: "crepoKeyProd",
        type: "input",
        when: (answers) => {
          return answers.useCREPO;
        },
        message:
          "Please provide your CREPO API key for the production environment:",
      },
    ];

    const result = await inquirer.prompt(questions);

    return {
      useCREPO: result.useCREPO,
      crepoAPIKeyProd: result.crepoKeyProd,
      crepoAPIKeyStg: result.crepoKeyStg,
    };
  },
  askIfCollectingConsumerData: async (): Promise<ConsumerDataConfig> => {
    const questions: QuestionCollection = [
      {
        name: "collectsUserData",
        type: "confirm",
        message: "Are you going to collect consumer data?",
        default: false,
      },
      {
        name: "jotFormId",
        type: "input",
        when: (answers) => {
          return answers.collectsUserData;
        },
        message: "Please provide your JotForm ID:",
        validate: (input: string) => {
          return input && input.trim() !== "";
        },
      },
    ];

    const answers = await inquirer.prompt(questions);

    return {
      collectsConsumerData: answers.collectsUserData,
      jotFormId: answers.jotFormId,
    };
  },
  askForPreferredLanguage: async (): Promise<CustomScriptLanguage> => {
    const question: QuestionCollection = [
      {
        name: "preferredLanguage",
        type: "list",
        message: "Do you prefer Typescript or Javascript?",
        choices: ["TypeScript", "JavaScript"],
      },
    ];

    const { preferredLanguage } = await inquirer.prompt(question);

    return preferredLanguage === "TypeScript"
      ? CustomScriptLanguage.TYPESCRIPT
      : CustomScriptLanguage.JAVASCRIPT;
  },
  askForPreferredFramework: async (
    preferredLanguage: CustomScriptLanguage
  ): Promise<CustomScriptFramework> => {
    const question: QuestionCollection = [
      {
        name: "preferredFramework",
        type: "list",
        message: "Which framework do you prefer for your work?",
        choices: [
          `Vanilla ${
            preferredLanguage === CustomScriptLanguage.JAVASCRIPT
              ? "JavaScript"
              : "TypeScript"
          }`,
          "Preact",
          "Svelte",
          "Vue",
        ],
      },
    ];

    const { preferredFramework } = await inquirer.prompt(question);
    if (preferredFramework === "Preact") return CustomScriptFramework.PREACT;
    if (preferredFramework === "Svelte") return CustomScriptFramework.SVELTE;
    if (preferredFramework === "Vue") return CustomScriptFramework.VUE;

    return CustomScriptFramework.VANILLA;
  },
};

export default inq;
