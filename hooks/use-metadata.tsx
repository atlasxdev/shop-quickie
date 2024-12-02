"use client";

import { useEffect } from "react";

const useMetadata = (title: string, description: string) => {
  useEffect(() => {
    function focus() {
      document.title = title;
    }
    function blur() {
      document.title = "Your cart is lonely :(" + " - " + title;
    }

    window.addEventListener("focus", focus);
    window.addEventListener("blur", blur);
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

    return () => {
      window.removeEventListener("focus", focus);
      window.removeEventListener("blur", blur);
    };
  }, [title, description]);
};

export default useMetadata;
