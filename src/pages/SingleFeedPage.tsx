import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleFeed } from '../api/articles';
import Loader from '../components/Loader';

type Article = {
  id: number;
  title: string;
  summary: string;
  url: string;
  published_at: string;
  author: { name: string };
  source: { name: string };
};

export const SingleFeedPage = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getSingleFeed(parseInt(id))
        .then((res) => setArticle(res.data))
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) return <Loader message="Loading article..." />;

  if (!article) return <p className="empty-state">Article not found.</p>;

  return (
    <div className="single-article-container">
      <h1 className="single-article-title">{article.title}</h1>
      <div className="single-article-meta">
        {article.author?.name || 'Unknown'} • {article.source?.name || 'Unknown'} •{' '}
        {new Date(article.published_at).toLocaleDateString()}
      </div>
      <p className="single-article-summary">{article.summary}</p>
      <a href={article.url} className="read-full" target="_blank" rel="noopener noreferrer">
        Read full article →
      </a>
    </div>
  );
};
