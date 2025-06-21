
import { supabase } from "@/integrations/supabase/client";
import { InternData, CreateInternData, UpdateInternData } from "@/types/intern";
import { transformDbInternToInternData, transformInternDataToDbFormat } from "@/utils/internDataTransforms";

export const fetchInternsFromDb = async (): Promise<InternData[]> => {
  const { data, error } = await supabase
    .from('interns')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;

  return data?.map(transformDbInternToInternData) || [];
};

export const createInternInDb = async (internData: CreateInternData): Promise<InternData> => {
  const { data, error } = await supabase
    .from('interns')
    .insert([transformInternDataToDbFormat(internData)])
    .select()
    .single();

  if (error) throw error;

  return transformDbInternToInternData(data);
};

export const updateInternInDb = async (internId: string, internData: UpdateInternData): Promise<InternData> => {
  const { data, error } = await supabase
    .from('interns')
    .update(transformInternDataToDbFormat(internData))
    .eq('id', internId)
    .select()
    .single();

  if (error) throw error;

  return transformDbInternToInternData(data);
};

export const deleteInternFromDb = async (internId: string): Promise<void> => {
  const { error } = await supabase
    .from('interns')
    .delete()
    .eq('id', internId);

  if (error) throw error;
};
