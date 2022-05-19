import * as fs from 'fs'
import { gql } from 'graphql-tag'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

import { getQueryDocument } from '../utils/get-query-document'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const GetResourceIdDocumentNode = gql(
  fs.readFileSync(`${__dirname}/get-resource-id.graphql`, { encoding: 'utf8' })
)

export const GetResourceIdQueryDocument = getQueryDocument(
  GetResourceIdDocumentNode,
  true
)
