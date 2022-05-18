import express from 'express';

import api from '../utils'; import { GetResourceIdQueryDocument } from "../queries/get-resource-id.document";

const router = express.Router()

router.get('/api/resources/:resourceId', async function (req, res, next) {
  const { resourceId } = req.params

  if (!resourceId) {
    return res.status(400).send('No resourceId provided.')
  }

  const apiKey =
    process.env.NODE_ENV === 'production'
      ? process.env.CREPO_API_KEY_PRODUCTION
      : process.env.CREPO_API_KEY_STAGING

  if (!apiKey || apiKey === '') {
    return res.status(500).send("Please provide your API key")
  }

  try {
    const { document, hashCode } = await GetResourceIdQueryDocument;

    const result = await api(apiKey).queryWithDocumentHash(
      hashCode,
      {
        query: document,
        variables: {
          id: resourceId
        }
      }
    )

    res.status(200).send(result)

  } catch (e) {
    console.error(e)
    res.status(500).send(e)
  }
})

export default { init: () => { return router } }
