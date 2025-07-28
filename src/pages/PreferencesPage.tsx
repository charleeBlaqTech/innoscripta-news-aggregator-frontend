import { useEffect, useState } from "react";
import { Toast } from "../components/Toast";
import Loader from "../components/Loader";
import { useToast } from "../hooks/useToast";
import {
  savePreferences,
  fetchPreferencesOptions,
  getUserPreferences,
} from "../api/preferences";

type Option = {
  id: number;
  name: string;
};

export default function PreferencesPage() {
  const [sources, setSources] = useState<Option[]>([]);
  const [categories, setCategories] = useState<Option[]>([]);
  const [authors, setAuthors] = useState<Option[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const { showToast, closeToast, message } = useToast();

  const [selected, setSelected] = useState({
    preferred_source_id: null,
    preferred_category_id: null,
    preferred_author_id: null,
  });


  useEffect(() => {
    // I made sure the page auto populate the user existing preferences, while also loading preference options from db======
    const fetchOptionsAndUserPrefs = async () => {
      setLoading(true);
      try {
        const [optionsRes, userPrefsRes] = await Promise.all([
          fetchPreferencesOptions(),
          getUserPreferences(),
        ]);

        setSources(optionsRes.data.sources || []);
        setCategories(optionsRes.data.categories || []);
        setAuthors(optionsRes.data.authors || []);

        const prefs = userPrefsRes.data;

        if (prefs) {
          setSelected({
            preferred_source_id: prefs.preferred_source?.id || null,
            preferred_category_id: prefs.preferred_category?.id || null,
            preferred_author_id: prefs.preferred_author?.id || null,
          });
        }
      } catch (err) {
        console.error("Failed to load preferences", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOptionsAndUserPrefs();
  }, []);

  // const handleSelect = (groupKey: keyof typeof selected, value: number) => {
  //   setSelected((prev) => ({ ...prev, [groupKey]: value }));
  // };

  const handleSave = async () => {
    setSaving(true);
    try {
      await savePreferences(selected);
      showToast("Preferences saved successfully!");
    } catch (err) {
      console.error(err);
      showToast("Failed to save preferences");
    } finally {
        setSaving(false);
    }
  };

  const renderGroup = (
  label: string,
  items: Option[],
  groupKey: keyof typeof selected
) => (
  <div className="preferences-group mb-6">
    <h2 className="preferences-label text-lg font-semibold mb-2">{label}</h2>
    <div className="preferences-options flex flex-wrap gap-2">
      {items.map((item) => {
        const isSelected = selected[groupKey] === item.id;

        return (
          <label
            key={item.id}
            className={`cursor-pointer px-4 py-2 border rounded-full transition-all ${
              isSelected
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
            }`}
          >
            <input
              type="checkbox"
              className="hidden"
              checked={isSelected}
              onChange={() =>
                setSelected((prev) => ({
                  ...prev,
                  [groupKey]: isSelected ? null : item.id,
                }))
              }
            />
            {item.name}
          </label>
        );
      })}
    </div>
  </div>
);


  return (
    <>
      <div className="preferences-container">
        <h1 className="page-title">Choose Your Preferences</h1>

        {loading ? (
          <Loader message="Loading options..." />
        ) : (
          <>
            {renderGroup("Sources", sources, "preferred_source_id")}
            {renderGroup("Categories", categories, "preferred_category_id")}
            {renderGroup("Authors", authors, "preferred_author_id")}

            <button onClick={handleSave}  disabled={saving} className="btn-primary">
              {saving ? 'Saving preferences ...' : 'Save Preferences'}
            </button>
          </>
        )}
      </div>
      {message && <Toast message={message} onClose={closeToast} />}
    </>
  );
}
