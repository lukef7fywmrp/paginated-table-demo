import { DataTable } from "@/components/productList/DataTable";
import { Product, columns } from "@/components/productList/columns";
import axios from "axios";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = searchParams["page"] ?? "1";
  const per_page = searchParams["per_page"] ?? "5";
  const sortBy = searchParams["sortBy"];
  const order = searchParams["order"];
  const { data } = (await axios.get(
    `https://64e8aa2899cf45b15fdff602.mockapi.io/products?limit=${per_page}&page=${page}&sortBy=${sortBy}&order=${order}`
  )) as { data: Product[] };

  console.log("data", data);

  return (
    <>
      <div className="h-full flex-1 flex-col justify-center min-h-screen space-y-8 p-8 flex container">
        <div className="border rounded-md p-8 space-y-8">
          <div className="flex items-center justify-between space-y-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                Welcome back!
              </h2>
              <p className="text-muted-foreground">
                Here&apos;s a list of your products for this month!
              </p>
            </div>
          </div>
          <DataTable
            total={64}
            data={data}
            columns={columns}
            hasNextPage={Number(page) < Math.ceil(64 / Number(per_page))}
            hasPreviousPage={Number(page) > 1}
          />
        </div>
      </div>
    </>
  );
}
