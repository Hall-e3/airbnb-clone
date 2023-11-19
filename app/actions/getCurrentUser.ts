import { getServerSession } from "next-auth";
// direct communication with the database through the server component, it's not an api call, no need for error handling
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/libs/prismadb";

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
  try {
    // create session from authOptions  to get the current user
    const session = await getSession();
    if (!session?.user?.email) return null;
    // we find the use by email
    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });
    // if there is no current user return null
    if (!currentUser) return null;
    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toISOString() || null,
    };
  } catch (error) {
    return null;
  }
}
