"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Input } from "@/components/ui/input";

const TOPICS = ["Research collaboration", "Ph.D. supervision", "Invited talk / conference", "General enquiry"];

/** Composes an e-mail in the visitor's mail client — no data is sent to or stored by this website. */
export function MailtoForm({ to }: { to: string }) {
  const [name, setName] = useState("");
  const [topic, setTopic] = useState(TOPICS[0]);
  const [message, setMessage] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = `${topic}${name ? ` — ${name}` : ""}`;
    const body = `${message}\n\n${name ? `— ${name}` : ""}`.trim();
    window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  const field =
    "w-full rounded-lg border border-input bg-background px-3 text-sm focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none";

  return (
    <form onSubmit={onSubmit} className="space-y-4" aria-describedby="mailto-note">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="mf-name" className="text-sm font-medium">
            Your name
          </label>
          <Input id="mf-name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" className="mt-1.5 h-10" />
        </div>
        <div>
          <label htmlFor="mf-topic" className="text-sm font-medium">
            Topic
          </label>
          <select id="mf-topic" value={topic} onChange={(e) => setTopic(e.target.value)} className={`${field} mt-1.5 h-10`}>
            {TOPICS.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="mf-message" className="text-sm font-medium">
          Message <span className="text-muted-foreground">(required)</span>
        </label>
        <textarea
          id="mf-message"
          required
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${field} mt-1.5 py-2.5`}
        />
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground hover:opacity-90 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
        >
          <Send className="size-4" aria-hidden /> Open in email app
        </button>
        <p id="mailto-note" className="text-xs text-muted-foreground">
          Opens your email client with this message addressed to {to}. Nothing is stored on this website.
        </p>
      </div>
    </form>
  );
}
