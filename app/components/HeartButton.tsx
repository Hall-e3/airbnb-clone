"use client";

import { HeartIcon } from "@heroicons/react/24/outline";
import { SafeUser } from "../types";
import useFavorite from "../hooks/useFavorite";

interface HeartButtonProps {
  currentUser?: SafeUser | null;
  listingId: string;
}

const HeartButton = ({ currentUser, listingId }: HeartButtonProps) => {
  const { toggleFavorite, hasFavorited } = useFavorite({
    listingId,
    currentUser,
  });
  return (
    <div
      onClick={toggleFavorite}
      className="relative hover:opacity-80 transition cursor-pointer"
    >
      <HeartIcon
        className={`w-5 h-5 text-white absolute -top-[2px] -right-[2px] ${
          hasFavorited ? "fill-rose-500" : "fill-neutral-500/70"
        }`}
      />
    </div>
  );
};

export default HeartButton;
