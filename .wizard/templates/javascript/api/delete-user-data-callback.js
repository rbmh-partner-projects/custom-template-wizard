import axios from 'axios';
import crypto from 'crypto';
import express from 'express';

const router = express.Router();
const onDeleteUserData = async (userId, date) => {
  // DELETION LOGIC SHOULD BE IMPLEMENTED HERE
  console.log(`Please delete data for ${userId}. Timestamp: ${date}`);
};
/**
 * Do not modify this part unless you know what to do
 *
 * Endpoint: http(s)://myurl:port/user/delete-data
 */
router.post('/user/delete-data', async function (req, res, next) {
  const { userId, date } = req.body;
  if (!userId || !date) {
    return res.status(400).send();
  }
  const publicKeyVersion = req.headers['x-rba-rsa-signature-version'].toString();
  const signatureB64 = req.headers['x-rba-rsa-signature-value'].toString();

  const { data: publicKey } = await axios.get(`https://account-admin.redbull.com/api/v1/keys/public/${publicKeyVersion}`);
  const signatureB64ToBinary = Buffer.from(signatureB64, 'base64');
  const verify = crypto.createVerify('SHA256');
  verify.write(JSON.stringify(req.body));
  verify.end();
  if (!verify.verify(publicKey, signatureB64ToBinary)) {
    return res.status(400).send('Invalid signature');
  }
  await onDeleteUserData(userId, date);
  return res.status(200).send();
});
export default { init: () => router };