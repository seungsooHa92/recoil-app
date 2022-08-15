import { createContext, useContext } from 'react';
import { rootStore } from 'src/store/rootStore';

const RootStoreContext = createContext(rootStore);
export const RootStoreProvider = RootStoreContext.Provider;
export const useStores = () => useContext(RootStoreContext);

// export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
//   const RootStoreContext = createContext<RootStore | undefined>(undefined);
//   return <RootStoreContext.Provider value={rootStore}>{children}</RootStoreContext.Provider>;
// };
