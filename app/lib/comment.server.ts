import { PrismaClient, type Comment } from "@prisma/client";

const prisma = new PrismaClient();

export async function createCommnet({
  content,
  name,
  attendance,
}: {
  content: string;
  name: string;
  attendance: string;
}) {
  return await prisma.comment.create({
    data: {
      content,
      name,
      attendance: attendance === "attend" ? true : false,
    },
  });
}

export async function getCommnet(): Promise<Comment[]> {
  // return [];
  return await prisma.comment.findMany({
    take: 100, // Ambil 100 data per batch
    skip: 0, // Bisa diganti sesuai offset
    orderBy: {
      createdAt: "desc",
    },
  });
}
