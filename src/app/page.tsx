import { Button } from "@/components/ui/button";
import { APP_ROUTING } from "@/lib/constants/app-routing.const";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex h-svh w-full flex-col items-center justify-center p-24">
      <nav>
        <Button asChild>
          <Link href={APP_ROUTING.products.index.original}>See Products</Link>
        </Button>
        <Button asChild>
          <Link
            href={APP_ROUTING.expenses.index.insert({
              page: 1,
              limit: 30,
            })}
          >
            See Expenses
          </Link>
        </Button>
      </nav>
    </main>
  );
}
