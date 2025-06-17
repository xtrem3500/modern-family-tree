
export interface Profile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  country?: string;
  title: string;
  photoUrl?: string;
  birthDate?: string;
  birthPlace?: string;
  currentLocation?: string;
  situation?: string;
  profession?: string;
  isAdmin: boolean;
  isPatriarch: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfileData {
  firstName?: string;
  lastName?: string;
  phone?: string;
  country?: string;
  title?: string;
  photoUrl?: string;
  birthDate?: string;
  birthPlace?: string;
  currentLocation?: string;
  situation?: string;
  profession?: string;
}
