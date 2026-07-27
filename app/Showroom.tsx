"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type HeroSlide = {
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
  model: string;
  detail: string;
  image: string;
};

type SiteContent = { heroSlides: HeroSlide[] };

const defaultHeroSlides: HeroSlide[] = [
  { eyebrow: "Coming soon to BYD Cebu", title: "Discover the all-new", accent: "BYD ATTO 2.", description: "A compact electric SUV designed for effortless city driving, smart everyday comfort and the confidence of BYD Blade Battery technology.", model: "BYD ATTO 2", detail: "Compact electric SUV · Upcoming launch", image: "https://raw.githubusercontent.com/rawncrown/byd-cebu-proposal-app/main/images/atto2.webp" },
  { eyebrow: "Coming soon to BYD Cebu", title: "Discover the all-new", accent: "BYD SEAL 5.", description: "The next generation of BYD's practical Super DM-i sedan—made for efficient daily journeys and comfortable long-distance travel.", model: "New BYD SEAL 5 DM-i", detail: "Essential & Dynamic · Upcoming launch", image: "https://raw.githubusercontent.com/rawncrown/byd-cebu-proposal-app/main/images/new_seal5.webp" },
];

type Vehicle = {
  name: string;
  type: "Full Electric" | "Super DM-i" | "DMO";
  body: string;
  price: number;
  range: string;
  rangeLabel: string;
  power: string;
  seats: string;
  image: string;
  bestFor: string;
  highlights: string[];
  variants: { name: string; price: number }[];
  source: string;
};

const vehicles: Vehicle[] = [
  { name: "BYD Seagull", type: "Full Electric", body: "Mini Hatchback", price: 1028000, range: "300 km", rangeLabel: "EV range (NEDC)", power: "75 Ps", seats: "5 seats", image: "https://cdn.prod.website-files.com/679b275acc89c99e5cf128aa/67ab4f88ebea20adf205cccc_BYD-Seagull-HomePageBanner-1440x900.webp", bestFor: "First EV & city driving", highlights: ["Compact and easy to park", "Blade Battery", "Smart, connected cabin"], variants: [{ name: "Premium", price: 1028000 }], source: "https://bydcarsphilippines.com/vehicles/byd-seagull" },
  { name: "BYD Seal 5 DM-i", type: "Super DM-i", body: "Compact Sedan", price: 1018000, range: "1,175 km", rangeLabel: "combined range", power: "179 Ps", seats: "5 seats", image: "https://cdn.prod.website-files.com/679b275acc89c99e5cf128aa/67ab598f1fb310631d02fd4d_BYD-Seal5-DMi-HomePageBanner-1440x900.webp", bestFor: "Maximum value & long drives", highlights: ["Up to 50 km pure EV driving", "12.8-inch rotating screen", "Generous 450 L trunk"], variants: [{ name: "Dynamic", price: 1018000 }, { name: "Premium", price: 1258000 }], source: "https://bydcarsphilippines.com/vehicles/byd-seal-5-dm-i-dynamic" },
  { name: "BYD Sealion 5 DM-i", type: "Super DM-i", body: "Compact SUV", price: 1338000, range: "1,001 km", rangeLabel: "combined range", power: "197 Ps", seats: "5 seats", image: "https://cdn.prod.website-files.com/679b275acc89c99e5cf128aa/69dce0d3385a98fab9775253_684fb8bf016df4905008594a_BYD-Sealion5-DMi-HomePageBanner-1440x900%20copy.avif", bestFor: "Practical family SUV", highlights: ["Up to 71 km pure EV driving", "Roomy SUV cabin", "360-degree camera"], variants: [{ name: "Dynamic", price: 1338000 }], source: "https://bydcarsphilippines.com/vehicles/byd-sealion-5-dm-i" },
  { name: "BYD eMAX 7", type: "Full Electric", body: "MPV", price: 1618000, range: "420 km", rangeLabel: "EV range (NEDC)", power: "163 Ps", seats: "6 or 7 seats", image: "https://cdn.prod.website-files.com/679b275acc89c99e5cf128aa/67f3b0881ff49accc6102e7b_BYD-eMAX7-HomePageBanner-1440x900.webp", bestFor: "Modern family space", highlights: ["Six- or seven-seat variants", "Vehicle-to-load capability", "DiPilot driver assistance"], variants: [{ name: "Standard", price: 1618000 }, { name: "Superior Captain", price: 1838000 }], source: "https://bydcarsphilippines.com/vehicles/byd-emax-7-standard" },
  { name: "BYD Sealion 6 DM-i", type: "Super DM-i", body: "Compact SUV", price: 1668000, range: "1,100 km", rangeLabel: "combined range", power: "217 Ps", seats: "5 seats", image: "https://cdn.prod.website-files.com/679b275acc89c99e5cf128aa/69dcdf1f9a9f30f23464afa4_6879e8e362008e7349e43492_BYD-Sealion6-Dmi-HomePageBanner-StoneGrey-1440x900.avif", bestFor: "Premium everyday flexibility", highlights: ["Up to 105 km pure EV driving", "15.6-inch rotating screen", "Advanced driver assistance"], variants: [{ name: "Dynamic", price: 1668000 }], source: "https://bydcarsphilippines.com/vehicles/byd-sealion-6-dm-i" },
  { name: "BYD Atto 3", type: "Full Electric", body: "Compact SUV", price: 1708000, range: "410 km", rangeLabel: "EV range (NEDC)", power: "204 Ps", seats: "5 seats", image: "https://cdn.prod.website-files.com/679b275acc89c99e5cf128aa/69281e6eec0fcd9d7c3f650f_byd%20atto%203%20-%20Dynamic%20-%20Hero.webp", bestFor: "Tech-forward compact SUV", highlights: ["Five-star Euro NCAP safety", "Spacious 1,340 L max cargo", "7.3-second 0–100 km/h"], variants: [{ name: "Dynamic", price: 1708000 }, { name: "Premium", price: 1918000 }], source: "https://bydcarsphilippines.com/vehicles/byd-atto-3-dynamic" },
  { name: "BYD Tang DM-i", type: "Super DM-i", body: "Mid-size SUV", price: 2218000, range: "1,160 km", rangeLabel: "combined range", power: "271 Ps", seats: "7 seats", image: "https://cdn.prod.website-files.com/679b275acc89c99e5cf128aa/68c3c0bf12a2c833eefa3d62_BYD%20Tang%20DM-i_Web%20Assets_Product%20Banner%20copy.webp", bestFor: "Seven-seat long-distance travel", highlights: ["Seven-seat versatility", "Up to 150 km pure EV range", "Premium family comfort"], variants: [{ name: "Premium", price: 2218000 }], source: "https://bydcarsphilippines.com/vehicles/byd-tang-dm-i" },
  { name: "BYD Shark 6 DMO", type: "DMO", body: "Pickup Truck", price: 2458000, range: "800 km", rangeLabel: "combined range", power: "435 Ps", seats: "5 seats", image: "https://cdn.prod.website-files.com/679b275acc89c99e5cf128aa/67ca6465cefc7e873cb1b359_BYD-Shark6-DMO-HomePageBannerB-1440x900c.webp", bestFor: "Work, adventure & towing", highlights: ["All-wheel drive", "2,500 kg towing capacity", "700 mm wading depth"], variants: [{ name: "Advance", price: 2458000 }, { name: "Premium", price: 2688000 }], source: "https://bydcarsphilippines.com/vehicles/byd-shark-6-dmo-advanced" },
  { name: "BYD Sealion 7", type: "Full Electric", body: "Performance SUV", price: 2658000, range: "542 km", rangeLabel: "EV range (NEDC)", power: "530 Ps", seats: "5 seats", image: "https://cdn.prod.website-files.com/679b275acc89c99e5cf128aa/6a0429cc1a2598bd101080ee_BYD-SL7i-HomePageBanner-1440x900.webp", bestFor: "Premium electric performance", highlights: ["4.5-second 0–100 km/h", "AWD with 690 Nm", "Nine airbags and DiPilot"], variants: [{ name: "Performance AWD", price: 2658000 }], source: "https://bydcarsphilippines.com/vehicles/byd-sealion-7" },
  { name: "BYD Seal", type: "Full Electric", body: "Performance Sedan", price: 2708000, range: "Up to 580 km", rangeLabel: "EV range (NEDC)", power: "Up to 529 Ps", seats: "5 seats", image: "https://cdn.prod.website-files.com/679b275acc89c99e5cf128aa/67ab5fd0cce3dedd87fcf714_BYD-SealEv-HomePageBanner-1440x900.webp", bestFor: "Sporty electric driving", highlights: ["Performance variant", "Up to 3.8-second 0–100 km/h", "Award-winning design"], variants: [{ name: "Performance AWD", price: 2708000 }], source: "https://bydcarsphilippines.com/vehicles/byd-seal-performance" },
  { name: "BYD eMAX 9 DM-i", type: "Super DM-i", body: "Luxury MPV", price: 2858000, range: "Up to 1,240 km", rangeLabel: "combined range", power: "271 Ps", seats: "7 seats", image: "https://cdn.prod.website-files.com/679b275acc89c99e5cf128aa/68f26f9848eb66807b90b15d_BYD-eMAX9-DMi-PremiumPageBanner-1440x900.webp", bestFor: "First-class family travel", highlights: ["Premium seven-seat comfort", "Up to 170 km pure EV range", "Power sliding doors"], variants: [{ name: "Advance", price: 2858000 }, { name: "Premium", price: 3178000 }], source: "https://bydcarsphilippines.com/vehicles/byd-emax-9-dm-i-advanced" },
  { name: "BYD Han", type: "Full Electric", body: "Executive Sedan", price: 3283000, range: "521 km", rangeLabel: "EV range (WLTP)", power: "515 Ps", seats: "5 seats", image: "https://cdn.prod.website-files.com/679b275acc89c99e5cf128aa/67ab473c8fcc7057d6f44ac8_BYD-Han-HomePageBanner-1440x900.webp", bestFor: "Executive electric luxury", highlights: ["3.9-second 0–100 km/h", "Electric all-wheel drive", "Nappa leather interior"], variants: [{ name: "Performance AWD", price: 3283000 }], source: "https://bydcarsphilippines.com/vehicles/byd-han" },
  { name: "BYD Tang", type: "Full Electric", body: "Performance SUV", price: 3491000, range: "530 km", rangeLabel: "EV range (NEDC)", power: "517 Ps", seats: "7 seats", image: "https://cdn.prod.website-files.com/679b275acc89c99e5cf128aa/67ab4334ed3aeeaf54e27292_BYD-Tang-HomePageBanner-1440x900.webp", bestFor: "Seven-seat electric performance", highlights: ["Dual-motor all-wheel drive", "Premium seven-seat cabin", "Advanced safety suite"], variants: [{ name: "Performance AWD", price: 3491000 }], source: "https://bydcarsphilippines.com/vehicles/byd-tang" },
];

const torqueByVehicle: Record<string, string> = {
  "BYD Seagull": "135 Nm",
  "BYD Seal 5 DM-i": "316 Nm",
  "BYD Sealion 5 DM-i": "300 Nm",
  "BYD eMAX 7": "310 Nm",
  "BYD Sealion 6 DM-i": "325 Nm",
  "BYD Atto 3": "310 Nm",
  "BYD Tang DM-i": "315 Nm",
  "BYD Shark 6 DMO": "650 Nm",
  "BYD Sealion 7": "690 Nm",
  "BYD Seal": "672 Nm",
  "BYD eMAX 9 DM-i": "315 Nm",
  "BYD Han": "700 Nm",
  "BYD Tang": "700 Nm",
};

const peso = new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP", maximumFractionDigits: 0 });

export default function Showroom() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<Vehicle | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [heroSlides, setHeroSlides] = useState(defaultHeroSlides);
  const [heroIndex, setHeroIndex] = useState(0);
  const filtered = useMemo(() => filter === "All" ? vehicles : vehicles.filter((v) => v.type === filter), [filter]);
  const hero = heroSlides[heroIndex] ?? defaultHeroSlides[0];

  useEffect(() => {
    const root = window.location.pathname.includes("/admin")
      ? window.location.pathname.split("/admin")[0] + "/"
      : window.location.pathname.replace(/[^/]*$/, "");
    fetch(`${root}site-content.json?refresh=${Date.now()}`)
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((content: SiteContent) => {
        if (Array.isArray(content.heroSlides) && content.heroSlides.length) setHeroSlides(content.heroSlides);
      })
      .catch(() => undefined);
    const search = new URLSearchParams(window.location.search);
    if (search.get("submitted") === "1") {
      setSubmitted(true);
      window.history.replaceState(null, "", `${window.location.pathname}#proposal`);
    }
  }, []);

  useEffect(() => {
    if (heroSlides.length < 2) return;
    const timer = window.setInterval(() => setHeroIndex((current) => (current + 1) % heroSlides.length), 6500);
    return () => window.clearInterval(timer);
  }, [heroSlides.length]);

  function request(vehicle: Vehicle) {
    setSelected(vehicle);
    setSubmitted(false);
    document.getElementById("proposal")?.scrollIntoView({ behavior: "smooth" });
  }

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");
    const form = e.currentTarget;
    const data = new FormData(form);
    if (String(data.get("_honey") ?? "").trim()) {
      setSubmitted(true);
      setSubmitting(false);
      return;
    }
    const mobileDigits = String(data.get("mobile") ?? "").replace(/\D/g, "");
    const validMobile = (mobileDigits.length === 11 && mobileDigits.startsWith("09")) || (mobileDigits.length === 12 && mobileDigits.startsWith("639"));
    if (!validMobile) {
      setSubmitError("Please enter a valid Philippine mobile number, such as 0917 123 4567.");
      setSubmitting(false);
      return;
    }
    const lastSubmission = Number(localStorage.getItem("bydLastQuotationRequest") ?? 0);
    if (Date.now() - lastSubmission < 60_000) {
      setSubmitError("A request was just sent from this device. Please wait one minute before trying again.");
      setSubmitting(false);
      return;
    }
    const payload = {
      "Full name": data.get("name"),
      "Client email": data.get("email"),
      "Mobile number": mobileDigits.startsWith("639") ? `+${mobileDigits}` : mobileDigits,
      "Model of interest": data.get("model"),
      "Request type": data.get("intent"),
      "Client message": data.get("message") || "No additional message",
      _replyto: data.get("email"),
      _subject: `New BYD Cebu quotation request — ${data.get("model")}`,
      _template: "table",
      _url: `${window.location.origin}${window.location.pathname}#proposal`,
      _honey: "",
    };
    try {
      const response = await fetch("https://formsubmit.co/ajax/roncorona.1029@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok || result.success === false || result.success === "false") throw new Error("The request could not be sent.");
      localStorage.setItem("bydLastQuotationRequest", String(Date.now()));
      setSubmitted(true);
      form.reset();
      setSelected(null);
    } catch {
      setSubmitError("We couldn’t send your request right now. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="BYD Cebu home"><span>BYD</span><small>CEBU</small></a>
        <nav aria-label="Main navigation"><a href="#models">Models</a><a href="#guide">Why BYD</a><a href="#proposal">Get a proposal</a></nav>
        <a className="header-cta" href="#proposal">Talk to a Consultant <span>↗</span></a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1><span>{hero.title}</span><br /><em>{hero.accent}</em></h1>
          <p className="hero-intro">{hero.description}</p>
          <div className="hero-actions"><a className="button primary" href="#models">Explore 13 models</a><a className="text-link" href="#proposal">Request a proposal <span>→</span></a></div>
          <div className="trust-row"><span><b>01</b> Verified PH lineup</span><span><b>02</b> Clear, useful specs</span><span><b>03</b> Personal assistance</span></div>
        </div>
        <div className="hero-visual">
          <img key={hero.image} src={hero.image} alt={`${hero.model} launch preview`} />
          <div className="hero-model"><span>Launch preview</span><strong>{hero.model}</strong><small>{hero.detail}</small></div>
          <div className="hero-dots" aria-label="Choose launch preview">{heroSlides.map((slide, index) => <button type="button" aria-label={`Show ${slide.model}`} className={heroIndex === index ? "active" : ""} onClick={() => setHeroIndex(index)} key={`${slide.model}-${index}`} />)}</div>
          <div className="hero-number">0{heroIndex + 1}</div>
        </div>
      </section>

      <section className="intro-strip" aria-label="Service introduction"><p>Not just a catalog.</p><h2>A clearer way to choose your next car.</h2><p>Shortlist the right model, compare what matters, then let me prepare a proposal built around your needs.</p></section>

      <section className="models" id="models">
        <div className="section-heading"><div><p className="eyebrow">The Philippine range</p><h2>Choose your energy.</h2></div><p>Prices and availability may vary in Cebu. I’ll confirm the latest details before preparing your proposal.</p></div>
        <div className="filters" role="group" aria-label="Filter vehicles by powertrain">
          {["All", "Full Electric", "Super DM-i", "DMO"].map((item) => <button key={item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)}>{item}<span>{item === "All" ? vehicles.length : vehicles.filter(v => v.type === item).length}</span></button>)}
        </div>
        <div className="vehicle-grid">
          {filtered.map((vehicle, index) => (
            <article className="vehicle-card" key={vehicle.name}>
              <div className="card-image"><img src={vehicle.image} alt={`${vehicle.name} ${vehicle.body}`} loading={index < 4 ? "eager" : "lazy"} /><span className={`power-badge ${vehicle.type === "Full Electric" ? "electric" : "hybrid"}`}>{vehicle.type}</span></div>
              <div className="card-body"><div className="card-title"><div><p>{vehicle.body}</p><h3>{vehicle.name}</h3></div><span className="card-index">{String(vehicles.indexOf(vehicle) + 1).padStart(2, "0")}</span></div>
                <p className="best-for">Best for: <strong>{vehicle.bestFor}</strong></p>
                <div className="spec-row"><div><strong>{vehicle.range}</strong><span>{vehicle.rangeLabel}</span></div><div><strong>{vehicle.power}</strong><span>power</span></div><div><strong>{torqueByVehicle[vehicle.name]}</strong><span>torque</span></div><div><strong>{vehicle.seats}</strong><span>capacity</span></div></div>
                <div className="variant-list"><span>Available variants</span>{vehicle.variants.map(variant => <div key={variant.name}><strong>{variant.name}</strong><b>{peso.format(variant.price)}</b></div>)}</div>
                <div className="price-row"><span>Starts at <strong>{peso.format(vehicle.price)}</strong></span><button onClick={() => request(vehicle)}>Get proposal <span>→</span></button></div>
                <details><summary>See customer highlights</summary><ul>{vehicle.highlights.map(item => <li key={item}>{item}</li>)}</ul><a href={vehicle.source} target="_blank" rel="noreferrer">View official BYD source ↗</a></details>
              </div>
            </article>
          ))}
        </div>
        <p className="price-note">Cebu suggested retail prices shown are based on the July 2026 BYD Cebu proposal list. Prices, specifications, colors and stock may change without prior notice. Please request a proposal to confirm the latest offer.</p>
      </section>

      <section className="guide" id="guide">
        <div className="guide-copy"><p className="eyebrow light">Choose with confidence</p><h2>Electric when you want it.<br />Freedom when you need it.</h2><p>Go full electric for smooth, quiet, zero-tailpipe-emission driving—or choose Super DM-i for electric-first daily trips with a fuel engine ready for longer journeys.</p><a href="#proposal" className="button light-button">Help me choose</a></div>
        <div className="guide-cards"><div><span>EV</span><h3>Full Electric</h3><p>Ideal when you can charge at home or nearby and want the smoothest, simplest electric experience.</p></div><div><span>DM-i</span><h3>Super DM-i</h3><p>A plug-in hybrid that prioritizes electric driving while giving you long-distance flexibility.</p></div><div><span>DMO</span><h3>Built for more</h3><p>Electrified off-road capability, serious pickup performance and everyday refinement in one system.</p></div></div>
      </section>

      <section className="proposal" id="proposal">
        <div className="proposal-intro"><p className="eyebrow">The next step</p><h2>Your personalized<br />BYD proposal.</h2><p>Tell me what you’re considering. I’ll help verify availability, explain financing options, and prepare a clear quotation for you.</p><div className="advisor-card"><div className="avatar">BYD</div><div><strong>Certified Sales Consultant</strong><span>BYD Cebu</span><small>Personal assistance from inquiry to delivery</small></div></div></div>
        <form className="lead-form" onSubmit={submit}>
          {submitted ? <div className="success"><span>✓</span><h3>Quotation request sent.</h3><p>Thank you. A Certified Sales Consultant will review your information and contact you soon.</p><button type="button" className="button primary" onClick={() => setSubmitted(false)}>Send another request</button></div> : <>
            <label>Full name<input name="name" required placeholder="Your name" /></label>
            <label>Email address<input name="email" type="email" required placeholder="you@email.com" /></label>
            <label>Mobile number<input name="mobile" required inputMode="tel" placeholder="09XX XXX XXXX" title="Enter a Philippine mobile number beginning with 09 or +639" /></label>
            <label className="bot-field" aria-hidden="true">Company website<input name="_honey" tabIndex={-1} autoComplete="off" /></label>
            <label>Model of interest<select name="model" value={selected?.name ?? ""} onChange={(e) => setSelected(vehicles.find(v => v.name === e.target.value) ?? null)} required><option value="" disabled>Select a BYD model</option>{vehicles.map(v => <option key={v.name} value={v.name}>{v.name}</option>)}</select></label>
            <label>How can I help?<select name="intent" required defaultValue="proposal"><option value="proposal">Send me a proposal</option><option value="test-drive">Book a test drive</option><option value="financing">Discuss financing</option><option value="trade-in">Ask about trade-in</option></select></label>
            <label className="full-width">Anything I should know?<textarea name="message" placeholder="Preferred variant, budget, purchase timeframe, or questions (optional)" /></label>
            <label className="consent full-width"><input type="checkbox" required /> <span>I agree to be contacted about my inquiry and acknowledge that my information will be handled according to the privacy notice.</span></label>
            <button className="submit-button" type="submit" disabled={submitting}>{submitting ? "Sending your request…" : "Request my proposal"} <span>↗</span></button>
            {submitError && <p className="form-error" role="alert">{submitError}</p>}
            <p className="form-note">No obligation. Final price, availability and financing are subject to verification.</p>
          </>}
        </form>
      </section>

      <footer><div className="brand footer-brand"><span>BYD</span><small>CEBU</small></div><p>Certified Sales Consultant website for customer assistance at BYD Cebu. Vehicle information is sourced from BYD Cars Philippines and may change without notice.</p><div><a href="https://bydcarsphilippines.com" target="_blank" rel="noreferrer">Official BYD Philippines ↗</a><a href="#top">Back to top ↑</a></div></footer>
    </main>
  );
}
