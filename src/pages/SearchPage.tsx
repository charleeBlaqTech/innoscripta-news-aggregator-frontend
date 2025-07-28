import { useEffect, useState } from "react";
import { Toast } from "../components/Toast";
import Loader from "../components/Loader";
import { useToast } from "../hooks/useToast";
import { searchArticles } from "../api/articles";
import { fetchPreferencesOptions } from "../api/preferences";
import { ArticleCard } from "../components/ArticleCard";
import Pagination from "../components/Pagination";

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
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [sources, setSources] = useState<{ id: number; name: string }[]>([]);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );
  const [selectedSource, setSelectedSource] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const { showToast, closeToast, message } = useToast();

  const clearAllFilters = () => {
    setQuery("");
    setSelectedSource("");
    setSelectedCategory("");
    setFromDate("");
    setToDate("");
    setPage(1);
    setResults([]);
    setTotalPages(1);
  };

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
    const noFilters =
      !query.trim() &&
      !selectedSource &&
      !selectedCategory &&
      !fromDate &&
      !toDate;

    if (noFilters) {
      showToast("Please enter a keyword or select at least one filter.");
      return;
    }
    setLoading(true);

    const cleanParams = Object.fromEntries(
      Object.entries({
        q: query || undefined,
        source_id: selectedSource || undefined,
        category_id: selectedCategory || undefined,
        from_date: fromDate || undefined,
        to_date: toDate || undefined,
        page: page,
        per_page: 10,
      }).filter(([_, v]) => v !== undefined)
    );

    try {
      const res = await searchArticles(cleanParams);
      setResults(res?.data?.data || []);
      setTotalPages(res?.data?.last_page || 1);
    } catch (err) {
      console.error("Search failed", err);
      showToast("Search failed");
    } finally {
      setLoading(false);
    }
  };

  // TO RUN THE SEARCH WITH THE NEW PAGE REQUEST
  useEffect(() => {
    const hasQueryOrFilters =
      query.trim() || selectedSource || selectedCategory || fromDate || toDate;

    if (hasQueryOrFilters) {
      handleSearch();
    }
  }, [page]);

  useEffect(() => {
    setPage(1);
  }, [query, selectedSource, selectedCategory, fromDate, toDate]);

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

          <select
            className="input"
            value={selectedSource}
            onChange={(e) => setSelectedSource(e.target.value)}
          >
            <option value="">All Sources</option>
            {sources.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>

          <select
            className="input"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <input
            type="date"
            className="input"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
          <input
            type="date"
            className="input"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />

          <button
            disabled={loading}
            // onClick={handleSearch}
            onClick={() => {
              setPage(1);
              handleSearch();
            }}
            className="btn-primary"
          >
            Search
          </button>
          <button className="clear-button" onClick={clearAllFilters}>
            Clear All Filters
          </button>
        </div>

        {loading ? (
          <Loader message="Searching..." />
        ) : results.length > 0 ? (
          <>
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
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </>
        ) : (
          query && <p className="empty-state">No results found for "{query}"</p>
        )}
      </div>
      {message && <Toast message={message} onClose={closeToast} />}
    </>
  );
}
