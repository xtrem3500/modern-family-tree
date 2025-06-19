
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { FamilyMember } from '@/types/family';

export const useFamilyMembers = () => {
  const [members, setMembers] = useState<FamilyMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMembers = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { data: profiles, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: true });

      if (fetchError) {
        throw fetchError;
      }

      if (profiles && profiles.length > 0) {
        const familyMembers: FamilyMember[] = profiles.map(profile => ({
          id: profile.id,
          firstName: profile.first_name,
          lastName: profile.last_name,
          title: profile.title || 'Membre',
          birthDate: profile.birth_date || '',
          birthPlace: profile.birth_place || '',
          currentLocation: profile.current_location || '',
          phone: profile.phone || '',
          email: profile.email,
          photoUrl: profile.photo_url || '',
          avatarUrl: profile.avatar_url || '',
          fatherId: profile.father_id || '',
          motherId: profile.mother_id || '',
          situation: profile.situation || '',
          profession: profile.situation || '',
          createdAt: profile.created_at,
          updatedAt: profile.updated_at
        }));
        
        setMembers(familyMembers);
      } else {
        setMembers([]);
      }
    } catch (err) {
      console.error('Error fetching family members:', err);
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des membres');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return {
    members,
    isLoading,
    error,
    refetch: fetchMembers
  };
};
