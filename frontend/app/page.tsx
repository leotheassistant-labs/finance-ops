export default function Dashboard() {
  return (
    <main className="p-6 space-y-6">
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-widest text-violet-400">Finance Ops</p>
        <h1 className="text-3xl font-semibold">Monthly Overview</h1>
        <p className="text-sm text-gray-400">UI placeholder while backend APIs are wired.</p>
      </header>
      <section className="grid gap-4 md:grid-cols-3">
        <article className="rounded-xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs uppercase text-gray-400">Net cash flow</p>
          <p className="text-2xl font-bold">AED --</p>
        </article>
        <article className="rounded-xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs uppercase text-gray-400">Investments</p>
          <p className="text-2xl font-bold">AED --</p>
        </article>
        <article className="rounded-xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs uppercase text-gray-400">Alerts</p>
          <p className="text-2xl font-bold">0</p>
        </article>
      </section>
    </main>
  );
}
