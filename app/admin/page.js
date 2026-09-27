"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [logged, setLogged] = useState(false);
  const [password, setPassword] = useState("");
  const [photos, setPhotos] = useState([]);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  async function load() {
    const r = await fetch("/api/gallery", { cache: "no-store" });
    if (r.ok) {
      const data = await r.json();
      setPhotos(data.blobs || []);
      setLogged(true);
    }
  }

  useEffect(() => { load(); }, []);

  async function login(e) {
    e.preventDefault();
    setBusy(true); setMessage("");
    const r = await fetch("/api/login", { method: "POST", headers: {"content-type":"application/json"}, body: JSON.stringify({ password }) });
    if (r.ok) { setLogged(true); setPassword(""); await load(); }
    else setMessage("Nieprawidłowe hasło.");
    setBusy(false);
  }

  async function upload(e) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setBusy(true); setMessage("");
    for (const file of files) {
      const form = new FormData();
      form.append("file", file);
      const r = await fetch("/api/gallery", { method: "POST", body: form });
      if (!r.ok) { setMessage("Nie udało się dodać któregoś zdjęcia."); break; }
    }
    await load();
    setBusy(false);
    e.target.value = "";
  }

  async function remove(url) {
    if (!confirm("Usunąć to zdjęcie z galerii?")) return;
    setBusy(true);
    const r = await fetch("/api/gallery", { method: "DELETE", headers: {"content-type":"application/json"}, body: JSON.stringify({ url }) });
    if (r.ok) await load(); else setMessage("Nie udało się usunąć zdjęcia.");
    setBusy(false);
  }

  if (!logged) return <main className="admin"><div className="admin-card"><a className="admin-back" href="/">← Wróć na stronę</a><h1>Panel właściciela</h1><p>Galeria Ania&Władzia</p><form onSubmit={login}><label>Hasło<input type="password" value={password} onChange={e=>setPassword(e.target.value)} autoFocus required/></label><button disabled={busy}>{busy ? "Sprawdzam…" : "Zaloguj"}</button></form>{message && <div className="admin-message">{message}</div>}</div></main>;

  return <main className="admin"><div className="admin-wrap"><div className="admin-head"><div><a className="admin-back" href="/">← Wróć na stronę</a><h1>Galeria</h1><p>Dodawaj zdjęcia salonu i realizacji.</p></div><a className="admin-site" href="/">Podgląd strony ↗</a></div><label className="upload"><input type="file" accept="image/jpeg,image/png,image/webp,image/gif" multiple onChange={upload} disabled={busy}/><strong>{busy ? "Przetwarzanie…" : "＋ Dodaj zdjęcia"}</strong><span>JPG, PNG, WEBP lub GIF</span></label>{message && <div className="admin-message">{message}</div>}<div className="admin-grid">{photos.map(p=><div className="admin-photo" key={p.url}><img src={p.url} alt="Zdjęcie galerii"/><button onClick={()=>remove(p.url)} disabled={busy}>Usuń</button></div>)}</div>{!photos.length && <div className="admin-empty">Brak zdjęć. Dodaj pierwsze powyżej.</div>}</div></main>;
}
