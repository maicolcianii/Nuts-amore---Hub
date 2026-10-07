import React, { useEffect, useState } from 'react';

const LINKS = {
  recipeBook: "https://recipebook.nutsamore.com/",
  site: "https://nutsamore.com",
  es: {
    store: "https://www.dia.es/chocolates-y-golosinas/cremas-de-cacao-y-de-untar/nuts-amore/c/1m2sF10rs",
    avellanasDatiles: "https://www.dia.es/chocolates-y-golosinas/cremas-de-cacao-y-de-untar/p/306417",
    anacardosCoco:    "https://www.dia.es/chocolates-y-golosinas/cremas-de-cacao-y-de-untar/p/306416",
    mangoAlmendras:   "https://www.dia.es/chocolates-y-golosinas/cremas-de-cacao-y-de-untar/p/311563"
  },
  be: {
    brownAlmond:      "https://www.colruyt.be/fr/produits/39557",
    pistachioAlmond:  "https://www.colruyt.be/fr/produits/39563",
    hazelnutDate:     "https://www.colruyt.be/fr/produits/6911"
  }
};

const ArrowIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const DownloadIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 4v12M6 11l6 6 6-6M5 20h14" />
  </svg>
);

export default function App() {
  const [country, setCountry] = useState<'es' | 'be'>('es');
  const [logoSrc, setLogoSrc] = useState('public/nutsamorelogo.svg');

  useEffect(() => {
    try {
      const q = new URLSearchParams(window.location.search).get('c');
      if (q === 'be' || q === 'es') {
        setCountry(q);
      } else {
        const saved = localStorage.getItem('na-country');
        if (saved === 'be' || saved === 'es') {
          setCountry(saved);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const handleCountryChange = (c: 'es' | 'be') => {
    setCountry(c);
    document.documentElement.lang = c === 'es' ? 'es' : 'fr';
    try {
      localStorage.setItem('na-country', c);
    } catch {
      // ignore
    }
  };

  const handleImageFallback = (e: React.SyntheticEvent<HTMLImageElement, Event>, fallbackSrc: string) => {
    const target = e.currentTarget;
    if (target.src !== fallbackSrc && !target.dataset.triedFallback) {
      target.dataset.triedFallback = 'true';
      target.src = fallbackSrc;
    }
  };

  return (
    <main>
      <img
        className="logo-main"
        src={logoSrc}
        alt="Nut’s Amore"
        onError={() => {
          if (logoSrc === 'public/nutsamorelogo.svg') setLogoSrc('nutsamorelogo.svg');
          else if (logoSrc === 'nutsamorelogo.svg') setLogoSrc('public/nutsamorelogo.webp');
          else if (logoSrc === 'public/nutsamorelogo.webp') setLogoSrc('nutsamorelogo.webp');
        }}
      />

      <h1 className="hero-title">
        Made with Love.<br />Made with Nuts.
      </h1>

      <p className="sub-title">
        {country === 'es' ? 'Elige tu país' : 'Choisissez votre pays · Kies uw land'}
      </p>

      <div className="switch-group" role="group" aria-label="País · Pays · Land">
        <button
          type="button"
          className={`switch-btn ${country === 'es' ? 'active' : ''}`}
          aria-pressed={country === 'es'}
          onClick={() => handleCountryChange('es')}
        >
          <span className="flag f-es" />
          España
        </button>
        <button
          type="button"
          className={`switch-btn ${country === 'be' ? 'active' : ''}`}
          aria-pressed={country === 'be'}
          onClick={() => handleCountryChange('be')}
        >
          <span className="flag f-be" />
          Belgique · België
        </button>
      </div>

      {country === 'es' ? (
        <section id="p-es">
          <div className="btns">
            <a
              className="btn-item b-green"
              href={LINKS.es.store}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>
                Comprar en{' '}
                <img
                  src="public/logo dia.svg"
                  onError={(e) => handleImageFallback(e, 'logo dia.svg')}
                  alt="DIA"
                  style={{ height: '1.2em', verticalAlign: 'middle', marginLeft: '4px' }}
                />
              </span>
              <ArrowIcon />
            </a>

            <a
              className="btn-item b-brown"
              href={LINKS.recipeBook}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>
                Descarga el recetario
                <small>Gratis · recetas fáciles con nuestras cremas</small>
              </span>
              <DownloadIcon />
            </a>

            <a
              className="btn-item b-line"
              href={LINKS.site}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visita nutsamore.com
              <ArrowIcon />
            </a>
          </div>

          <h2 className="section-title">
            Nuestras cremas en{' '}
            <img
              src="public/logo dia.svg"
              onError={(e) => handleImageFallback(e, 'logo dia.svg')}
              alt="DIA"
              style={{ height: '1.2em', verticalAlign: 'middle', marginLeft: '4px' }}
            />
          </h2>

          <div className="prods">
            <a
              className="prod-card"
              href={LINKS.es.avellanasDatiles}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="public/es-avellanas-datiles.jpg"
                onError={(e) => handleImageFallback(e, 'es-avellanas-datiles.jpg')}
                alt="Avellanas y dátiles"
              />
              <div>
                <b>Avellanas y dátiles</b>
                <span className="meta">Crema 175 g</span>
              </div>
              <span className="go"><ArrowIcon /></span>
            </a>

            <a
              className="prod-card"
              href={LINKS.es.anacardosCoco}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="public/es-anacardos-coco.jpg"
                onError={(e) => handleImageFallback(e, 'es-anacardos-coco.jpg')}
                alt="Anacardos y coco"
              />
              <div>
                <b>Anacardos y coco</b>
                <span className="meta">Crema 175 g</span>
              </div>
              <span className="go"><ArrowIcon /></span>
            </a>

            <a
              className="prod-card"
              href={LINKS.es.mangoAlmendras}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="public/es-mango-almendras.jpg"
                onError={(e) => handleImageFallback(e, 'es-mango-almendras.jpg')}
                alt="Mango y almendras"
              />
              <div>
                <b>Mango y almendras</b>
                <span className="meta">Crema 175 g · Tropical Edition</span>
              </div>
              <span className="go"><ArrowIcon /></span>
            </a>
          </div>
        </section>
      ) : (
        <section id="p-be">
          <div className="btns">
            <a
              className="btn-item b-green"
              href="#produits"
            >
              <span>
                Acheter / Kopen chez{' '}
                <img
                  src="public/Logo_Colruyt.svg"
                  onError={(e) => handleImageFallback(e, 'Logo_Colruyt.svg')}
                  alt="Colruyt"
                  style={{ height: '1.1em', verticalAlign: 'middle', marginLeft: '4px' }}
                />
              </span>
              <ArrowIcon />
            </a>

            <a
              className="btn-item b-brown"
              href={LINKS.recipeBook}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>
                Le livre de recettes
                <small>Gratis receptenboek</small>
              </span>
              <DownloadIcon />
            </a>

            <a
              className="btn-item b-line"
              href={LINKS.site}
              target="_blank"
              rel="noopener noreferrer"
            >
              nutsamore.com
              <ArrowIcon />
            </a>
          </div>

          <h2 id="produits" className="section-title">
            Produits / Producten chez{' '}
            <img
              src="public/Logo_Colruyt.svg"
              onError={(e) => handleImageFallback(e, 'Logo_Colruyt.svg')}
              alt="Colruyt"
              style={{ height: '1.1em', verticalAlign: 'middle', marginLeft: '4px' }}
            />
          </h2>

          <div className="prods">
            <a
              className="prod-card"
              href={LINKS.be.brownAlmond}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="public/be-brown-almond.jpg"
                onError={(e) => handleImageFallback(e, 'be-brown-almond.jpg')}
                alt="Amandes grillées"
              />
              <div>
                <b>Amandes grillées</b>
                <span className="meta">100% Brown Almond · 175 g</span>
              </div>
              <span className="go"><ArrowIcon /></span>
            </a>

            <a
              className="prod-card"
              href={LINKS.be.pistachioAlmond}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="public/be-pistachio-almond.jpg"
                onError={(e) => handleImageFallback(e, 'be-pistachio-almond.jpg')}
                alt="Pistaches & amandes"
              />
              <div>
                <b>Pistaches & amandes</b>
                <span className="meta">100% Pistachio & Almond · 175 g</span>
              </div>
              <span className="go"><ArrowIcon /></span>
            </a>

            <a
              className="prod-card"
              href={LINKS.be.hazelnutDate}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="public/be-hazelnut-date.jpg"
                onError={(e) => handleImageFallback(e, 'be-hazelnut-date.jpg')}
                alt="Noisettes grillées & dattes"
              />
              <div>
                <b>Noisettes grillées & dattes</b>
                <span className="meta">100% Hazelnut & Date · 175 g</span>
              </div>
              <span className="go"><ArrowIcon /></span>
            </a>
          </div>
        </section>
      )}

      <footer>© Nut’s Amore · Euro Company</footer>
    </main>
  );
}
