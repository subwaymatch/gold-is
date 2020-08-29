import { NextApiRequest, NextApiResponse } from 'next';

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req: NextApiRequest, res: NextApiResponse) => {
  fetch(req.query.url as string)
    .then((response) => response.text())
    .then((text) => {
      res.status(200).send(text);
    });
};
