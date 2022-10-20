const fs = require("fs");
const axios = require("axios");

function cat(path) {
  fs.readFile(path, "utf8", function (err, data) {
    if (err) {
      console.log("Error: ", err);
    }
    console.log(data);
  });
}

async function webCat(path) {
  try {
    const resp = await axios.get(path);
    console.log(resp.data);
  } catch (e) {
    console.log(`Error: ${e}`);
  }
}

function checkForURL(str) {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}

const argv = process.argv.slice(2);

for (arg of argv) {
  if (checkForURL(arg)) {
    webCat(arg);
  } else {
    cat(arg);
  }
}
