// test/testing-library.ts
import { afterEach } from "bun:test";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/jest-globals";

// Optional: Cleans up `render` after each test
afterEach(() => {
	cleanup();
});
