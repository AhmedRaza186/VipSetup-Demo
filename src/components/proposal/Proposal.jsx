import { imageUrl } from '../../lib/images';
import { proposal } from '../../data/proposal';

const PDF_PATH = '/VIP-Setup-Proposal.pdf';

const Label = ({ children, className = '' }) => (
  <h2 className={`text-[0.7rem] font-poppins font-semibold tracking-[0.2em] uppercase text-text-muted ${className}`}>{children}</h2>
);

const Dot = () => <span className="mt-[0.45rem] w-1.5 h-1.5 rounded-full bg-brand-red flex-shrink-0" aria-hidden="true"></span>;

// A4 sheet: fixed size in print, fluid on screen.
const Sheet = ({ page, total, children }) => (
  <article className="proposal-sheet relative mx-auto w-full max-w-[210mm] print:max-w-none print:w-[210mm] print:h-[297mm] print:break-after-page bg-primary shadow-xl print:shadow-none overflow-hidden flex flex-col">
    <div className="h-2 w-full flex flex-shrink-0">
      <div className="flex-[3] bg-brand-red"></div>
      <div className="flex-1 bg-brand-yellow"></div>
    </div>
    <div className="px-6 sm:px-11 pt-7 pb-6 flex-1 flex flex-col">{children}</div>
    <div className="px-6 sm:px-11 pb-5 flex justify-between text-[0.7rem] font-nunito text-text-muted">
      <span>VIP Setup · Website Proposal</span>
      <span>{page} / {total}</span>
    </div>
  </article>
);

// Two-page proposal at /#proposal. `npm run proposal` prints it straight to PDF.
const Proposal = () => {
  const p = proposal;

  return (
    <div className="min-h-screen bg-secondary print:bg-white py-6 sm:py-10 print:p-0">
      {/* Screen-only toolbar */}
      <div className="print:hidden max-w-[210mm] mx-auto px-4 sm:px-0 mb-4 flex items-center justify-between gap-4">
        <a href="#" className="text-sm font-poppins font-medium text-text-muted hover:text-brand-red">← Back to website</a>
        <a
          href={PDF_PATH}
          download
          className="inline-flex items-center px-5 py-2.5 rounded-full bg-brand-red text-white text-sm font-poppins font-semibold hover:bg-brand-red-dark transition-colors"
        >
          Download PDF
        </a>
      </div>

      <div className="flex flex-col gap-6 sm:gap-10 print:gap-0">
        {/* ---------------- Page 1: the pitch ---------------- */}
        <Sheet page={1} total={3}>
          <header className="flex items-start justify-between gap-6">
            <div className="min-w-0">
              <p className="text-xs font-poppins font-semibold tracking-[0.2em] uppercase text-brand-red">Website Proposal</p>
              <h1 className="mt-2 text-3xl sm:text-[2.1rem] font-poppins font-bold text-text-main leading-tight">
                The real VIP Setup website.
              </h1>
              <p className="mt-2 text-sm text-text-muted font-nunito">
                For <span className="text-text-main font-semibold">{p.preparedFor}</span>
                <span className="mx-2">·</span>
                {p.date}
              </p>
            </div>
            <img src="/images/brand/logo.png" alt="VIP Setup" className="h-14 sm:h-20 w-auto flex-shrink-0 -mt-2" />
          </header>

          <p className="mt-4 text-[0.95rem] text-text-muted font-nunito leading-relaxed">
            {p.intro} Demo: <span className="text-text-main font-semibold break-all">{p.demoUrl}</span>
          </p>

          {/* Opportunity */}
          <section className="mt-5 rounded-2xl bg-secondary p-5">
            <div>
              <Label>Why a website, why now</Label>
              <div className="mt-2 space-y-2 text-sm text-text-main font-nunito leading-relaxed">
                {p.opportunity.map((t) => <p key={t}>{t}</p>)}
              </div>
            </div>
          </section>

          {/* Demo vs full */}
          <section className="mt-6">
            <Label>What you saw vs. what you get</Label>
            <div className="mt-2 overflow-x-auto">
              <table className="w-full min-w-[30rem] text-sm font-nunito border-collapse table-fixed">
                <colgroup>
                  <col className="w-[34%]" />
                  <col className="w-[22%]" />
                  <col />
                </colgroup>
                <thead>
                  <tr className="text-left text-text-muted">
                    <th className="py-2 pr-3 font-poppins font-medium">Feature</th>
                    <th className="py-2 pr-3 font-poppins font-medium">Demo</th>
                    <th className="py-2 font-poppins font-medium text-brand-red">Full version</th>
                  </tr>
                </thead>
                <tbody>
                  {p.demoVsFull.map((r) => (
                    <tr key={r.feature} className="border-t border-gray-100">
                      <td className="py-[0.4rem] pr-3 font-poppins font-medium text-text-main">{r.feature}</td>
                      <td className="py-[0.4rem] pr-3 text-text-muted">{r.demo}</td>
                      <td className="py-[0.4rem] text-text-main">{r.full}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Scope */}
          <section className="mt-6">
            <Label>Everything included</Label>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 print:grid-cols-3 gap-x-6 gap-y-4">
              {p.scope.map((g) => (
                <div key={g.group}>
                  <h3 className="font-poppins font-semibold text-text-main text-[0.95rem]">{g.group}</h3>
                  <ul className="mt-1.5 space-y-1">
                    {g.items.map((it) => (
                      <li key={it} className="flex gap-2.5 text-sm text-text-muted font-nunito leading-snug">
                        <Dot />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </Sheet>

        {/* ---------------- Page 2: AI, plan and investment ---------------- */}
        <Sheet page={2} total={3}>
          {/* AI */}
          <section className="rounded-2xl bg-text-main text-white p-6">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-full bg-brand-yellow text-text-main text-[0.7rem] font-poppins font-bold uppercase tracking-widest">AI</span>
              <h2 className="text-xl font-poppins font-bold">Built-in AI</h2>
            </div>
            <p className="mt-2 text-sm text-white/70 font-nunito">{p.ai.intro}</p>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 print:grid-cols-2 gap-x-8 gap-y-4">
              {p.ai.features.map((f) => (
                <div key={f.title} className="flex gap-3">
                  <span className="mt-[0.45rem] w-1.5 h-1.5 rounded-full bg-brand-yellow flex-shrink-0" aria-hidden="true"></span>
                  <div>
                    <h3 className="font-poppins font-semibold text-[0.95rem]">{f.title}</h3>
                    <p className="mt-0.5 text-sm text-white/70 font-nunito leading-snug">{f.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Timeline */}
          <section className="mt-6">
            <Label>Timeline · 3 to 4 weeks</Label>
            <ol className="mt-3 grid grid-cols-1 sm:grid-cols-4 print:grid-cols-4 gap-3">
              {p.timeline.map((t) => (
                <li key={t.when} className="rounded-xl border border-gray-200 p-3.5">
                  <p className="font-poppins font-semibold text-brand-red text-sm">{t.when}</p>
                  <p className="mt-1 text-sm text-text-main font-nunito leading-snug">{t.what}</p>
                  <p className="mt-2 text-xs text-text-muted font-nunito leading-snug">
                    <span className="font-poppins font-medium text-text-main">From you:</span> {t.fromYou}
                  </p>
                </li>
              ))}
            </ol>
          </section>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 print:grid-cols-2 gap-6">
            {/* Need from you */}
            <section>
              <Label>What I need from you</Label>
              <ul className="mt-2 space-y-1.5">
                {p.needFromYou.map((n) => (
                  <li key={n} className="flex gap-2.5 text-sm text-text-main font-nunito leading-snug">
                    <span className="mt-0.5 w-4 h-4 rounded border-2 border-gray-300 flex-shrink-0" aria-hidden="true"></span>
                    <span>{n}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Ongoing care */}
            <section className="rounded-2xl bg-secondary p-5">
              <Label>After launch · ongoing care</Label>
              <ul className="mt-3 space-y-1.5">
                {p.care.map((m) => (
                  <li key={m} className="flex gap-2.5 text-sm text-text-main font-nunito leading-snug"><Dot />{m}</li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-text-muted font-nunito">{p.pricingNote}</p>
            </section>
          </div>


          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 print:grid-cols-2 gap-6">
            {/* Add-ons */}
            <section>
              <Label>Optional add-ons · extra charges</Label>
              <ul className="mt-2 space-y-1">
                {p.addOns.map((a) => (
                  <li key={a} className="flex gap-2.5 text-sm text-text-main font-nunito leading-snug"><Dot />{a}</li>
                ))}
              </ul>
              <p className="mt-2 text-xs text-text-muted font-nunito">Quoted separately if you want them.</p>
            </section>

            {/* Not included */}
            <section>
              <Label>Not included</Label>
              <ul className="mt-2 space-y-1">
                {p.notIncluded.map((n) => (
                  <li key={n} className="flex gap-2.5 text-sm text-text-muted font-nunito leading-snug"><Dot />{n}</li>
                ))}
              </ul>
            </section>
          </div>

        </Sheet>

        {/* ---------------- Page 3: answers and next steps ---------------- */}
        <Sheet page={3} total={3}>
          {/* FAQ */}
          <section>
            <Label>Quick answers</Label>
            <dl className="mt-2 grid grid-cols-1 sm:grid-cols-2 print:grid-cols-2 gap-x-8 gap-y-3">
              {p.faq.map((f) => (
                <div key={f.q}>
                  <dt className="font-poppins font-semibold text-text-main text-sm">{f.q}</dt>
                  <dd className="mt-0.5 text-sm text-text-muted font-nunito leading-snug">{f.a}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* Next steps */}
          <section className="mt-6">
            <Label>Next steps</Label>
            <ol className="mt-2 flex flex-col sm:flex-row print:flex-row gap-3">
              {p.nextSteps.map((s, i) => (
                <li key={s} className="flex-1 flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-2.5">
                  <span className="w-7 h-7 flex-shrink-0 rounded-full bg-brand-red text-white text-sm font-poppins font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <span className="text-sm font-poppins font-medium text-text-main leading-snug">{s}</span>
                </li>
              ))}
            </ol>
          </section>

          {/* Signature dishes */}
          <div className="mt-8 grid grid-cols-3 gap-3 print:flex-1 print:min-h-0" aria-hidden="true">
            {['food/premium-pizza/vip-sp-sriracha', 'food/burgers/vip-sp-zingro', 'food/garlic-bread/cheese'].map((path) => (
              <img key={path} src={imageUrl(path)} alt="" className="w-full h-28 sm:h-44 print:h-full object-cover rounded-xl" />
            ))}
          </div>

          {/* Sign-off */}
          <footer className="mt-auto pt-5 flex flex-col sm:flex-row print:flex-row sm:items-end print:items-end justify-between gap-4">
            <p className="text-2xl font-poppins font-bold text-text-main leading-tight">
              Ready for your <span className="text-brand-red">HMMM?</span>
            </p>
            <div className="sm:text-right print:text-right text-sm font-nunito text-text-muted">
              <p className="font-poppins font-semibold text-text-main">{p.preparedBy}</p>
              <p>{p.contact || <span className="tracking-widest">________________</span>}</p>
            </div>
          </footer>
        </Sheet>
      </div>
    </div>
  );
};

export default Proposal;
