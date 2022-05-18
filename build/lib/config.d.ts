import { CustomScriptConfig } from '../types';
declare const config: {
    save: (cfg: CustomScriptConfig) => void;
    load: () => CustomScriptConfig;
};
export default config;
