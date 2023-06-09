import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('password', 10);
  const pavel = await prisma.user.create({
    data: {
      email: 'popa@poteryana.net',
      userName: 'Pavel',
      password: password,
    },
  });

  const svyat = await prisma.user.create({
    data: {
      email: 'zabral@ochko.da',
      userName: 'Svyat',
      password: password,
    },
  });
  const game = await prisma.game.create({
    data: {
      name: 'Солянка',
      userId: pavel.id,
      categories: {
        create: [
          {
            name: 'Правда или ложь?',
            questions: {
              create: [
                {
                  text: 'У золотой рыбки память всего 3 секунды.',
                  answer: 'Ложь',
                  score: 100,
                },
                {
                  text: 'Если разрезать дождевого червя пополам, то обе половины заново отрастут.',
                  answer: 'Ложь',
                  score: 200,
                },
                {
                  text: 'У взрослых меньше костей, чем у младенцев.',
                  answer: 'Правда',
                  score: 300,
                },
                {
                  text: 'Наполеон Бонапарт был очень невысокого роста',
                  answer: 'Ложь',
                  score: 400,
                },
                {
                  text: 'Ваши ногти и волосы продолжают расти после смерти.',
                  answer: 'Ложь',
                  score: 500,
                },
              ],
            },
          },
          {
            name: 'Независимость',
            questions: {
              create: [
                {
                  text: 'В Сербии оспаривается независимость этого государства',
                  answer: 'Косово',
                  score: 100,
                },
                {
                  text: 'Территория этого государства раньше принадлежала Дании, но в 1944 оно стало независимым.',
                  answer: 'Исландия',
                  score: 200,
                },
                {
                  text: 'Китай оккупирует это государство с 50-х годов',
                  answer: 'Тибет',
                  score: 300,
                },
                {
                  text: 'Это государство было подконтрольно Нидерландам, позже было захвачено японцами, а после второй мировой стало независимым',
                  answer: 'Индонезия',
                  score: 400,
                },
                {
                  text: 'Это государство часто называют кладбищем империй',
                  answer: 'Афганистан',
                  score: 500,
                },
              ],
            },
          },
          {
            name: 'Алкоголь',
            questions: {
              create: [
                {
                  text: 'Слабоалкогольный напиток, получаемый спиртовым брожением солодового сусла с помощью пивных дрожжей, обычно с добавлением хмеля',
                  answer: 'Пиво',
                  score: 100,
                },
                {
                  text: 'Крепкий алкогольный напиток, производимый из определённых сортов винограда по особой технологии',
                  answer: 'Коньяк',
                  score: 200,
                },
                {
                  text: 'Крепкий алкогольный напиток, полученный путём дистилляции ферментированного сока голубой агавы',
                  answer: 'Текила',
                  score: 300,
                },
                {
                  text: 'Слабоалкогольный напиток, который получают брожением яблочного, реже грушевого или айвового сока с помощью добавления культивированных дрожжей или натуральным способом',
                  answer: 'Сидр',
                  score: 400,
                },
                {
                  text: 'Игристое вино, произведённое во французском регионе Шампань из установленных сортов винограда методом вторичного брожения вина в бутылке',
                  answer: 'Шампанское',
                  score: 500,
                },
              ],
            },
          },
          {
            name: 'Физика',
            questions: {
              create: [
                {
                  text: 'Кто получил первую Нобелевская премию по физике? (напишите фамилию)',
                  answer: 'Рентген',
                  score: 100,
                },
                {
                  text: 'Каждые сутки Земля «поправляется» на 400 т. За счет чего?',
                  answer: 'Космическая пыль',
                  score: 200,
                },
                {
                  text: 'Какой металл является самым тугоплавким?',
                  answer: 'Вольфрам',
                  score: 300,
                },
                {
                  text: 'Какое поле появляется вокруг любого предмета?',
                  answer: 'Гравитационное',
                  score: 400,
                },
                {
                  text: 'Какая жидкость самая легкая?',
                  answer: 'Сжиженный водород',
                  score: 500,
                },
              ],
            },
          },
          {
            name: 'География',
            questions: {
              create: [
                {
                  text: 'Как называется скотоводческая ферма в США?',
                  answer: 'Ранчо',
                  score: 100,
                },
                {
                  text: 'Как называется самый твердый минерал?',
                  answer: 'Алмаз',
                  score: 200,
                },
                {
                  text: 'Как называется самый большой океан?',
                  answer: 'Тихий',
                  score: 300,
                },
                {
                  text: 'Как называется столица Сирии?',
                  answer: 'Дамаск',
                  score: 400,
                },
                {
                  text: 'Как называется расплавленная масса в глубинах Земли?',
                  answer: 'Магма',
                  score: 500,
                },
              ],
            },
          },
        ],
      },
    },
  });

  const game2 = await prisma.game.create({
    data: {
      name: 'Попрогаем?',
      userId: pavel.id,
      categories: {
        create: [
          {
            name: 'Общие вопросы',
            questions: {
              create: [
                {
                  text: 'Процесс поиска и устранения ошибок в программе.',
                  answer: 'Отладка',
                  score: 100,
                },
                {
                  text: 'Конечный набор шагов, которые при следовании им решают какую-то задачу.',
                  answer: 'Алгоритм',
                  score: 200,
                },
                {
                  text: 'Важнейшая структура данных, хранящая набор элементов в непрерывном участке памяти.',
                  answer: 'Массив',
                  score: 300,
                },
                {
                  text: 'Какая операционная система вышла 17 сентября 1991 года?',
                  answer: 'Линукс',
                  score: 400,
                },
                {
                  text: 'Языковая конструкция, которая может определять участок программы для многократного повторения и количество этих повторений.',
                  answer: 'Цикл',
                  score: 500,
                },
              ],
            },
          },
          {
            name: 'Node js',
            questions: {
              create: [
                {
                  text: 'Какой командой устанавливаются зависимости с package-lock.json?(npm)',
                  answer: 'npm ci',
                  score: 100,
                },
                {
                  text: 'Типы потоков в Node.js?',
                  answer: 'Readable,Writable,Duplex,Transform',
                  score: 200,
                },
                {
                  text: 'Последняя версия NodeJS',
                  answer: '19.8.1',
                  score: 300,
                },
                {
                  text: 'Топ пакет для http запросов',
                  answer: 'Axios',
                  score: 400,
                },
                {
                  text: 'Назови главного конкурента npm?',
                  answer: 'yarn',
                  score: 500,
                },
              ],
            },
          },
          {
            name: 'HTML & CSS',
            questions: {
              create: [
                {
                  text: 'target? Какие значения он принимает?[HTML]',
                  answer: '_blank,_self,_top,_parent',
                  score: 100,
                },
                {
                  text: 'Для чего используют data-атрибуты?[HTML]',
                  answer: 'Хранят инфо в ДОМ дереве ,манипуляция в JS',
                  score: 200,
                },
                {
                  text: 'Для какой графики используются canvas и svg[HTML]',
                  answer: 'canvas - растр,svg - вектор',
                  score: 300,
                },
                {
                  text: 'Сколько псевдоклассов добавили в CSS3?(+-0)',
                  answer: '7',
                  score: 400,
                },
                {
                  text: 'Что такое CSS-атрибут (attr)?',
                  answer: 'Функция получающая значение атрибута элемента',
                  score: 500,
                },
              ],
            },
          },
          {
            name: 'Это база',
            questions: {
              create: [
                {
                  text: 'Именно эта фраза является результатом работы, которую при запуске выводят на экран',
                  answer: 'Hello, world',
                  score: 100,
                },
                {
                  text: 'Отец информатики и первый «хакер». Именно его можно назвать праотцом современного компьютера.',
                  answer: 'Алан Тьюринг',
                  score: 200,
                },
                {
                  text: 'Это язык программирования, который может обрабатываться напрямую процессором, без необходимости предварительной компиляции.',
                  answer: 'Машинный код',
                  score: 300,
                },
                {
                  text: 'Именно он «читает» код, написанный на определенном языке программирования, и преобразует описанные команды и конструкции языка в исполняемый машинный код.',
                  answer: 'Компилятор',
                  score: 400,
                },
                {
                  text: 'Эту ошибку труднее всего определить, так как она может не проявляться при компиляции и во время выполнения программы, но при этом приводит к ее неправильному выполнению.',
                  answer: 'Логическая',
                  score: 500,
                },
              ],
            },
          },
        ],
      },
    },
  });

  const statistics = await prisma.statistics.create({
    data: {
      userId: svyat.id,
      gameId: game.id,
      score: 1000,
    },
  });

  console.log({ pavel, svyat });
  console.log({ game, game2 });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
