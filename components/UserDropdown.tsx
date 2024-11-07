import {
  BookUser,
  LogOut,
  MapPinHouse,
  PackageSearch,
  User,
  UserPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUserStore } from "@/zustand-store/store";
import { wait } from "@/lib/utils";
import { toast } from "sonner";

export function UserDropdown() {
  const logOut = useUserStore((state) => state.logOut);

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
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <UserPlus />
              <span className="text-xs md:text-sm">Profile</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>
                  <BookUser />
                  <span className="text-xs md:text-sm">Profile Details</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <MapPinHouse />
                  <span className="text-xs md:text-sm">Your Address</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem>
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
