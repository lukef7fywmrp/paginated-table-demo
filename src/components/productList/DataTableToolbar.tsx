"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Table } from "@tanstack/react-table";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button, buttonVariants } from "../ui/Button";
import { Input } from "../ui/Input";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

const formSchema = z.object({
  name: z.string().min(3).max(50),
  description: z.string().min(3).max(1000),
  price: z.string(),
  stock: z.number().int().min(1).max(100),
});

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter tasks..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
      </div>
      <Link href="/" className={buttonVariants()}>
        Reset
      </Link>

      <Dialog>
        <DialogTrigger>Add Product</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a new product to your store</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="name" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the name of your product
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="description" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the description of your product
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input placeholder="price" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the price of your product
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock</FormLabel>
                    <FormControl>
                      <Input placeholder="stock" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the stock of your product
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Add Product</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      {/* <DataTableViewOptions table={table} /> */}
    </div>
  );
}
