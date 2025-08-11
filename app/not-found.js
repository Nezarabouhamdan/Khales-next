// app/not-found.js

"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getDictionary } from "@/get-dictionary"; // <-- Import it directly!
import PageMessage from "@/components/Notfound";
import { FaExclamationTriangle } from "react-icons/fa";

// A simple loading/fallback component
function NotFoundFallback() {
  return <div style={{ minHeight: "80vh" }}></div>;
}

export default function NotFound() {
  const pathname = usePathname();
  const [dictionary, setDictionary] = useState(null);

  // Detect language from URL, default to 'en'
  const lang = pathname.split("/")[1] || "en";

  useEffect(() => {
    // Call the function directly, since we removed "server-only"
    const fetchDictionary = async () => {
      const dict = await getDictionary(lang);
      setDictionary(dict);
    };

    fetchDictionary();
  }, [lang]);

  // While the dictionary is loading, show a fallback
  if (!dictionary) {
    return <NotFoundFallback />;
  }

  return (
    <PageMessage
      lang={lang}
      content={dictionary.notFoundPage}
      icon={FaExclamationTriangle}
      spinIcon={false}
    />
  );
}
