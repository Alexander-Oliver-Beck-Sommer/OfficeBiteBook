export interface DishProps {
  dish_id?: string;
  user_id?: string;
  menu_id?: string[];
  title?: string;
  subtitle?: string;
  description?: string;
  recipe?: string;
  thumbnail_url?: string;
  thumbnail_file?: File;
  created_at?: string;
}
