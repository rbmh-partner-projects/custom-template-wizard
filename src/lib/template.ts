import doT from 'dot'
import fs from 'fs-extra'
import path from 'path'
import prettier, { Options } from 'prettier'

import {
	CREPOConfig,
	CustomScriptConfig,
	CustomScriptTemplatePath,
} from '../types'
import { CustomScriptFramework, CustomScriptLanguage } from '../types/enum.js'

async function renderTemplate(
	filePath: string,
	config: CustomScriptConfig,
	crepoConfig: CREPOConfig
): Promise<string> {
	const templateContent = await fs.readFile(filePath)
	const template = doT.template(templateContent.toString('utf-8'), {
		...doT.templateSettings,
		strip: false,
	})

	if (crepoConfig && crepoConfig.useCREPO) {
		return template({
			...config,
			crepoAPIKeyProd: crepoConfig.crepoAPIKeyProd,
		})
	}

	return template(config)
}

function formatTemplate(content: string, destPath: string): string {
	const fileExtension = destPath.split('.').pop()
	let baseConfig: Options = {
		tabWidth: 2,
		printWidth: 100,
		pluginSearchDirs: [process.cwd()],
		parser: 'babel',
	}

	if (fileExtension === 'vue' || fileExtension === 'svelte') {
		baseConfig = {
			...baseConfig,
			parser: 'html',
		}
	}

	//please format my rendered template using prettier
	return prettier.format(content, baseConfig)
}

async function renderAndCopyFile(
	file: string,
	fullPath: string,
	fullDestinationPath: string,
	config: CustomScriptConfig,
	crepoConfig?: CREPOConfig
): Promise<void> {
	// we got a template here
	if (file.split('.').pop() == 't') {
		let renderedTemplate = await renderTemplate(fullPath, config, crepoConfig)

		const destPath =
			fullDestinationPath.split('.').pop() == 't'
				? fullDestinationPath.substring(0, fullDestinationPath.length - 2)
				: fullDestinationPath

		renderedTemplate = formatTemplate(renderedTemplate, destPath)

		await fs.writeFile(destPath, renderedTemplate)
	} else {
		await fs.copyFile(fullPath, fullDestinationPath)
	}
}

async function renderAndCopyFilesInFolder(
	sourcePath: string,
	destinationPath: string,
	config: CustomScriptConfig,
	crepoConfig?: CREPOConfig
): Promise<void> {
	const filesInFolder = fs.readdirSync(sourcePath)

	for (let file of filesInFolder) {
		const fullPath = path.join(sourcePath, file)
		const fullDestinationPath = path.join(destinationPath, file)

		if (fs.lstatSync(fullPath).isDirectory()) {
			await renderAndCopyFilesInFolder(
				fullPath,
				fullDestinationPath,
				config,
				crepoConfig
			)
			continue
		}

		fs.ensureDirSync(path.parse(fullDestinationPath).dir)

		await renderAndCopyFile(file, fullPath, fullDestinationPath, config)
	}
}

const template = {
	copyFiles: async (
		entries: CustomScriptTemplatePath[],
		config: CustomScriptConfig,
		crepoConfig?: CREPOConfig
	): Promise<void> => {
		const basePath = path.join(process.cwd(), 'src')

		// clear src directory first
		await fs.remove(basePath)

		const graphQLConfigFile = path.join(process.cwd(), 'graphql.config.js')

		if (fs.existsSync(graphQLConfigFile)) {
			await fs.remove(graphQLConfigFile)
		}

		for (let entry of entries) {
			const sourcePath = entry.sourcePath
			let destinationPath = path.join(basePath, entry.destinationPath)

			// in case we got a file here, we need to get the path of that file, otherwise a folder with the filename will be created
			fs.mkdirSync(
				entry.isFile ? path.parse(destinationPath).dir : destinationPath,
				{
					recursive: true,
				}
			)
			if (!entry.isFile) {
				await renderAndCopyFilesInFolder(
					sourcePath,
					destinationPath,
					config,
					crepoConfig
				)
			} else {
				await renderAndCopyFile(
					sourcePath,
					sourcePath,
					destinationPath,
					config,
					crepoConfig
				)
			}
		}
	},

	getTemplateStructure: async (
		workingPath: string,
		config: CustomScriptConfig
	): Promise<CustomScriptTemplatePath[]> => {
		const templatePaths: CustomScriptTemplatePath[] = []
		const basePath = path.join(workingPath, 'templates')

		const isTypeScript = config.language == CustomScriptLanguage.TYPESCRIPT

		const isPreact = config.framework === CustomScriptFramework.PREACT
		const isSvelte = config.framework === CustomScriptFramework.SVELTE
		const isVue = config.framework === CustomScriptFramework.VUE
		const isTsAndPreact =
			config.language == CustomScriptLanguage.TYPESCRIPT &&
			config.framework === CustomScriptFramework.PREACT
		const isJsAndPreact =
			config.language == CustomScriptLanguage.JAVASCRIPT &&
			config.framework === CustomScriptFramework.PREACT
		const isJsAndVanilla =
			config.language == CustomScriptLanguage.JAVASCRIPT &&
			config.framework === CustomScriptFramework.VANILLA
		const isTsAndVanilla =
			config.language == CustomScriptLanguage.TYPESCRIPT &&
			config.framework === CustomScriptFramework.VANILLA

		const languagePath = path.join(
			basePath,
			!isTypeScript ? 'javascript' : 'typescript'
		)

		// we only need an API / Backend if user collects user data (for delete endpoint) or is using the CREPO (crepo requests should be made in the backend)
		if (config.collectsUserData) {
			// adds the api to the templateStructure
			const deleteUserDataCallbackFileName = `delete-user-data-callback.${
				isTypeScript ? 't' : 'j'
			}s`
			templatePaths.push({
				sourcePath: path.join(
					languagePath,
					'api',
					deleteUserDataCallbackFileName
				),
				destinationPath: path.join(
					'.',
					'server',
					'routes',
					deleteUserDataCallbackFileName
				),
				isFile: true,
			})

			// adds the jotform api to the template structure
			const uimEndPoint = `uim-jotform.${isTypeScript ? 't' : 'j'}s`
			templatePaths.push({
				sourcePath: path.join(languagePath, 'api', uimEndPoint),
				destinationPath: path.join('.', 'server', 'routes', uimEndPoint),
				isFile: true,
			})

			// add utils (jotform) for userData
			templatePaths.push({
				sourcePath: path.join(languagePath, 'utils'),
				destinationPath: path.join('.', 'custom-script', 'utils'),
				isFile: false,
			})
		}

		if (config.useCREPO) {
			// add the api to the templateStructure
			const fileName = `graphql-api.${isTypeScript ? 't' : 'j'}s`
			templatePaths.push({
				sourcePath: path.join(languagePath, 'api', fileName),
				destinationPath: path.join('.', 'server', 'routes', fileName),
				isFile: true,
			})

			templatePaths.push({
				sourcePath: path.join(languagePath, 'api', 'utils'),
				destinationPath: path.join('.', 'server', 'utils'),
				isFile: false,
			})

			templatePaths.push({
				sourcePath: path.join(languagePath, 'api', 'queries'),
				destinationPath: path.join('.', 'server', 'queries'),
				isFile: false,
			})

			templatePaths.push({
				sourcePath: path.join(basePath, 'graphql.config.js.t'),
				destinationPath: path.join('..', 'graphql.config.js.t'),
				isFile: true,
			})
		}

		// add the right files for the selected framework
		const frameworkPath = path.join(languagePath, 'frameworks')
		templatePaths.push({
			sourcePath: path.join(
				frameworkPath,
				`main.${isTypeScript ? 't' : 'j'}s.t`
			),
			destinationPath: path.join(
				'.',
				'custom-script',
				`main.${isTypeScript ? 'ts' : 'js'}${isPreact ? 'x' : ''}`
			),
			isFile: true,
		})

		templatePaths.push({
			sourcePath: path.join(frameworkPath, 'rollup.config.js.t'),
			destinationPath: path.join('.', 'custom-script', 'rollup.config.js.t'),
			isFile: true,
		})

		// add the components
		const componentPath = path.join(basePath, 'component')
		templatePaths.push({
			sourcePath: path.join(componentPath, 'Card.js.t'),
			destinationPath: path.join(
				'.',
				'custom-script',
				'components',
				`Card.${isSvelte ? 'svelte' : ''}${isVue ? 'vue' : ''}${
					isJsAndVanilla ? 'js' : ''
				}${isTsAndVanilla ? 'ts' : ''}${isTsAndPreact ? 'tsx' : ''}${
					isJsAndPreact ? 'jsx' : ''
				}`
			),
			isFile: true,
		})

		// we need to copy the App.vue file
		if (isVue) {
			const AppVueConfig = {
				absolutePath: path.join(basePath, 'App.vue'),
				fileName: 'App.vue',
			}

			templatePaths.push({
				sourcePath: AppVueConfig.absolutePath,
				destinationPath: path.join('.', 'custom-script', AppVueConfig.fileName),
				isFile: true,
			})
		}

		// add the styles
		const stylesPath = path.join(basePath, 'styles')
		templatePaths.push({
			sourcePath: stylesPath,
			destinationPath: path.join('.', 'custom-script', 'styles'),
			isFile: false,
		})

		// add the assets
		const assetsPath = path.join(basePath, 'assets')
		templatePaths.push({
			sourcePath: assetsPath,
			destinationPath: path.join('.', 'custom-script', 'assets'),
			isFile: false,
		})

		// add the bin folder
		const binPath = path.join(languagePath, 'api', 'bin')
		templatePaths.push({
			sourcePath: binPath,
			destinationPath: path.join('.', 'server', 'bin'),
			isFile: false,
		})

    // add the imgPlugin
    const imgPluginConfig = {
      absolutePath: path.join(basePath, 'imgPlugin.js'),
      fileName: 'imgPlugin.js'
    }

    templatePaths.push({
      sourcePath: imgPluginConfig.absolutePath,
      destinationPath: path.join('.', 'custom-script', imgPluginConfig.fileName),
      isFile: true,
    })

		// copy type definitions
		if (isTypeScript) {
			const serverTypeDefPath = path.join(languagePath, 'api', 'types.d.ts')
			templatePaths.push({
				sourcePath: serverTypeDefPath,
				destinationPath: path.join('.', 'server', 'types.d.ts'),
				isFile: true,
			})
			const frontendTypeDefPath = path.join(
				languagePath,
				'frameworks',
				'types.d.ts'
			)
			templatePaths.push({
				sourcePath: frontendTypeDefPath,
				destinationPath: path.join('.', 'custom-script', 'types.d.ts'),
				isFile: true,
			})
		}

		const appFileName = `app.${isTypeScript ? 't' : 'j'}s.t`
		const appPath = path.join(languagePath, appFileName)
		templatePaths.push({
			sourcePath: appPath,
			destinationPath: path.join('.', 'server', appFileName),
			isFile: true,
		})

		return templatePaths
	},
}

export default template
