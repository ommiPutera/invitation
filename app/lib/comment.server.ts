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

export async function fetchAllCommentsWithCursor(): Promise<Comment[]> {
  let allComments: Comment[] = [];
  let lastId = null;
  const batchSize = 100;

  while (true) {
    const batch: Comment[] = await prisma.comment.findMany({
      take: batchSize,
      cursor: lastId ? { id: lastId } : undefined, // Ambil data setelah lastId
      orderBy: { createdAt: "desc" },
      skip: lastId ? 1 : 0, // Lewati cursor saat looping berikutnya
    });

    allComments = [...allComments, ...batch];

    if (batch.length < batchSize) break; // Jika batch terakhir kurang dari batchSize, berarti data habis

    lastId = batch[batch.length - 1].id; // Simpan ID terakhir untuk cursor
  }

  return allComments;
}
