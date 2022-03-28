import { Admin } from '../models';
import bcrypt from 'bcrypt';

export const addAdm = async () => {
  const hashedPassword = await bcrypt.hash('luca.martins.adm', 12);

  const user = new Admin({
    name: 'Luca Santos Martins',
    email: 'lucamartins@discente.ufg.br',
    password: hashedPassword,
  });

  try {
    await user.save();
  } catch (err) {
    throw err;
  }
};
