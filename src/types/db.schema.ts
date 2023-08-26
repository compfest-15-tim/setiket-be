export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      events: {
        Row: {
          booked: number;
          capacity: number;
          category: string | null;
          created_at: string;
          date: string;
          description: string;
          id: string;
          images: string[];
          location: string;
          organizerId: string | null;
          price: number;
          status: Database['public']['Enums']['status'];
          title: string;
        };
        Insert: {
          booked?: number;
          capacity: number;
          category?: string | null;
          created_at?: string;
          date: string;
          description: string;
          id?: string;
          images: string[];
          location: string;
          organizerId?: string | null;
          price: number;
          status?: Database['public']['Enums']['status'];
          title: string;
        };
        Update: {
          booked?: number;
          capacity?: number;
          category?: string | null;
          created_at?: string;
          date?: string;
          description?: string;
          id?: string;
          images?: string[];
          location?: string;
          organizerId?: string | null;
          price?: number;
          status?: Database['public']['Enums']['status'];
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'events_organizerId_fkey';
            columns: ['organizerId'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      notifications: {
        Row: {
          created_at: string;
          description: string;
          id: string;
          is_seen: boolean;
          redirect_link: string;
          title: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          description: string;
          id?: string;
          is_seen?: boolean;
          redirect_link?: string;
          title: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          description?: string;
          id?: string;
          is_seen?: boolean;
          redirect_link?: string;
          title?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      transactions: {
        Row: {
          amount: number;
          created_at: string;
          event_id: string;
          id: string;
          user_id: string;
        };
        Insert: {
          amount: number;
          created_at?: string;
          event_id: string;
          id?: string;
          user_id: string;
        };
        Update: {
          amount?: number;
          created_at?: string;
          event_id?: string;
          id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'transactions_event_id_fkey';
            columns: ['event_id'];
            referencedRelation: 'events';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'transactions_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      users: {
        Row: {
          balance: number | null;
          created_at: string | null;
          email: string;
          full_name: string;
          id: string;
          role: Database['public']['Enums']['role'];
          status: Database['public']['Enums']['status'];
          updated_at: string | null;
        };
        Insert: {
          balance?: number | null;
          created_at?: string | null;
          email: string;
          full_name: string;
          id: string;
          role: Database['public']['Enums']['role'];
          status: Database['public']['Enums']['status'];
          updated_at?: string | null;
        };
        Update: {
          balance?: number | null;
          created_at?: string | null;
          email?: string;
          full_name?: string;
          id?: string;
          role?: Database['public']['Enums']['role'];
          status?: Database['public']['Enums']['status'];
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'users_id_fkey';
            columns: ['id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      role: 'CUSTOMER' | 'EVENT_ORGANIZER' | 'ADMIN';
      status: 'VERIFIED' | 'PENDING' | 'REJECTED';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export enum StatusEnum {
  VERIFIED = 'VERIFIED',
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
}
