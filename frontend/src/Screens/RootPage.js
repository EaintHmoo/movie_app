import { Outlet } from "react-router-dom";
import Navigation from "../Layout/Navigation/Navigation";
import Footer from "../Layout/Footer/Footer";
import ScrollOnTop from "../ScrollOnTop";
import MobileFooter from "../Layout/Footer/MobileFooter";

function RootPage() {
  return (
    <>
      <ScrollOnTop>
        <div className="bg-main text-white">
          <Navigation />
          <Outlet />
          <Footer />
          {/* mobile footer */}
          <MobileFooter />
        </div>
      </ScrollOnTop>
    </>
  );
}
export default RootPage;
