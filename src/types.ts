export interface RawMessage {
  id: string;
  sender: string;
  text: string;
  timestamp: string;
  keyword: "BLOCKER" | "TO BE DONE" | "Completed" | "IN PROGRESS" | string;
}

export interface SegregatedResult {
  blockers: string[];
  toBeDone: string[];
  completed: string[];
  inProgress: string[];
  summary: string;
}

export interface Ticket {
  id: string; // e.g., "STND-20260620-01"
  sender: string;
  processedAt: string;
  rawMessages: RawMessage[];
  segregated: SegregatedResult;
}

export interface TeamMember {
  id: string;
  name: string;
  avatar: string;
  initialCount: number;
}
