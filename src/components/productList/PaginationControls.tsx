"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FC } from "react";
import { Button } from "../ui/Button";

interface PaginationControlsProps {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  total: number;
}

const PaginationControls: FC<PaginationControlsProps> = ({
  hasNextPage,
  hasPreviousPage,
  total,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get("page") ?? "1";
  const per_page = searchParams.get("per_page") ?? "5";
  const sortBy = searchParams.get("sortBy");
  const order = searchParams.get("order");

  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          router.push(
            `/?page=${Number(page) - 1}&per_page=${per_page}` +
              (sortBy ? `&sortBy=${sortBy}` : "") +
              (order ? `&order=${order}` : "")
          );
        }}
        disabled={!hasPreviousPage}
      >
        Previous
      </Button>

      <span className="text-sm text-muted-foreground">
        Page {page} of {Math.ceil(total / Number(per_page))}
      </span>

      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          router.push(
            `/?page=${Number(page) + 1}&per_page=${per_page}` +
              (sortBy ? `&sortBy=${sortBy}` : "") +
              (order ? `&order=${order}` : "")
          );
        }}
        disabled={!hasNextPage}
      >
        Next
      </Button>
    </div>
  );
};

export default PaginationControls;
