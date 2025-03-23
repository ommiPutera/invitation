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
  return await prisma.comment.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}
