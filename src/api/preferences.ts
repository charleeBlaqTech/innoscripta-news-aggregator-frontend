import { api } from "./axios";

export const fetchPreferencesOptions = () => api.get("/preferences/options");

export const getUserPreferences = () => api.get("/preferences");

export const savePreferences = (prefs: {
  preferred_source_id: number | null;
  preferred_category_id: number | null;
  preferred_author_id: number | null;
}) => api.post("/preferences", prefs);
