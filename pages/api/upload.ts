import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';
import multer, { Multer, StorageEngine } from 'multer';

const storage: StorageEngine = multer.diskStorage({
    destination: function (req: any, file: any, cb: any) {
        cb(null, 'public/images/')
    },
    filename: function (req: any, file: any, cb: any) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage });

export const config = {
  api: {
      bodyParser: false,
  },
};

const uploadMiddleware = (req: any, res: any, next: () => void): void => {
  upload.single('image')(req, res, (error: any) => {
      if (error) {
          return res.status(500).json({ error });
      }
      next();
  });
};

export default async function handler(req: any, res: NextApiResponse): Promise<void> {
  if (req.method === 'POST') {
    uploadMiddleware(req, res, async () => {
      (globalThis as any).images.unshift({ id: req.file.path.slice(7), comment: req.body.comment });
          res.status(200).json({ message: 'Upload successful', filePath: req.file.path });
      });
  } else {
      res.status(405).json({ message: 'Method not allowed' });
  }
};
