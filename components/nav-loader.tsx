import { Skeleton } from "@/components/ui/skeleton";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";

export function NavLoader() {
  return (
    <nav className="sticky top-0 z-20 border-b backdrop-blur-md bg-white/70">
      <MaxWidthWrapper>
        <div className="w-full flex h-24 items-center justify-between">
          <div className="flex items-center justify-center space-x-4">
            <Skeleton className="size-14 mr-4 rounded-full" />
            <Skeleton className="h-4 w-12 rounded-md" />
            <Skeleton className="h-4 w-12 rounded-md" />
            <Skeleton className="h-4 w-12 rounded-md" />
            <Skeleton className="h-4 w-12 rounded-md" />
            <Skeleton className="h-4 w-12 rounded-md" />
          </div>
          <Skeleton className="size-8 rounded-md" />
        </div>
      </MaxWidthWrapper>
    </nav>
  );
}
