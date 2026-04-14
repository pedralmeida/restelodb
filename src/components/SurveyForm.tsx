import { useState } from 'react'

const seasonOptions = ['Primavera', 'Verão', 'Outono', 'Inverno']

export default function SurveyForm() {
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">
          Obrigado por votar!
        </h2>
        <p>A sua resposta foi registada.</p>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md px-4">
      <h1 className="text-4xl md:text-5xl font-black mb-2 tracking-tight">
        Qual é a sua estação favorita?
      </h1>
      <p className="mb-8">
        Escolha a sua estação favorita e diga-nos por que a ama.
      </p>

      <form
        name="favorite-season-survey"
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field"
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault()
          const form = e.currentTarget
          fetch('/form-survey.html', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(new FormData(form) as never).toString(),
          }).then(() => setSubmitted(true))
        }}
      >
        <input type="hidden" name="form-name" value="favorite-season-survey" />
        <p className="hidden" style={{ display: 'none' }}>
          <label>
            Don&apos;t fill this out: <input name="bot-field" />
          </label>
        </p>

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium mb-2"
          >
            O seu Nome
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-3 rounded-lg border focus:outline-none"
            placeholder="O seu nome"
          />
        </div>

        <div>
          <label
            htmlFor="season"
            className="block text-sm font-medium mb-2"
          >
            Estação Favorita
          </label>
          <select
            id="season"
            name="season"
            required
            className="w-full px-4 py-3 rounded-lg border focus:outline-none"
          >
            <option value="">
              Selecionar uma estação...
            </option>
            {seasonOptions.map((season) => (
              <option key={season} value={season}>
                {season}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="reason"
            className="block text-sm font-medium mb-2"
          >
            Por que é a melhor?
          </label>
          <textarea
            id="reason"
            name="reason"
            rows={3}
            className="w-full px-4 py-3 rounded-lg border focus:outline-none resize-none"
            placeholder="Diga-nos por que ama esta estação..."
          />
        </div>

        <button
          type="submit"
          className="w-full px-8 py-3 border font-semibold rounded-lg"
        >
          Submeter Voto
        </button>
      </form>
    </div>
  )
}
