import { CustomScriptConfig } from '../types';
declare const files: {
    sourceFilesModified: (config: CustomScriptConfig) => Promise<boolean>;
};
export default files;
