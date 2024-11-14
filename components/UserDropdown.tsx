import { Loader, LogOut, PackageSearch, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUserStore } from "@/zustand-store/store";
import { wait } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function UserDropdown() {
  const router = useRouter();
  const [isClient, setIsClient] = useState<boolean>(false);
  const [user, setUser] = useState<{ userId: number } | null>(null);
  const logOut = useUserStore((state) => state.logOut);

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem("user") ?? "null");
    setUser(user);
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <Loader className="size-4 animate-spin" />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={"sm"} variant={"ghost"} className="rounded-full">
          <User className="md:!size-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-max md:w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() =>
              router.push(`/user-profile/${user?.userId.toString()}`)
            }
          >
            <User />
            <span className="text-xs md:text-sm">Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() =>
              router.push(
                "/track-order?trackingId=b3091bdc-d50b-48a1-8d90-f291c9aad50e"
              )
            }
          >
            <PackageSearch />
            <span className="text-xs md:text-sm">Order track</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="cursor-pointer"
          onClick={async () => {
            localStorage.removeItem("user");
            localStorage.removeItem("cart");
            toast("Logging out...");
            await wait(500);
            logOut();
            document.location.reload();
          }}
        >
          <LogOut />
          <span className="text-xs md:text-sm">Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
