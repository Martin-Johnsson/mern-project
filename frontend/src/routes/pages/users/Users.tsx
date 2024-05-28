import UsersList from '../../../components/user/UsersList/UsersList';

const Users = () => {
  const DUMMYUSERS = [
    {
      id: 'u1',
      name: 'Martin Johnsson',
      image: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg',
      places: 3,
    },
  ];

  return <UsersList items={DUMMYUSERS} />;
};

export default Users;
