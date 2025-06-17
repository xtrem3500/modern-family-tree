
import { z } from 'zod';

export const familyRegistrationSchema = z.object({
  email: z.string().email("Veuillez entrer une adresse email valide"),
  password: z.string().min(4, "Le mot de passe doit contenir au moins 4 caractères"),
  firstName: z.string().min(1, "Le prénom est requis"),
  lastName: z.string().min(1, "Le nom est requis"),
  phone: z.string().optional(),
  country: z.string().optional(),
  birthDate: z.string().optional(),
  birthPlace: z.string().optional(),
  currentLocation: z.string().optional(),
  title: z.string().min(1, "Le titre est requis"),
  situation: z.string().optional(),
  profession: z.string().optional(),
  photoUrl: z.string().optional(),
  father_id: z.string().optional(),
  mother_id: z.string().optional(),
  isAdmin: z.boolean().default(false),
});

export const loginSchema = z.object({
  email: z.string().email("Veuillez entrer une adresse email valide"),
  password: z.string().min(1, "Le mot de passe est requis"),
});

export const updateProfileSchema = z.object({
  firstName: z.string().min(1, "Le prénom est requis"),
  lastName: z.string().min(1, "Le nom est requis"),
  phone: z.string().optional(),
  country: z.string().optional(),
  title: z.string().min(1, "Le titre est requis"),
  birthDate: z.string().optional(),
  birthPlace: z.string().optional(),
  currentLocation: z.string().optional(),
  situation: z.string().optional(),
  profession: z.string().optional(),
  photoUrl: z.string().optional(),
});

export type FamilyRegistrationData = z.infer<typeof familyRegistrationSchema>;
export type LoginData = z.infer<typeof loginSchema>;
export type UpdateProfileData = z.infer<typeof updateProfileSchema>;
