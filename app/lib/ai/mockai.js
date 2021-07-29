import fs from "fs";
import path from "path";

//mock data for testing
let briefResponse = {};
fs.readFile(
  path.join(path.resolve(""), "tests/mock_data/briefResponse.json"),
  "utf-8",
  (err, data) => {
    if (err) throw console.log(err);
    briefResponse = JSON.parse(data);
  }
);
export const mockSay = () => Promise.resolve().then(()=>"Mock discussion");

export const mockBrief = () => Promise.resolve().then(()=>briefResponse);
