import axios from "axios";
import crypto from "crypto";
import express, { Router } from "express";
import jwkToPem from "jwk-to-pem";
import type { CDMWebhookNotification } from "./types";

const router: Router = express.Router();

const onCDMWebhookNotificationReceived = async (
  notification: CDMWebhookNotification
): Promise<void> => {
  if (notification.type === "FORM_SUBMITTED") {
    /**
     * After a user submits a form your registered webhook will receive a notification.
     * You can use this notification to store the user's data in your database.
     * @see https://engineering.redbull.com/cdm/webhook-notification#krdkS
     */
    fakeDatabase.set(notification.info.formSubmissionId, notification);
  } else if (notification.type === "FORM_SUBMISSION_DELETED") {
    /**
     * If the notification's type is FORM_SUBMISSION_DELETED,
     * it is your responsibility to remove the data from your database.
     * @See https://engineering.redbull.com/cdm/webhook-notification#A8ba0
     */
    fakeDatabase.delete(notification.info.formSubmissionId);
  }
};

/**
 * Demo implementation of fetching stored form submission.
 * ‼️ This code should not be used in production environments.
 */
router.get("/cmd/submission/:userId", async function (req, res, next) {
  const userId = req.params.userId;

  if (!fakeDatabase.has(userId)) {
    return res.status(400).send();
  }

  const notification = fakeDatabase.get(userId);

  return res.status(200).send(notification);
});

/**
 * Implementation of the CDM Payload Signature Verification
 * @see https://engineering.redbull.com/cdm/webhook-notification#FszPi
 * This endpoint implements the need of verifying that the messages are genuinely sent by CDM.
 */
router.post("/cmd/notification", async function (req, res, next) {
  try {
    const signature = req.header("X-CIAM-RSA-Signature-value");
    const signatureVersion = req.header("X-CIAM-RSA-Signature-version");

    if (!signature || !signatureVersion) {
      return res.status(400).send();
    }

    const signatureB64ToBinary = Buffer.from(signature, "base64");

    const publicKeyRegistryUrls = {
      design:
        "https://abs-gateway-design.redbull.com/user-audience-service/public/v1/notification/jwks",
      production:
        "https://abs-gateway.redbull.com/user-audience-service/public/v1/notification/jwks",
    };

    const jkws = await axios.get<{
      keys: any[];
    }>(publicKeyRegistryUrls.design);

    const key = jkws.data.keys.find((x) => x.kid === signatureVersion);
    const publicKey = jwkToPem(key);

    const verify = crypto.createVerify("SHA256");
    verify.write(JSON.stringify(req.body));
    verify.end();

    if (!verify.verify(publicKey, signatureB64ToBinary)) {
      return res.status(400).send("Invalid signature");
    }

    await onCDMWebhookNotificationReceived(req.body as CDMWebhookNotification);

    return res.status(200).send(publicKey);
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
});

/**
 * THE FAKE DATABASE CODE IS ONLY FOR DEMO
 * EXAMPLE PURPOSES AND SHOULD NOT BE USED IN A PRODUCTION ENVIRONMENT
 */

const fakeDatabase = new Map<string, CDMWebhookNotification>();

export default router;
