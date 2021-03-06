import { Post } from '../model/index';
import { addImageToPost } from '../utils/index';

export const mockPostList: Post[] = addImageToPost([
  {
    userId: 1,
    id: 1,
    title:
      // eslint-disable-next-line max-len
      'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
    body:
      // eslint-disable-next-line max-len
      'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
  },
  {
    userId: 1,
    id: 2,
    title: 'qui est esse',
    body:
      // eslint-disable-next-line max-len
      'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla',
  },
  {
    userId: 1,
    id: 3,
    title: 'ea molestias quasi exercitationem repellat qui ipsa sit aut',
    body:
      // eslint-disable-next-line max-len
      'et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut',
  },
  {
    userId: 1,
    id: 4,
    title: 'eum et est occaecati',
    body:
      // eslint-disable-next-line max-len
      'ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit',
  },
  {
    userId: 1,
    id: 5,
    title: 'nesciunt quas odio',
    body:
      // eslint-disable-next-line max-len
      'repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque',
  },
  {
    userId: 1,
    id: 6,
    title: 'dolorem eum magni eos aperiam quia',
    body:
      // eslint-disable-next-line max-len
      'ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et ea nemo ab reprehenderit accusantium quas\nvoluptate dolores velit et doloremque molestiae',
  },
  {
    userId: 1,
    id: 7,
    title: 'magnam facilis autem',
    body:
      // eslint-disable-next-line max-len
      'dolore placeat quibusdam ea quo vitae\nmagni quis enim qui quis quo nemo aut saepe\nquidem repellat excepturi ut quia\nsunt ut sequi eos ea sed quas',
  },
  {
    userId: 1,
    id: 8,
    title: 'dolorem dolore est ipsam',
    body:
      // eslint-disable-next-line max-len
      'dignissimos aperiam dolorem qui eum\nfacilis quibusdam animi sint suscipit qui sint possimus cum\nquaerat magni maiores excepturi\nipsam ut commodi dolor voluptatum modi aut vitae',
  },
  {
    userId: 1,
    id: 9,
    title: 'nesciunt iure omnis dolorem tempora et accusantium',
    body: `consectetur animi nesciunt iure dolore\n
      enim quia ad\n
      veniam autem ut quam aut nobis\n
      et est aut quod aut provident voluptas autem voluptas`,
  },
  {
    userId: 1,
    id: 10,
    title: 'optio molestias id quia eum',
    body: `quo et expedita modi cum officia vel magni\n
      doloribus qui repudiandae\n
      vero nisi sit\n
      quos veniam quod sed accusamus veritatis error`,
  },
]);
