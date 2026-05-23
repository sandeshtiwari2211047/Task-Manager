import Sidebar from "./Sidebar";
import Footer from "./Footer";
export default function Layout({ children }) {
  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-content">
        {children}
        <Footer />
      </div>
    </div>
  );
}