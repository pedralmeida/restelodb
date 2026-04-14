import { useState } from 'react'
import { SPECIALTIES, type Specialty } from '@/types/contractor'

function encode(data: Record<string, string>) {
  return Object.entries(data)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&')
}

type Props = {
  onAdded: (contractor: {
    name: string
    phone: string
    specialty: Specialty
    notes?: string
  }) => void
}

export function SubmitContractorForm({ onAdded }: Props) {
  const [open, setOpen] = useState(false)
  const [fields, setFields] = useState({
    name: '',
    phone: '',
    specialty: 'Plumbing' as Specialty,
    notes: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFields({ ...fields, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    // Submit to Netlify Forms
    await fetch('/contractor-form.html', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': 'contractor-submission',
        name: fields.name,
        phone: fields.phone,
        specialty: fields.specialty,
        notes: fields.notes,
        'bot-field': '',
      }),
    }).catch(() => {
      // Ignore network errors in local dev; still add locally
    })
    onAdded({
      name: fields.name,
      phone: fields.phone,
      specialty: fields.specialty,
      notes: fields.notes,
    })
    setFields({ name: '', phone: '', specialty: 'Plumbing', notes: '' })
    setSubmitting(false)
    setDone(true)
    setTimeout(() => {
      setDone(false)
      setOpen(false)
    }, 1800)
  }

  if (!open) {
    return (
      <div className="flex justify-end">
        <button
          onClick={() => setOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-2.5 rounded-xl shadow transition-colors"
        >
          + Submeter um Empreiteiro
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-emerald-800">
          Submeter um Empreiteiro
        </h2>
        <button
          onClick={() => setOpen(false)}
          className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
          aria-label="Close"
        >
          ×
        </button>
      </div>

      {done ? (
        <div className="text-center py-6 text-emerald-700 font-semibold text-lg">
          ✓ Empreiteiro adicionado ao diretório!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="hidden" name="form-name" value="contractor-submission" />
          {/* Honeypot */}
          <div className="hidden">
            <input name="bot-field" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome Completo *
              </label>
              <input
                type="text"
                name="name"
                value={fields.name}
                onChange={handleChange}
                required
                placeholder="ex. João Silva"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Número de Telefone *
              </label>
              <input
                type="tel"
                name="phone"
                value={fields.phone}
                onChange={handleChange}
                required
                placeholder="ex. (555) 123-4567"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Especialidade / Categoria *
            </label>
            <select
              name="specialty"
              value={fields.specialty}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white"
            >
              {SPECIALTIES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notas / Descrição (opcional)
            </label>
            <textarea
              name="notes"
              value={fields.notes}
              onChange={handleChange}
              rows={3}
              placeholder="ex. Ótimo com casas antigas, muito responsivo..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none"
            />
          </div>

          <div className="flex gap-3 justify-end pt-1">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white font-semibold px-5 py-2 rounded-lg text-sm transition-colors"
            >
              {submitting ? 'A submeter…' : 'Adicionar Empreiteiro'}
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
