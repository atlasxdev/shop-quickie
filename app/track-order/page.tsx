import { TrackOrder } from "@/features/track-order/TrackOrder";
import { notFound } from "next/navigation";

function Page({
  searchParams: { trackingId },
}: {
  params: string;
  searchParams: { trackingId: "b3091bdc-d50b-48a1-8d90-f291c9aad50e" };
}) {
  if (
    trackingId == null ||
    trackingId != "b3091bdc-d50b-48a1-8d90-f291c9aad50e"
  ) {
    return notFound();
  }

  return <TrackOrder trackingId={trackingId} />;
}

export default Page;
