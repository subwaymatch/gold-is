import { NextApiRequest, NextApiResponse } from 'next';
import request from 'request';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  request(req.query.url as string).pipe(res);
};
