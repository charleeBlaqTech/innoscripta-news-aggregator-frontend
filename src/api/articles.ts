import { api } from "./axios";


export const fetchFeed = (page: number = 1, perPage: number = 10) =>
  api.get("/feed", {
    params: {
      page,
      per_page: perPage,
    },
  });


export const getSingleFeed = (id: number) => api.get(`/feed/${id}`);


export const fetchArticles = (page: number = 1, perPage: number = 10) =>
  api.get("/articles", {
    params: {
      page,
      per_page: perPage,
    },
  });


export const searchArticles = (params: Record<string, string | number | undefined>) =>
  api.get("/articles/search", { params });
