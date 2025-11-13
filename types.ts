
export enum Page {
  Home,
  About,
  Apply,
}

export interface ApplicationFormData {
  name: string;
  age: string;
  city: string;
  phone: string;
  telegram: string;
}

export interface FormErrors {
  name?: string;
  age?: string;
  city?: string;
  phone?: string;
}