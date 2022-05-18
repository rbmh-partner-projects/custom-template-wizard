import { CREPOConfig, CustomScriptConfig, CustomScriptTemplatePath } from '../types';
declare const template: {
    copyFiles: (entries: CustomScriptTemplatePath[], config: CustomScriptConfig, crepoConfig?: CREPOConfig) => Promise<void>;
    getTemplateStructure: (config: CustomScriptConfig) => Promise<CustomScriptTemplatePath[]>;
};
export default template;
