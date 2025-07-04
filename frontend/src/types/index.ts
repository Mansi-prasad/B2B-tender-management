export interface Company {
  id: string;
  name: string;
  industry: string;
  description: string;
  logoUrl?: string;
  products: string[];
}

export interface Tender {
  id: string;
  title: string;
  description: string;
  deadline: string;
  createdBy: string; // Company ID
}
