"use client";

import { format } from "date-fns";
import { Pencil, Trash2 } from "lucide-react";
import { PostType } from "@/actions/post";
import { UserType } from "@/lib/nextauth";
import Image from "next/image";
import Link from "next/link";

interface PostDetailProps {
  post: PostType;
  user: UserType | null;
}

// 投稿詳細
const PostDetail = ({ post, user }: PostDetailProps) => {
  return (
    <div className="space-y-8">
      <div className="aspect-[16/9] relative">
        <Image fill src={post.image || "/noImage.png"} alt="thumbnail" className="object-cover rounded-md" />
      </div>

      <div className="font-bold text-2xl break-words">{post.title}</div>

      <div>
        <div className="flex items-center space-x-2">
          <Link href={`/user/${post.user.uid}`}>
            <div className="relative w-9 h-9 flex-shrink-0">
              <Image
                src={post.user.avatar || "/default.png"}
                className="rounded-full object-cover"
                alt={post.user.name || "avatar"}
                fill
              />
            </div>
          </Link>

          <div>
            <div className="text-sm hover:underline break-words">
              <Link href={`/user/${post.user.uid}`}>{post.user.name}</Link>
            </div>
            <div className="text-xs text-gray-400">{format(new Date(post.updated_at), "yyyy/MM/dd HH:mm")}</div>
          </div>
        </div>
      </div>

      <div className="leading-relaxed break-words whitespace-pre-wrap">{post.content}</div>

      {post.user.uid === user?.uid && (
        <div className="flex items-center justify-end space-x-1">
          <Link href={`/post/${post.uid}/edit`}>
            <div className="hover:bg-gray-100 p-2 rounded-full">
              <Pencil className="w-5 h-5" />
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default PostDetail;
