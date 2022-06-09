import { generateDocumentHash } from '@crepo/crepo-graphql-api-node-sdk-cjs'
import type { DocumentNode } from 'graphql/language'
import { print } from 'graphql/language'

export type QueryDocument = {
  document: string
  hashCode?: string
}

export async function getQueryDocument(
  documentNode: DocumentNode,
  createHash = false
): Promise<QueryDocument> {
  const content = print(documentNode)

  if (!createHash) {
    return {
      document: content,
    }
  }

  return {
    document: content,
    hashCode: await generateDocumentHash(content),
  }
}
