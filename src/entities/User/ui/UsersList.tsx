import { useEffect } from "react";
import { useUserStore } from "@/app/providers/StoreProvider/StoresRegister.ts";
import { observer } from "mobx-react-lite";

export const UsersList = observer(() => {
  const userStore = useUserStore();

  useEffect(() => {
    userStore.fetchAllUsers();
  }, [userStore]);

  return (
    <div>
      {userStore.usersData.map((user) => (
        <div key={user.id}>
          <h3>Имя {user.name}</h3>
          <h4>Почта {user.email}</h4>
        </div>
      ))}
    </div>
  );
});

export default UsersList;
