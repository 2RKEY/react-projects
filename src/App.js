import React from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';

// Берём список пользователей с https://dummyjson.com/users

function App() {
  const [users, setUsers] = React.useState([]);
  const [invites, setInvites] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const [searchValue, setSearchValue] = React.useState('');

  React.useEffect(() => {
    fetch('https://dummyjson.com/users')
      .then(res => res.json())
      .then(json => {
        // Преобразуем данные под старую структуру,
        // чтобы ничего не менять в компонентах Users и User
        const adaptedUsers = json.users.map(u => ({
          id: u.id,
          email: u.email,
          first_name: u.firstName,
          last_name: u.lastName,
          avatar: u.image,
        }));
        setUsers(adaptedUsers);
      })
      .catch(err => {
        console.warn(err);
        alert('Ошибка при получении данных пользователя');
      })
      .finally(() => setLoading(false));
  }, []);

  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value);
  };

  const onClickInvite = (id) => {
    if (invites.includes(id)) {
      setInvites(perv => perv.filter(_id => _id !== id))
    } else {
      setInvites(perv => [...perv, id]);
    }
  };

  return (
    <div className="App">
      <Users 
        items={users}
        isLoading={isLoading} 
        searchValue={searchValue}
        onChangeSearchValue={onChangeSearchValue}
        invites={invites}
        onClickInvite={onClickInvite}
      />
      {/* <Success /> */}
    </div>
  );
}

export default App;
