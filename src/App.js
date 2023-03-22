import "./App.css";
import AuthUser from "./components/pages/AuthUser";
import Guest from "./components/layout/navbar/Guest";
import Auth from "./components/layout/navbar/Auth";
function App() {
  const { getToken } = AuthUser();

  if (!getToken()) {
    return (
      <div className="App d-flex flex-column min-vh-100 SVGGroundRight">
        <Guest />
      </div>
    );
  }
  return (
    <div className="App d-flex flex-column min-vh-100 SVGGroundRight">
      <Auth />
    </div>
  );
}

export default App;
