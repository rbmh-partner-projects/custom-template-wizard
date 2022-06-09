#!/usr/bin/env node
import { ConsumerDataConfig, CREPOConfig, CustomScriptConfig } from './types';
declare function init(workingPath: string): Promise<void>;
export declare function setEnv(consumerConfig: ConsumerDataConfig, crepoConfig: CREPOConfig): Promise<void>;
export declare function processConfig(cfg: CustomScriptConfig, crepoConfig?: CREPOConfig, workingPath?: string): Promise<void>;
declare const _default: {
    init: typeof init;
};
export default _default;
