export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      accounts: {
        Row: {
          account_id: string | null;
          account_name: string | null;
          account_email: string | null;
          account_phone: string | null;
          account_birthday: string | null;
          location_id: number | null;
          account_avatar: string | null;
        };
        Insert: {
          account_id: string | null;
          account_name?: string | null;
          account_email?: string | null;
          account_phone?: string | null;
          account_birthday?: string | null;
          location_id?: number | null;
          account_avatar?: string | null;
        };
        Update: {
          account_id?: string | null;
          account_name?: string | null;
          account_email?: string | null;
          account_phone?: string | null;
          account_birthday?: string | null;
          location_id?: number | null;
          account_avatar?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
