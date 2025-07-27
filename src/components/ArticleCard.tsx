import { Link } from 'react-router-dom';

interface Props {
  id: number;
  title: string;
  content: string;
  url: string;
  author: string;
  source: string;
  publishedAt: string;
}

export const ArticleCard = ({
  id,
  title,
  content,
  author,
  source,
  publishedAt,
}: Props) => (
  <Link to={`/feed/${id}`} className="article-card">
    <h2 className="article-card-title">{title}</h2>
    <p className="article-card-summary">{content}</p>
    <div className="article-card-meta">
      {author} • {source} • {new Date(publishedAt).toLocaleDateString()}
    </div>
  </Link>
);
