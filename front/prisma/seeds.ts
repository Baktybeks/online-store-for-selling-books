import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcrypt' ;


const prisma = new PrismaClient();

const initialGenre = [
  { genre: 'Вымысел' },
  { genre: 'Детская литература' },
  { genre: 'Драма' },
  { genre: 'Исторический' },
  { genre: 'Классический' },
  { genre: 'Комедия' },
  { genre: 'Научная фантастика' },
  { genre: 'Поэзия' },
  { genre: 'Приключение' },
  { genre: 'Романтика' },
  { genre: 'Ужастик' },
  { genre: 'Фантазия' },
]
const initialUsers = [
  {
    email: 'admin@mail.ru',
    name: 'admin',
    password: 'admin',
    role: Role.ADMIN,
  },
  {
    email: 'user@mail.ru',
    name: 'user',
    password: 'user',
    role: Role.USER,
  },
];

const seed = async() => {
  await prisma.users.deleteMany();
  await prisma.genres.deleteMany();

  for (const genres of initialGenre) {
    await prisma.genres.create({ data: genres });
  }
  for (const user of initialUsers) {
    const { password, ...userData } = user;
    const hashedPassword = await bcrypt.hash(password, 5);
    await prisma.users.create({
      data: {
        ...userData,
        password: hashedPassword,
      },
    });
  }
};

seed();
