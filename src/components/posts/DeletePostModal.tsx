import { Modal, Button } from "@/components/ui";
import type { Post } from "@/types";

interface DeletePostModalProps {
  post: Post | null;
  isDeleting: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeletePostModal({
  post,
  isDeleting,
  onConfirm,
  onCancel,
}: DeletePostModalProps) {
  return (
    <Modal
      isOpen={Boolean(post)}
      onClose={onCancel}
      title="Delete this post?"
      footer={
        <>
          <Button variant="secondary" onClick={onCancel} disabled={isDeleting}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm} isLoading={isDeleting}>
            Delete post
          </Button>
        </>
      }
    >
      <p>
        {post && (
          <>
            <span className="font-medium text-ink">&ldquo;{post.title}&rdquo;</span> will
            be removed. This can&apos;t be undone.
          </>
        )}
      </p>
    </Modal>
  );
}
