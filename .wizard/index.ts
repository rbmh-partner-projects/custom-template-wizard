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

if (process.argv.length == 3 && process.argv[2] == 'init') {
  init()
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
  // clear the terminal first
  clear()

  log(redBullChalk(figlet.textSync('Red Bull', {horizontalLayout: 'full'})))

  let cfg: CustomScriptConfig = config.load()

  // check if user already modified his scripts (checksum)
  if (await files.sourceFilesModified(cfg)) {
    log(
        chalk.white(
            `It looks like you have already modified your scripts. Using this wizard will ${chalk.bold(
                'override your changes'
            )}.`
        )
    )

    const {confirmOverride} = await inquirer.askIfWantToOverrideChanges()

    if (!confirmOverride) {
      exit()
    }
  }

  // ask for input

  const consumerDataAnswers = await inquirer.askIfCollectingConsumerData()
  const crepoAnswers = await inquirer.askIfUsingCREPO()

  const preferredLanguage = await inquirer.askForPreferredLanguage()
  const preferredFramework = await inquirer.askForPreferredFramework(
      preferredLanguage
  )

  cfg = {
    collectsUserData: consumerDataAnswers.collectsConsumerData,
    useCREPO: crepoAnswers.useCREPO,
    framework: preferredFramework,
    language: preferredLanguage,
  }

  await setEnv(consumerDataAnswers, crepoAnswers)
  await processConfig(cfg, crepoAnswers)

  if (
      cfg.collectsUserData &&
      (!consumerDataAnswers.rbAccountTokenProd ||
          !consumerDataAnswers.rbAccountTokenStg)
  ) {
    console.log(
        chalk.yellow(
            `${chalk.bold(
                'Warning'
            )}: You have decided not to import keys for the ${chalk.bold(
                'Red Bull Account SDK'
            )}. However, the examples provided require these keys. If you do want to provide them, please restart the setup.`
        )
    )
  }

  if (
      cfg.useCREPO &&
      (!crepoAnswers.crepoAPIKeyStg || !crepoAnswers.crepoAPIKeyProd)
  ) {
    console.log(
        chalk.yellow(
            `${chalk.bold(
                'Warning'
            )}: You decided not to import keys for the ${chalk.bold(
                'CREPO SDK'
            )}. However, the examples provided require these keys. If you do want to provide them, please restart the setup.`
        )
    )
  }

  const startDevEnv = await inquirer.askIfWantToStartDevEnv()

  if (startDevEnv) {
    try {
      execSync('npm run start:dev', {
        stdio: 'inherit',
        killSignal: 'SIGINT',
      })
    } catch (e) {
      process.exit(0)
    }
  }
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
