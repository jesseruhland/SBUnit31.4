const fs = require("fs");
const axios = require("axios");
const argv = process.argv.slice(2);

// handle reading files

function cat(path, out) {
  fs.readFile(path, "utf8", function (err, data) {
    if (err) {
      console.log("Error: ", err);
    }
    if (out) {
      writeToFile(out, data);
    } else {
      console.log(data);
    }
  });
}

// handle reading URLs

async function webCat(path, out) {
  try {
    const resp = await axios.get(path);
    if (out) {
      writeToFile(out, resp.data);
    } else {
      console.log(resp.data);
    }
  } catch (e) {
    console.log(`Error: ${e}`);
  }
}

// helper to check if string input is a valid URL

function checkForURL(str) {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}

// write output to file

function writeToFile(out, data) {
  fs.writeFile(out, data, "utf8", function (err) {
    if (err) {
      console.log("Error:", err);
    }
  });
}

// take command line input and determine how to handle output (this runs the code above)

if (argv[0] == "--out" && argv.length == 3) {
  if (checkForURL(argv[2])) {
    webCat(argv[2], argv[1]);
  } else {
    cat(argv[2], argv[1]);
  }
} else if (argv.length == 1) {
  if (checkForURL(argv[0])) {
    webCat(argv[0]);
  } else {
    cat(argv[0]);
  }
}
