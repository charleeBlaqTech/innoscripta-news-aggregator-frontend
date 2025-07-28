
import { api } from "./axios";

/**
 * Fetch personalized feed articles with optional pagination
 * @param page - page number
 * @param perPage - number of items per page
 */
export const fetchFeed = (page: number = 1, perPage: number = 10) =>
  api.get("/feed", {
    params: {
      page,
      per_page: perPage,
    },
  });

/**
 * Get a single feed article by ID
 * @param id - article ID
 */
export const getSingleFeed = (id: number) => api.get(`/feed/${id}`);

/**
 * Fetch all articles (unfiltered, not based on user preference)
 * @param page - page number
 * @param perPage - number of items per page
 */
export const fetchArticles = (page: number = 1, perPage: number = 10) =>
  api.get("/articles", {
    params: {
      page,
      per_page: perPage,
    },
  });

/**
 * Search articles with optional filters
 * @param params - search and filter parameters
 */
export const searchArticles = (params: Record<string, string | number | undefined>) =>
  api.get("/articles/search", { params });
