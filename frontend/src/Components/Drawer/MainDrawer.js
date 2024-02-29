import Drawer from "rc-drawer";
import React from "react";
function MainDrawer({ children, drawerOpen, closeDrawer }) {
  return (
    <Drawer
      open={drawerOpen}
      onClose={closeDrawer}
      level={null}
      handler={false}
      placement="right"
      width="60%"
      className="bg-white h-screen"
    >
      {children}
    </Drawer>
  );
}
export default MainDrawer;
