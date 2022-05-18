#!/usr/bin/env node
import { ConsumerDataConfig, CREPOConfig, CustomScriptConfig } from './types';
declare function init(): Promise<void>;
export declare function setEnv(consumerConfig: ConsumerDataConfig, crepoConfig: CREPOConfig): Promise<void>;
export declare function processConfig(cfg: CustomScriptConfig, crepoConfig?: CREPOConfig): Promise<void>;
declare const _default: {
    init: typeof init;
};
export default _default;
