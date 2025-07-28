import { useEffect, useState } from "react";
import { Toast } from "../components/Toast";
import Loader from "../components/Loader";
import { useToast } from "../hooks/useToast";
import { fetchArticles } from "../api/articles";
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

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { showToast, closeToast, message } = useToast();

  useEffect(() => {
    const fetchAllArticles = async () => {
      setLoading(true);
      try {
        const res = await fetchArticles(page);
        setArticles(res?.data?.data || []);
        setTotalPages(res?.data?.last_page || 1);
        showToast("All Available Articles loaded!");
      } catch (error) {
        console.error("Failed to fetch articles", error);
        showToast("Failed to load all articles");
      } finally {
        setLoading(false);
      }
    };

    fetchAllArticles();
  }, [page]);

  return (
    <>
      <div className="feed-container">
        <h1 className="page-title">All Articles</h1>

        {loading ? (
          <Loader message="Loading articles..." />
        ) : articles.length === 0 ? (
          <p className="empty-state">No articles found</p>
        ) : (
          <>
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
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
          </>
        )}
      </div>
      {message && <Toast message={message} onClose={closeToast} />}
    </>
  );
}