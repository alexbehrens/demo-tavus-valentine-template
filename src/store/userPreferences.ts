import { atom } from "jotai";

export interface UserPreferences {
  name: string;
  language: string;
  context: string;
  apiKey: string | null;
}

// Get initial preferences from localStorage
const getInitialPreferences = (): UserPreferences => {
  const savedPreferences = localStorage.getItem('tavus-settings');
  const savedApiKey = localStorage.getItem('tavus-token');
  
  const defaultPreferences: UserPreferences = {
    name: '',
    language: 'en',
    context: '',
    apiKey: savedApiKey
  };

  if (savedPreferences) {
    const parsed = JSON.parse(savedPreferences);
    return {
      ...defaultPreferences,
      ...parsed,
    };
  }

  return defaultPreferences;
};

export const userPreferencesAtom = atom<UserPreferences>(getInitialPreferences()); 