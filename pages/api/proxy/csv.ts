import { NextApiRequest, NextApiResponse } from 'next';

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async (req: NextApiRequest, res: NextApiResponse) => {
  return new Promise((resolve) => {
    fetch(req.query.url as string)
      .then((response) => response.text())
      .then((text) => {
        res.status(200).send(text);
        resolve();
      })
      .catch((err) => {
        res.status(400).send(err.message);

        resolve();
      });
  });
};
