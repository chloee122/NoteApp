import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Notification from "./Notification";
import { LayoutWrapper, HeaderWrapper } from "../styles/Layout.styled";

function Layout() {
  return (
    <LayoutWrapper>
      <HeaderWrapper>
        <h1>Note App</h1>
      </HeaderWrapper>
      <Notification />
      <Outlet />
      <Footer />
    </LayoutWrapper>
  );
}

export default Layout;
