export interface MenuProps {
  menu_id?: string;
  user_id?: string;
  title?: string;
  location?: string;
  date?: string;
  start_time?: string;
  end_time?: string;
  week?: number;
  dishes?: string[];
  accepted_participants?: string[];
  declined_participants?: string[];
  created_at?: string;
}
