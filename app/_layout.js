import {Slot, Stack} from "expo-router";
import Header from "../components/header";

const Layout = () => {
  return (
    <>
      <Header/>
      {/*<Stack/>*/}
      <Slot/>
    </>
  );
}

export default Layout;
