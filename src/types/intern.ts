
export interface InternData {
  id: string;
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  startDate: string;
  endDate: string;
  status: string;
  completion?: number;
  photo?: string;
  gender?: string;
}

export type CreateInternData = Omit<InternData, 'id'>;
export type UpdateInternData = Partial<InternData>;
