export const siteName = "SK Securities Private Limited";
export const siteDescription =
  "Financial education and market research designed to make complex ideas clearer.";

export function companyContact() {
  return {
    email: process.env.NEXT_PUBLIC_COMPANY_EMAIL || "reddykishor555@gmail.com",
    phone: process.env.NEXT_PUBLIC_COMPANY_PHONE || "9676914932",
    address: process.env.NEXT_PUBLIC_COMPANY_ADDRESS || "Rayadurg",
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || "",
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "",
  };
}
