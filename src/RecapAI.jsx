import { useState, useEffect, useRef } from "react";

const TMDB_API_KEY = "YOUR_TMDB_API_KEY"; // Replace with your TMDB API key
const TMDB_BASE = "https://api.themoviedb.org/3";
const TMDB_IMAGE = "https://image.tmdb.org/t/p/w500";

// --- Styles ---
const styles = `/api/anthropic/v1/messages
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #0a0a0f;
    --surface: #111118;
    --surface2: #1a1a24;
    --border: #2a2a38;
    --accent: #e8ff47;
    --accent2: #ff4d6d;
    --text: #f0f0f8;
    --muted: #6b6b82;
    --radius: 12px;
  }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'DM Sans', sans-serif;
    min-height: 100vh;
    line-height: 1.6;
  }

  .app {
    min-height: 100vh;
    background: var(--bg);
  }

  /* Hero */
  .hero {
    position: relative;
    padding: 80px 24px 60px;
    text-align: center;
    overflow: hidden;
  }
  .hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 80% 50% at 50% 0%, rgba(232,255,71,0.08) 0%, transparent 70%);
    pointer-events: none;
  }
  .hero-eyebrow {
    display: inline-block;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--accent);
    border: 1px solid rgba(232,255,71,0.3);
    padding: 6px 14px;
    border-radius: 100px;
    margin-bottom: 28px;
  }
  .hero h1 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(64px, 12vw, 120px);
    line-height: 0.9;
    letter-spacing: 2px;
    color: var(--text);
    margin-bottom: 8px;
  }
  .hero h1 span {
    color: var(--accent);
  }
  .hero-sub {
    font-size: 18px;
    color: var(--muted);
    font-weight: 300;
    max-width: 480px;
    margin: 20px auto 0;
    font-style: italic;
  }

  /* Search */
  .search-section {
    max-width: 680px;
    margin: 0 auto;
    padding: 0 24px 60px;
  }
  .search-wrap {
    position: relative;
    display: flex;
    gap: 0;
  }
  .search-input {
    flex: 1;
    background: var(--surface);
    border: 1.5px solid var(--border);
    border-right: none;
    border-radius: var(--radius) 0 0 var(--radius);
    padding: 18px 22px;
    font-family: 'DM Sans', sans-serif;
    font-size: 16px;
    color: var(--text);
    outline: none;
    transition: border-color 0.2s;
  }
  .search-input::placeholder { color: var(--muted); }
  .search-input:focus { border-color: var(--accent); }
  .search-btn {
    background: var(--accent);
    border: 1.5px solid var(--accent);
    border-radius: 0 var(--radius) var(--radius) 0;
    padding: 18px 28px;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 18px;
    letter-spacing: 1px;
    color: #0a0a0f;
    cursor: pointer;
    transition: background 0.2s, transform 0.1s;
    white-space: nowrap;
  }
  .search-btn:hover { background: #d4eb3a; }
  .search-btn:active { transform: scale(0.98); }
  .search-btn:disabled { opacity: 0.5; cursor: not-allowed; }

  /* Results */
  .results {
    max-width: 680px;
    margin: 0 auto;
    padding: 0 24px;
  }
  .results-label {
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 12px;
  }
  .show-card {
    display: flex;
    align-items: center;
    gap: 16px;
    background: var(--surface);
    border: 1.5px solid var(--border);
    border-radius: var(--radius);
    padding: 14px;
    cursor: pointer;
    margin-bottom: 10px;
    transition: border-color 0.2s, background 0.2s;
  }
  .show-card:hover { border-color: var(--accent); background: var(--surface2); }
  .show-card.selected { border-color: var(--accent); background: rgba(232,255,71,0.05); }
  .show-thumb {
    width: 52px;
    height: 72px;
    object-fit: cover;
    border-radius: 6px;
    background: var(--surface2);
    flex-shrink: 0;
  }
  .show-thumb-placeholder {
    width: 52px;
    height: 72px;
    background: var(--surface2);
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    flex-shrink: 0;
  }
  .show-info h3 { font-size: 15px; font-weight: 500; margin-bottom: 4px; }
  .show-info p { font-size: 13px; color: var(--muted); }

  /* Season Selector */
  .config-section {
    max-width: 680px;
    margin: 0 auto;
    padding: 40px 24px;
    animation: fadeUp 0.4s ease;
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .config-header {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 32px;
  }
  .config-poster {
    width: 60px;
    height: 84px;
    object-fit: cover;
    border-radius: 8px;
  }
  .config-title { font-family: 'Bebas Neue', sans-serif; font-size: 36px; line-height: 1; }
  .config-meta { font-size: 13px; color: var(--muted); margin-top: 4px; }
  .config-back { background: var(--surface); border: 1.5px solid var(--border); color: var(--text); font-family: 'DM Sans', sans-serif; font-size: 15px; cursor: pointer; border-radius: 8px; margin-bottom: 24px; padding: 10px 20px; display: inline-flex; align-items: center; gap: 6px; transition: border-color 0.2s; }
.config-back:hover { border-color: var(--accent); }
  }
  .config-back:hover { color: var(--text); }

  .section-label {
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 12px;
  }
  .seasons-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 32px;
  }
  .season-pill {
    background: var(--surface);
    border: 1.5px solid var(--border);
    border-radius: 100px;
    padding: 8px 18px;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s;
    color: var(--text);
    font-family: 'DM Sans', sans-serif;
  }
  .season-pill:hover { border-color: var(--accent); }
  .season-pill.selected { background: var(--accent); border-color: var(--accent); color: #0a0a0f; font-weight: 500; }

  .style-options {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin-bottom: 32px;
  }
  .style-card {
    background: var(--surface);
    border: 1.5px solid var(--border);
    border-radius: var(--radius);
    padding: 16px 12px;
    cursor: pointer;
    text-align: center;
    transition: all 0.2s;
  }
  .style-card:hover { border-color: var(--accent); }
  .style-card.selected { border-color: var(--accent); background: rgba(232,255,71,0.05); }
  .style-card .style-icon { font-size: 22px; margin-bottom: 6px; }
  .style-card .style-name { font-size: 13px; font-weight: 500; }
  .style-card .style-desc { font-size: 11px; color: var(--muted); margin-top: 2px; }

  .video-toggle {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 20px;
    background: var(--surface);
    border: 1.5px solid var(--border);
    border-radius: var(--radius);
    margin-bottom: 28px;
    cursor: pointer;
    transition: border-color 0.2s;
  }
  .video-toggle:hover { border-color: var(--accent); }
  .toggle-switch {
    width: 40px;
    height: 22px;
    background: var(--border);
    border-radius: 100px;
    position: relative;
    transition: background 0.2s;
    flex-shrink: 0;
  }
  .toggle-switch.on { background: var(--accent); }
  .toggle-knob {
    position: absolute;
    top: 3px;
    left: 3px;
    width: 16px;
    height: 16px;
    background: white;
    border-radius: 50%;
    transition: transform 0.2s;
  }
  .toggle-switch.on .toggle-knob { transform: translateX(18px); }
  .toggle-label { font-size: 14px; }
  .toggle-sublabel { font-size: 12px; color: var(--muted); }

  .generate-btn {
    width: 100%;
    background: var(--accent);
    border: none;
    border-radius: var(--radius);
    padding: 20px;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 22px;
    letter-spacing: 2px;
    color: #0a0a0f;
    cursor: pointer;
    transition: background 0.2s, transform 0.1s;
  }
  .generate-btn:hover { background: #d4eb3a; }
  .generate-btn:active { transform: scale(0.99); }
  .generate-btn:disabled { opacity: 0.4; cursor: not-allowed; }

  /* Recap Display */
  .recap-section {
    max-width: 760px;
    margin: 0 auto;
    padding: 40px 24px 80px;
    animation: fadeUp 0.4s ease;
  }
  .recap-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 20px;
    margin-bottom: 36px;
    flex-wrap: wrap;
  }
  .recap-title-block {}
  .recap-eyebrow {
    font-size: 11px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 8px;
  }
  .recap-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 52px;
    line-height: 0.95;
  }
  .recap-subtitle { font-size: 14px; color: var(--muted); margin-top: 6px; }
  .recap-actions { display: flex; gap: 10px; flex-shrink: 0; margin-top: 8px; }
  .action-btn {
    background: var(--surface);
    border: 1.5px solid var(--border);
    border-radius: 8px;
    padding: 8px 14px;
    font-size: 13px;
    color: var(--text);
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    transition: border-color 0.2s;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .action-btn:hover { border-color: var(--accent); }

  .recap-divider {
    border: none;
    height: 1px;
    background: var(--border);
    margin: 32px 0;
  }

  .recap-body {
    font-size: 16px;
    line-height: 1.85;
    color: #d0d0e0;
    white-space: pre-wrap;
  }
  .recap-body strong, .recap-body b {
    color: var(--text);
    font-weight: 500;
  }

  /* Streaming text cursor */
  .streaming-cursor::after {
    content: '▋';
    animation: blink 0.8s infinite;
    color: var(--accent);
    margin-left: 2px;
  }
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }

  /* Video Section */
  .video-section {
    margin-top: 48px;
    padding-top: 36px;
    border-top: 1px solid var(--border);
  }
  .video-section-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 28px;
    margin-bottom: 18px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .video-section-title span { color: var(--accent2); }
  .video-embed {
    aspect-ratio: 16/9;
    width: 100%;
    border-radius: var(--radius);
    border: 1.5px solid var(--border);
    background: var(--surface);
    overflow: hidden;
    margin-bottom: 10px;
  }
  .video-embed iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
  .video-source {
    font-size: 12px;
    color: var(--muted);
    margin-bottom: 24px;
  }

  /* Loading */
  .loading-wrap {
    text-align: center;
    padding: 60px 24px;
    max-width: 480px;
    margin: 0 auto;
  }
  .loading-spinner {
    width: 48px;
    height: 48px;
    border: 3px solid var(--border);
    border-top-color: var(--accent);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin: 0 auto 24px;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  .loading-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 32px;
    margin-bottom: 8px;
  }
  .loading-sub { font-size: 14px; color: var(--muted); font-style: italic; }

  /* Error */
  .error-box {
    background: rgba(255,77,109,0.1);
    border: 1.5px solid rgba(255,77,109,0.3);
    border-radius: var(--radius);
    padding: 16px 20px;
    font-size: 14px;
    color: #ff9aac;
    margin-top: 16px;
  }

  /* API Key Setup */
  .setup-banner {
    background: rgba(232,255,71,0.06);
    border: 1.5px solid rgba(232,255,71,0.2);
    border-radius: var(--radius);
    padding: 20px 24px;
    margin-bottom: 32px;
    font-size: 14px;
  }
  .setup-banner strong { color: var(--accent); }
  .setup-banner code {
    background: rgba(232,255,71,0.1);
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 13px;
    font-family: monospace;
  }

  /* API Key Input */
  .api-input-row {
    display: flex;
    gap: 10px;
    margin-top: 12px;
    flex-wrap: wrap;
  }
  .api-input {
    flex: 1;
    min-width: 200px;
    background: var(--surface);
    border: 1.5px solid var(--border);
    border-radius: 8px;
    padding: 10px 14px;
    font-size: 13px;
    color: var(--text);
    font-family: monospace;
    outline: none;
  }
  .api-input:focus { border-color: var(--accent); }
  .api-save-btn {
    background: var(--accent);
    border: none;
    border-radius: 8px;
    padding: 10px 18px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    color: #0a0a0f;
    cursor: pointer;
  }

  /* Footer */
  .footer {
    text-align: center;
    padding: 40px 24px;
    border-top: 1px solid var(--border);
    color: var(--muted);
    font-size: 13px;
  }

  @media (max-width: 600px) {
    .style-options { grid-template-columns: repeat(3,1fr); }
    .recap-title { font-size: 38px; }
    .recap-header { flex-direction: column; }
  }
`;

// ---- Helpers ----
async function searchShows(query) {
  const url = `${TMDB_BASE}/search/tv?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("TMDB search failed");
  const data = await res.json();
  return data.results?.slice(0, 6) || [];
}

async function getSeasons(showId) {
  const url = `${TMDB_BASE}/tv/${showId}?api_key=${TMDB_API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch show details");
  const data = await res.json();
  return data.seasons?.filter(s => s.season_number > 0) || [];
}

async function getEpisodes(showId, seasonNumber) {
  const url = `${TMDB_BASE}/tv/${showId}/season/${seasonNumber}?api_key=${TMDB_API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) return [];
  const data = await res.json();
  return data.episodes || [];
}

// ---- Main App ----
export default function RecapAI() {
  const [phase, setPhase] = useState("search"); // search | configure | loading | recap
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [selectedShow, setSelectedShow] = useState(null);
  const [seasons, setSeasons] = useState([]);
  const [selectedSeasons, setSelectedSeasons] = useState([]);
  const [recapStyle, setRecapStyle] = useState("standard");
  const [includeVideo, setIncludeVideo] = useState(true);
  const [recapText, setRecapText] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState("");
  const [anthropicKey, setAnthropicKey] = useState(() => localStorage.getItem("recap_anthropic_key") || "");
  const [tmdbKey, setTmdbKey] = useState(() => localStorage.getItem("recap_tmdb_key") || TMDB_API_KEY);
  const [keyInputAnthropic, setKeyInputAnthropic] = useState("");
  const [keyInputTmdb, setKeyInputTmdb] = useState("");
  const recapRef = useRef(null);

  const effectiveTmdbKey = tmdbKey !== "YOUR_TMDB_API_KEY" ? tmdbKey : null;
  const needsSetup = !effectiveTmdbKey || !anthropicKey;

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    if (!effectiveTmdbKey) { setError("Please add your TMDB API key first."); return; }
    setSearching(true);
    setError("");
    setSearchResults([]);
    try {
      const apiKey = effectiveTmdbKey;
      const url = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${encodeURIComponent(searchQuery)}`;
      const res = await fetch(url);
      const data = await res.json();
      setSearchResults(data.results?.slice(0, 6) || []);
    } catch (e) {
      setError("Search failed. Check your TMDB API key.");
    } finally {
      setSearching(false);
    }
  };

  const handleSelectShow = async (show) => {
    setSelectedShow(show);
    setSelectedSeasons([]);
    const apiKey = effectiveTmdbKey;
    const url = `https://api.themoviedb.org/3/tv/${show.id}?api_key=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    setSeasons(data.seasons?.filter(s => s.season_number > 0) || []);
    setPhase("configure");
  };

  const toggleSeason = (num) => {
    setSelectedSeasons(prev =>
      prev.includes(num) ? prev.filter(n => n !== num) : [...prev, num]
    );
  };

  const handleGenerate = async () => {
    if (!anthropicKey) { setError("Please add your Anthropic API key."); return; }
    if (selectedSeasons.length === 0) { setError("Select at least one season."); return; }

    setPhase("loading");
    setRecapText("");
    setError("");

    // Gather episode data
    let episodeData = [];
    for (const sNum of selectedSeasons.sort()) {
      const apiKey = effectiveTmdbKey;
      const url = `https://api.themoviedb.org/3/tv/${selectedShow.id}/season/${sNum}?api_key=${apiKey}`;
      const res = await fetch(url);
      const data = await res.json();
      const eps = data.episodes || [];
      episodeData.push({
        season: sNum,
        episodes: eps.map(e => `S${sNum}E${e.episode_number}: ${e.name} — ${e.overview || "No description"}`)
      });
    }

    const styleMap = {
      quick: "concise 3-5 minute read focusing only on the most critical plot points and cliffhangers",
      standard: "comprehensive 7-10 minute read covering all major plot points, character arcs, and key events",
      deep: "thorough 5-7 minute read covering the most important plot points and character arcs only"
    };

    const prompt = `Generate a ${styleMap[recapStyle]} recap of ${selectedShow.name}.

Show: ${selectedShow.name}
First air date: ${selectedShow.first_air_date}
Seasons being recapped: ${selectedSeasons.sort().map(s => `Season ${s}`).join(", ")}

Episode data:
${episodeData.map(s => `\n**Season ${s.season}:**\n${s.episodes.join("\n")}`).join("\n\n")}

Please structure the recap as:
1. **Season Overview** — Brief intro to the season's main thrust
2. **Key Characters** — Who matters and their arcs
3. **Major Plot Points** — Chronological walkthrough of major events
4. **Season Ending & Cliffhangers** — How it ends, what's left unresolved
5. **What to Remember** — 3-5 bullet points of the most important things before watching the next season

Make it engaging and easy to read. Use **bold** for character names and important plot moments. Write as if you're a knowledgeable friend catching someone up before a premiere night.`;

    setPhase("recap");
    setStreaming(true);

    try {
      const response = await fetch("/api/anthropic/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": anthropicKey,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true"
        },
        body: JSON.stringify({
          model: "claude-opus-4-5",
          max_tokens: 1500,
          stream: true,
          messages: [{ role: "user", content: prompt }]
        })
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error?.message || "API error");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop();
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") continue;
            try {
              const json = JSON.parse(data);
              if (json.type === "content_block_delta" && json.delta?.text) {
                setRecapText(prev => prev + json.delta.text);
              }
            } catch {}
          }
        }
      }
    } catch (e) {
      // Fallback: non-streaming
      try {
        const response = await fetch("/api/anthropic/v1/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": anthropicKey,
            "anthropic-version": "2023-06-01"
          },
          body: JSON.stringify({
            model: "claude-sonnet-4-20250514",
            max_tokens: 1500,
            messages: [{ role: "user", content: prompt }]
          })
        });
        const data = await response.json();
        if (data.error) throw new Error(data.error.message);
        setRecapText(data.content?.[0]?.text || "No recap generated.");
      } catch (e2) {
        setError(e2.message || "Failed to generate recap.");
        setPhase("configure");
      }
    } finally {
      setStreaming(false);
    }
  };

  const saveKey = (type) => {
    if (type === "anthropic" && keyInputAnthropic) {
      localStorage.setItem("recap_anthropic_key", keyInputAnthropic);
      setAnthropicKey(keyInputAnthropic);
      setKeyInputAnthropic("");
    }
    if (type === "tmdb" && keyInputTmdb) {
      localStorage.setItem("recap_tmdb_key", keyInputTmdb);
      setTmdbKey(keyInputTmdb);
      setKeyInputTmdb("");
    }
  };

  const formatRecap = (text) => {
    if (!text) return null;
    const lines = text.split("\n");
    return lines.map((line, i) => {
      const bold = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
      return <p key={i} dangerouslySetInnerHTML={{ __html: bold || "&nbsp;" }} style={{ marginBottom: line ? "0.6em" : "0.2em" }} />;
    });
  };

  const ytQuery = selectedShow && selectedSeasons.length > 0
    ? `${selectedShow.name} season ${selectedSeasons.sort().join(" ")} recap`
    : "";

  return (
    <div className="app">
      <style>{styles}</style>

      {/* Hero */}
      {phase === "search" && (
        <div className="hero">
          <div className="hero-eyebrow">✦ AI-Powered ✦</div>
          <h1>RECAP<span>AI</span></h1>
          <p className="hero-sub">Never forget what happened. Catch up before every new season.</p>
        </div>
      )}

      {/* Setup Banner */}
      {needsSetup && (
        <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 24px 24px" }}>
          <div className="setup-banner">
            <strong>⚡ Setup Required</strong> — Add your API keys to get started.
            <div className="api-input-row">
              <input
                className="api-input"
                placeholder="TMDB API Key (themoviedb.org)"
                value={keyInputTmdb}
                onChange={e => setKeyInputTmdb(e.target.value)}
                onKeyDown={e => e.key === "Enter" && saveKey("tmdb")}
              />
              <button className="api-save-btn" onClick={() => saveKey("tmdb")}>Save</button>
            </div>
            <div className="api-input-row">
              <input
                className="api-input"
                placeholder="Anthropic API Key (console.anthropic.com)"
                value={keyInputAnthropic}
                onChange={e => setKeyInputAnthropic(e.target.value)}
                onKeyDown={e => e.key === "Enter" && saveKey("anthropic")}
              />
              <button className="api-save-btn" onClick={() => saveKey("anthropic")}>Save</button>
            </div>
            {(effectiveTmdbKey || anthropicKey) && (
              <p style={{ marginTop: 10, fontSize: 12, color: "var(--muted)" }}>
                ✓ {effectiveTmdbKey ? "TMDB key saved" : "TMDB key missing"} &nbsp;·&nbsp;
                {anthropicKey ? "Anthropic key saved" : "Anthropic key missing"}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Search Phase */}
      {phase === "search" && (
        <>
          <div className="search-section">
            <div className="search-wrap">
              <input
                className="search-input"
                placeholder="Search for a TV show..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSearch()}
              />
              <button className="search-btn" onClick={handleSearch} disabled={searching || !searchQuery.trim()}>
                {searching ? "..." : "SEARCH"}
              </button>
            </div>
            {error && <div className="error-box">{error}</div>}
          </div>

          {searchResults.length > 0 && (
            <div className="results">
              <p className="results-label">Results</p>
              {searchResults.map(show => (
                <div key={show.id} className="show-card" onClick={() => handleSelectShow(show)}>
                  {show.poster_path
                    ? <img className="show-thumb" src={`https://image.tmdb.org/t/p/w200${show.poster_path}`} alt={show.name} />
                    : <div className="show-thumb-placeholder">📺</div>
                  }
                  <div className="show-info">
                    <h3>{show.name}</h3>
                    <p>{show.first_air_date?.slice(0, 4)} · ⭐ {show.vote_average?.toFixed(1)}</p>
                    <p style={{ marginTop: 4, fontSize: 12, color: "var(--muted)" }}>{show.overview?.slice(0, 100)}{show.overview?.length > 100 ? "…" : ""}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Configure Phase */}
      {phase === "configure" && selectedShow && (
        <div className="config-section">
          <button className="config-back" onClick={() => { setPhase("search"); setError(""); }}>← Back to search</button>

          <div className="config-header">
            {selectedShow.poster_path
              ? <img className="config-poster" src={`https://image.tmdb.org/t/p/w200${selectedShow.poster_path}`} alt="" />
              : <div style={{ width: 60, height: 84, background: "var(--surface2)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>📺</div>
            }
            <div>
              <div className="config-title">{selectedShow.name}</div>
              <div className="config-meta">{selectedShow.first_air_date?.slice(0, 4)} · {seasons.length} seasons</div>
            </div>
          </div>

          <p className="section-label">Select Season(s)</p>
          <div className="seasons-grid">
            {seasons.map(s => (
              <button
                key={s.season_number}
                className={`season-pill ${selectedSeasons.includes(s.season_number) ? "selected" : ""}`}
                onClick={() => toggleSeason(s.season_number)}
              >
                Season {s.season_number}
              </button>
            ))}
          </div>

          <p className="section-label">Recap Style</p>
          <div className="style-options">
            {[
              { id: "quick", icon: "⚡", name: "Quick", desc: "3–5 min read" },
              { id: "standard", icon: "📖", name: "Standard", desc: "7–10 min read" },
              { id: "deep", icon: "🔍", name: "Deep Dive", desc: "15+ min read" },
            ].map(style => (
              <div
                key={style.id}
                className={`style-card ${recapStyle === style.id ? "selected" : ""}`}
                onClick={() => setRecapStyle(style.id)}
              >
                <div className="style-icon">{style.icon}</div>
                <div className="style-name">{style.name}</div>
                <div className="style-desc">{style.desc}</div>
              </div>
            ))}
          </div>

          <div className="video-toggle" onClick={() => setIncludeVideo(v => !v)}>
            <div className={`toggle-switch ${includeVideo ? "on" : ""}`}>
              <div className="toggle-knob" />
            </div>
            <div>
              <div className="toggle-label">🎥 Include Video Recap</div>
              <div className="toggle-sublabel">We'll find the best YouTube recap for you</div>
            </div>
          </div>

          {error && <div className="error-box">{error}</div>}

          <button
            className="generate-btn"
            onClick={handleGenerate}
            disabled={selectedSeasons.length === 0 || !anthropicKey}
          >
            {!anthropicKey ? "ADD ANTHROPIC KEY ABOVE" : selectedSeasons.length === 0 ? "SELECT A SEASON" : `GENERATE RECAP →`}
          </button>
        </div>
      )}

      {/* Loading */}
      {phase === "loading" && (
        <div className="loading-wrap">
          <div className="loading-spinner" />
          <div className="loading-title">Generating Your Recap</div>
          <p className="loading-sub">Analyzing {selectedSeasons.length > 1 ? `${selectedSeasons.length} seasons` : "1 season"} of {selectedShow?.name}…</p>
        </div>
      )}

      {/* Recap Phase */}
      {phase === "recap" && (
        <div className="recap-section" ref={recapRef}>
          <div className="recap-header">
            <div className="recap-title-block">
              <p className="recap-eyebrow">✦ Season Recap</p>
              <h1 className="recap-title">{selectedShow?.name}</h1>
              <p className="recap-subtitle">
                {selectedSeasons.sort().map(s => `Season ${s}`).join(", ")} · {recapStyle === "quick" ? "Quick" : recapStyle === "deep" ? "Deep Dive" : "Standard"} Recap
              </p>
            </div>
            <div className="recap-actions">
              <button className="action-btn" onClick={() => { setPhase("configure"); setRecapText(""); }}>← New Recap</button>
              <button className="action-btn" onClick={() => {
                const blob = new Blob([recapText], { type: "text/plain" });
                const a = document.createElement("a");
                a.href = URL.createObjectURL(blob);
                a.download = `${selectedShow?.name.replace(/\s+/g, "_")}_recap.txt`;
                a.click();
              }}>↓ Save</button>
            </div>
          </div>

          <hr className="recap-divider" />

          <div className={`recap-body ${streaming ? "streaming-cursor" : ""}`}>
            {formatRecap(recapText)}
          </div>

          {/* Video Section */}
          {includeVideo && !streaming && recapText && (
            <div className="video-section">
              <div className="video-section-title">
                🎬 Video <span>Recap</span>
              </div>
              <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 18 }}>
                Search YouTube for: <strong style={{ color: "var(--text)" }}>"{ytQuery}"</strong>
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a
                  href={`https://www.youtube.com/results?search_query=${encodeURIComponent(ytQuery + " official")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="action-btn"
                  style={{ textDecoration: "none", background: "rgba(255,77,109,0.1)", borderColor: "rgba(255,77,109,0.3)" }}
                >
                  🔴 Search on YouTube
                </a>
                <a
                  href={`https://www.youtube.com/results?search_query=${encodeURIComponent(selectedShow?.name + " " + selectedShow?.name?.toLowerCase().includes("season") ? "" : `season ${selectedSeasons[0]} recap`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="action-btn"
                  style={{ textDecoration: "none" }}
                >
                  📺 Browse Recaps
                </a>
              </div>
              <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 14 }}>
                Tip: Enable YouTube API integration in settings to embed videos directly.
              </p>
            </div>
          )}
        </div>
      )}

      <div className="footer">
        RecapAI — Built with React · TMDB API · Claude API &nbsp;·&nbsp; Never forget a plotline again.
      </div>
    </div>
  );
}
