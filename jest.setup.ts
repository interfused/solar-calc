import "@testing-library/jest-dom";
import "whatwg-fetch";
import fetchMock from "jest-fetch-mock";
const { TextEncoder, TextDecoder } = require("util");

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
fetchMock.enableMocks(); // Enable fetch mocking
