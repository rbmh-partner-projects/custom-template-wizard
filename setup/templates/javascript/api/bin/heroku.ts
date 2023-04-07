import chalk from 'chalk'
import {exec} from 'child_process'
import dotenv from 'dotenv'
import figlet from 'figlet'
import inquirer, {QuestionCollection} from 'inquirer'
import ora from 'ora'

dotenv.config({path: '.env.redbull'})

const redBullRed = '#f30b47'
const redBullChalk = chalk.hex(redBullRed)
const linkChalk = chalk.hex('#29b8db')

function isHerokuCLIInstalled(): Promise<boolean> {
  return new Promise((fulfill, reject) => {
    exec('heroku', (err, stdout, stderr) => {
      if (err) {
        fulfill(false)
      } else {
        fulfill(true)
      }
    })
  })
}

function isHerokuCLIUAuthenticated(): Promise<boolean> {
  return new Promise((resolve, reject) => {
    exec('heroku whoami', (err, stdout, stderr) => {
      if (err) {
        resolve(false)
      } else {
        resolve(true)
      }
    })
  })
}

function isPartOfApp(appName: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    exec(`heroku apps:info ${appName}`, (err, stdout, stderr) => {
      if (err) {
        resolve(false)
      } else {
        const hasAccess = stdout.indexOf('Web URL') >= 0
        resolve(hasAccess)
      }
    })
  })
}

function setHerokuConfig(
    appName: string,
    envName: string,
    envValue: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    exec(
        `heroku config:set ${envName}=${envValue} -a ${appName}`,
        (err, stdout, stderr) => {
          if (err) {
            reject(err)
          } else {
            resolve()
          }
        }
    )
  })
}

async function init() {
  console.clear()
  console.log(
      redBullChalk(figlet.textSync('Red Bull', {horizontalLayout: 'full'}))
  )

  const loadingSpinner = ora({
    text: chalk.white.bold('Hold on. We are verifying your setup right now.'),
  }).start()

  if (!(await isHerokuCLIInstalled())) {
    loadingSpinner.fail()
    console.log(
        chalk.yellow.bold(
            `It looks like you do not have the Heroku CLI installed yet. Please install it as described here: `
        ) +
        linkChalk(
            `https://devcenter.heroku.com/articles/heroku-cli#download-and-install`
        )
    )
    console.log(chalk.yellow.bold('Aborting ...'))
    return
  }

  if (!(await isHerokuCLIUAuthenticated())) {
    loadingSpinner.fail()
    console.log(
        chalk.yellow.bold(
            `It looks like you have not authenticated your Heroku CLI yet. Please log in to your account as described here: `
        ) +
        linkChalk(
            `https://devcenter.heroku.com/articles/heroku-cli#getting-started`
        )
    )
    console.log(chalk.yellow.bold('Aborting ...'))
    return
  }


  loadingSpinner.succeed()

  // since we suffix apps in heroku with random characters, we cannot guess the app name anymore
  // e.g. rb-unlocked-xy-stg / rb-unlocked-cd-prod
  const appQuestion: QuestionCollection = [
    {
      name: 'fullAppName',
      type: 'input',
      message:
          'Type in the name of the Heroku app you want to synchronize your environment variables to:',
    },
  ]

  const { fullAppName } = await inquirer.prompt(appQuestion)

  loadingSpinner.start()

  if (!(await isPartOfApp(fullAppName))) {
    loadingSpinner.fail()
    console.log(
        chalk.yellow.bold(
            `It looks like you are not part of your projects Heroku App "${fullAppName}" yet. Please request access from your technical admin.`
        )
    )
    console.log(chalk.yellow.bold('Aborting ...'))
    return
  }

  loadingSpinner.succeed()


  const environment = fullAppName.endsWith('-stg') ? 'Staging' : 'Production'


  let baseSSLUrl =
      environment == 'Staging'
          ? `${fullAppName}.herokuapp.com`
          : `p-p.redbull.com/${fullAppName.replace('-prod', '')}`

  const envVariables: {
    [name: string]: string | undefined
  } = {
    REDBULL_ACCOUNT_TOKEN_PRODUCTION:
    process.env.REDBULL_ACCOUNT_TOKEN_PRODUCTION,
    REDBULL_ACCOUNT_TOKEN_STAGING: process.env.REDBULL_ACCOUNT_TOKEN_STAGING,
    CREPO_API_KEY_PRODUCTION: process.env.CREPO_API_KEY_PRODUCTION,
    CREPO_API_KEY_STAGING: process.env.CREPO_API_KEY_STAGING,
    JOTFORM_ID: process.env.JOTFORM_ID,
    BASE_SSL_URL: baseSSLUrl,
    NODE_ENV: environment == 'Staging' ? 'staging' : 'production',
  }

  const confirmQuestion: QuestionCollection = [
    {
      name: 'confirm',
      type: 'confirm',
      message:
          `Are you sure to push the following environment variables to ${fullAppName}?\n` +
          JSON.stringify(envVariables, null, 2) +
          `\nContinue?`,
    },
  ]

  const confirmed = (await inquirer.prompt(confirmQuestion))?.confirm ?? false

  if (!confirmed) {
    console.log(
        chalk.yellow.bold(`You have cancelled the synchronization process.`)
    )
    return
  }

  const syncSpinner = ora({
    text: chalk.white.bold(
        'Hold on. We are syncing your environment variables right now.'
    ),
  }).start()

  for (let key in envVariables) {
    await setHerokuConfig(fullAppName, key, envVariables[key])
  }

  syncSpinner.succeed('Your environment variables were successfully synced.')

  process.exit(0)
}

init()
