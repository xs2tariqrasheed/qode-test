export const sleep = () => new Promise((resolve) => setTimeout(resolve, 2000));

interface ImageData {
  id: string;
  imageUrl: string;
  comment: string;
}

const imageData: ImageData[] = [];

export function addImageData(imageUrl: string, comment: string): ImageData {
  const id = Date.now().toString();
  const data: ImageData = { id, imageUrl, comment };
  imageData.push(data);
  return data;
}

export function getAllImageData(): ImageData[] {
  return [...imageData];
}

export function isValidImageUrl(url: string): boolean {
  // Check if the URL ends with ".png"
  return url?.toLowerCase()?.endsWith(".png");
}
