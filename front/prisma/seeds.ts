import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcrypt' ;


const prisma = new PrismaClient();

const initialGenre = [
  { genre: 'Вымысел', cover_image: 'Journey to Nowhere.jpg' },
  { genre: 'Детская литература', cover_image: 'Magic Forest.webp' },
  { genre: 'Драма', cover_image: 'Потерянные во времени.webp' },
  { genre: 'Исторический', cover_image: 'В поисках сокровищ.webp' },
  { genre: 'Классическая литература', cover_image: 'Мастер и Маргарита.jpg'},
  { genre: 'Комедия',cover_image: 'Смешарики и загадочный лес.webp' },
  { genre: 'Научная фантастика', cover_image: 'Звездный десант.webp'},
  { genre: 'Поэзия', cover_image: 'Волшебная поэма.webp' },
  { genre: 'Приключение', cover_image: 'Остров сокровищ.jpg' },
  { genre: 'Романтика', cover_image: 'Моя обитель.jpg' },
  { genre: 'Ужастик', cover_image: 'Дом ужасов.jpg' },
  { genre: 'Фантазия', cover_image: 'Обратная сторона Луны.webp' },
]

const initialBook = [
  {
    title: 'Journey to Nowhere',
    author: 'John Doe',
    publication_year: 2022,
    bestseller: true,
    isNew: true,
    price: 1000,
    discount: false,
    description: 'A thrilling adventure in the land of fantasy.',
    cover_image: 'Journey to Nowhere.jpg',
    genre: { connect: { id: 1 } }, // Вымысел
  },
  {
    title: 'Magic Forest',
    author: 'Jane Smith',
    publication_year: 2021,
    bestseller: true,
    isNew: false,
    price: 1500,
    discount: true,
    description: 'Exciting stories about friendship in a magical forest.',
    cover_image: 'Magic Forest.webp',
    genre: { connect: { id: 2 } }, // Детская литература
  },
  {
    title: 'Путешествие в никуда',
    author: 'Иван Иванович',
    publication_year: 2022,
    bestseller: true,
    isNew: true,
    price: 1000,
    discount: false,
    description: 'История о захватывающем приключении в мире фантазии.',
    cover_image: 'Путешествие в никуда.jpg',
    genre: { connect: { id: 1 } }, // Вымысел
  },
  {
    title: 'Волшебный лес',
    author: 'Анна Сидорова',
    publication_year: 2021,
    bestseller: true,
    isNew: false,
    price: 1500,
    discount: true,
    description: 'Забавные истории о дружбе животных в волшебном лесу.',
    cover_image: 'Волшебный лес.webp',
    genre: { connect: { id: 2 } }, // Детская литература
  },
  {
    title: 'Потерянные во времени',
    author: 'Ирина Иванова',
    publication_year: 2019,
    bestseller: false,
    isNew: false,
    price: 2000,
    discount: true,
    description: 'История о любви и потерях, о том, как время меняет нас.',
    cover_image: 'Потерянные во времени.webp',
    genre: { connect: { id: 3 } }, // Драма
  },
  {
    title: 'Мастер и Маргарита',
    author: 'Михаил Булгаков',
    publication_year: 1966,
    bestseller: false,
    isNew: false,
    price: 2500,
    discount: true,
    description: 'Знаменитый роман о дьяволе, Мастере и его Маргарите.',
    cover_image: 'Мастер и Маргарита.jpg',
    genre: { connect: { id: 5 } }, // Классическая литература
  },
  {
    title: 'Звездный десант',
    author: 'Роберт Хайнлайн',
    publication_year: 1959,
    bestseller: true,
    isNew: false,
    price: 1800,
    discount: false,
    description: 'Классическая научно-фантастическая сага о будущем человечества.',
    cover_image: 'Звездный десант.webp',
    genre: { connect: { id: 7 } }, // Научная фантастика
  },
  {
    title: 'Смешарики и загадочный лес',
    author: 'Игорь Леденев',
    publication_year: 2015,
    bestseller: false,
    isNew: false,
    price: 1200,
    discount: true,
    description: 'Забавные истории о Смешариках, их приключениях и дружбе.',
    cover_image: 'Смешарики и загадочный лес.webp',
    genre: { connect: { id:6 } }, // Комедия
  },
  {
    title: 'Моя обитель',
    author: 'Эмили Браун',
    publication_year: 2020,
    bestseller: false,
    isNew: false,
    price: 1400,
    discount: true,
    description: 'Романтическая история о любви и встречах.',
    cover_image: 'Моя обитель.jpg',
    genre: { connect: { id: 10 } }, // Романтика
  },
  {
    title: 'Дом ужасов',
    author: 'Стивен Кинг',
    publication_year: 1986,
    bestseller: true,
    isNew: false,
    price: 2000,
    discount: false,
    description: 'Жуткая история о доме, полном тайн и ужасов.',
    cover_image: 'Дом ужасов.jpg',
    genre: { connect: { id: 11 } }, // Ужасы
  },
  {
    title: 'В поисках сокровищ',
    author: 'Ларри Смит',
    publication_year: 2018,
    bestseller: false,
    isNew: true,
    price: 1800,
    discount: false,
    description: 'Увлекательное приключение в поисках потерянного сокровища.',
    cover_image: 'В поисках сокровищ.webp',
    genre: { connect: { id: 4 } }, // Исторический
  },
  {
    title: 'Волшебная поэма',
    author: 'Марина Иванова',
    publication_year: 2017,
    bestseller: false,
    isNew: false,
    price: 1600,
    discount: true,
    description: 'Поэтичная история о волшебстве и приключениях.',
    cover_image: 'Волшебная поэма.webp',
    genre: { connect: { id: 8 } }, // Поэзия
  },
  {
    title: 'Остров сокровищ',
    author: 'Роберт Луис Стивенсон',
    publication_year: 1883,
    bestseller: false,
    isNew: false,
    price: 1200,
    discount: false,
    description: 'Классическое приключение о сокровищах и предательстве на отдаленном острове.',
    cover_image: 'Остров сокровищ.jpg',
    genre: { connect: { id: 9 } }, // Приключения
  },
  {
    title: 'Обратная сторона Луны',
    author: 'Петр Алешковский',
    publication_year: 2010,
    bestseller: false,
    isNew: true,
    price: 2000,
    discount: true,
    description: 'Загадочные приключения на Луне и во вселенной за ее пределами.',
    cover_image: 'Обратная сторона Луны.webp',
    genre: { connect: { id: 12 } }, // Фантазия
  },
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
  await prisma.books.deleteMany();

  for (const genres of initialGenre) {
    await prisma.genres.create({ data: genres });
  }
  for (const books of initialBook) {
    await prisma.books.create({ data: books });
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
