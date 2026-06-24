import {createContext, type ReactNode} from "react";
import { RootStore } from "./RootStore.ts";

interface IStoreProviderProps {
    children: ReactNode;
}

export const StoreContext = createContext<RootStore | null>(null);

export const StoreProvider = ({ children }: IStoreProviderProps) => {
    return (
        <StoreContext.Provider value={new RootStore()}>
            {children}
        </StoreContext.Provider>
    );
};

export default StoreProvider;