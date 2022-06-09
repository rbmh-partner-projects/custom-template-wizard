import { generateDocumentHash } from '@crepo/crepo-graphql-api-node-sdk-cjs';
import { print } from 'graphql/language';


export async function getQueryDocument(documentNode, createHash = false) {
  const content = print(documentNode);

  if (!createHash) {
    return {
      document: content,
    };
  }

  return {
    document: content,
    hashCode: await generateDocumentHash(content),
  };
}
