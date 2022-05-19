import Conf from 'conf'

import { CustomScriptConfig } from '../types'

const cfgFile = new Conf({
  configName: 'rb-custom-script',
  cwd: process.cwd(),
})

const config = {
  save: (cfg: CustomScriptConfig) => {
    cfg.updated = new Date()
    cfgFile.set(cfg)
  },
  load: (): CustomScriptConfig => {
    return cfgFile.store as CustomScriptConfig
  },
}

export default config
