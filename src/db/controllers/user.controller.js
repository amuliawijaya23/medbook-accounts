import { getUserById, getUserByEmail, createUser } from '../models/user.model.js';

export const findUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.sendStatus(400);
    }

    const user = await getUserById(id);

    if (!user) {
      res.sendStatus(400);
    }

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const newUser = async (req, res) => {
  try {
    const { email, password, medical_records } = req.body;

    if (!email || !password) {
      return res.sendStatus(400);
    }

    if (
      medical_records &&
      (!medical_records.name || !medical_records.dose || !medical_records.frequency)
    ) {
      return res.sendStatus(400);
    }

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.sendStatus(400);
    }

    const user = await createUser({
      ...req.body
    });

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
