import React from 'react';
import torrentStore from './torrentStore';
import statsStore from './statsStore';

export const StoreContext = React.createContext();

export const stores = { torrentStore, statsStore };

export const StoreProvider = ({ children, stores }) => {
  return (
    <StoreContext.Provider value={stores}>{children}</StoreContext.Provider>
  );
};

// for functional components
export const useStore = () => React.useContext(StoreContext);

// for class components
export const withStore = (Component) => (props) => {
  return <Component {...props} stores={useStore()} />;
};
