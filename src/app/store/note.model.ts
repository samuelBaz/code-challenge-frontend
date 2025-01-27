export interface Note {
  id: number;
  title: string;
  content: string;
  user: any;
  tags: string[];
  archived: boolean;
  deleted: boolean;
  pinned: boolean;
  updatedAt: Date
}