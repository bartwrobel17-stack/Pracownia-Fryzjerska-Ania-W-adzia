import Link from "next/link";
import { list } from "@vercel/blob";

async function getGallery() {
  try {
    const { blobs } = await list({ prefix: "gallery/" });
    return blobs
      .filter((blob) => /\.(jpg|jpeg|png|webp|gif)$/i.test(blob.pathname))
      .sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
  } catch {
    return [];
  }
}

export default async function Home() {
  const gallery = await getGallery();

  return (
    <>
      <div className="top">✦ KAMERALNA PRACOWNIA FRYZJERSKA WE WROCŁAWIU ✦</div>
      <header>
        <a className="brand" href="#top"><b>A<span>&</span>W</b><strong>Ania&Władzia<small>PRACOWNIA FRYZJERSKA</small></strong></a>
        <nav><a href="#o-nas">O pracowni</a><a href="#oferta">Oferta</a><a href="#galeria">Galeria</a><a href="#opinie">Opinie</a><a href="#kontakt">Kontakt</a></nav>
        <a className="call" href="tel:+48713489455">Zadzwoń</a>
      </header>

      <main id="top">
        <section className="hero">
          <div className="copy">
            <label>WROCŁAW · BISKUPIN</label>
            <h1>Włosy, w których<br/><em>czujesz się sobą.</em></h1>
            <p>Kameralna pracownia, w której liczy się dobre cięcie, uważność i atmosfera. Bez pośpiechu. Po prostu dobrze.</p>
            <div className="actions"><a className="btn dark" href="tel:+48713489455">Umów wizytę ↗</a><a href="#kontakt">Jak do nas trafić ↓</a></div>
            <div className="stats"><div><b>4,5/5</b><small>81 opinii w Google</small></div><div><b>45 min</b><small>orientacyjny czas usługi</small></div><div><b>60 zł*</b><small>strzyżenie męskie</small></div></div>
          </div>
          <div className="visual"><div className="portrait"><span>ANW<small>EST. WROCŁAW</small></span></div><div className="note">✂ <b>Mała pracownia.<br/>Dużo uwagi.</b></div><div className="stamp">DOBRY<br/>KRÓJ<br/>LEPSZY<br/>NASTRÓJ</div></div>
        </section>

        <div className="marquee">STRZYŻENIE <i>✦</i> KOLORYZACJA <i>✦</i> STYLIZACJA <i>✦</i> PIELĘGNACJA <i>✦</i> DOBRY KLIMAT <i>✦</i> STRZYŻENIE <i>✦</i> KOLORYZACJA <i>✦</i></div>

        <section id="o-nas" className="section"><label>01 / O PRACOWNI</label><div className="two"><h2>Dwie osoby,<br/><em>jedna pracownia.</em></h2><div><p className="lead">Ania&Władzia to miejsce dla tych, którzy lubią, kiedy fryzjer słucha. Tworzymy kameralną przestrzeń, w której można spokojnie porozmawiać o tym, czego naprawdę potrzebują Twoje włosy.</p><p>Salon mieści się przy ul. Marcelego Bacciarellego 17 we Wrocławiu. Dostępne informacje wskazują na ocenę 4,5/5 na podstawie 81 opinii.</p><a className="link" href="#kontakt">Poznaj pracownię ↗</a></div></div></section>

        <section id="oferta" className="section services"><div className="heading"><div><label>02 / CO ROBIMY</label><h2>Usługi bez<br/><em>kombinowania.</em></h2></div><p>Zakres i cena usługi są ustalane indywidualnie. Zadzwoń, aby potwierdzić aktualną ofertę.</p></div><div className="cards"><article><small>01</small><h3>Strzyżenie</h3><p>Dobre cięcie dopasowane do włosów, kształtu fryzury i Twojego stylu.</p><b>Zapytaj o cenę ↗</b></article><article className="accent"><small>02</small><h3>Koloryzacja</h3><p>Odświeżenie koloru i zmiana, która ma wyglądać dobrze także po wyjściu z salonu.</p><b>Zapytaj o cenę ↗</b></article><article><small>03</small><h3>Stylizacja</h3><p>Fryzura na co dzień, ważne wyjście albo po prostu dzień, w którym chcesz wyglądać świetnie.</p><b>Zapytaj o cenę ↗</b></article></div><p className="fine">* Informacja o cenie około 60 zł pochodzi z opinii klienta z sierpnia 2025. Aktualną cenę najlepiej potwierdzić telefonicznie.</p></section>

        <section id="galeria" className="section gallery-section">
          <div className="heading"><div><label>03 / GALERIA</label><h2>Nasza pracownia,<br/><em>nasze realizacje.</em></h2></div><p>Zdjęcia salonu i efektów pracy. Galerię można aktualizować z panelu właściciela.</p></div>
          {gallery.length ? <div className="gallery-grid">{gallery.map((photo) => <a className="gallery-item" href={photo.url} target="_blank" rel="noreferrer" key={photo.url}><img src={photo.url} alt="Pracownia Fryzjerska Ania&Władzia" loading="lazy"/></a>)}</div> : <div className="gallery-empty"><span>✦</span><p>Galeria wkrótce</p><small>Pierwsze zdjęcia dodasz w panelu właściciela.</small></div>}
        </section>

        <section className="quote"><span>“</span><blockquote>Estetyczny wygląd salonu. Udało się skorzystać ze strzyżenia bez kolejki.</blockquote><small>— opinia klienta w Google</small></section>

        <section id="opinie" className="section"><div className="heading"><div><label>04 / GŁOS KLIENTÓW</label><h2>Nie musimy<br/><em>mówić za siebie.</em></h2></div><div className="rating"><b>4,5</b><span>★★★★★</span><small>81 opinii</small></div></div><div className="reviews"><article><span>★★★★★</span><p>„Estetyczny wygląd salonu. Udało się skorzystać ze strzyżenia bez kolejki. Cała usługa około 45 minut.”</p><small>Hubert M. · lokalny przewodnik</small></article><article><span>★★★★★</span><p>„Komunikacja z panią fryzjerką bez kłopotu :)”</p><small>fragment opinii Google</small></article><article><span>★★★★★</span><p>„Cena strzyżenia męskiego ... około 60 zł.”</p><small>opinia z sierpnia 2025</small></article></div></section>

        <section id="kontakt" className="section contact"><div className="contactbox"><div><label>05 / ZNAJDŹ NAS</label><h2>Wpadnij na<br/><em>dobrą fryzurę.</em></h2><p className="address">ul. Marcelego Bacciarellego 17<br/>51-649 Wrocław</p><div className="actions"><a className="btn dark" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=Marcelego+Bacciarellego+17%2C+51-649%20Wroc%C5%82aw">Wyznacz trasę ↗</a><a className="btn light" href="tel:+48713489455">71 348 94 55</a></div><p className="fine lighttext">Godziny otwarcia warto sprawdzić przed wizytą, ponieważ mogą się zmieniać.</p></div><div className="map"><iframe title="Mapa dojazdu" src="https://www.google.com/maps?q=Marcelego%20Bacciarellego%2017,%2051-649%20Wroc%C5%82aw&output=embed" loading="lazy"></iframe><b>ANIA<br/>&<br/>WŁADZIA</b></div></div></section>
      </main>
      <footer><a className="brand" href="#top"><b>A<span>&</span>W</b><strong>Ania&Władzia<small>PRACOWNIA FRYZJERSKA</small></strong></a><span>Marcelego Bacciarellego 17 · Wrocław</span><a href="tel:+48713489455">71 348 94 55</a><Link href="/admin">Panel właściciela</Link><small>© 2026</small></footer>
    </>
  );
}
