import axios from "axios";
import crypto from "crypto";
import express, { Router } from "express";
import jwkToPem from "jwk-to-pem";
import type { UIMNotification } from "../types";

const router: Router = express.Router();

const onUIMNotificationReceived = async (
  notification: UIMNotification
): Promise<void> => {
  if (notification.type === "FORM_SUBMISSION_DELETED") {
    /*
     If the notification's type is FORM_SUBMISSION_DELETED, we need to remove this data from our data-store.
     You can read more about that here: https://platformservices.redbull.com/docs/uim-webhook
    */
    fakeDatabase.delete(notification.siloUserId);
  } else {
    // This code is only for demo purposes and should not be used in a production environment
    fakeDatabase.set(notification.siloUserId, notification);
  }
};

/*
  Demo implementation of fetching stored UIM notification. This code should not be used in production environments. 
*/
router.get("/uim/submission/:userId", async function (req, res, next) {
  const userId = req.params.userId;

  if (!fakeDatabase.has(userId)) {
    return res.status(400).send();
  }

  const notification = fakeDatabase.get(userId);

  return res.status(200).send(notification);
});

/**
 * Do not modify this part unless you know what to do
 * This code part is required for processing UIM notifications. It validates the payload and checks the integrity of the incoming request.
 * Please test this feature on your staging environment - it requires SSL
 * Endpoint: http(s)://myurl:port/uim/notification
 */
router.post("/uim/notification", async function (req, res, next) {
  try {
    const signature = req.header("X-UIM-RSA-Signature-value");
    const signatureVersion = req.header("X-UIM-RSA-Signature-version");

    if (!signature || !signatureVersion) {
      return res.status(400).send();
    }

    const signatureB64ToBinary = Buffer.from(signature, "base64");

    const jkws = await axios.get<{
      keys: any[];
    }>(
      "https://uim-design.redbull.com/.well-known/jwks-registry/jwks-design.json"
    );
    const key = jkws.data.keys.find((x) => x.kid === signatureVersion); //'rbsilo-design-20220112')
    const publicKey = jwkToPem(key);

    const verify = crypto.createVerify("SHA256");
    verify.write(JSON.stringify(req.body));
    verify.end();

    if (!verify.verify(publicKey, signatureB64ToBinary)) {
      return res.status(400).send("Invalid signature");
    }

    await onUIMNotificationReceived(req.body as UIMNotification);

    return res.status(200).send(publicKey);
  } catch (err) {
    console.error(err);

    return res.status(500).send();
  }
});

/*
  THIS CODE IS ONLY FOR DEMO / EXAMPLE PURPOSES AND SHOULD NOT BE USED IN A PRODUCTION ENVIRONMENT
*/

const fakeDatabase = new Map<string, UIMNotification>();

export default router;
