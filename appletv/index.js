const { scan, parseCredentials, AppleTV } = require("node-appletv-x");

const connect = async credentialsString => {
  let credentials = parseCredentials(credentialsString);
  let { uniqueIdentifier } = credentials;

  const devices = await scan(uniqueIdentifier);
  const device = devices[0];
  device.openConnection(credentials);
  return device;
};

const control = async (credentialsString, key) => {
  try {
    console.log(`REQUEST::Received request to send ${key} key to AppleTV`);
    const device = await connect(credentialsString);
    await device.sendKeyCommand(AppleTV.Key[key]);
    console.log(`REQUEST::Success - Sent ${key} key to AppleTV`);
    return "success";
  } catch (err) {
    console.log(`REQUEST::Error - Error sending ${key} key to AppleTV`);
    console.log(err);
    return "error";
  }
};

module.exports = { control };
