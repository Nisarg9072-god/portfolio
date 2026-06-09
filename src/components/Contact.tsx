import { submitContactForm } from "@/lib/api/contact.functions";
import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Loader2 } from "lucide-react";
import { useState, type FormEvent } from "react";

const links = [
  {
    l: "Email",
    v: "nisargpanchal40@gmail.com",
    h: "mailto:nisargpanchal40@gmail.com",
    external: false,
  },
  {
    l: "GitHub",
    v: "@Nisarg9072-god",
    h: "https://github.com/Nisarg9072-god",
    external: true,
  },
  {
    l: "LinkedIn",
    v: "Nisarg Panchal",
    h: "https://www.linkedin.com/in/nisargpanchal40/",
    external: true,
  },
];

type FormStatus = "idle" | "sending" | "success" | "error";

export function Contact() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    setError("");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      await submitContactForm({
        data: {
          name: String(data.get("name") || ""),
          email: String(data.get("email") || ""),
          message: String(data.get("message") || ""),
          website: String(data.get("website") || ""),
        },
      });

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again or email me directly.",
      );
    }
  };

  return (
    <section id="contact" className="section-page overflow-hidden">
      <div className="absolute inset-0 bg-radial-glow" />
      <div className="section-wrap relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="section-block"
        >
          <div className="section-eyebrow">
            <span className="h-px w-8 bg-muted-foreground/40" /> 006 — Contact
          </div>

          <h2 className="type-contact-title">
            LET&apos;S BUILD
            <br />
            <span className="text-electric-gradient">SOMETHING</span>
            <br />
            AMAZING.
          </h2>
        </motion.div>

        <div className="section-stack grid gap-10 md:grid-cols-2 md:gap-12">
          <div className="space-y-px overflow-hidden rounded-3xl border border-border/40 bg-border/40">
            {links.map((c) => (
              <a
                key={c.l}
                href={c.h}
                data-hover
                target={c.external ? "_blank" : undefined}
                rel={c.external ? "noopener noreferrer" : undefined}
                className="group flex items-center justify-between gap-4 bg-background p-5 transition-colors hover:bg-card sm:p-6"
              >
                <div className="min-w-0">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    {c.l}
                  </div>
                  <div className="mt-1 break-words font-display text-lg font-semibold sm:text-xl">
                    {c.v}
                  </div>
                </div>
                <ArrowUpRight
                  size={20}
                  className="shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-electric"
                />
              </a>
            ))}
            <div className="flex items-center justify-between gap-4 bg-background p-6">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Location
                </div>
                <div className="mt-1 font-display text-xl font-semibold">
                  Ahmedabad, Gujarat
                </div>
              </div>
            </div>
          </div>

          <form
            className="glass space-y-4 rounded-3xl p-5 sm:p-8"
            onSubmit={onSubmit}
          >
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              className="pointer-events-none absolute h-0 w-0 opacity-0"
              aria-hidden="true"
            />

            <div>
              <label
                htmlFor="contact-name"
                className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground"
              >
                Name
              </label>
              <input
                id="contact-name"
                name="name"
                required
                disabled={status === "sending"}
                className="mt-2 w-full border-b border-border bg-transparent py-3 outline-none transition-colors focus:border-electric focus-visible:ring-1 focus-visible:ring-electric/30 disabled:opacity-60"
                placeholder="Your name"
              />
            </div>
            <div>
              <label
                htmlFor="contact-email"
                className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground"
              >
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                disabled={status === "sending"}
                className="mt-2 w-full border-b border-border bg-transparent py-3 outline-none transition-colors focus:border-electric focus-visible:ring-1 focus-visible:ring-electric/30 disabled:opacity-60"
                placeholder="you@domain.com"
              />
            </div>
            <div>
              <label
                htmlFor="contact-message"
                className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={4}
                required
                disabled={status === "sending"}
                className="mt-2 w-full resize-none border-b border-border bg-transparent py-3 outline-none transition-colors focus:border-electric focus-visible:ring-1 focus-visible:ring-electric/30 disabled:opacity-60"
                placeholder="Tell me about your idea..."
              />
            </div>

            {status === "success" && (
              <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-emerald-400">
                <CheckCircle2 size={14} />
                Message sent — I&apos;ll get back to you soon.
              </p>
            )}

            {status === "error" && error && (
              <p className="font-mono text-xs leading-relaxed text-red-400/90">
                {error}
              </p>
            )}

            <button
              type="submit"
              data-hover
              disabled={status === "sending"}
              className="group mt-4 flex w-full items-center justify-between rounded-full bg-foreground px-6 py-4 text-sm uppercase tracking-[0.2em] text-background transition-colors hover:bg-electric disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === "sending" ? (
                <span className="flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin" />
                  Sending...
                </span>
              ) : status === "success" ? (
                "Send Another"
              ) : (
                "Send Message"
              )}
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </button>
          </form>
        </div>

        <div className="section-stack flex flex-col items-start justify-between gap-4 border-t border-border/40 pt-8 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground md:flex-row">
          <div>© 2026 Nisarg Panchal</div>
          <div>Built with obsession in Ahmedabad</div>
        </div>
      </div>
    </section>
  );
}
