import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest } from 'next/server';

declare function blogApiHandler(req: NextApiRequest, res: NextApiResponse): Promise<void>;
declare function blogApiHandlerApp(req: NextRequest): Promise<Response>;

export { blogApiHandler, blogApiHandlerApp };
