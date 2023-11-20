import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export default async function getReservations(params: IParams) {
  try {
    const { listingId, userId, authorId } = params;
    const query: any = {};
    // query all reservations for a single listing
    if (listingId) {
      query.listingId = listingId;
    }
    // query all trips made by a single user
    if (userId) {
      query.userId = userId;
    }
    // query all reservations made by other people on a user's listing
    if (authorId) {
      query.listing = { userId: authorId };
    }
    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeReservations = reservations.map((reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt.toISOString(),
      },
    }));
    return safeReservations;
  } catch (error: any) {
    throw new Error(error);
  }
}
