import fs from 'fs-extra'
import path from 'path'

import { CustomScriptConfig } from '../types'

const getFilesInDirectory = async (dir: string): Promise<string[]> => {
  if (!fs.pathExists(dir)) {
    return []
  }

  let files: string[] = []
  for (let file of await fs.readdir(dir)) {
    const absPath = path.join(dir, file)
    if (await (await fs.stat(absPath)).isDirectory()) {
      files = files.concat(await getFilesInDirectory(absPath))
    } else {
      files.push(absPath)
    }
  }

  return files
}

const files = {
  sourceFilesModified: async (config: CustomScriptConfig): Promise<boolean> => {
    if (!config.updated) {
      return false
    }

    const appPath = path.join('.', 'src')

    if (!fs.existsSync(appPath)) {
      fs.ensureDirSync(appPath)
      return false
    }

    const filesInApp = await getFilesInDirectory(appPath)

    let filesWithTime = await Promise.all(
      filesInApp.map(
        async (
          path
        ): Promise<{
          path: string
          dateChange: Date
        }> => {
          const fileStat = await fs.stat(path)

          return {
            path: path,
            dateChange: fileStat.mtime,
          }
        }
      )
    )

    filesWithTime = filesWithTime.sort((a, b) => {
      return b.dateChange.valueOf() - a.dateChange.valueOf()
    })

    const latestFileChange = filesWithTime.length > 0 ? filesWithTime[0] : null

    if (!latestFileChange) {
      return false
    }

    return (
      latestFileChange.dateChange.valueOf() > new Date(config.updated).valueOf()
    )
  },
}

export default files
