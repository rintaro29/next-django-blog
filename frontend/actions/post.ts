"use server";

import { UserType } from "@/lib/nextauth";

// 共通のAPIリクエスト
const fetchAPI = async (url: string, options: RequestInit) => {
  const apiUrl = process.env.API_URL;

  if (!apiUrl) {
    return { success: false, error: "API URLが設定されていません" };
  }

  try {
    const response = await fetch(`${apiUrl}${url}`, options);

    if (!response.ok) {
      return { success: false, error: "APIでエラーが発生しました" };
    }

    // Content-Type ヘッダーが application/json の場合のみ、JSON を解析する
    const contentType = response.headers.get("Content-Type");
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      return { success: true, data };
    }

    // データなしで成功を返す
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "ネットワークエラーが発生しました" };
  }
};

export interface PostType {
  uid: string;
  user: UserType;
  image: string | undefined;
  title: string;
  content: string;
  updated_at: string;
  created_at: string;
}

// 投稿一覧取得
export const getPostList = async () => {
  const options: RequestInit = {
    method: "GET",
    cache: "no-store",
  };

  // 投稿一覧取得
  const result = await fetchAPI("/api/post-list/", options);

  if (!result.success) {
    console.error(result.error);
    return { success: false, posts: [] };
  }

  //成功したら投稿一覧を返す
  const posts: PostType[] = result.data;

  return { success: true, posts };
};

// 投稿詳細取得
export const getPostDetail = async ({ postId }: { postId: string }) => {
  const options: RequestInit = {
    method: "GET",
    cache: "no-store",
  };

  // 投稿詳細取得
  const result = await fetchAPI(`/api/post-detail/${postId}/`, options);

  if (!result.success) {
    console.error(result.error);
    return { success: false, post: null };
  }

  const post: PostType = result.data;

  return { success: true, post };
};
