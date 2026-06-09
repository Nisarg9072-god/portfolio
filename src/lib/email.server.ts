type ContactEmailInput = {
  name: string;
  email: string;
  message: string;
};

type SendResult = { ok: true } | { ok: false; error: string };

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function sendContactEmail(
  input: ContactEmailInput,
): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail =
    process.env.CONTACT_TO_EMAIL ?? "nisargpanchal40@gmail.com";
  const fromEmail =
    process.env.RESEND_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";

  if (!apiKey) {
    return {
      ok: false,
      error:
        "Contact email is not configured yet. Add RESEND_API_KEY to your environment.",
    };
  }

  const subject = `Portfolio inquiry from ${input.name}`;
  const text = [
    `New message from your portfolio contact form`,
    ``,
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    ``,
    `Message:`,
    input.message,
  ].join("\n");

  const html = `
    <div style="font-family:Inter,Arial,sans-serif;line-height:1.6;color:#111">
      <h2 style="margin:0 0 16px">New portfolio inquiry</h2>
      <p><strong>Name:</strong> ${escapeHtml(input.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(input.email)}</p>
      <p style="margin:24px 0 8px"><strong>Message</strong></p>
      <p style="white-space:pre-wrap;margin:0">${escapeHtml(input.message)}</p>
    </div>
  `.trim();

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: input.email,
      subject,
      text,
      html,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    console.error("Resend API error:", response.status, body);
    return {
      ok: false,
      error: "Could not send your message right now. Please try again shortly.",
    };
  }

  return { ok: true };
}
