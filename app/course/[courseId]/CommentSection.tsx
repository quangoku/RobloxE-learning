import Image from "next/image";
import CommentForm from "./CommentForm";
import { getCommentsByCourseId } from "@/lib/data";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { deleteComment } from "@/app/actions/comment";

export default async function CommentSection({
  courseId,
}: {
  courseId: string;
}) {
  const comments = await getCommentsByCourseId(courseId);
  const session = await getServerSession(authOptions);
  const currentUserId = session?.user?.id;
  return (
    <div className="mt-10 pt-6 border-t border-gray-200 max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold mb-6">Comments ({comments.length})</h3>

      <CommentForm courseId={courseId}></CommentForm>

      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="p-4 border rounded-lg shadow-sm  ">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <Image
                  className="h-10 w-10 rounded-full object-cover"
                  src={comment.user.image as string}
                  alt={`${comment.user.name}'s avatar`}
                  width={40}
                  height={40}
                />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-bold ">{comment.user.name}</span>

                  <div className="flex items-center text-gray-500 text-sm space-x-3">
                    <span className="text-sm">
                      {comment.createdAt.toLocaleDateString("vi-VN")}
                    </span>

                    {currentUserId === comment.user.id && (
                      <form action={deleteComment} className="inline-block">
                        <input
                          type="hidden"
                          name="commentId"
                          value={comment.id}
                        />
                        <input type="hidden" name="courseId" value={courseId} />
                        <button
                          type="submit"
                          className=" text-red-300 text-xs font-medium cursor-pointer transition duration-150 p-1 -m-1"
                        >
                          Xóa
                        </button>
                      </form>
                    )}
                  </div>
                </div>

                <p className="text-gray-500 mt-1">{comment.content}</p>
              </div>
            </div>
          </div>
        ))}

        {comments.length === 0 && (
          <p className="text-center text-gray-500">No comment to show</p>
        )}
      </div>
    </div>
  );
}
