"use client";

import { useEffect, useState } from "react";

type HeroSlide = {
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
  model: string;
  detail: string;
  image: string;
  launchPrices?: { label: string; intro: number; srp: number }[];
};

type SiteContent = { heroSlides: HeroSlide[] };

const repoApi = "https://api.github.com/repos/rawncrown/byd-ubec/contents/site-content.json";
const emptySlide: HeroSlide = { eyebrow: "Coming soon to BYD Cebu", title: "Meet the all-new", accent: "BYD model.", description: "", model: "BYD model", detail: "Upcoming launch", image: "" };

function siteRoot() {
  if (typeof window === "undefined") return "/";
  const path = window.location.pathname;
  return path.includes("/admin") ? `${path.split("/admin")[0]}/` : "/";
}

export default function HeroAdmin() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [token, setToken] = useState("");
  const [status, setStatus] = useState("Loading current hero content…");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setToken(sessionStorage.getItem("bydGithubToken") ?? "");
    fetch(`${siteRoot()}site-content.json?refresh=${Date.now()}`)
      .then(response => response.json())
      .then((content: SiteContent) => { setSlides(content.heroSlides); setStatus("Ready to edit."); })
      .catch(() => { setSlides([emptySlide]); setStatus("Could not load the current content. You can still enter new details."); });
  }, []);

  function update(index: number, field: keyof HeroSlide, value: string) {
    setSlides(current => current.map((slide, slideIndex) => slideIndex === index ? { ...slide, [field]: value } : slide));
  }

  async function publish() {
    if (!token.trim()) { setStatus("Enter your GitHub access key first."); return; }
    if (slides.some(slide => !slide.image.trim() || !slide.model.trim())) { setStatus("Every slide needs a model name and image link."); return; }
    setSaving(true);
    setStatus("Connecting to GitHub…");
    sessionStorage.setItem("bydGithubToken", token.trim());
    const headers = { Authorization: `Bearer ${token.trim()}`, Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28" };
    try {
      const current = await fetch(`${repoApi}?ref=gh-pages`, { headers });
      if (!current.ok) throw new Error(current.status === 401 || current.status === 403 ? "GitHub rejected the access key. Check its repository permission." : "Could not read the live hero file.");
      const currentFile = await current.json();
      const json = JSON.stringify({ heroSlides: slides }, null, 2) + "\n";
      const bytes = new TextEncoder().encode(json);
      let binary = "";
      bytes.forEach(byte => { binary += String.fromCharCode(byte); });
      const saved = await fetch(repoApi, {
        method: "PUT",
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify({ message: "Update homepage hero from dashboard", content: btoa(binary), sha: currentFile.sha, branch: "gh-pages" }),
      });
      if (!saved.ok) throw new Error("GitHub could not save the update. Confirm the key has Contents: Read and write access.");
      setStatus("Published. GitHub usually updates the live homepage within 1–2 minutes.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Something went wrong while publishing.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="admin-shell">
      <header className="admin-header"><a className="brand" href={siteRoot()}><span>BYD</span><small>CEBU</small></a><a href={siteRoot()}>View website ↗</a></header>
      <section className="admin-title"><p className="eyebrow">Website dashboard</p><h1>Homepage hero editor</h1><p>Change the images and launch messages shown at the top of your public website.</p></section>
      <section className="admin-connect">
        <div><strong>GitHub access key</strong><p>Use a fine-grained token limited to the <b>byd-ubec</b> repository with <b>Contents: Read and write</b>. It stays in this browser tab session.</p></div>
        <input type="password" value={token} onChange={event => setToken(event.target.value)} placeholder="Paste GitHub access key" autoComplete="off" />
        <a href="https://github.com/settings/personal-access-tokens/new" target="_blank" rel="noreferrer">Create an access key ↗</a>
      </section>
      <section className="admin-grid">
        {slides.map((slide, index) => <article className="admin-card" key={index}>
          <div className="admin-preview">{slide.image ? <img src={slide.image} alt="Hero preview" /> : <span>No image yet</span>}</div>
          <div className="admin-card-title"><h2>Hero slide {index + 1}</h2>{slides.length > 1 && <button type="button" onClick={() => setSlides(current => current.filter((_, itemIndex) => itemIndex !== index))}>Remove</button>}</div>
          <label>Image link<input value={slide.image} onChange={event => update(index, "image", event.target.value)} placeholder="https://…" /></label>
          <div className="admin-two"><label>Small heading<input value={slide.eyebrow} onChange={event => update(index, "eyebrow", event.target.value)} /></label><label>Model name<input value={slide.model} onChange={event => update(index, "model", event.target.value)} /></label></div>
          <div className="admin-two"><label>Main heading<input value={slide.title} onChange={event => update(index, "title", event.target.value)} /></label><label>Highlighted heading<input value={slide.accent} onChange={event => update(index, "accent", event.target.value)} /></label></div>
          <label>Description<textarea value={slide.description} onChange={event => update(index, "description", event.target.value)} /></label>
          <label>Detail line<input value={slide.detail} onChange={event => update(index, "detail", event.target.value)} /></label>
        </article>)}
      </section>
      <div className="admin-actions"><button type="button" onClick={() => setSlides(current => [...current, { ...emptySlide }])}>+ Add another slide</button><button className="publish-button" type="button" onClick={publish} disabled={saving}>{saving ? "Publishing…" : "Publish hero changes"}</button><p aria-live="polite">{status}</p></div>
    </main>
  );
}
