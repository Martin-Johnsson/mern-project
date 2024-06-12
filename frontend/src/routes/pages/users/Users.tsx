import { useEffect, useState } from 'react';
import UsersList from '../../../components/user/UsersList/UsersList';
import ErrorModal from '../../../shared/components/UIElements/ErrorModal/ErrorModal';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner/LoadingSpinner';
import { useHttpClient } from '../../../shared/hooks/Http-hook.ts';

const Users = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          'http://localhost:3000/api/users'
        );
        await setLoadedUsers(responseData.users);
      } catch (err) {}
    };
    fetchUsers();
  }, []);
  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className='center'>
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers.length > 0 && (
        <UsersList items={loadedUsers} />
      )}
    </>
  );
};

export default Users;
