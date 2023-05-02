import { Resource } from "@crepo/crepo-graphql-api-node-sdk-cjs/models/";
import express from "express";

import { GetResourceIdQueryDocument } from "../queries/get-resource-id.document";
import api from "../utils";

const router = express.Router();

/*
 *  Queries the CREPO for a resource
 */
router.get("/api/resources/:resourceId", async function (req, res, next) {
  const { resourceId } = req.params;

  if (!resourceId) {
    return res.status(400).send("No resourceId provided.");
  }

  const apiKey =
    process.env.NODE_ENV === "production"
      ? process.env.CREPO_API_KEY_PRODUCTION
      : process.env.CREPO_API_KEY_STAGING;

  if (!apiKey || apiKey === "") {
    return res.status(500).send("Please provide your API key");
  }

  try {
    const { document, hashCode } = await GetResourceIdQueryDocument;

    const result = await api(apiKey).queryWithDocumentHash<
      Resource & { resource: { id: string } },
      { id: string }
    >(hashCode || "", {
      query: document,
      variables: {
        id: resourceId,
      },
    });

    res.status(200).send(result);
  } catch (e) {
    return res.status(500).send(e);
  }
});

export default router;
