
import { useState } from "react";

export default function App() {
  const [nichos, setNichos] = useState(
    Array(5).fill({ nome: "", paixao: 0, proficiencia: 0, lucro: 0 })
  );

  const handleChange = (index, field, value) => {
    const novosNichos = [...nichos];
    novosNichos[index][field] = field === "nome" ? value : Number(value);
    setNichos(novosNichos);
  };

  const getPontuacao = (nicho) => {
    const total = nicho.paixao + nicho.proficiencia + nicho.lucro;
    let status = "❌ Baixo potencial – repensar";
    if (total >= 26) status = "🔥 Altíssimo potencial";
    else if (total >= 21) status = "✅ Bom potencial";
    else if (total >= 15) status = "⚠️ Pode melhorar";
    return { total, status };
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">Método V7 – Suas primeiras vendas em 7 dias</h1>
      <p className="text-center text-lg">Bem-vindo(a)! Aqui você vai avaliar suas ideias de nicho com o Filtro 3x para descobrir qual delas tem mais potencial de vendas.</p>
      <p className="text-center text-sm text-gray-500">Preencha até 5 ideias de nicho e avalie cada uma nos critérios abaixo. O sistema vai te mostrar qual é o mais promissor.</p>

      {nichos.map((nicho, index) => {
        const { total, status } = getPontuacao(nicho);
        return (
          <div key={index} className="p-4 border rounded-xl space-y-3 shadow">
            <input
              className="w-full p-2 border rounded"
              placeholder={\`Nicho \${index + 1}\`}
              value={nicho.nome}
              onChange={(e) => handleChange(index, "nome", e.target.value)}
            />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <input
                type="number"
                min={0}
                max={10}
                className="p-2 border rounded"
                placeholder="Paixão (0–10)"
                value={nicho.paixao}
                onChange={(e) => handleChange(index, "paixao", e.target.value)}
              />
              <input
                type="number"
                min={0}
                max={10}
                className="p-2 border rounded"
                placeholder="Proficiência (0–10)"
                value={nicho.proficiencia}
                onChange={(e) => handleChange(index, "proficiencia", e.target.value)}
              />
              <input
                type="number"
                min={0}
                max={10}
                className="p-2 border rounded"
                placeholder="Potencial de Lucro (0–10)"
                value={nicho.lucro}
                onChange={(e) => handleChange(index, "lucro", e.target.value)}
              />
            </div>
            <p className="text-right font-semibold">Total: {total} – {status}</p>
          </div>
        );
      })}

      <div className="text-center space-y-2">
        <p>Definiu o nicho? Clique abaixo para validar com nosso time!</p>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => window.open("https://seulink.com/whatsapp", "_blank")}
        >
          Validar com especialista
        </button>
      </div>
    </div>
  );
}
