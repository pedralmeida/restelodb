import { useState, useMemo, useEffect } from 'react'
import {
  SPECIALTIES,
  type Contractor,
  type Review,
  type Specialty,
} from '@/types/contractor'
import { SubmitContractorForm } from '@/components/SubmitContractorForm'
import { ContractorCard } from '@/components/ContractorCard'

const LS_CONTRACTORS = 'ncd_contractors'
const LS_REVIEWS = 'ncd_reviews'

const SEED_CONTRACTORS: Contractor[] = [
  {
    id: 'seed-1',
    name: 'Mike Torres',
    phone: '(555) 234-5678',
    specialty: 'Plumbing',
    notes: 'Fixed our burst pipe same-day. Very professional and fair pricing.',
    submittedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 'seed-2',
    name: 'Sara Chen',
    phone: '(555) 876-5432',
    specialty: 'Electrical',
    notes: 'Licensed electrician, great for panel upgrades and EV chargers.',
    submittedAt: '2024-02-01T10:00:00Z',
  },
  {
    id: 'seed-3',
    name: 'Dave Kowalski',
    phone: '(555) 345-6789',
    specialty: 'Carpentry',
    notes: 'Custom decks and fences. Always on time.',
    submittedAt: '2024-03-10T10:00:00Z',
  },
]

const SEED_REVIEWS: Review[] = [
  {
    id: 'sr-1',
    contractorId: 'seed-1',
    rating: 5,
    comment: 'Showed up within 2 hours, fixed everything perfectly!',
    createdAt: '2024-02-10T10:00:00Z',
  },
  {
    id: 'sr-2',
    contractorId: 'seed-1',
    rating: 4,
    comment: 'Good work, slightly pricey but worth it.',
    createdAt: '2024-03-05T10:00:00Z',
  },
  {
    id: 'sr-3',
    contractorId: 'seed-2',
    rating: 5,
    comment: 'Did a fantastic job upgrading our panel.',
    createdAt: '2024-02-20T10:00:00Z',
  },
]

function loadFromStorage<T>(key: string, seed: T): T {
  if (typeof window === 'undefined') return seed
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return seed
    return JSON.parse(raw) as T
  } catch {
    return seed
  }
}

function saveToStorage<T>(key: string, value: T) {
  if (typeof window === 'undefined') return
  localStorage.setItem(key, JSON.stringify(value))
}

export function ContractorDirectory() {
  const [contractors, setContractors] = useState<Contractor[]>(() =>
    loadFromStorage(LS_CONTRACTORS, SEED_CONTRACTORS)
  )
  const [reviews, setReviews] = useState<Review[]>(() =>
    loadFromStorage(LS_REVIEWS, SEED_REVIEWS)
  )
  const [activeTab, setActiveTab] = useState<'All' | Specialty>('All')
  const [search, setSearch] = useState('')

  // Sync to localStorage on change
  useEffect(() => {
    saveToStorage(LS_CONTRACTORS, contractors)
  }, [contractors])

  useEffect(() => {
    saveToStorage(LS_REVIEWS, reviews)
  }, [reviews])

  const handleAddContractor = (data: {
    name: string
    phone: string
    specialty: Specialty
    notes?: string
  }) => {
    const newContractor: Contractor = {
      id: `c-${Date.now()}`,
      ...data,
      submittedAt: new Date().toISOString(),
    }
    setContractors((prev) => [newContractor, ...prev])
  }

  const handleAddReview = (
    contractorId: string,
    rating: number,
    comment: string
  ) => {
    const newReview: Review = {
      id: `r-${Date.now()}`,
      contractorId,
      rating,
      comment,
      createdAt: new Date().toISOString(),
    }
    setReviews((prev) => [newReview, ...prev])
  }

  const filteredContractors = useMemo(() => {
    const q = search.toLowerCase().trim()
    return contractors.filter((c) => {
      const matchesTab = activeTab === 'All' || c.specialty === activeTab
      if (!matchesTab) return false
      if (!q) return true
      return (
        c.name.toLowerCase().includes(q) ||
        c.specialty.toLowerCase().includes(q) ||
        c.phone.includes(q) ||
        (c.notes?.toLowerCase().includes(q) ?? false)
      )
    })
  }, [contractors, activeTab, search])

  const tabs: Array<'All' | Specialty> = ['All', ...SPECIALTIES]

  const countFor = (tab: 'All' | Specialty) =>
    tab === 'All'
      ? contractors.length
      : contractors.filter((c) => c.specialty === tab).length

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      {/* Hero */}
      <div className="bg-emerald-700 text-white py-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-5xl mb-3">🏘️</div>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-2 tracking-tight">
            Neighbor's Contractor Directory
          </h1>
          <p className="text-emerald-100 text-base sm:text-lg max-w-xl mx-auto">
            Trusted local contractors recommended by your neighbors. Find
            reliable help or share someone great.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Submit form */}
        <SubmitContractorForm onAdded={handleAddContractor} />

        {/* Search */}
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
            🔍
          </span>
          <input
            type="search"
            placeholder="Search by name, specialty, or keyword…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm bg-white"
          />
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const count = countFor(tab)
            const isActive = activeTab === tab
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                  isActive
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-emerald-300 hover:text-emerald-700'
                }`}
              >
                {tab}
                <span
                  className={`ml-1.5 text-xs font-normal ${isActive ? 'text-emerald-200' : 'text-gray-400'}`}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Grid */}
        {filteredContractors.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <div className="text-4xl mb-3">🔧</div>
            <p className="font-medium">No contractors found.</p>
            {search && (
              <button
                onClick={() => setSearch('')}
                className="mt-2 text-sm text-emerald-600 hover:underline"
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredContractors.map((contractor) => (
              <ContractorCard
                key={contractor.id}
                contractor={contractor}
                reviews={reviews.filter(
                  (r) => r.contractorId === contractor.id
                )}
                onAddReview={handleAddReview}
              />
            ))}
          </div>
        )}

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 pt-4">
          Know a great contractor? Submit their info to help your neighbors.
        </p>
      </div>
    </div>
  )
}
