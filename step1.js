const fs = require("fs");

function cat(path) {
  fs.readFile(path, "utf8", function (err, data) {
    if (err) {
      console.log("Error: ", err);
    }
    console.log(data);
  });
}

const argv = process.argv.slice(2);

for (arg of argv) {
  cat(arg);
}
