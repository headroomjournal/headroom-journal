"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../sanity.config";
import { useEffect, useState } from "react";

export function Studio() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-white font-sans text-sm text-gray-400">
        Loading Studio...
      </div>
    );
  }

  return <NextStudio config={config} />;
}
