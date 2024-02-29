import { createContext, useMemo, useState } from "react";

export const SidebarContext = createContext({
  mobileDrawer: false,
  toggleDrawer: () => {},
});

const SiderbarContextProvider = ({ children }) => {
  const [mobileDrawer, setMobileDrawer] = useState(false);
  const toggleDrawer = () => setMobileDrawer(!mobileDrawer);
  const value = useMemo(() => {
    return { mobileDrawer, toggleDrawer };
  }, [mobileDrawer]);

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
};
export default SiderbarContextProvider;
