import { sleep } from "@/utils/helper";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Simulate a 2-second delay
  await sleep();

  const data = { images: dataArray };

  // Respond with JSON data
  res.status(200).json(data);
}

// Dummy data array
const dataArray = [
  {
    id: 1,
    imageUrl: "https://randomuser.me/api/portraits/men/1.jpg",
    comment: "Beautiful landscape",
  },
  {
    id: 2,
    imageUrl: "https://randomuser.me/api/portraits/women/2.jpg",
    comment: "Stunning view",
  },
  {
    id: 3,
    imageUrl: "https://randomuser.me/api/portraits/men/3.jpg",
    comment: "Breathtaking scenery",
  },
  {
    id: 4,
    imageUrl: "https://randomuser.me/api/portraits/women/4.jpg",
    comment: "Nature's masterpiece",
  },
  {
    id: 5,
    imageUrl: "https://randomuser.me/api/portraits/men/5.jpg",
    comment: "Serene beauty",
  },
  {
    id: 6,
    imageUrl: "https://randomuser.me/api/portraits/women/6.jpg",
    comment: "Awe-inspiring panorama",
  },
  {
    id: 7,
    imageUrl: "https://randomuser.me/api/portraits/men/7.jpg",
    comment: "Picturesque landscape",
  },
  {
    id: 8,
    imageUrl: "https://randomuser.me/api/portraits/women/8.jpg",
    comment: "Exquisite environment",
  },
];
