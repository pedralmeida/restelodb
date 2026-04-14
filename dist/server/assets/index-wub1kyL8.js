import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect, useMemo } from "react";
const SPECIALTIES = [
  "Plumbing",
  "Electrical",
  "Carpentry",
  "Painting",
  "Landscaping",
  "HVAC",
  "General Handyman",
  "Other"
];
function encode(data) {
  return Object.entries(data).map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join("&");
}
function SubmitContractorForm({ onAdded }) {
  const [open, setOpen] = useState(false);
  const [fields, setFields] = useState({
    name: "",
    phone: "",
    specialty: "Plumbing",
    notes: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const handleChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await fetch("/contractor-form.html", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": "contractor-submission",
        name: fields.name,
        phone: fields.phone,
        specialty: fields.specialty,
        notes: fields.notes,
        "bot-field": ""
      })
    }).catch(() => {
    });
    onAdded({
      name: fields.name,
      phone: fields.phone,
      specialty: fields.specialty,
      notes: fields.notes
    });
    setFields({ name: "", phone: "", specialty: "Plumbing", notes: "" });
    setSubmitting(false);
    setDone(true);
    setTimeout(() => {
      setDone(false);
      setOpen(false);
    }, 1800);
  };
  if (!open) {
    return /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => setOpen(true),
        className: "bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-2.5 rounded-xl shadow transition-colors",
        children: "+ Submit a Contractor"
      }
    ) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-lg border border-emerald-100 p-6 mb-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-emerald-800", children: "Submit a Contractor" }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setOpen(false),
          className: "text-gray-400 hover:text-gray-600 text-2xl leading-none",
          "aria-label": "Close",
          children: "×"
        }
      )
    ] }),
    done ? /* @__PURE__ */ jsx("div", { className: "text-center py-6 text-emerald-700 font-semibold text-lg", children: "✓ Contractor added to the directory!" }) : /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
      /* @__PURE__ */ jsx("input", { type: "hidden", name: "form-name", value: "contractor-submission" }),
      /* @__PURE__ */ jsx("div", { className: "hidden", children: /* @__PURE__ */ jsx("input", { name: "bot-field", tabIndex: -1, autoComplete: "off" }) }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Full Name *" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              name: "name",
              value: fields.name,
              onChange: handleChange,
              required: true,
              placeholder: "e.g. John Smith",
              className: "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Phone Number *" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "tel",
              name: "phone",
              value: fields.phone,
              onChange: handleChange,
              required: true,
              placeholder: "e.g. (555) 123-4567",
              className: "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Specialty / Category *" }),
        /* @__PURE__ */ jsx(
          "select",
          {
            name: "specialty",
            value: fields.specialty,
            onChange: handleChange,
            required: true,
            className: "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white",
            children: SPECIALTIES.map((s) => /* @__PURE__ */ jsx("option", { value: s, children: s }, s))
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Notes / Description (optional)" }),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            name: "notes",
            value: fields.notes,
            onChange: handleChange,
            rows: 3,
            placeholder: "e.g. Great with older homes, very responsive...",
            className: "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-3 justify-end pt-1", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => setOpen(false),
            className: "px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition-colors",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            disabled: submitting,
            className: "bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white font-semibold px-5 py-2 rounded-lg text-sm transition-colors",
            children: submitting ? "Submitting…" : "Add Contractor"
          }
        )
      ] })
    ] })
  ] });
}
function StarRating({
  value,
  onChange
}) {
  const [hovered, setHovered] = useState(0);
  const display = hovered || value;
  return /* @__PURE__ */ jsx("div", { className: "flex gap-0.5", children: [1, 2, 3, 4, 5].map((star) => /* @__PURE__ */ jsx(
    "button",
    {
      type: "button",
      onClick: () => onChange?.(star),
      onMouseEnter: () => onChange && setHovered(star),
      onMouseLeave: () => onChange && setHovered(0),
      className: `text-xl leading-none transition-colors ${star <= display ? "text-amber-400" : "text-gray-300"} ${onChange ? "cursor-pointer hover:scale-110" : "cursor-default"}`,
      "aria-label": `${star} star${star > 1 ? "s" : ""}`,
      children: "★"
    },
    star
  )) });
}
const SPECIALTY_COLORS = {
  Plumbing: "bg-blue-100 text-blue-700",
  Electrical: "bg-yellow-100 text-yellow-700",
  Carpentry: "bg-orange-100 text-orange-700",
  Painting: "bg-pink-100 text-pink-700",
  Landscaping: "bg-green-100 text-green-700",
  HVAC: "bg-sky-100 text-sky-700",
  "General Handyman": "bg-purple-100 text-purple-700",
  Other: "bg-gray-100 text-gray-600"
};
function ContractorCard({ contractor, reviews, onAddReview }) {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const avgRating = reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : null;
  const visibleReviews = showAllReviews ? reviews : reviews.slice(0, 2);
  const badgeClass = SPECIALTY_COLORS[contractor.specialty] || "bg-gray-100 text-gray-600";
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!rating) return;
    setSubmitting(true);
    onAddReview(contractor.id, rating, comment);
    setRating(0);
    setComment("");
    setSubmitting(false);
    setShowReviewForm(false);
  };
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow p-5 flex flex-col gap-3", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-2", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "font-bold text-gray-900 text-lg leading-tight", children: contractor.name }),
        /* @__PURE__ */ jsx(
          "span",
          {
            className: `inline-block mt-1 text-xs font-semibold px-2.5 py-0.5 rounded-full ${badgeClass}`,
            children: contractor.specialty
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "text-right shrink-0", children: avgRating !== null ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-end gap-0.5", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsx("span", { className: "text-amber-400 text-base", children: "★" }),
          /* @__PURE__ */ jsx("span", { className: "font-bold text-gray-800 text-sm", children: avgRating.toFixed(1) })
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "text-xs text-gray-400", children: [
          reviews.length,
          " review",
          reviews.length !== 1 ? "s" : ""
        ] })
      ] }) : /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 italic", children: "No reviews yet" }) })
    ] }),
    /* @__PURE__ */ jsxs(
      "a",
      {
        href: `tel:${contractor.phone}`,
        className: "flex items-center gap-2 text-emerald-700 hover:text-emerald-900 font-medium text-sm w-fit",
        children: [
          /* @__PURE__ */ jsx("span", { children: "📞" }),
          contractor.phone
        ]
      }
    ),
    contractor.notes && /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 leading-relaxed border-t border-gray-50 pt-2", children: contractor.notes }),
    reviews.length > 0 && /* @__PURE__ */ jsxs("div", { className: "border-t border-gray-100 pt-3 space-y-2", children: [
      visibleReviews.map((r) => /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 rounded-xl p-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
          /* @__PURE__ */ jsx(StarRating, { value: r.rating }),
          /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400", children: new Date(r.createdAt).toLocaleDateString() })
        ] }),
        r.comment && /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-700", children: r.comment })
      ] }, r.id)),
      reviews.length > 2 && /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setShowAllReviews(!showAllReviews),
          className: "text-xs text-emerald-600 hover:text-emerald-800 font-medium",
          children: showAllReviews ? "Show less" : `Show ${reviews.length - 2} more review${reviews.length - 2 !== 1 ? "s" : ""}`
        }
      )
    ] }),
    showReviewForm ? /* @__PURE__ */ jsxs(
      "form",
      {
        onSubmit: handleReviewSubmit,
        className: "border-t border-gray-100 pt-3 space-y-2",
        children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-gray-700 mb-1", children: "Your rating *" }),
            /* @__PURE__ */ jsx(StarRating, { value: rating, onChange: setRating })
          ] }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              value: comment,
              onChange: (e) => setComment(e.target.value),
              rows: 2,
              placeholder: "Optional comment…",
              className: "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300 resize-none"
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-2 justify-end", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => setShowReviewForm(false),
                className: "text-xs text-gray-500 hover:text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-100",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                disabled: !rating || submitting,
                className: "bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-semibold px-4 py-1.5 rounded-lg transition-colors",
                children: "Submit Review"
              }
            )
          ] })
        ]
      }
    ) : /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => setShowReviewForm(true),
        className: "text-xs text-emerald-600 hover:text-emerald-800 font-medium mt-auto self-start",
        children: "+ Leave a review"
      }
    )
  ] });
}
const LS_CONTRACTORS = "ncd_contractors";
const LS_REVIEWS = "ncd_reviews";
const SEED_CONTRACTORS = [
  {
    id: "seed-1",
    name: "Mike Torres",
    phone: "(555) 234-5678",
    specialty: "Plumbing",
    notes: "Fixed our burst pipe same-day. Very professional and fair pricing.",
    submittedAt: "2024-01-15T10:00:00Z"
  },
  {
    id: "seed-2",
    name: "Sara Chen",
    phone: "(555) 876-5432",
    specialty: "Electrical",
    notes: "Licensed electrician, great for panel upgrades and EV chargers.",
    submittedAt: "2024-02-01T10:00:00Z"
  },
  {
    id: "seed-3",
    name: "Dave Kowalski",
    phone: "(555) 345-6789",
    specialty: "Carpentry",
    notes: "Custom decks and fences. Always on time.",
    submittedAt: "2024-03-10T10:00:00Z"
  }
];
const SEED_REVIEWS = [
  {
    id: "sr-1",
    contractorId: "seed-1",
    rating: 5,
    comment: "Showed up within 2 hours, fixed everything perfectly!",
    createdAt: "2024-02-10T10:00:00Z"
  },
  {
    id: "sr-2",
    contractorId: "seed-1",
    rating: 4,
    comment: "Good work, slightly pricey but worth it.",
    createdAt: "2024-03-05T10:00:00Z"
  },
  {
    id: "sr-3",
    contractorId: "seed-2",
    rating: 5,
    comment: "Did a fantastic job upgrading our panel.",
    createdAt: "2024-02-20T10:00:00Z"
  }
];
function loadFromStorage(key, seed) {
  if (typeof window === "undefined") return seed;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return seed;
    return JSON.parse(raw);
  } catch {
    return seed;
  }
}
function saveToStorage(key, value) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}
function ContractorDirectory() {
  const [contractors, setContractors] = useState(
    () => loadFromStorage(LS_CONTRACTORS, SEED_CONTRACTORS)
  );
  const [reviews, setReviews] = useState(
    () => loadFromStorage(LS_REVIEWS, SEED_REVIEWS)
  );
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  useEffect(() => {
    saveToStorage(LS_CONTRACTORS, contractors);
  }, [contractors]);
  useEffect(() => {
    saveToStorage(LS_REVIEWS, reviews);
  }, [reviews]);
  const handleAddContractor = (data) => {
    const newContractor = {
      id: `c-${Date.now()}`,
      ...data,
      submittedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    setContractors((prev) => [newContractor, ...prev]);
  };
  const handleAddReview = (contractorId, rating, comment) => {
    const newReview = {
      id: `r-${Date.now()}`,
      contractorId,
      rating,
      comment,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    setReviews((prev) => [newReview, ...prev]);
  };
  const filteredContractors = useMemo(() => {
    const q = search.toLowerCase().trim();
    return contractors.filter((c) => {
      const matchesTab = activeTab === "All" || c.specialty === activeTab;
      if (!matchesTab) return false;
      if (!q) return true;
      return c.name.toLowerCase().includes(q) || c.specialty.toLowerCase().includes(q) || c.phone.includes(q) || (c.notes?.toLowerCase().includes(q) ?? false);
    });
  }, [contractors, activeTab, search]);
  const tabs = ["All", ...SPECIALTIES];
  const countFor = (tab) => tab === "All" ? contractors.length : contractors.filter((c) => c.specialty === tab).length;
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gradient-to-b from-emerald-50 to-white", children: [
    /* @__PURE__ */ jsx("div", { className: "bg-emerald-700 text-white py-10 px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "text-5xl mb-3", children: "🏘️" }),
      /* @__PURE__ */ jsx("h1", { className: "text-3xl sm:text-4xl font-extrabold mb-2 tracking-tight", children: "Neighbor's Contractor Directory" }),
      /* @__PURE__ */ jsx("p", { className: "text-emerald-100 text-base sm:text-lg max-w-xl mx-auto", children: "Trusted local contractors recommended by your neighbors. Find reliable help or share someone great." })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-4 py-8 space-y-6", children: [
      /* @__PURE__ */ jsx(SubmitContractorForm, { onAdded: handleAddContractor }),
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg", children: "🔍" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "search",
            placeholder: "Search by name, specialty, or keyword…",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            className: "w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm bg-white"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: tabs.map((tab) => {
        const count = countFor(tab);
        const isActive = activeTab === tab;
        return /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setActiveTab(tab),
            className: `px-3 py-1.5 rounded-full text-sm font-medium transition-colors border ${isActive ? "bg-emerald-600 text-white border-emerald-600 shadow-sm" : "bg-white text-gray-600 border-gray-200 hover:border-emerald-300 hover:text-emerald-700"}`,
            children: [
              tab,
              /* @__PURE__ */ jsx(
                "span",
                {
                  className: `ml-1.5 text-xs font-normal ${isActive ? "text-emerald-200" : "text-gray-400"}`,
                  children: count
                }
              )
            ]
          },
          tab
        );
      }) }),
      filteredContractors.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "text-center py-16 text-gray-400", children: [
        /* @__PURE__ */ jsx("div", { className: "text-4xl mb-3", children: "🔧" }),
        /* @__PURE__ */ jsx("p", { className: "font-medium", children: "No contractors found." }),
        search && /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setSearch(""),
            className: "mt-2 text-sm text-emerald-600 hover:underline",
            children: "Clear search"
          }
        )
      ] }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: filteredContractors.map((contractor) => /* @__PURE__ */ jsx(
        ContractorCard,
        {
          contractor,
          reviews: reviews.filter(
            (r) => r.contractorId === contractor.id
          ),
          onAddReview: handleAddReview
        },
        contractor.id
      )) }),
      /* @__PURE__ */ jsx("p", { className: "text-center text-xs text-gray-400 pt-4", children: "Know a great contractor? Submit their info to help your neighbors." })
    ] })
  ] });
}
const SplitComponent = ContractorDirectory;
export {
  SplitComponent as component
};
