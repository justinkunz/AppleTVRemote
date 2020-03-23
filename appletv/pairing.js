const { scan } = require("node-appletv-x");
const fs = require("fs");
const inq = require("inquirer");

const auth = async () => {
  console.clear();
  console.log("Scanning for Apple TV devices. . .");
  const devices = await scan();

  if (devices.length === 0) {
    console.log("No Available Apple TVs Found on Network");
    return;
  }

  const { device } = await inq.prompt([
    {
      message: "Which Apple TV would you like to connect to?",
      type: "list",
      name: "device",
      choices: devices.map(d => ({ name: d.name, value: d }))
    }
  ]);
  await device.openConnection();
  let callback = await device.pair();
  const { pin } = await inq.prompt([
    {
      message: "Enter the 4 digit pin displayed on your screen",
      name: "pin"
    }
  ]);
  // the pin is provided onscreen from the Apple TV
  await callback(pin);
  // you're paired!
  let credentials = device.credentials.toString();
  fs.writeFileSync("./.appletv-creds", credentials);
  console.log("Paired Successfully");
  return;
};

auth();
