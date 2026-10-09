export const services = [
  {
    number: "01",
    title: "Equity Research",
    description:
      "Structured company and industry research that helps readers understand the factors behind a business.",
    icon: "chart",
  },
  {
    number: "02",
    title: "Fundamental Analysis",
    description:
      "A considered look at financial statements, business models, competitive position, and management.",
    icon: "layers",
  },
  {
    number: "03",
    title: "Technical Analysis",
    description:
      "Educational interpretation of price behaviour, volume, trends, and commonly used chart tools.",
    icon: "activity",
  },
  {
    number: "04",
    title: "Company Valuation",
    description:
      "Exploration of valuation methods, assumptions, and the uncertainty behind estimated business value.",
    icon: "scale",
  },
  {
    number: "05",
    title: "IPO Research",
    description:
      "A balanced review of offer documents, business fundamentals, issue structure, and risk factors.",
    icon: "building",
  },
  {
    number: "06",
    title: "Derivatives Education",
    description:
      "Clear explanations of derivative instruments, their mechanics, and the risks of leverage.",
    icon: "workflow",
  },
  {
    number: "07",
    title: "Sector Research",
    description:
      "Context on industry structure, important drivers, and developments across market sectors.",
    icon: "grid",
  },
  {
    number: "08",
    title: "Stock-Market Education",
    description:
      "Accessible learning resources that build financial understanding without promising outcomes.",
    icon: "book",
  },
] as const;

export const articles = [
  {
    slug: "reading-a-company-annual-report",
    category: "Fundamentals",
    title: "A practical framework for reading a company annual report",
    excerpt:
      "Learn how to approach the business overview, financial statements, notes, and risk disclosures in a structured way.",
    date: "2025-01-15",
    author: "SK Securities Editorial",
    readTime: "7 min read",
    content: [
      "An annual report brings together a company’s account of its business, financial performance, governance, and risks. It is a useful starting point for learning about a business—but it is not a substitute for independent research.",
      "Begin with the business overview and management discussion. Identify how the company earns revenue, what drives costs, and which factors could change demand. Compare the narrative with the audited financial statements rather than treating projections as facts.",
      "Review cash flows alongside reported profit, read the notes for accounting assumptions and related-party transactions, and give the risk section careful attention. Every ratio and valuation depends on context, assumptions, and the quality of the underlying information.",
      "This demonstration article is for general financial education only. It is not current company research, investment advice, or a recommendation to buy or sell any security.",
    ],
  },
  {
    slug: "understanding-market-volatility",
    category: "Market basics",
    title: "Understanding market volatility without losing perspective",
    excerpt:
      "A plain-language guide to what volatility measures, what it cannot tell you, and why time horizon matters.",
    date: "2025-01-08",
    author: "SK Securities Editorial",
    readTime: "5 min read",
    content: [
      "Volatility describes how widely a price has moved over a particular period. It can help describe uncertainty, but it does not say whether an investment is suitable for a particular person or predict where prices will go next.",
      "A short burst of price movement can look very different over a longer period. Always check the time window and the measure being used before comparing volatility figures.",
      "This demonstration article is educational content only. It is not live market commentary, investment advice, or a recommendation to buy or sell any security.",
    ],
  },
  {
    slug: "ipo-offer-document-checklist",
    category: "IPO education",
    title: "An educational checklist for exploring an IPO offer document",
    excerpt:
      "Key sections learners may review when understanding an offer document, from use of proceeds to material risks.",
    date: "2024-12-19",
    author: "SK Securities Editorial",
    readTime: "6 min read",
    content: [
      "An offer document contains detailed disclosures about an issuer and an offering. Readers learning to interpret one can start by locating the business overview, objects of the issue, financial information, promoter details, and material risk factors.",
      "Consider whether proceeds are directed to the company or to selling shareholders, and understand that disclosed plans and risk factors do not determine future performance. Cross-check information with official exchange and regulator filings.",
      "This demonstration article is not research on an actual IPO or offering, and it does not make a listing-gain prediction or investment recommendation.",
    ],
  },
] as const;

export const ipoEducationSections = [
  {
    title: "Upcoming offerings",
    text: "No verified IPO schedule is connected. Dates and offer details will appear only after a reliable data source is configured and checked.",
  },
  {
    title: "Currently open",
    text: "There are no verified open-issue details to display. Please consult official exchange and issuer documents for current information.",
  },
  {
    title: "Recently listed",
    text: "Recent listing data is not connected. This page does not estimate or guarantee listing performance.",
  },
] as const;
