
import { InternData } from "@/types/intern";

export const transformDbInternToInternData = (dbIntern: any): InternData => ({
  id: dbIntern.id,
  firstName: dbIntern.first_name,
  lastName: dbIntern.last_name,
  title: dbIntern.title,
  email: dbIntern.email,
  startDate: dbIntern.start_date,
  endDate: dbIntern.end_date,
  status: dbIntern.status,
  completion: dbIntern.completion || 0,
  photo: dbIntern.photo || '',
  gender: dbIntern.gender || ''
});

export const transformInternDataToDbFormat = (internData: Partial<InternData>) => ({
  first_name: internData.firstName,
  last_name: internData.lastName,
  title: internData.title,
  email: internData.email,
  start_date: internData.startDate,
  end_date: internData.endDate,
  status: internData.status,
  completion: internData.completion || 0,
  photo: internData.photo || '',
  gender: internData.gender || ''
});
