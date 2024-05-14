import { createClient, getClientByClientId } from '../models/client.model';

export const newClient = (req, res) => {
  try {
    const { clientId, clientSecret } = req.body;

    if (!clientId || !clientSecret) return res.sendStatus(400);
  
    const existingClient = await getClientByClientId(clientId);
  
    if (existingClient) return res.sendStatus(400);
  
    const client = await createClient({ ...req.body});

    return res.status(200).json(client).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const findClient = (req, res) => {
  try {
    const { id } = req.params;

    if (!id) return res.sendStatus(400);

    const client = await getClientByClientId(id);

    if (!client) return res.sendStatus(400);

    return res.status(200).json(client).end();

  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};
