import { readFileSync } from "node:fs";
import { sendContactEmail } from "../src/lib/email.server.ts";

for (const line of readFileSync(".env", "utf8").split("\n")) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  const eq = trimmed.indexOf("=");
  if (eq > 0) process.env[trimmed.slice(0, eq)] = trimmed.slice(eq + 1);
}

const payload = {
  name: "Portfolio Contact Form",
  email: "visitor@example.com",
  message:
    "Hi Nisarg — this message uses the exact same backend code as your website contact form. Everything is configured correctly.",
};

const result = await sendContactEmail(payload);
console.log(JSON.stringify(result, null, 2));
process.exit(result.ok ? 0 : 1);
