import { createContext } from "react";
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import "tailwindcss/tailwind.css";
import "./index.css";

import { AppProvider } from "../AppContext";
import NewUserLayout from "./components/NewUserLayout";
import Layout from "./components/Layout";
import Main from "./pages/main/Main";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Splash from "./pages/splash/Splash";
import UserCollectData from "./pages/user-collect-data/UserCollectData";
import LoggedInLayout from "./components/LoggedInLayout";
import Overview from "./pages/overview/Overview";
import RegisterAdmin from "./pages/register/RegisterAdmin";
import ServicesPage from "./pages/services-page/ServicesPage";
import ServicesTransport from "./components/services-transport/ServicesTransport";
import ServicesAccommodation from "./components/services-accommodation/ServicesAccommodation";
import ServicesHealth from "./components/services-health/ServicesHealth";
import ServicesSecurity from "./components/services-security/ServicesSecurity";
import ServicesFacilities from "./components/services-facilities/ServicesFacilities";
import ServicesCommunication from "./components/services-communication/ServicesCommunication";
import ServicesEducation from "./components/services-education/ServicesEducation";
import ServicesFood from "./components/services-food/ServicesFood";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/alnasr/" element={<Layout />}>
      <Route index element={<Splash />} />
      <Route path="menu" element={<NewUserLayout />}>
        <Route index element={<Main />} />
        <Route path="register" element={<Register />} />
        <Route path="registerasadmin" element={<RegisterAdmin />} />
        <Route path="login" element={<Login />} />
        <Route path="user-collect-data" element={<UserCollectData />} />
      </Route>
      <Route path="home" element={<LoggedInLayout />}>
        <Route index element={<Overview />} />
        <Route path="services" element={<ServicesPage />}>
          <Route index element={<ServicesTransport />} />
          <Route path="accommodation" element={<ServicesAccommodation />} />
          <Route path="health" element={<ServicesHealth />} />
          <Route path="security" element={<ServicesSecurity />} />
          <Route path="facilities" element={<ServicesFacilities />} />
          <Route path="communication" element={<ServicesCommunication />} />
          <Route path="education" element={<ServicesEducation />} />
          <Route path="food" element={<ServicesFood />} />
        </Route>
      </Route>
    </Route>
  )
);

export const AppContext = createContext();

function App() {
  return (
    <AppProvider>
      <AppContext.Provider>
        <RouterProvider router={router}>
          <Layout />
        </RouterProvider>
      </AppContext.Provider>
    </AppProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
