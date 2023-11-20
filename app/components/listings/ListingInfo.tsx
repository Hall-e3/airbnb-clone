"use client";

import { SafeUser } from "@/app/types";
import { IconType } from "react-icons";

type Object = {
  icon: IconType;
  label: string;
  description: string;
};

interface ListingInfoProps {
  user: SafeUser;
  category: Object | undefined;
  description: string;
  roomCount: number;
  bathroomCount: number;
  locationValue: string;
  guestCount: number;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  category,
  description,
  roomCount,
  bathroomCount,
  guestCount,
  locationValue,
}) => {
  return <div></div>;
};

export default ListingInfo;
