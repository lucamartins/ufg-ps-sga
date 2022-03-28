import { Admin } from '../models';
import bcrypt from 'bcrypt';

export const addAdm = async () => {
  const hashedPasswordLuca = await bcrypt.hash('luca.martins.adm', 12);
  const hashedPasswordAmadeu = await bcrypt.hash('amadeu.lee.adm', 12);

  const admin1 = new Admin({
    name: 'Luca Santos Martins',
    email: 'lucamartins@discente.ufg.br',
    password: hashedPasswordLuca,
  });

  const admin2 = new Admin({
    name: 'Amadeu Lee',
    email: 'amadeulee945@gmail.com',
    password: hashedPasswordAmadeu
  })

  try {
    await admin1.save();
    await admin2.save();
  } catch (err) {
    console.error(err);
    throw err;
  }
};
