import { atom } from "jotai";

export interface Settings {
  conversational_context?: string;
  persona_id?: string;
  greeting?: string;
  name?: string;
  language?: string;
  interruptSensitivity?: string;
  context?: string;
  persona?: string;
  replica?: string;
}

export const settingsAtom = atom<Settings>({});
export const settingsSavedAtom = atom(false); 