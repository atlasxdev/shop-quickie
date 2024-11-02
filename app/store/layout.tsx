import FilterNavigation from "@/features/store/components/FilterNavigation";

function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex-1 flex flex-col min-h-dvh">
      <FilterNavigation />
      {children}
    </div>
  );
}

export default layout;
