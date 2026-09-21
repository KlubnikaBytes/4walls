import React, { useState } from "react";

// ── All media items with per-image metadata ───────────────────────────────────
const allItems = [
  // ── Co-Working ──────────────────────────────────────────────────────────────
  {
    src: "/manage-space/coworking/1.jpg",
    category: "Co-Working",
    title: "Open Co-Working Floor",
    type: "image",
    badge: "Shared Space",
    availability: "Seats from ₹8,000/month",
    status: "Ready to Move",
    size: "Flexible Seating",
    description: "Vibrant open-plan co-working floor with ergonomic workstations, ample natural light, and a buzzing community atmosphere. Perfect for freelancers, startups, and remote teams.",
    amenities: ["High-Speed Wi-Fi", "Ergonomic Chairs", "Power Outlets", "Natural Light"],
  },
  {
    src: "/manage-space/coworking/2.jpg",
    category: "Co-Working",
    title: "Collaborative Hub",
    type: "image",
    badge: "Shared Space",
    availability: "Seats from ₹8,000/month",
    status: "Ready to Move",
    size: "Flexible Seating",
    description: "A collaborative zone designed for team meetings and brainstorming. Open layout with modular furniture that adapts to your workflow.",
    amenities: ["Meeting Zones", "Whiteboards", "Video Conferencing", "Café Access"],
  },
  {
    src: "/manage-space/coworking/3.jpg",
    category: "Co-Working",
    title: "Lounge & Networking Area",
    type: "image",
    badge: "Shared Space",
    availability: "Seats from ₹8,000/month",
    status: "Ready to Move",
    size: "Common Area",
    description: "Relaxed lounge space ideal for informal catch-ups, networking events, and casual work sessions. Designed to spark creativity and connection.",
    amenities: ["Casual Seating", "Coffee Bar", "Community Events", "24/7 Access"],
  },
  {
    src: "/manage-space/coworking/4.jpg",
    category: "Co-Working",
    title: "Dedicated Desk Zone",
    type: "image",
    badge: "Dedicated Desk",
    availability: "From ₹12,000/month",
    status: "Available",
    size: "Fixed Desk",
    description: "Your own permanent desk in a quiet, focused zone — lockable storage, personal setup, and the stability of a fixed seat without a full private office.",
    amenities: ["Lockable Storage", "Fixed Desk", "Mail Handling", "Printer Access"],
  },
  {
    src: "/manage-space/coworking/5.jpg",
    category: "Co-Working",
    title: "Private Pod",
    type: "image",
    badge: "Focus Zone",
    availability: "From ₹15,000/month",
    status: "Available",
    size: "2–4 Seats",
    description: "Semi-private pods for heads-down work or small team sprints. Acoustic panels keep distractions at bay while maintaining the energy of the open floor.",
    amenities: ["Acoustic Panels", "Individual Lighting", "USB Charging", "Mini Storage"],
  },
  {
    src: "/manage-space/coworking/6.jpg",
    category: "Co-Working",
    title: "Conference Room",
    type: "image",
    badge: "Meeting Room",
    availability: "Bookable by the hour",
    status: "On Demand",
    size: "Up to 10 Seats",
    description: "Professional boardroom-style conference room with AV equipment, high-speed internet, and presentation screens — available for booking by the hour.",
    amenities: ["4K Display", "Video Conferencing", "Whiteboard", "HDMI & Wireless Cast"],
  },
  {
    src: "/manage-space/coworking/7.jpg",
    category: "Co-Working",
    title: "Pantry & Break Area",
    type: "image",
    badge: "Shared Amenity",
    availability: "Included",
    status: "Always Open",
    size: "Common Area",
    description: "Fully stocked pantry and break room with complimentary tea, coffee, and filtered water — a space to recharge and connect with fellow members.",
    amenities: ["Tea & Coffee", "Filtered Water", "Microwave", "Refrigerator"],
  },

  // ── My Office — Private Units ────────────────────────────────────────────────
  {
    src: "/manage-space/myoffice/7.jpg",
    category: "My Office",
    title: "Premium Private Suite",
    type: "image",
    badge: "Private Office",
    availability: "500–1,000 sq.ft",
    status: "Ready to Move",
    size: "10–20 Seats",
    description: "Fully furnished premium private office suite with branded reception, modular workstations, and floor-to-ceiling glass partitions. Managed by My Office — zero operational overhead.",
    amenities: ["Branded Reception", "Modular Furniture", "IT Infrastructure", "24/7 Security"],
  },
  {
    src: "/manage-space/myoffice/8.jpg",
    category: "My Office",
    title: "Executive Cabin",
    type: "image",
    badge: "Private Office",
    availability: "200–400 sq.ft",
    status: "Available",
    size: "1–4 Seats",
    description: "An exclusive executive cabin with premium interiors, soundproofing, and a dedicated address. Ideal for senior leadership who need privacy and prestige.",
    amenities: ["Soundproofed", "Premium Fit-out", "Dedicated Address", "Power Backup"],
  },
  {
    src: "/manage-space/myoffice/10 ..jpg",
    category: "My Office",
    title: "Open Plan Private Office",
    type: "image",
    badge: "Private Office",
    availability: "800–2,000 sq.ft",
    status: "Ready to Move",
    size: "15–40 Seats",
    description: "Large open-plan private office with your own branding, server room, and reception — fully managed and operational from day one.",
    amenities: ["Custom Branding", "Server Room", "Private Pantry", "CCTV"],
  },
  {
    src: "/manage-space/myoffice/11.jpg",
    category: "My Office",
    title: "Team Office — Mid Size",
    type: "image",
    badge: "Private Office",
    availability: "400–800 sq.ft",
    status: "Available",
    size: "8–15 Seats",
    description: "A smart mid-sized private office for growing teams. Move in within 48 hours — furniture, internet, and admin support all included.",
    amenities: ["Fast Setup", "Furniture Included", "Admin Support", "Flexible Lease"],
  },
  {
    src: "/manage-space/myoffice/12 ( w).jpg",
    category: "My Office",
    title: "Modern Workspace Interior",
    type: "image",
    badge: "Private Office",
    availability: "600–1,200 sq.ft",
    status: "Ready to Move",
    size: "12–25 Seats",
    description: "Contemporary open workspace with exposed ceiling aesthetics, warm accent lighting, and premium wood-finish workstations — a space your team will love.",
    amenities: ["Designer Interiors", "Mood Lighting", "Wood Finish", "Open Plan"],
  },
  {
    src: "/manage-space/myoffice/13 (w).jpg",
    category: "My Office",
    title: "Glass Partition Office",
    type: "image",
    badge: "Private Office",
    availability: "500–1,000 sq.ft",
    status: "Available",
    size: "10–20 Seats",
    description: "Floor-to-ceiling glass partitions give you privacy without sacrificing openness. Perfect for creative agencies and tech teams that love light-filled spaces.",
    amenities: ["Glass Partitions", "Natural Light", "Air Conditioning", "Fibre Internet"],
  },
  {
    src: "/manage-space/myoffice/14(w).jpg",
    category: "My Office",
    title: "Compact Starter Office",
    type: "image",
    badge: "Private Office",
    availability: "200–350 sq.ft",
    status: "Ready to Move",
    size: "4–8 Seats",
    description: "A compact, smartly designed starter office for early-stage teams. All amenities of a large office — just right-sized for lean teams.",
    amenities: ["All-Inclusive", "Fibre Internet", "Reception Service", "Power Backup"],
  },
  {
    src: "/manage-space/myoffice/15(w).jpg",
    category: "My Office",
    title: "Collaborative Private Floor",
    type: "image",
    badge: "Private Floor",
    availability: "2,000–5,000 sq.ft",
    status: "On Request",
    size: "40–100 Seats",
    description: "An entire managed floor — your brand, your layout, your rules. Ideal for companies scaling fast who want a dedicated identity without building it from scratch.",
    amenities: ["Full Floor", "Custom Layout", "Dedicated IT", "Boardroom Included"],
  },
  {
    src: "/manage-space/myoffice/16(w).jpg",
    category: "My Office",
    title: "Boutique Private Office",
    type: "image",
    badge: "Private Office",
    availability: "300–600 sq.ft",
    status: "Available",
    size: "6–12 Seats",
    description: "A boutique private office with curated interiors and a premium feel. Limited units available — ideal for consulting firms, law offices, and design studios.",
    amenities: ["Premium Interiors", "Private Entrance", "Housekeeping", "Security 24/7"],
  },
  {
    src: "/manage-space/myoffice/17.jpg",
    category: "My Office",
    title: "Reception & Lobby",
    type: "image",
    badge: "My Office Facility",
    availability: "Included",
    status: "Operational",
    size: "Common Area",
    description: "Professionally designed reception and lobby area that makes a strong first impression on your clients. Staffed reception available on request.",
    amenities: ["Staffed Reception", "Lounge Seating", "Brand Display", "Visitor Management"],
  },
  {
    src: "/manage-space/myoffice/18.jpg",
    category: "My Office",
    title: "Server & IT Room",
    type: "image",
    badge: "Infrastructure",
    availability: "Included",
    status: "Operational",
    size: "Utility",
    description: "Dedicated server room with structured cabling, UPS backup, and managed IT support — ensuring your business stays connected and secure at all times.",
    amenities: ["Structured Cabling", "UPS Backup", "Managed IT", "Rack Space"],
  },
  {
    src: "/manage-space/myoffice/19.jpg",
    category: "My Office",
    title: "Private Meeting Room",
    type: "image",
    badge: "Meeting Room",
    availability: "Included",
    status: "Operational",
    size: "6–8 Seats",
    description: "Every My Office unit comes with access to private, soundproofed meeting rooms equipped with video conferencing tools and presentation screens.",
    amenities: ["Soundproofed", "AV Equipment", "Video Conferencing", "Whiteboard"],
  },
  {
    src: "/manage-space/myoffice/20.jpg",
    category: "My Office",
    title: "Premium Interiors — Detail",
    type: "image",
    badge: "My Office Finish",
    availability: "Standard Fit-out",
    status: "Included",
    size: "Custom",
    description: "Every My Office unit is delivered with premium fit-out as standard — engineered wood flooring, suspended acoustic ceilings, and curated color palettes.",
    amenities: ["Engineered Flooring", "Acoustic Ceilings", "Premium Palette", "Turnkey Ready"],
  },
  {
    src: "/manage-space/myoffice/N 1.jpg",
    category: "My Office",
    title: "New Unit — Open View",
    type: "image",
    badge: "New Launch",
    availability: "350–700 sq.ft",
    status: "New Listing",
    size: "8–16 Seats",
    description: "Brand new My Office unit — freshly fitted, never occupied. First tenant gets full customization of layout and branding at no extra charge.",
    amenities: ["Brand New", "Free Customization", "Flexible Lease", "All-Inclusive"],
  },
  {
    src: "/manage-space/myoffice/N 2.jpg",
    category: "My Office",
    title: "New Unit — Workstation Area",
    type: "image",
    badge: "New Launch",
    availability: "350–700 sq.ft",
    status: "New Listing",
    size: "8–16 Seats",
    description: "Newly launched workstation zone inside the latest My Office unit — ergonomic seating, dedicated power, and fibre connectivity at every desk.",
    amenities: ["Ergonomic Seating", "Dedicated Power", "Fibre per Desk", "Storage Units"],
  },
  {
    src: "/manage-space/myoffice/N 3.jpg",
    category: "My Office",
    title: "New Unit — Cabin View",
    type: "image",
    badge: "New Launch",
    availability: "350–700 sq.ft",
    status: "New Listing",
    size: "8–16 Seats",
    description: "Glass-fronted private cabin inside the new My Office launch — for founders, senior managers, or teams that need a quiet command centre.",
    amenities: ["Glass Cabin", "Acoustic Privacy", "Executive Chair", "Dedicated Cooling"],
  },
  {
    src: "/manage-space/myoffice/N 4.jpg",
    category: "My Office",
    title: "New Unit — Finishing Detail",
    type: "image",
    badge: "New Launch",
    availability: "350–700 sq.ft",
    status: "New Listing",
    size: "8–16 Seats",
    description: "Final finishing details of the new My Office unit — from recessed lighting and false ceilings to premium wall panels. Every detail considered.",
    amenities: ["Recessed Lighting", "False Ceiling", "Premium Panels", "Ready to Brand"],
  },

  // ── Videos ───────────────────────────────────────────────────────────────────
  {
    src: "/manage-space/myoffice/video 6 no. office.mp4",
    category: "My Office",
    title: "Office Tour — Unit 6",
    type: "video",
    badge: "Video Tour",
    availability: "400–800 sq.ft",
    status: "Ready to Move",
    size: "8–15 Seats",
    description: "A full walkthrough video tour of My Office Unit 6 — take a 360° look at the workspace, reception, meeting room, and pantry before your site visit.",
    amenities: ["Furnished", "IT Ready", "Reception Included", "Pantry Access"],
  },
  {
    src: "/manage-space/myoffice/Video N.mp4",
    category: "My Office",
    title: "New Unit — Video Walkthrough",
    type: "video",
    badge: "Video Tour",
    availability: "350–700 sq.ft",
    status: "New Listing",
    size: "8–16 Seats",
    description: "Video walkthrough of the brand new My Office unit. Explore the full layout, interior finish, natural light, and all amenities before booking your visit.",
    amenities: ["Brand New", "Free Customization", "Fibre Internet", "Move-in Ready"],
  },
];

const CATEGORY_COLORS = {
  "Co-Working": "#A97D2F",
  "My Office": "#24423A",
};

// ── Detail Modal ──────────────────────────────────────────────────────────────
function DetailModal({ item, onClose }) {
  const accent = CATEGORY_COLORS[item.category] || "#A97D2F";

  React.useEffect(() => {
    const fn = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", fn); document.body.style.overflow = ""; };
  }, []);

  return (
    <div
      className="mc-modal-overlay"
      onClick={onClose}
      style={{ zIndex: 1200 }}
    >
      <div
        className="mc-modal-content"
        style={{ maxWidth: 820 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button className="mc-close-btn" onClick={onClose}>×</button>

        {/* Media */}
        <div style={{ position: "relative", height: 340, overflow: "hidden", background: "#111" }}>
          {item.type === "video" ? (
            <video controls autoPlay style={{ width: "100%", height: "100%", objectFit: "cover" }}>
              <source src={item.src} type="video/mp4" />
            </video>
          ) : (
            <img src={item.src} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          )}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)", pointerEvents: "none" }} />
          {/* Category + Badge pills */}
          <div style={{ position: "absolute", top: 16, left: 20, display: "flex", gap: 8 }}>
            <span style={{ background: accent, color: "#fff", fontFamily: "IBM Plex Mono", fontSize: 10, padding: "4px 12px", borderRadius: 20, letterSpacing: ".07em", textTransform: "uppercase" }}>{item.category}</span>
            <span style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)", color: "#fff", fontFamily: "IBM Plex Mono", fontSize: 10, padding: "4px 12px", borderRadius: 20, letterSpacing: ".07em", textTransform: "uppercase" }}>{item.badge}</span>
          </div>
        </div>

        {/* Header */}
        <div className="mc-modal-header">
          <h2 style={{ fontSize: 28, color: "var(--ink)", marginBottom: 8 }}>{item.title}</h2>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            <span style={{ fontFamily: "IBM Plex Mono", fontSize: 13, color: accent, fontWeight: 500 }}>{item.availability}</span>
            <span style={{ fontFamily: "IBM Plex Mono", fontSize: 13, color: "var(--ink-soft)" }}>{item.size}</span>
          </div>
        </div>

        {/* Body */}
        <div className="mc-modal-body">
          {/* Stats */}
          <div className="mc-details-grid" style={{ gridTemplateColumns: "repeat(3,1fr)", marginBottom: 28 }}>
            <div className="mc-detail-item">
              <span className="lbl">Category</span>
              <span className="val" style={{ color: accent }}>{item.category}</span>
            </div>
            <div className="mc-detail-item">
              <span className="lbl">Size</span>
              <span className="val">{item.size}</span>
            </div>
            <div className="mc-detail-item">
              <span className="lbl">Status</span>
              <span className="val">{item.status}</span>
            </div>
          </div>

          {/* Description */}
          <p style={{ color: "var(--ink-soft)", fontSize: 15, lineHeight: 1.75, marginBottom: 28 }}>{item.description}</p>

          {/* Amenities */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ fontFamily: "IBM Plex Mono", fontSize: 10, textTransform: "uppercase", letterSpacing: ".08em", color: "var(--ink-soft)", marginBottom: 12 }}>Amenities & Features</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {item.amenities.map((a) => (
                <span key={a} style={{ fontFamily: "IBM Plex Mono", fontSize: 11, padding: "5px 14px", border: "1px solid " + accent + "55", borderRadius: 4, color: accent, background: accent + "11" }}>{a}</span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <a
            href="/contact"
            className="btn-brass"
            style={{ textDecoration: "none", display: "inline-block" }}
          >
            Enquire About This Space →
          </a>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function ManageSpace() {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("All");

  const filters = ["All", "Co-Working", "My Office"];
  const filtered = filter === "All" ? allItems : allItems.filter((i) => i.category === filter);

  return (
    <>
      {/* Hero */}
      <div style={{ position: "relative", overflow: "hidden", background: "var(--ink)", color: "var(--white)", padding: "100px 48px 80px", minHeight: 400, display: "flex", alignItems: "center" }}>
        <div style={{ position: "absolute", top: "-30%", right: "-10%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(169,125,47,0.2) 0%, transparent 70%)", zIndex: 0 }} />
        <div style={{ position: "absolute", bottom: "-20%", left: "5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(36,66,58,0.5) 0%, transparent 70%)", zIndex: 0 }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 800 }}>
          <div className="eyebrow" style={{ color: "var(--brass)" }}>Manage Space</div>
          <h1 style={{ fontSize: "clamp(36px, 7vw, 60px)", fontWeight: 600, lineHeight: 1.08, marginBottom: 20 }}>Spaces That Work<br />As Hard As You Do</h1>
          <p style={{ color: "#a0aab2", fontSize: 17, lineHeight: 1.7, maxWidth: 560 }}>
            From vibrant co-working floors to fully managed private office suites — browse our complete portfolio and click any space to see full details.
          </p>
        </div>
      </div>

      {/* Filter tabs + count */}
      <div style={{ background: "var(--paper)", borderBottom: "1px solid var(--line)", padding: "0 48px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div className="tabs-row" style={{ margin: "20px 0", gap: 8 }}>
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={"tb" + (filter === f ? " on" : "")}
              style={{ border: "1px solid", borderColor: filter === f ? "var(--ink)" : "var(--line)" }}
            >
              {f}
            </button>
          ))}
        </div>
        <span style={{ fontFamily: "IBM Plex Mono", fontSize: 11, color: "var(--ink-soft)" }}>{filtered.length} spaces</span>
      </div>

      {/* Gallery grid */}
      <section style={{ background: "var(--white)", padding: "56px 48px 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
          {filtered.map((item, i) => {
            const accent = CATEGORY_COLORS[item.category] || "#A97D2F";
            return (
              <button
                key={i}
                id={"manage-space-item-" + i}
                onClick={() => setSelected(item)}
                style={{
                  all: "unset", cursor: "pointer", display: "flex", flexDirection: "column",
                  background: "var(--paper)", border: "1px solid var(--line)",
                  borderRadius: 12, overflow: "hidden",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                  transition: "transform .3s ease, box-shadow .3s ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-8px)"; e.currentTarget.style.boxShadow = "0 16px 36px rgba(0,0,0,0.12)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.05)"; }}
              >
                {/* Thumbnail */}
                <div style={{ position: "relative", height: 220, overflow: "hidden", background: "#111" }}>
                  {item.type === "video" ? (
                    <>
                      <video
                        muted
                        style={{ width: "100%", height: "100%", objectFit: "cover", pointerEvents: "none" }}
                      >
                        <source src={item.src} type="video/mp4" />
                      </video>
                      {/* Play icon overlay */}
                      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.3)" }}>
                        <div style={{ width: 52, height: 52, borderRadius: "50%", background: "rgba(255,255,255,0.2)", backdropFilter: "blur(4px)", border: "2px solid rgba(255,255,255,0.6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, color: "#fff", paddingLeft: 4 }}>▶</div>
                      </div>
                    </>
                  ) : (
                    <img
                      src={item.src}
                      alt={item.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform .5s ease" }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.06)")}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = "")}
                    />
                  )}
                  {/* Gradient */}
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 55%)", pointerEvents: "none" }} />
                  {/* Category pill */}
                  <div style={{ position: "absolute", top: 12, left: 12, background: accent, color: "#fff", fontFamily: "IBM Plex Mono", fontSize: 9, textTransform: "uppercase", letterSpacing: ".08em", padding: "4px 10px", borderRadius: 20 }}>{item.category}</div>
                  {/* Click hint */}
                  <div style={{ position: "absolute", bottom: 12, right: 12, background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)", color: "#fff", fontFamily: "IBM Plex Mono", fontSize: 9, textTransform: "uppercase", letterSpacing: ".06em", padding: "4px 10px", borderRadius: 20 }}>View Details</div>
                </div>

                {/* Card body */}
                <div style={{ padding: "18px 20px 22px", display: "flex", flexDirection: "column", flex: 1 }}>
                  <div style={{ fontFamily: "IBM Plex Mono", fontSize: 9, textTransform: "uppercase", letterSpacing: ".1em", color: accent, marginBottom: 6 }}>{item.badge}</div>
                  <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 8, color: "var(--ink)", textAlign: "left" }}>{item.title}</h3>
                  <p style={{ color: "var(--ink-soft)", fontSize: 13, lineHeight: 1.6, marginBottom: 14, textAlign: "left", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{item.description}</p>
                  <div style={{ marginTop: "auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, paddingTop: 12, borderTop: "1px solid var(--line)" }}>
                    <div>
                      <div style={{ fontFamily: "IBM Plex Mono", fontSize: 8, textTransform: "uppercase", color: "var(--ink-soft)", letterSpacing: ".07em", marginBottom: 3 }}>Availability</div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: "var(--ink)" }}>{item.availability}</div>
                    </div>
                    <div>
                      <div style={{ fontFamily: "IBM Plex Mono", fontSize: 8, textTransform: "uppercase", color: "var(--ink-soft)", letterSpacing: ".07em", marginBottom: 3 }}>Status</div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: accent }}>{item.status}</div>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <div className="cta-strip">
        <h3>Ready to find your perfect workspace?</h3>
        <a href="/contact" className="btn-brass" style={{ textDecoration: "none" }}>Book a Site Visit →</a>
      </div>

      {/* Detail modal */}
      {selected && <DetailModal item={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
