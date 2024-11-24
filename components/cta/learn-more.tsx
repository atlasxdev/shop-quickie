import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export function LearnMore({
  id,
  variant = "default",
}: {
  id: number;
  variant?: "link" | "default";
}) {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.push(`/products?id=${id}`)}
      className="w-max rounded-full mx-auto text-[0.7rem]"
      size={"sm"}
      variant={variant}
    >
      Learn more
    </Button>
  );
}

export default LearnMore;
