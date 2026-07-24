import { useMemo, useState } from "react";

const criterios = [
  {
    key: "paixao",
    label: "Paixão",
    helper: "Quanto você gosta e consegue sustentar o assunto todos os dias?",
  },
  {
    key: "proficiencia",
    label: "Proficiência",
    helper: "Quanto você já sabe ou consegue aprender rápido sobre esse nicho?",
  },
  {
    key: "lucro",
    label: "Potencial de lucro",
    helper: "Existe público pagando por soluções, mentorias, produtos ou serviços?",
  },
];

const passos = [
  "Escolha até 5 ideias de nicho.",
  "Dê notas de 0 a 10 para paixão, proficiência e potencial de lucro.",
  "Priorize a ideia com maior pontuação e valide com uma oferta simples.",
];

const depoimentos = [
  {
    nome: "Mariana Costa",
    resultado: "Definiu um nicho claro em uma tarde e fez a primeira oferta no dia seguinte.",
  },
  {
    nome: "Rafael Lima",
    resultado: "Trocou achismo por critérios e saiu com uma lista objetiva de oportunidades.",
  },
];

const nichosIniciais = Array.from({ length: 5 }, () => ({
  nome: "",
  paixao: 0,
  proficiencia: 0,
  lucro: 0,
}));

function calcularPontuacao(nicho) {
  const total = nicho.paixao + nicho.proficiencia + nicho.lucro;
  let status = "Baixo potencial — repensar";
  let color = "text-rose-700 bg-rose-50 border-rose-100";

  if (total >= 26) {
    status = "Altíssimo potencial";
    color = "text-emerald-700 bg-emerald-50 border-emerald-100";
  } else if (total >= 21) {
    status = "Bom potencial";
    color = "text-blue-700 bg-blue-50 border-blue-100";
  } else if (total >= 15) {
    status = "Pode melhorar";
    color = "text-amber-700 bg-amber-50 border-amber-100";
  }

  return { total, status, color };
}

export default function App() {
  const [nichos, setNichos] = useState(nichosIniciais);

  const melhorNicho = useMemo(() => {
    return nichos
      .map((nicho, index) => ({ ...nicho, index, ...calcularPontuacao(nicho) }))
      .filter((nicho) => nicho.nome.trim())
      .sort((a, b) => b.total - a.total)[0];
  }, [nichos]);

  const handleChange = (index, field, value) => {
    setNichos((currentNichos) =>
      currentNichos.map((nicho, currentIndex) => {
        if (currentIndex !== index) return nicho;

        return {
          ...nicho,
          [field]: field === "nome" ? value : Math.min(10, Math.max(0, Number(value))),
        };
      }),
    );
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="relative overflow-hidden px-6 py-16 sm:py-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.35),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.22),_transparent_30%)]" />
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-8">
            <span className="inline-flex rounded-full border border-blue-400/30 bg-blue-400/10 px-4 py-2 text-sm font-semibold text-blue-200">
              Método V7 • validação de nicho em 7 dias
            </span>
            <div className="space-y-5">
              <h1 className="text-4xl font-black tracking-tight sm:text-6xl">
                Transforme uma ideia solta em um nicho com potencial de venda.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-300">
                Use o Filtro 3x para comparar suas ideias com critérios simples: paixão,
                proficiência e potencial de lucro. No final, você sabe qual caminho validar primeiro.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="#validador"
                className="rounded-full bg-emerald-400 px-7 py-4 text-center font-bold text-slate-950 shadow-lg shadow-emerald-400/20 transition hover:bg-emerald-300"
              >
                Começar validação
              </a>
              <a
                href="https://seulink.com/whatsapp"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/15 px-7 py-4 text-center font-bold text-white transition hover:bg-white/10"
              >
                Falar com especialista
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-200">Como funciona</p>
            <div className="mt-6 space-y-4">
              {passos.map((passo, index) => (
                <div key={passo} className="flex gap-4 rounded-2xl bg-slate-900/70 p-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-blue-500 font-black">
                    {index + 1}
                  </span>
                  <p className="text-slate-200">{passo}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="validador" className="bg-slate-50 px-6 py-16 text-slate-950">
        <div className="mx-auto max-w-6xl space-y-10">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="font-bold text-blue-700">Validador interativo</p>
              <h2 className="mt-3 text-3xl font-black sm:text-4xl">Compare até 5 ideias de nicho</h2>
              <p className="mt-4 text-slate-600">
                Preencha suas ideias, dê notas realistas e veja automaticamente qual nicho deve
                receber sua energia nos próximos 7 dias.
              </p>
              <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm font-semibold text-slate-500">Melhor opção agora</p>
                <p className="mt-2 text-2xl font-black text-slate-950">
                  {melhorNicho ? melhorNicho.nome : "Preencha um nicho"}
                </p>
                <p className="mt-1 text-slate-600">
                  {melhorNicho
                    ? `${melhorNicho.total} pontos • ${melhorNicho.status}`
                    : "A recomendação aparece assim que você inserir uma ideia."}
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {nichos.map((nicho, index) => {
                const { total, status, color } = calcularPontuacao(nicho);
                return (
                  <article key={index} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <input
                        className="w-full rounded-2xl border border-slate-200 px-4 py-3 font-semibold outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                        placeholder={`Nicho ${index + 1}`}
                        value={nicho.nome}
                        onChange={(event) => handleChange(index, "nome", event.target.value)}
                      />
                      <span className={`shrink-0 rounded-full border px-4 py-2 text-sm font-bold ${color}`}>
                        {total} pts • {status}
                      </span>
                    </div>
                    <div className="mt-5 grid gap-4 md:grid-cols-3">
                      {criterios.map((criterio) => (
                        <label key={criterio.key} className="space-y-2">
                          <span className="block text-sm font-bold text-slate-700">{criterio.label}</span>
                          <input
                            type="number"
                            min="0"
                            max="10"
                            className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                            value={nicho[criterio.key]}
                            onChange={(event) => handleChange(index, criterio.key, event.target.value)}
                          />
                          <span className="block text-xs leading-5 text-slate-500">{criterio.helper}</span>
                        </label>
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          {depoimentos.map((depoimento) => (
            <blockquote key={depoimento.nome} className="rounded-3xl border border-white/10 bg-white/10 p-6">
              <p className="text-lg text-slate-200">“{depoimento.resultado}”</p>
              <footer className="mt-4 font-bold text-emerald-200">{depoimento.nome}</footer>
            </blockquote>
          ))}
        </div>
      </section>
    </main>
  );
}
