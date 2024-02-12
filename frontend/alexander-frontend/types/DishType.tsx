export interface DishType {
  dish_id: string;
  menus_id: string[] | null;
  dish_title?: string | null;
  dish_subtitle?: string | null;
  dish_description?: string | null;
  dish_thumbnail_name?: string | null;
  dish_thumbnail_url?: string | null;
  dish_recipe?: string | null;
}
