import {Slot, Stack} from "expo-router";
import Header from "../components/header";
import {AuthProvider} from "./contexts/authContext";

const Layout = () => {
  return (
    <AuthProvider>
      <Header/>
      {/*<Stack/>*/}
      <Slot/>
    </AuthProvider>
  );
}

export default Layout;
