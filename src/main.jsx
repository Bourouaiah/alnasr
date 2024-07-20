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

import NewUserLayout from "./components/NewUserLayout";
import Layout from "./components/Layout";
import Main from "./pages/main/Main";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Splash from "./pages/splash/Splash";
import UserCollectData from "./pages/user-collect-data/UserCollectData";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/alnasr/" element={<Layout />}>
      <Route index element={<Splash />} />
      <Route path="menu" element={<NewUserLayout />}>
        <Route index element={<Main />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="user-collect-data" element={<UserCollectData />} />
        {/* <Route path="registerasadmin" element={<RegisterAdmin />} /> */}
        {/* <Route path="registerascashier" element={<RegisterCashier />} /> */}
      </Route>
      {/* <Route path="home" element={<LoggedInLayout />}>
        <Route index element={<Overview />} />
        <Route path="transactions" element={<Transactions />}>
          <Route index element={<TableAllTransactions />} />
          <Route path="income" element={<TableIncome />} />
          <Route path="expense" element={<TableExpense />} />
        </Route>
        <Route path="send-money" element={<SendMoney />} />
        <Route path="accounts" element={<Accounts />} />
        <Route path="settings" element={<Settings />} />
      </Route> */}
    </Route>
  )
);

export const AppContext = createContext();

function App() {
  return (
    <AppContext.Provider>
      <RouterProvider router={router}>
        <Layout />
      </RouterProvider>
    </AppContext.Provider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
