import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
  reservationId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();

  const { reservationId } = params;

  if (!reservationId || typeof reservationId !== "string")
    throw new Error("Invalid ID");

  // we want the person who created the listing or the reservation to be able to delete it
  const reservation = await prisma.reservation.deleteMany({
    where: {
      id: reservationId,
      OR: [
        // creator of reservations / person in charge of making reservations on this property to cancel any reservations
        { userId: currentUser.id },
        // creator of listings/ owner of property to cancel any reservations
        { listing: { userId: currentUser.id } },
      ],
    },
  });

  return NextResponse.json(reservation);
}
