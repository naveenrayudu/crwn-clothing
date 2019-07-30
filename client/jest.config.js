const { defaults } = require("jest-config");
module.exports = {
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  moduleFileExtensions: [...defaults.moduleFileExtensions, "ts", "tsx"],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss)$": "jest-transform-css",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js"
  },
  "setupFilesAfterEnv": ["<rootDir>/setupEnzyme.ts"]
};
