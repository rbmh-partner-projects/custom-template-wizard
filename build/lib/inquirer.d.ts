import { Answers } from 'inquirer';
import { ConsumerDataConfig, CREPOConfig } from '../types';
import { CustomScriptFramework, CustomScriptLanguage } from '../types/enum';
declare const inq: {
    askIfWantToStartDevEnv: () => Promise<boolean>;
    askIfWantToOverrideChanges: () => Promise<{
        confirmOverride: boolean;
    }> | Promise<Answers>;
    askIfUsingCREPO: () => Promise<CREPOConfig>;
    askIfCollectingConsumerData: () => Promise<ConsumerDataConfig>;
    askForPreferredLanguage: () => Promise<CustomScriptLanguage>;
    askForPreferredFramework: (preferredLanguage: CustomScriptLanguage) => Promise<CustomScriptFramework>;
};
export default inq;
