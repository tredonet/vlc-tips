import { NextApiResponse } from "next";

const errorHandler = async (res: NextApiResponse, error: unknown) => {
    if(error instanceof Error)
        return res.status(400).send(error.message);
    return res.status(500).send('internal_server_error');
}

export default errorHandler;
