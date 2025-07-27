// import { useEffect, useState } from "react";
// import { Toast } from "../components/Toast";
// import Loader from "../components/Loader";
// import { useToast } from "../hooks/useToast";
// import { fetchFeed } from "../api/articles";
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

// export default function FeedPage() {
//   const [articles, setArticles] = useState<Article[]>([]);
//   const [loading, setLoading] = useState(true);
//   const { showToast, closeToast, message } = useToast();

//   useEffect(() => {
//     const fetchArticles = async () => {
//       try {
//         const res = await fetchFeed();
//         setArticles(res?.data?.data || []);
//         showToast("Articles loaded!");
//       } catch (error) {
//         console.error("Failed to fetch articles", error);
//         showToast("Failed to load articles");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchArticles();
//   }, []);

//   return (
//     <>
//       <div className="max-w-6xl mx-auto px-4">
//         <h1 className="text-2xl font-bold mb-6 text-blue-700">Your Feed</h1>

//         {loading ? (
//           <Loader message="Loading articles..." />
//         ) : articles.length === 0 ? (
//           <p className="text-center text-gray-500">No articles found</p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {articles.map((article) => (
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
//         )}
//       </div>
//       {message && <Toast message={message} onClose={closeToast} />}
//     </>
//   );
// }

import { useEffect, useState } from "react";
import { Toast } from "../components/Toast";
import Loader from "../components/Loader";
import { useToast } from "../hooks/useToast";
import { fetchFeed } from "../api/articles";
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

export default function FeedPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const { showToast, closeToast, message } = useToast();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetchFeed();
        console.log(res)
        setArticles(res?.data?.data || []);
        showToast("Articles loaded!");
      } catch (error) {
        console.error("Failed to fetch articles", error);
        showToast("Failed to load articles");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <>
      <div className="feed-container">
        <h1 className="page-title">Your Feed</h1>

        {loading ? (
          <Loader message="Loading articles..." />
        ) : articles.length === 0 ? (
          <p className="empty-state">No articles found</p>
        ) : (
          <div className="article-grid">
            {articles.map((article) => (
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
        )}
      </div>
      {message && <Toast message={message} onClose={closeToast} />}
    </>
  );
}
