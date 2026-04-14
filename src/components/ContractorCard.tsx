import { useState } from 'react'
import { type Contractor, type Review } from '@/types/contractor'

type Props = {
  contractor: Contractor
  reviews: Review[]
  onAddReview: (contractorId: string, rating: number, comment: string) => void
}

function StarRating({
  value,
  onChange,
}: {
  value: number
  onChange?: (v: number) => void
}) {
  const [hovered, setHovered] = useState(0)
  const display = hovered || value
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange?.(star)}
          onMouseEnter={() => onChange && setHovered(star)}
          onMouseLeave={() => onChange && setHovered(0)}
          className={`text-xl leading-none transition-colors ${
            star <= display ? 'text-amber-400' : 'text-gray-300'
          } ${onChange ? 'cursor-pointer hover:scale-110' : 'cursor-default'}`}
          aria-label={`${star} star${star > 1 ? 's' : ''}`}
        >
          ★
        </button>
      ))}
    </div>
  )
}

const SPECIALTY_COLORS: Record<string, string> = {
  Plumbing: 'bg-blue-100 text-blue-700',
  Electrical: 'bg-yellow-100 text-yellow-700',
  Carpentry: 'bg-orange-100 text-orange-700',
  Painting: 'bg-pink-100 text-pink-700',
  Landscaping: 'bg-green-100 text-green-700',
  HVAC: 'bg-sky-100 text-sky-700',
  'General Handyman': 'bg-purple-100 text-purple-700',
  Other: 'bg-gray-100 text-gray-600',
}

export function ContractorCard({ contractor, reviews, onAddReview }: Props) {
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [showAllReviews, setShowAllReviews] = useState(false)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : null

  const visibleReviews = showAllReviews ? reviews : reviews.slice(0, 2)
  const badgeClass =
    SPECIALTY_COLORS[contractor.specialty] || 'bg-gray-100 text-gray-600'

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!rating) return
    setSubmitting(true)
    onAddReview(contractor.id, rating, comment)
    setRating(0)
    setComment('')
    setSubmitting(false)
    setShowReviewForm(false)
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow p-5 flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-bold text-gray-900 text-lg leading-tight">
            {contractor.name}
          </h3>
          <span
            className={`inline-block mt-1 text-xs font-semibold px-2.5 py-0.5 rounded-full ${badgeClass}`}
          >
            {contractor.specialty}
          </span>
        </div>
        <div className="text-right shrink-0">
          {avgRating !== null ? (
            <div className="flex flex-col items-end gap-0.5">
              <div className="flex items-center gap-1">
                <span className="text-amber-400 text-base">★</span>
                <span className="font-bold text-gray-800 text-sm">
                  {avgRating.toFixed(1)}
                </span>
              </div>
              <span className="text-xs text-gray-400">
                {reviews.length} review{reviews.length !== 1 ? 's' : ''}
              </span>
            </div>
          ) : (
            <span className="text-xs text-gray-400 italic">No reviews yet</span>
          )}
        </div>
      </div>

      {/* Phone */}
      <a
        href={`tel:${contractor.phone}`}
        className="flex items-center gap-2 text-emerald-700 hover:text-emerald-900 font-medium text-sm w-fit"
      >
        <span>📞</span>
        {contractor.phone}
      </a>

      {/* Notes */}
      {contractor.notes && (
        <p className="text-sm text-gray-600 leading-relaxed border-t border-gray-50 pt-2">
          {contractor.notes}
        </p>
      )}

      {/* Reviews */}
      {reviews.length > 0 && (
        <div className="border-t border-gray-100 pt-3 space-y-2">
          {visibleReviews.map((r) => (
            <div key={r.id} className="bg-gray-50 rounded-xl p-3">
              <div className="flex items-center gap-2 mb-1">
                <StarRating value={r.rating} />
                <span className="text-xs text-gray-400">
                  {new Date(r.createdAt).toLocaleDateString()}
                </span>
              </div>
              {r.comment && (
                <p className="text-sm text-gray-700">{r.comment}</p>
              )}
            </div>
          ))}
          {reviews.length > 2 && (
            <button
              onClick={() => setShowAllReviews(!showAllReviews)}
              className="text-xs text-emerald-600 hover:text-emerald-800 font-medium"
            >
              {showAllReviews
                ? 'Show less'
                : `Show ${reviews.length - 2} more review${reviews.length - 2 !== 1 ? 's' : ''}`}
            </button>
          )}
        </div>
      )}

      {/* Leave review */}
      {showReviewForm ? (
        <form
          onSubmit={handleReviewSubmit}
          className="border-t border-gray-100 pt-3 space-y-2"
        >
          <div>
            <p className="text-sm font-medium text-gray-700 mb-1">
              Your rating *
            </p>
            <StarRating value={rating} onChange={setRating} />
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={2}
            placeholder="Optional comment…"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300 resize-none"
          />
          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={() => setShowReviewForm(false)}
              className="text-xs text-gray-500 hover:text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!rating || submitting}
              className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-semibold px-4 py-1.5 rounded-lg transition-colors"
            >
              Submit Review
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setShowReviewForm(true)}
          className="text-xs text-emerald-600 hover:text-emerald-800 font-medium mt-auto self-start"
        >
          + Leave a review
        </button>
      )}
    </div>
  )
}
