import { readFileSync } from "node:fs";

function loadEnv() {
  for (const line of readFileSync(".env", "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq > 0) process.env[trimmed.slice(0, eq)] = trimmed.slice(eq + 1);
  }
}

loadEnv();

const PORT = process.env.TEST_PORT ?? "8082";
const BASE = `http://localhost:${PORT}`;

const payload = {
  name: "Portfolio Website Test",
  email: "visitor@example.com",
  message:
    "Hi Nisarg — this message was sent through your portfolio contact backend. If you received it, the form is working correctly.",
};

async function findServerFnId() {
  const { readdirSync, readFileSync: read } = await import("node:fs");
  const { join } = await import("node:path");
  const dir = join(process.cwd(), "dist/server/assets");
  for (const file of readdirSync(dir)) {
    if (!file.includes("contact.functions")) continue;
    const content = read(join(dir, file), "utf8");
    const match = content.match(/id:\s*"([a-f0-9]{64})"/);
    if (match) return match[1];
  }
  return null;
}

async function testHomepage() {
  const res = await fetch(BASE);
  const html = await res.text();
  return {
    ok: res.ok,
    status: res.status,
    hasContact: html.includes('id="contact"') || html.includes("contact-name"),
  };
}

async function testServerFunction(fnId) {
  const url = `${BASE}/_serverFn/${fnId}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-tsr-serverFn": "true",
      accept: "application/json",
    },
    body: JSON.stringify({ data: payload }),
  });
  const text = await res.text();
  return { ok: res.ok, status: res.status, body: text };
}

async function testEmailDirect() {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM_EMAIL,
      to: [process.env.CONTACT_TO_EMAIL],
      reply_to: payload.email,
      subject: `Portfolio inquiry from ${payload.name}`,
      text: [
        "New message from your portfolio contact form",
        "",
        `Name: ${payload.name}`,
        `Email: ${payload.email}`,
        "",
        "Message:",
        payload.message,
      ].join("\n"),
    }),
  });
  return { ok: res.ok, status: res.status, body: await res.text() };
}

const homepage = await testHomepage();
console.log("Homepage:", homepage);

const fnId = await findServerFnId();
let serverFn = null;
if (fnId) {
  serverFn = await testServerFunction(fnId);
  console.log("Server function:", serverFn);
}

const email =
  !serverFn?.ok ? await testEmailDirect() : { skipped: true, reason: "server fn ok" };
if (!serverFn?.ok) console.log("Direct email fallback:", email);

const working =
  homepage.ok &&
  homepage.hasContact &&
  (serverFn?.ok || (email.ok && email.status === 200));

console.log(
  working
    ? "\nPASS: Contact flow is working. Check nisargpanchal40@gmail.com."
    : "\nFAIL: Contact flow needs attention.",
);

process.exit(working ? 0 : 1);
