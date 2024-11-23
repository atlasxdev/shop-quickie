"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const useMetadata = (title: string, description: string) => {
  const router = useRouter();

  useEffect(() => {
    document.title = title;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = description;
      document.head.appendChild(meta);
    }
  }, [title, description, router]);
};

export default useMetadata;
