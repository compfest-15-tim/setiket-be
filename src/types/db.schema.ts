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
      Event: {
        Row: {
          createdAt: string | null;
          eventDate: string | null;
          eventName: string | null;
          id: string;
          imageUrl: string[] | null;
          location: string | null;
          organizerId: string | null;
          updatedAt: string | null;
        };
        Insert: {
          createdAt?: string | null;
          eventDate?: string | null;
          eventName?: string | null;
          id?: string;
          imageUrl?: string[] | null;
          location?: string | null;
          organizerId?: string | null;
          updatedAt?: string | null;
        };
        Update: {
          createdAt?: string | null;
          eventDate?: string | null;
          eventName?: string | null;
          id?: string;
          imageUrl?: string[] | null;
          location?: string | null;
          organizerId?: string | null;
          updatedAt?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "Event_organizerId_fkey";
            columns: ["organizerId"];
            referencedRelation: "User";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "fk_Event_User";
            columns: ["organizerId"];
            referencedRelation: "User";
            referencedColumns: ["id"];
          }
        ];
      };
      Notification: {
        Row: {
          createdAt: string | null;
          id: string;
          isSeen: boolean | null;
          message: string | null;
          updatedAt: string | null;
          userId: string | null;
        };
        Insert: {
          createdAt?: string | null;
          id?: string;
          isSeen?: boolean | null;
          message?: string | null;
          updatedAt?: string | null;
          userId?: string | null;
        };
        Update: {
          createdAt?: string | null;
          id?: string;
          isSeen?: boolean | null;
          message?: string | null;
          updatedAt?: string | null;
          userId?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "fk_Notification_User";
            columns: ["userId"];
            referencedRelation: "User";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Notification_userId_fkey";
            columns: ["userId"];
            referencedRelation: "User";
            referencedColumns: ["id"];
          }
        ];
      };
      Order: {
        Row: {
          createdAt: string | null;
          id: string;
          quantity: number | null;
          ticketId: string | null;
          totalPrice: number | null;
          updatedAt: string | null;
          userId: string | null;
        };
        Insert: {
          createdAt?: string | null;
          id?: string;
          quantity?: number | null;
          ticketId?: string | null;
          totalPrice?: number | null;
          updatedAt?: string | null;
          userId?: string | null;
        };
        Update: {
          createdAt?: string | null;
          id?: string;
          quantity?: number | null;
          ticketId?: string | null;
          totalPrice?: number | null;
          updatedAt?: string | null;
          userId?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "fk_Order_Ticket";
            columns: ["ticketId"];
            referencedRelation: "Ticket";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "fk_Order_User";
            columns: ["userId"];
            referencedRelation: "User";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Order_ticketId_fkey";
            columns: ["ticketId"];
            referencedRelation: "Ticket";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Order_userId_fkey";
            columns: ["userId"];
            referencedRelation: "User";
            referencedColumns: ["id"];
          }
        ];
      };
      Ticket: {
        Row: {
          available: number | null;
          createdAt: string | null;
          eventId: string | null;
          id: string;
          price: number | null;
          ticketType: string | null;
          updatedAt: string | null;
        };
        Insert: {
          available?: number | null;
          createdAt?: string | null;
          eventId?: string | null;
          id?: string;
          price?: number | null;
          ticketType?: string | null;
          updatedAt?: string | null;
        };
        Update: {
          available?: number | null;
          createdAt?: string | null;
          eventId?: string | null;
          id?: string;
          price?: number | null;
          ticketType?: string | null;
          updatedAt?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "fk_Ticket_Event";
            columns: ["eventId"];
            referencedRelation: "Event";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Ticket_eventId_fkey";
            columns: ["eventId"];
            referencedRelation: "Event";
            referencedColumns: ["id"];
          }
        ];
      };
      User: {
        Row: {
          balance: number | null;
          createdAt: string | null;
          email: string;
          full_name: string | null;
          id: string;
          imageUrl: string | null;
          password: string;
          role: Database["public"]["Enums"]["Role"] | null;
          status: Database["public"]["Enums"]["Status"] | null;
          updatedAt: string | null;
        };
        Insert: {
          balance?: number | null;
          createdAt?: string | null;
          email: string;
          full_name?: string | null;
          id: string;
          imageUrl?: string | null;
          password: string;
          role?: Database["public"]["Enums"]["Role"] | null;
          status?: Database["public"]["Enums"]["Status"] | null;
          updatedAt?: string | null;
        };
        Update: {
          balance?: number | null;
          createdAt?: string | null;
          email?: string;
          full_name?: string | null;
          id?: string;
          imageUrl?: string | null;
          password?: string;
          role?: Database["public"]["Enums"]["Role"] | null;
          status?: Database["public"]["Enums"]["Status"] | null;
          updatedAt?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "User_id_fkey";
            columns: ["id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
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
      Role: "CUSTOMER" | "EVENT_ORGANIZER" | "ADMIN";
      Status: "VERIFIED" | "PENDING" | "REJECTED";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

// Schema: public
// Enums
export enum Role {
  CUSTOMER = "CUSTOMER",
  EVENT_ORGANIZER = "EVENT_ORGANIZER",
  ADMIN = "ADMIN",
}

export enum Status {
  VERIFIED = "VERIFIED",
  PENDING = "PENDING",
  REJECTED = "REJECTED",
}

// Tables
export type Event = Database["public"]["Tables"]["Event"]["Row"];

export type Notification = Database["public"]["Tables"]["Notification"]["Row"];

export type Order = Database["public"]["Tables"]["Order"]["Row"];

export type Ticket = Database["public"]["Tables"]["Ticket"]["Row"];

export type User = Database["public"]["Tables"]["User"]["Row"];
