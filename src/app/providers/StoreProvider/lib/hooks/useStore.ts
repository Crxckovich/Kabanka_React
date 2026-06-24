import { useContext } from "react";
import type { RootStore } from "../../RootStore";
import { StoreContext } from "../../StoreProvider";

export const useStore = (): RootStore => {
    const store = useContext(StoreContext);
    if (!store) {
        throw new Error("Ошибка");
    }
    return store;
};