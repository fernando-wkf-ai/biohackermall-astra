export default function NotFound() {
  return (
    <main className="prose-page">
      <p className="eyebrow">404</p>
      <h1>
        Page not found.
        <br />
        找不到頁面。
      </h1>
      <p>
        This page may have moved or is not yet published.
        <br />
        此頁面可能已移動或尚未發布。
      </p>
      <a className="button primary" href="/">
        Home / 首頁 ↗
      </a>
    </main>
  );
}

