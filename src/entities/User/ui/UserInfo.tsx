import { useUserStore } from "@/app/providers/StoreProvider/StoresRegister.ts";
import { observer } from "mobx-react-lite";

export const UserInfo = observer(() => {
  const userStore = useUserStore();

  return (
    <div>
      <h2>Имя {userStore.user.name}</h2>
      <h3>Почта {userStore.user.email}</h3>
      <h3>
        {userStore.user.isActivated
          ? "Аккаунт активирован"
          : "Аккаунт не активирован"}
      </h3>
      {/*{!userStore.user.isActivated && (*/}
      {/*  <Button>Подтвердить аккаунт</Button>*/}
      {/*)}*/}
    </div>
  );
});

export default UserInfo;
