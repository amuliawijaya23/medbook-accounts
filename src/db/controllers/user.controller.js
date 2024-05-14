import bcrypt from 'bcrypt';
import {
  getUserById,
  getUserByEmail,
  createUser,
  updateUserById,
  deleteUserById
} from '../models/user.model.js';

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

    if (medical_records && medical_records.medication.length > 0) {
      medical_records.medication.forEach((medication) => {
        if (!medication.name || !medication.dose || !medication.frequency) {
          return res.sendStatus(400);
        }
      });
    }

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.sendStatus(400);
    }

    const salt = bcrypt.genSaltSync(10);

    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = await createUser({
      ...req.body,
      password: hashedPassword
    });

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const removeUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await deleteUserById(id);

    return res.status(200).json(deletedUser).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
