import { CustomScriptFramework, CustomScriptLanguage } from './enum'

declare type CustomScriptConfig = {
  useCREPO: boolean
  collectsUserData: boolean
  framework: CustomScriptFramework
  language: CustomScriptLanguage
  updated?: Date
}

declare type CustomScriptTemplatePath = {
  sourcePath: string
  destinationPath: string
  isFile: boolean
}

declare type ConsumerDataConfig = {
  collectsConsumerData: boolean
  jotFormId: string
}

declare type CREPOConfig = {
  useCREPO: boolean
  crepoAPIKeyStg?: string
  crepoAPIKeyProd?: string
}
