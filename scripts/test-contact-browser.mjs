import { chromium } from "playwright";

const BASE = process.env.TEST_URL ?? "http://localhost:8082";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

try {
  await page.goto(`${BASE}/#contact`, { waitUntil: "networkidle" });
  await page.fill("#contact-name", "Portfolio Website Test");
  await page.fill("#contact-email", "visitor@example.com");
  await page.fill(
    "#contact-message",
    "Hi Nisarg — this was sent by submitting your live portfolio contact form. If you received this email, the website is working properly.",
  );

  const [response] = await Promise.all([
    page.waitForResponse(
      (res) =>
        res.url().includes("/_serverFn/") &&
        res.request().method() === "POST",
      { timeout: 30000 },
    ),
    page.click('button[type="submit"]'),
  ]);

  const status = response.status();
  const body = await response.text();
  console.log("Server function status:", status);
  console.log("Server function body:", body.slice(0, 500));

  await page.waitForTimeout(1500);
  const successVisible = await page
    .getByText("Message sent")
    .isVisible()
    .catch(() => false);

  console.log("Success message visible:", successVisible);

  if (!response.ok() || !successVisible) {
    process.exit(1);
  }

  console.log("PASS: Form submitted through the website successfully.");
} finally {
  await browser.close();
}
