export interface CompanyAbouteDTO {
    id: string;
    username: string;
    email: string;
    phone_number?: string | null;
    address?: string | null;
    created_at: string;
    updated_at: string;
  }