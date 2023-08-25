"use client";

import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { cn } from "@/lib/utils";
import { Column } from "@tanstack/react-table";
import { ArrowDownIcon, ArrowUpIcon, ChevronsUpDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const per_page = searchParams.get("per_page");
  const sortBy = searchParams.get("sortBy");
  const order = searchParams.get("order");

  console.log("page", page);
  console.log("per_page", per_page);

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent"
          >
            <span>{title}</span>
            {order === "asc" && sortBy ? (
              <ArrowUpIcon className="ml-2 h-3.5 w-3.5 text-muted-foreground/70" />
            ) : order === "desc" && sortBy ? (
              <ArrowDownIcon className="ml-2 h-3.5 w-3.5 text-muted-foreground/70" />
            ) : (
              <ChevronsUpDown className="ml-2 h-3.5 w-3.5 text-muted-foreground/70" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem
            onClick={() => {
              router.push(
                `/?sortBy=${column.id}&order=asc` +
                  (page ? `&page=${page}` : "") +
                  (per_page ? `&per_page=${per_page}` : "")
              );
            }}
          >
            <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              router.push(
                `/?sortBy=${column.id}&order=desc` +
                  (page ? `&page=${page}` : "") +
                  (per_page ? `&per_page=${per_page}` : "")
              );
            }}
          >
            <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Desc
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
