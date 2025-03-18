import fs from "node:fs/promises";
import { getPlaiceholder } from "plaiceholder";

export const getBase64Image = async (imgPath: string) => {
  try {
    let file = await fs.readFile(`/${imgPath}`);
    let { base64 } = await getPlaiceholder(file);
    return base64;
  } catch (error: unknown) {
    if (error instanceof Error) return error.message;
    else if (error && typeof error === "object" && "message" in error)
      return error.message as string;
    else if (typeof error === "string") return error;
    else return "Unexpected error!";
  }
};

export const getBase64RemoteImage = async (imgSrc: string) => {
  try {
    let src = imgSrc;
    let buffer = await fetch(src).then(async (res) =>
      Buffer.from(await res.arrayBuffer()),
    );
    let { base64 } = await getPlaiceholder(buffer);
    return base64;
  } catch (err) {
    // console.log(err);
  }
};
