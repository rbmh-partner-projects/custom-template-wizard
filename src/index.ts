#!/usr/bin/env node

import chalk from 'chalk'
import {execSync} from 'child_process'
import clear from 'clear'
import figlet from 'figlet'
import fs from 'fs-extra'
import path from 'path'

import config from './lib/config.js'
import files from './lib/files.js'
import inquirer from './lib/inquirer.js'
import template from './lib/template.js'
import {ConsumerDataConfig, CREPOConfig, CustomScriptConfig} from './types'

const redBullRed = '#f30b47'
const redBullChalk = chalk.hex(redBullRed)

const log = console.log

if (process.argv.length == 3 && process.argv[2] == 'setup') {
  console.log("Exec path" + process.execPath)
  
  console.log(import.meta)

  console.log("Current Working directory:" + process.cwd())
  console.log("Another one:" + path.resolve("./lib/files.ts"))
  process.exit(0)
}

function exit(): void {
  log()
  log(
      chalk.yellow(
          'The custom-script wizard exited gracefully. No changes were made.'
      )
  )
  log()

  process.exit()
}

async function init(): Promise<void> {


  console.log("Current Working directory:" + process.cwd())
  return

}

export async function setEnv(
    consumerConfig: ConsumerDataConfig,
    crepoConfig: CREPOConfig
): Promise<void> {
  const filePath = path.join('.', '.env.redbull')

  const fileStream = fs.createWriteStream(filePath, {
    flags: 'w',
  })

  fileStream.write(
      `REDBULL_ACCOUNT_TOKEN_STAGING=${consumerConfig.rbAccountTokenStg ?? ''}\n`
  )
  fileStream.write(
      `REDBULL_ACCOUNT_TOKEN_PRODUCTION=${
          consumerConfig.rbAccountTokenProd ?? ''
      }\n`
  )

  fileStream.write(`JOTFORM_ID=${consumerConfig.jotFormId ?? ''}\n`)

  fileStream.write(
      `CREPO_API_KEY_STAGING=${crepoConfig.crepoAPIKeyStg ?? ''}\n`
  )
  fileStream.write(
      `CREPO_API_KEY_PRODUCTION=${crepoConfig.crepoAPIKeyProd ?? ''}\n`
  )

  fileStream.end()
}

export async function processConfig(
    cfg: CustomScriptConfig,
    crepoConfig?: CREPOConfig
): Promise<void> {
  // get template structure
  const templateStructure = await template.getTemplateStructure(cfg)
  await template.copyFiles(templateStructure, cfg, crepoConfig)

  // save config
  config.save(cfg)
}

export default {init}
