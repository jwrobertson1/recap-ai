import { useState } from "react";

const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_KEY || "AIzaSyAM3ZDwDTu07JrTmdS5DsyRkpTJq-MhNY0";
const ENV_TMDB_KEY = process.env.REACT_APP_TMDB_KEY || "";
const ENV_ANTHROPIC_KEY = process.env.REACT_APP_ANTHROPIC_KEY || "";

const styles = `
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

  body { background: var(--bg); color: var(--text); font-family: 'DM Sans', sans-serif; min-height: 100vh; line-height: 1.6; }
  .app { min-height: 100vh; background: var(--bg); }

  .hero { position: relative; padding: 80px 24px 60px; text-align: center; overflow: hidden; }
  .hero::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 80% 50% at 50% 0%, rgba(232,255,71,0.08) 0%, transparent 70%); pointer-events: none; }
  .hero-eyebrow { display: inline-block; font-size: 11px; font-weight: 500; letter-spacing: 3px; text-transform: uppercase; color: var(--accent); border: 1px solid rgba(232,255,71,0.3); padding: 6px 14px; border-radius: 100px; margin-bottom: 28px; }
  .hero h1 { font-family: 'Bebas Neue', sans-serif; font-size: clamp(64px, 12vw, 120px); line-height: 0.9; letter-spacing: 2px; color: var(--text); margin-bottom: 8px; }
  .hero h1 span { color: var(--accent); }
  .hero-sub { font-size: 18px; color: var(--muted); font-weight: 300; max-width: 480px; margin: 20px auto 0; font-style: italic; }

  .search-section { max-width: 680px; margin: 0 auto; padding: 0 24px 60px; }
  .search-wrap { position: relative; display: flex; }
  .search-input { flex: 1; background: var(--surface); border: 1.5px solid var(--border); border-right: none; border-radius: var(--radius) 0 0 var(--radius); padding: 18px 22px; font-family: 'DM Sans', sans-serif; font-size: 16px; color: var(--text); outline: none; transition: border-color 0.2s; }
  .search-input::placeholder { color: var(--muted); }
  .search-input:focus { border-color: var(--accent); }
  .search-btn { background: var(--accent); border: 1.5px solid var(--accent); border-radius: 0 var(--radius) var(--radius) 0; padding: 18px 28px; font-family: 'Bebas Neue', sans-serif; font-size: 18px; letter-spacing: 1px; color: #0a0a0f; cursor: pointer; transition: background 0.2s; }
  .search-btn:hover { background: #d4eb3a; }
  .search-btn:disabled { opacity: 0.5; cursor: not-allowed; }

  .results { max-width: 680px; margin: 0 auto; padding: 0 24px; }
  .results-label { font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: var(--muted); margin-bottom: 12px; }
  .show-card { display: flex; align-items: center; gap: 16px; background: var(--surface); border: 1.5px solid var(--border); border-radius: var(--radius); padding: 14px; cursor: pointer; margin-bottom: 10px; transition: border-color 0.2s, background 0.2s; }
  .show-card:hover { border-color: var(--accent); background: var(--surface2); }
  .show-thumb { width: 52px; height: 72px; object-fit: cover; border-radius: 6px; flex-shrink: 0; }
  .show-thumb-placeholder { width: 52px; height: 72px; background: var(--surface2); border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 22px; flex-shrink: 0; }
  .show-info h3 { font-size: 15px; font-weight: 500; margin-bottom: 4px; }
  .show-info p { font-size: 13px; color: var(--muted); }

  .config-section { max-width: 680px; margin: 0 auto; padding: 40px 24px; animation: fadeUp 0.4s ease; }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  .config-header { display: flex; align-items: center; gap: 16px; margin-bottom: 32px; }
  .config-poster { width: 60px; height: 84px; object-fit: cover; border-radius: 8px; }
  .config-title { font-family: 'Bebas Neue', sans-serif; font-size: 36px; line-height: 1; }
  .config-meta { font-size: 13px; color: var(--muted); margin-top: 4px; }
  .config-back { background: var(--surface); border: 1.5px solid var(--border); color: var(--text); font-family: 'DM Sans', sans-serif; font-size: 15px; cursor: pointer; border-radius: 8px; margin-bottom: 24px; padding: 12px 22px; display: inline-flex; align-items: center; gap: 6px; transition: border-color 0.2s; }
  .config-back:hover { border-color: var(--accent); }

  .section-label { font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: var(--muted); margin-bottom: 12px; }
  .seasons-grid { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 32px; }
  .season-pill { background: var(--surface); border: 1.5px solid var(--border); border-radius: 100px; padding: 8px 18px; font-size: 14px; cursor: pointer; transition: all 0.2s; color: var(--text); font-family: 'DM Sans', sans-serif; }
  .season-pill:hover { border-color: var(--accent); }
  .season-pill.selected { background: var(--accent); border-color: var(--accent); color: #0a0a0f; font-weight: 500; }

  /* Recap Mode Toggle */
  .mode-toggle { display: flex; gap: 8px; margin-bottom: 24px; }
  .mode-btn { flex: 1; background: var(--surface); border: 1.5px solid var(--border); border-radius: var(--radius); padding: 14px; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500; color: var(--muted); cursor: pointer; transition: all 0.2s; text-align: center; }
  .mode-btn:hover { border-color: var(--accent); color: var(--text); }
  .mode-btn.active { border-color: var(--accent); background: rgba(232,255,71,0.05); color: var(--text); }
  .mode-btn .mode-icon { font-size: 20px; display: block; margin-bottom: 4px; }

  /* Episode Range */
  .episode-range { background: var(--surface); border: 1.5px solid var(--border); border-radius: var(--radius); padding: 20px; margin-bottom: 24px; animation: fadeUp 0.3s ease; }
  .episode-range-title { font-size: 13px; color: var(--muted); margin-bottom: 14px; }
  .episode-range-inputs { display: flex; align-items: center; gap: 12px; }
  .episode-range-inputs span { color: var(--muted); font-size: 14px; }
  .episode-num-input { background: var(--surface2); border: 1.5px solid var(--border); border-radius: 8px; padding: 10px 14px; font-family: 'DM Sans', sans-serif; font-size: 16px; color: var(--text); width: 80px; text-align: center; outline: none; transition: border-color 0.2s; }
  .episode-num-input:focus { border-color: var(--accent); }
  .episode-range-hint { font-size: 12px; color: var(--muted); margin-top: 10px; font-style: italic; }

  .style-options { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 32px; }
  .style-card { background: var(--surface); border: 1.5px solid var(--border); border-radius: var(--radius); padding: 16px 12px; cursor: pointer; text-align: center; transition: all 0.2s; }
  .style-card:hover { border-color: var(--accent); }
  .style-card.selected { border-color: var(--accent); background: rgba(232,255,71,0.05); }
  .style-card .style-icon { font-size: 22px; margin-bottom: 6px; }
  .style-card .style-name { font-size: 13px; font-weight: 500; }
  .style-card .style-desc { font-size: 11px; color: var(--muted); margin-top: 2px; }

  .video-toggle { display: flex; align-items: center; gap: 12px; padding: 16px 20px; background: var(--surface); border: 1.5px solid var(--border); border-radius: var(--radius); margin-bottom: 28px; cursor: pointer; transition: border-color 0.2s; }
  .video-toggle:hover { border-color: var(--accent); }
  .toggle-switch { width: 40px; height: 22px; background: var(--border); border-radius: 100px; position: relative; transition: background 0.2s; flex-shrink: 0; }
  .toggle-switch.on { background: var(--accent); }
  .toggle-knob { position: absolute; top: 3px; left: 3px; width: 16px; height: 16px; background: white; border-radius: 50%; transition: transform 0.2s; }
  .toggle-switch.on .toggle-knob { transform: translateX(18px); }
  .toggle-label { font-size: 14px; }
  .toggle-sublabel { font-size: 12px; color: var(--muted); }

  .generate-btn { width: 100%; background: var(--accent); border: none; border-radius: var(--radius); padding: 20px; font-family: 'Bebas Neue', sans-serif; font-size: 22px; letter-spacing: 2px; color: #0a0a0f; cursor: pointer; transition: background 0.2s; }
  .generate-btn:hover { background: #d4eb3a; }
  .generate-btn:disabled { opacity: 0.4; cursor: not-allowed; }

  .recap-section { max-width: 760px; margin: 0 auto; padding: 40px 24px 80px; animation: fadeUp 0.4s ease; }
  .recap-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 20px; margin-bottom: 36px; flex-wrap: wrap; }
  .recap-eyebrow { font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: var(--accent); margin-bottom: 8px; }
  .recap-title { font-family: 'Bebas Neue', sans-serif; font-size: 52px; line-height: 0.95; }
  .recap-subtitle { font-size: 14px; color: var(--muted); margin-top: 6px; }
  .recap-actions { display: flex; gap: 10px; flex-shrink: 0; margin-top: 8px; }
  .action-btn { background: var(--surface); border: 1.5px solid var(--border); border-radius: 8px; padding: 8px 14px; font-size: 13px; color: var(--text); cursor: pointer; font-family: 'DM Sans', sans-serif; transition: border-color 0.2s; display: flex; align-items: center; gap: 6px; text-decoration: none; }
  .action-btn:hover { border-color: var(--accent); }

  .recap-divider { border: none; height: 1px; background: var(--border); margin: 32px 0; }
  .recap-body { font-size: 16px; line-height: 1.85; color: #d0d0e0; }
  .streaming-cursor::after { content: '▋'; animation: blink 0.8s infinite; color: var(--accent); margin-left: 2px; }
  @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

  .video-section { margin-bottom: 8px; }
  .video-section-title { font-family: 'Bebas Neue', sans-serif; font-size: 28px; margin-bottom: 18px; display: flex; align-items: center; gap: 10px; }
  .video-section-title span { color: var(--accent2); }
  .video-tabs { display: flex; gap: 8px; margin-bottom: 16px; flex-wrap: wrap; }
  .video-tab { background: var(--surface); border: 1.5px solid var(--border); border-radius: 8px; padding: 8px 14px; font-size: 12px; color: var(--muted); cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.2s; max-width: 240px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .video-tab:hover { border-color: var(--accent); color: var(--text); }
  .video-tab.active { border-color: var(--accent2); color: var(--text); background: rgba(255,77,109,0.08); }
  .video-embed { aspect-ratio: 16/9; width: 100%; border-radius: var(--radius); border: 1.5px solid var(--border); background: var(--surface); overflow: hidden; }
  .video-embed iframe { width: 100%; height: 100%; border: none; }
  .video-source { font-size: 12px; color: var(--muted); margin-top: 8px; }

  .loading-wrap { text-align: center; padding: 60px 24px; max-width: 480px; margin: 0 auto; }
  .loading-spinner { width: 48px; height: 48px; border: 3px solid var(--border); border-top-color: var(--accent); border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 24px; }
  @keyframes spin { to { transform: rotate(360deg); } }
  .loading-title { font-family: 'Bebas Neue', sans-serif; font-size: 32px; margin-bottom: 8px; }
  .loading-sub { font-size: 14px; color: var(--muted); font-style: italic; }

  .error-box { background: rgba(255,77,109,0.1); border: 1.5px solid rgba(255,77,109,0.3); border-radius: var(--radius); padding: 16px 20px; font-size: 14px; color: #ff9aac; margin-top: 16px; }

  .setup-banner { background: rgba(232,255,71,0.06); border: 1.5px solid rgba(232,255,71,0.2); border-radius: var(--radius); padding: 20px 24px; margin-bottom: 32px; font-size: 14px; }
  .setup-banner strong { color: var(--accent); }
  .api-input-row { display: flex; gap: 10px; margin-top: 12px; flex-wrap: wrap; }
  .api-input { flex: 1; min-width: 200px; background: var(--surface); border: 1.5px solid var(--border); border-radius: 8px; padding: 10px 14px; font-size: 13px; color: var(--text); font-family: monospace; outline: none; }
  .api-input:focus { border-color: var(--accent); }
  .api-save-btn { background: var(--accent); border: none; border-radius: 8px; padding: 10px 18px; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; color: #0a0a0f; cursor: pointer; }

  .footer { text-align: center; padding: 40px 24px; border-top: 1px solid var(--border); color: var(--muted); font-size: 13px; }
`;

export default function RecapAI() {
  const [phase, setPhase] = useState("search");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [selectedShow, setSelectedShow] = useState(null);
  const [seasons, setSeasons] = useState([]);
  const [selectedSeasons, setSelectedSeasons] = useState([]);
  const [recapMode, setRecapMode] = useState("season"); // "season" | "episode"
  const [episodeFrom, setEpisodeFrom] = useState(1);
  const [episodeTo, setEpisodeTo] = useState(3);
  const [episodeSeason, setEpisodeSeason] = useState(1);
  const [recapStyle, setRecapStyle] = useState("standard");
  const [includeVideo, setIncludeVideo] = useState(true);
  const [recapText, setRecapText] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState("");
  const [youtubeVideos, setYoutubeVideos] = useState([]);
  const [activeVideo, setActiveVideo] = useState(0);
  const [recapLabel, setRecapLabel] = useState("");
  const [anthropicKey, setAnthropicKey] = useState(() => ENV_ANTHROPIC_KEY || localStorage.getItem("recap_anthropic_key") || "");
  const [tmdbKey, setTmdbKey] = useState(() => ENV_TMDB_KEY || localStorage.getItem("recap_tmdb_key") || "");
  const [keyInputAnthropic, setKeyInputAnthropic] = useState("");
  const [keyInputTmdb, setKeyInputTmdb] = useState("");

  const needsSetup = (!tmdbKey || !anthropicKey) && (!ENV_TMDB_KEY || !ENV_ANTHROPIC_KEY);

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

  const handleSearch = async () => {
    if (!searchQuery.trim() || !tmdbKey) return;
    setSearching(true);
    setError("");
    setSearchResults([]);
    try {
      const res = await fetch(`https://api.themoviedb.org/3/search/tv?api_key=${tmdbKey}&query=${encodeURIComponent(searchQuery)}`);
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
    const res = await fetch(`https://api.themoviedb.org/3/tv/${show.id}?api_key=${tmdbKey}`);
    const data = await res.json();
    const filteredSeasons = data.seasons?.filter(s => s.season_number > 0) || [];
    setSeasons(filteredSeasons);
    if (filteredSeasons.length > 0) setEpisodeSeason(filteredSeasons[0].season_number);
    setPhase("configure");
  };

  const toggleSeason = (num) => {
    setSelectedSeasons(prev => prev.includes(num) ? prev.filter(n => n !== num) : [...prev, num]);
  };

  const fetchYoutubeVideos = async (query) => {
    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=3&videoDuration=medium&key=${YOUTUBE_API_KEY}`
      );
      const data = await res.json();
      setYoutubeVideos(data.items || []);
      setActiveVideo(0);
    } catch (e) {
      setYoutubeVideos([]);
    }
  };

  const handleGenerate = async () => {
    const isEpisodeMode = recapMode === "episode";
    if (!anthropicKey) return;
    if (!isEpisodeMode && selectedSeasons.length === 0) { setError("Select at least one season."); return; }

    setPhase("loading");
    setRecapText("");
    setYoutubeVideos([]);
    setError("");

    let prompt = "";
    let label = "";

    if (isEpisodeMode) {
      // Episode range mode
      const seasonNum = episodeSeason;
      const fromEp = Math.max(1, episodeFrom);
      const toEp = Math.max(fromEp, episodeTo);
      label = `Season ${seasonNum}, Episodes ${fromEp}–${toEp}`;

      const res = await fetch(`https://api.themoviedb.org/3/tv/${selectedShow.id}/season/${seasonNum}?api_key=${tmdbKey}`);
      const data = await res.json();
      const eps = (data.episodes || []).filter(e => e.episode_number >= fromEp && e.episode_number <= toEp);
      const epList = eps.map(e => `E${e.episode_number}: ${e.name}${e.overview ? ` — ${e.overview}` : ""}`).join("\n");

      if (includeVideo) fetchYoutubeVideos(`${selectedShow.name} season ${seasonNum} episode ${fromEp} recap`);

      prompt = `You are recapping specific episodes of a TV show. Use the episode data provided below and your general knowledge of the show.

Generate a clear recap of ${selectedShow.name} Season ${seasonNum}, Episodes ${fromEp} through ${toEp}.

Episodes:
${epList}

Structure:
1. **What Happened** — chronological walkthrough of key events across these episodes
2. **Character Moments** — important character developments
3. **Where Things Stand** — state of affairs after episode ${toEp}

Keep it concise and focused. Use **bold** for character names and key moments.`;

    } else {
      // Full season mode
      label = selectedSeasons.sort().map(s => `Season ${s}`).join(", ");
      if (includeVideo) fetchYoutubeVideos(`${selectedShow.name} season ${selectedSeasons.sort().join(" ")} recap`);

      let episodeData = [];
      for (const sNum of selectedSeasons.sort()) {
        const res = await fetch(`https://api.themoviedb.org/3/tv/${selectedShow.id}/season/${sNum}?api_key=${tmdbKey}`);
        const data = await res.json();
        const eps = data.episodes || [];
        episodeData.push({ season: sNum, episodes: eps.map(e => `S${sNum}E${e.episode_number}: ${e.name}`) });
      }

      const styleMap = {
        quick: "a concise summary with only the most critical plot points (keep it under 300 words)",
        standard: "a clear recap covering main plot points, key character arcs, and the season ending (keep it under 600 words)",
        deep: "a thorough recap covering all major subplots and character development (keep it under 1000 words)"
      };

      prompt = `You are recapping a TV show using ONLY the episode data provided below. Do not say you lack information — use the episode titles and your general knowledge of the show to generate the recap. If the show is recent, make your best effort using the episode titles as a guide.

Generate ${styleMap[recapStyle]} for ${selectedShow.name} ${label}.

Episodes: ${episodeData.map(s => `Season ${s.season}: ${s.episodes.join(", ")}`).join(" | ")}

Use this structure:
1. **Season Overview** — 2-3 sentences
2. **Key Characters** — brief notes on main characters
3. **Major Plot Points** — most important events
4. **Season Ending** — how it ends and cliffhangers
5. **Remember Before Next Season** — 3 bullet points

Use **bold** for character names and key moments.`;
    }

    setRecapLabel(label);
    setPhase("recap");
    setStreaming(true);

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": anthropicKey,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true"
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1500,
          stream: true,
          messages: [{ role: "user", content: prompt }]
        })
      });

      if (!response.ok) throw new Error("API error");

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
      try {
        const response = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": anthropicKey,
            "anthropic-version": "2023-06-01",
            "anthropic-dangerous-direct-browser-access": "true"
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

  const formatRecap = (text) => {
    if (!text) return null;
    return text.split("\n").map((line, i) => {
      const html = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
      return <p key={i} dangerouslySetInnerHTML={{ __html: html || "&nbsp;" }} style={{ marginBottom: line ? "0.6em" : "0.2em" }} />;
    });
  };

  const canGenerate = recapMode === "episode"
    ? !!anthropicKey
    : selectedSeasons.length > 0 && !!anthropicKey;

  return (
    <div className="app">
      <style>{styles}</style>

      {phase === "search" && (
        <div className="hero">
          <div className="hero-eyebrow">✦ AI-Powered ✦</div>
          <h1>RECAP<span>AI</span></h1>
          <p className="hero-sub">Never forget what happened. Catch up before every new season.</p>
        </div>
      )}

      {needsSetup && (
        <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 24px 24px" }}>
          <div className="setup-banner">
            <strong>⚡ Setup Required</strong> — Add your API keys to get started.
            <div className="api-input-row">
              <input className="api-input" placeholder="TMDB API Key" value={keyInputTmdb} onChange={e => setKeyInputTmdb(e.target.value)} onKeyDown={e => e.key === "Enter" && saveKey("tmdb")} />
              <button className="api-save-btn" onClick={() => saveKey("tmdb")}>Save</button>
            </div>
            <div className="api-input-row">
              <input className="api-input" placeholder="Anthropic API Key" value={keyInputAnthropic} onChange={e => setKeyInputAnthropic(e.target.value)} onKeyDown={e => e.key === "Enter" && saveKey("anthropic")} />
              <button className="api-save-btn" onClick={() => saveKey("anthropic")}>Save</button>
            </div>
            {(tmdbKey || anthropicKey) && (
              <p style={{ marginTop: 10, fontSize: 12, color: "var(--muted)" }}>
                ✓ {tmdbKey ? "TMDB saved" : "TMDB missing"} · {anthropicKey ? "Anthropic saved" : "Anthropic missing"}
              </p>
            )}
          </div>
        </div>
      )}

      {phase === "search" && (
        <>
          <div className="search-section">
            <div className="search-wrap">
              <input className="search-input" placeholder="Search for a TV show..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSearch()} />
              <button className="search-btn" onClick={handleSearch} disabled={searching || !searchQuery.trim()}>{searching ? "..." : "SEARCH"}</button>
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
                    : <div className="show-thumb-placeholder">📺</div>}
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

      {phase === "configure" && selectedShow && (
        <div className="config-section">
          <button className="config-back" onClick={() => { setPhase("search"); setError(""); }}>← Back to search</button>
          <div className="config-header">
            {selectedShow.poster_path
              ? <img className="config-poster" src={`https://image.tmdb.org/t/p/w200${selectedShow.poster_path}`} alt="" />
              : <div style={{ width: 60, height: 84, background: "var(--surface2)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>📺</div>}
            <div>
              <div className="config-title">{selectedShow.name}</div>
              <div className="config-meta">{selectedShow.first_air_date?.slice(0, 4)} · {seasons.length} seasons</div>
            </div>
          </div>

          {/* MODE TOGGLE */}
          <p className="section-label">Recap Type</p>
          <div className="mode-toggle">
            <div className={`mode-btn ${recapMode === "season" ? "active" : ""}`} onClick={() => setRecapMode("season")}>
              <span className="mode-icon">📺</span>
              Full Season
            </div>
            <div className={`mode-btn ${recapMode === "episode" ? "active" : ""}`} onClick={() => setRecapMode("episode")}>
              <span className="mode-icon">😴</span>
              Episode Range
            </div>
          </div>

          {/* SEASON MODE */}
          {recapMode === "season" && (
            <>
              <p className="section-label">Select Season(s)</p>
              <div className="seasons-grid">
                {seasons.map(s => (
                  <button key={s.season_number} className={`season-pill ${selectedSeasons.includes(s.season_number) ? "selected" : ""}`} onClick={() => toggleSeason(s.season_number)}>
                    Season {s.season_number}
                  </button>
                ))}
              </div>

              <p className="section-label">Recap Style</p>
              <div className="style-options">
                {[
                  { id: "quick", icon: "⚡", name: "Quick", desc: "~300 words" },
                  { id: "standard", icon: "📖", name: "Standard", desc: "~600 words" },
                  { id: "deep", icon: "🔍", name: "Deep Dive", desc: "~1000 words" },
                ].map(style => (
                  <div key={style.id} className={`style-card ${recapStyle === style.id ? "selected" : ""}`} onClick={() => setRecapStyle(style.id)}>
                    <div className="style-icon">{style.icon}</div>
                    <div className="style-name">{style.name}</div>
                    <div className="style-desc">{style.desc}</div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* EPISODE RANGE MODE */}
          {recapMode === "episode" && (
            <>
              <p className="section-label">Select Season</p>
              <div className="seasons-grid" style={{ marginBottom: 20 }}>
                {seasons.map(s => (
                  <button key={s.season_number} className={`season-pill ${episodeSeason === s.season_number ? "selected" : ""}`} onClick={() => setEpisodeSeason(s.season_number)}>
                    Season {s.season_number}
                  </button>
                ))}
              </div>

              <div className="episode-range">
                <p className="episode-range-title">Which episodes do you need to catch up on?</p>
                <div className="episode-range-inputs">
                  <span>Episodes</span>
                  <input
                    className="episode-num-input"
                    type="number"
                    min="1"
                    value={episodeFrom}
                    onChange={e => setEpisodeFrom(parseInt(e.target.value) || 1)}
                  />
                  <span>through</span>
                  <input
                    className="episode-num-input"
                    type="number"
                    min="1"
                    value={episodeTo}
                    onChange={e => setEpisodeTo(parseInt(e.target.value) || 1)}
                  />
                </div>
                <p className="episode-range-hint">e.g. fell asleep during episodes 4–6? Enter 4 and 6.</p>
              </div>
            </>
          )}

          <div className="video-toggle" onClick={() => setIncludeVideo(v => !v)}>
            <div className={`toggle-switch ${includeVideo ? "on" : ""}`}><div className="toggle-knob" /></div>
            <div>
              <div className="toggle-label">🎥 Include Video Recap</div>
              <div className="toggle-sublabel">We'll find and embed the best YouTube recap</div>
            </div>
          </div>

          {error && <div className="error-box">{error}</div>}

          <button className="generate-btn" onClick={handleGenerate} disabled={!canGenerate}>
            {!anthropicKey ? "ADD ANTHROPIC KEY ABOVE" : !canGenerate ? "SELECT A SEASON" : "GENERATE RECAP →"}
          </button>
        </div>
      )}

      {phase === "loading" && (
        <div className="loading-wrap">
          <div className="loading-spinner" />
          <div className="loading-title">Generating Your Recap</div>
          <p className="loading-sub">Analyzing {selectedShow?.name}…</p>
        </div>
      )}

      {phase === "recap" && (
        <div className="recap-section">
          <div className="recap-header">
            <div>
              <p className="recap-eyebrow">✦ {recapMode === "episode" ? "Episode Recap" : "Season Recap"}</p>
              <h1 className="recap-title">{selectedShow?.name}</h1>
              <p className="recap-subtitle">{recapLabel} · {recapMode === "episode" ? "Episode Range" : recapStyle === "quick" ? "Quick" : recapStyle === "deep" ? "Deep Dive" : "Standard"}</p>
            </div>
            <div className="recap-actions">
              <button className="action-btn" onClick={() => { setPhase("configure"); setRecapText(""); setYoutubeVideos([]); }}>← New Recap</button>
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

          {includeVideo && (
            <div className="video-section">
              <div className="video-section-title">🎬 Video <span>Recap</span></div>
              {youtubeVideos.length > 0 ? (
                <>
                  <div className="video-tabs">
                    {youtubeVideos.map((v, i) => (
                      <button key={v.id.videoId} className={`video-tab ${activeVideo === i ? "active" : ""}`} onClick={() => setActiveVideo(i)}>
                        {v.snippet.title.slice(0, 50)}{v.snippet.title.length > 50 ? "…" : ""}
                      </button>
                    ))}
                  </div>
                  <div className="video-embed">
                    <iframe src={`https://www.youtube.com/embed/${youtubeVideos[activeVideo]?.id.videoId}`} allowFullScreen title={youtubeVideos[activeVideo]?.snippet.title} />
                  </div>
                  <p className="video-source">📺 {youtubeVideos[activeVideo]?.snippet.channelTitle}</p>
                </>
              ) : (
                <p style={{ color: "var(--muted)", fontSize: 14, fontStyle: "italic", marginBottom: 8 }}>
                  {streaming ? "Finding videos…" : "No videos found."}
                </p>
              )}
            </div>
          )}

          <hr className="recap-divider" />

          <div className={`recap-body ${streaming ? "streaming-cursor" : ""}`}>
            {formatRecap(recapText)}
          </div>
        </div>
      )}

      <div className="footer">
        RecapAI — React · TMDB · Claude · YouTube &nbsp;·&nbsp; Never forget a plotline again.
      </div>
    </div>
  );
}
