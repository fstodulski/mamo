"use client";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Button } from "./ui/button";

const fetchMore = async (page: number, limit: number) => {
  const results = await fetch(
    `https://mamo-mock-server.glitch.me/expenses?limit=${limit}&page=${page}`,
  );

  if (!results.ok) {
    return [];
  }

  return results.json();
};

export type LoadMoreProps = {
  onLoadMore: () => void;
};
export const LoadMore = ({ onLoadMore }: LoadMoreProps) => {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      onLoadMore();
    }
  }, [inView]);

  return (
    <Button ref={ref} className="w-full">
      Loading more...
    </Button>
  );
};
