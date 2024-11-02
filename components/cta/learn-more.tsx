import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export function LearnMore({ id }: { id: number }) {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.push(`/products?id=${id}`)}
      className="w-max rounded-full mx-auto"
      size={"sm"}
    >
      Learn more
    </Button>
  );
}

export default LearnMore;
