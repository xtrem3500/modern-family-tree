
import { Database } from '@/integrations/supabase/types';

export interface FamilyMember {
  id: string;
  firstName: string;
  lastName: string;
  title: Database['public']['Enums']['family_title'];
  birthDate?: string;
  birthPlace?: string;
  currentLocation?: string;
  phone?: string;
  email: string;
  photoUrl?: string;
  avatarUrl?: string;
  fatherId?: string;
  motherId?: string;
  spouseId?: string;
  children?: string[];
  situation?: string;
  profession?: string;
  createdAt: string;
  updatedAt: string;
}

export interface FamilyRelation {
  id: string;
  type: 'father' | 'mother' | 'spouse' | 'child' | 'sibling';
  fromMemberId: string;
  toMemberId: string;
  createdAt: string;
}

export interface Family {
  id: string;
  name: string;
  patriarchId: string;
  members: FamilyMember[];
  relations: FamilyRelation[];
  createdAt: string;
  updatedAt: string;
}
