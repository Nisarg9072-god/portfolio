import { readFileSync } from "node:fs";
import { toJSONAsync } from "seroval";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const require = createRequire(import.meta.url);
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const { getDefaultSerovalPlugins } = require(
  join(root, "node_modules/@tanstack/start-client-core/dist/esm/getDefaultSerovalPlugins.js"),
);

for (const line of readFileSync(".env", "utf8").split("\n")) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  const eq = trimmed.indexOf("=");
  if (eq > 0) process.env[trimmed.slice(0, eq)] = trimmed.slice(eq + 1);
}

const BASE = process.env.TEST_URL ?? "http://localhost:8082";
const payload = {
  name: "Live Website Test",
  email: "visitor@example.com",
  message:
    "Hi Nisarg — this was sent through your portfolio website contact backend. If you received this, the form is working properly.",
};

const home = await fetch(BASE);
const html = await home.text();
const scripts = [...html.matchAll(/src="([^"]+)"/g)]
  .map((m) => m[1])
  .filter((s) => s.includes(".js"));

let fnPath = null;
for (const src of scripts) {
  const js = await (await fetch(`${BASE}${src}`)).text();
  const match = js.match(/\/_serverFn\/[a-f0-9]{64}/);
  if (match) {
    fnPath = match[0];
    break;
  }
}

if (!fnPath) {
  console.error("Could not find server function URL in client bundle");
  process.exit(1);
}

const plugins = getDefaultSerovalPlugins();
const body = JSON.stringify(
  await toJSONAsync({ data: payload }, { plugins }),
);

const res = await fetch(`${BASE}${fnPath}`, {
  method: "POST",
  headers: {
    "content-type": "application/json",
    "x-tsr-serverFn": "true",
    accept: "application/json",
  },
  body,
});

const text = await res.text();
console.log("Server function URL:", fnPath);
console.log("Status:", res.status);
console.log("Body:", text.slice(0, 800));

process.exit(res.ok ? 0 : 1);
