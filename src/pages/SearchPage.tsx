// import { useEffect, useState } from "react";
// import { api } from "../api/axios";
// import { Toast } from "../components/Toast";
// import Loader from "../components/Loader";
// import { useToast } from "../hooks/useToast";
// import { searchArticles } from "../api/articles";
// import { ArticleCard } from "../components/ArticleCard";

// type Article = {
//   id: number;
//   title: string;
//   summary: string;
//   url: string;
//   published_at: string;
//   author: { name: string };
//   source: { name: string };
// };

// export default function SearchPage() {
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState<Article[]>([]);
//   const [loading, setLoading] = useState(false);

//   const [sources, setSources] = useState<{ id: number; name: string }[]>([]);
//   const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
//   const [selectedSource, setSelectedSource] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");

//   const { showToast, closeToast, message } = useToast();

//   useEffect(() => {
//     const fetchOptions = async () => {
//       try {
//         const res = await api.get("/preferences/options");
//         setSources(res.data.sources || []);
//         setCategories(res.data.categories || []);
//       } catch (err) {
//         console.error("Failed to load options", err);
//       }
//     };
//     fetchOptions();
//   }, []);

//   const handleSearch = async () => {
//     if (!query.trim()) return;
//     setLoading(true);

//     const cleanParams = Object.fromEntries(
//       Object.entries({
//         q: query,
//         source_id: selectedSource || undefined,
//         category_id: selectedCategory || undefined,
//         from_date: fromDate || undefined,
//         to_date: toDate || undefined,
//       }).filter(([_, v]) => v !== undefined)
//     );

//     try {
//       const res = await searchArticles(cleanParams);
//       console.log(res?.data)
//       setResults(res?.data || []);
//     } catch (err) {
//       console.error("Search failed", err);
//       showToast("Search failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <div className="max-w-4xl mx-auto px-4">
//         <h1 className="text-2xl font-bold mb-4 text-blue-700">Search Articles</h1>

//         <div className="flex gap-2 mb-6 flex-wrap">
//           <input
//             type="text"
//             placeholder="Enter keyword..."
//             className="flex-1 border p-2 rounded"
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//           />

//           <select
//             className="border p-2 rounded"
//             value={selectedSource}
//             onChange={(e) => setSelectedSource(e.target.value)}
//           >
//             <option value="">All Sources</option>
//             {sources.map((s) => (
//               <option key={s.id} value={s.id}>{s.name}</option>
//             ))}
//           </select>

//           <select
//             className="border p-2 rounded"
//             value={selectedCategory}
//             onChange={(e) => setSelectedCategory(e.target.value)}
//           >
//             <option value="">All Categories</option>
//             {categories.map((c) => (
//               <option key={c.id} value={c.id}>{c.name}</option>
//             ))}
//           </select>

//           <input
//             type="date"
//             className="border p-2 rounded"
//             value={fromDate}
//             onChange={(e) => setFromDate(e.target.value)}
//           />
//           <input
//             type="date"
//             className="border p-2 rounded"
//             value={toDate}
//             onChange={(e) => setToDate(e.target.value)}
//           />

//           <button
//             onClick={handleSearch}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
//           >
//             Search
//           </button>
//         </div>

//         {loading ? (
//           <Loader message="Searching..."/>
//         ) : results.length > 0 ? (
//           <div className="space-y-4">
//             {results.map((article) => (
//               <ArticleCard
//                 key={article.id}
//                 title={article.title}
//                 content={article.summary}
//                 url={article.url}
//                 author={article.author?.name || "Unknown"}
//                 source={article.source?.name || "Unknown"}
//                 publishedAt={article.published_at}
//               />
//             ))}
//           </div>
//         ) : (
//           query && <p className="text-center text-gray-400">No results found for "{query}"</p>
//         )}
//       </div>
//       {message && <Toast message={message} onClose={closeToast} />}
//     </>
//   );
// }


import { useEffect, useState } from "react";
import { api } from "../api/axios";
import { Toast } from "../components/Toast";
import Loader from "../components/Loader";
import { useToast } from "../hooks/useToast";
import { searchArticles } from "../api/articles";
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
        const res = await api.get("/preferences/options");
        setSources(res.data.sources || []);
        setCategories(res.data.categories || []);
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
      }).filter(([_, v]) => v !== undefined)
    );

    try {
      const res = await searchArticles(cleanParams);
      setResults(res?.data || []);
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