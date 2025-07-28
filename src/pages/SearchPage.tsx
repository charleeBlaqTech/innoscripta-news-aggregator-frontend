import { useEffect, useState } from "react";
import { Toast } from "../components/Toast";
import Loader from "../components/Loader";
import { useToast } from "../hooks/useToast";
import { searchArticles } from "../api/articles";
import { fetchPreferencesOptions } from "../api/preferences";
import { ArticleCard } from "../components/ArticleCard";

type Article = {
  id: number;
  title: string;
  summary: string;
  url: string;
  published_at: string;
  author: { name: string };
  source: { name: string };
};

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);

  const [sources, setSources] = useState<{ id: number; name: string }[]>([]);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [selectedSource, setSelectedSource] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const { showToast, closeToast, message } = useToast();

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const res = await fetchPreferencesOptions();
        setSources(res.data.sources || []);
        setCategories(res?.data?.categories || []);
      } catch (err) {
        console.error("Failed to load options", err);
      }
    };
    fetchOptions();
  }, []);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);

    const cleanParams = Object.fromEntries(
      Object.entries({
        q: query,
        source_id: selectedSource || undefined,
        category_id: selectedCategory || undefined,
        from_date: fromDate || undefined,
        to_date: toDate || undefined,
        page: 1,
        per_page: 10,
      }).filter(([_, v]) => v !== undefined)
    );

    try {
      const res = await searchArticles(cleanParams);
      setResults(res?.data?.data || []);
    } catch (err) {
      console.error("Search failed", err);
      showToast("Search failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="search-container">
        <h1 className="page-title">Search Articles</h1>

        <div className="search-filters">
          <input
            type="text"
            placeholder="Enter keyword..."
            className="input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <select className="input" value={selectedSource} onChange={(e) => setSelectedSource(e.target.value)}>
            <option value="">All Sources</option>
            {sources.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>

          <select className="input" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          <input type="date" className="input" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
          <input type="date" className="input" value={toDate} onChange={(e) => setToDate(e.target.value)} />

          <button disabled={loading} onClick={handleSearch} className="btn-primary">
            Search
          </button>
        </div>

        {loading ? (
          <Loader message="Searching..." />
        ) : results.length > 0 ? (
          <div className="article-results">
            {results.map((article) => (
              <ArticleCard
                key={article.id}
                id={article.id}
                title={article.title}
                content={article.summary}
                url={article.url}
                author={article.author?.name || "Unknown"}
                source={article.source?.name || "Unknown"}
                publishedAt={article.published_at}
              />
            ))}
          </div>
        ) : (
          query && <p className="empty-state">No results found for "{query}"</p>
        )}
      </div>
      {message && <Toast message={message} onClose={closeToast} />}
    </>
  );
}