
import { api } from "./axios";

export const fetchFeed = () => api.get("/feed");

export const getSingleFeed = (id: number) => api.get(`/feed/${id}`);

export const searchArticles = (params: Record<string, string | undefined>) =>
  api.get("/articles/search", { params });