export type ReviewDecision = "APPROVED" | "REJECTED";

export const isReviewDecision = (value: unknown): value is ReviewDecision => {
  return value === "APPROVED" || value === "REJECTED";
};
