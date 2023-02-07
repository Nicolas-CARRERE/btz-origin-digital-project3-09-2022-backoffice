import Head from "next/head";
import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import UserContextProvider from "../context/UserContext";
import MainContent from "./MainContent";

type TChildren = { children: React.ReactNode };

function Layout({ children }: TChildren) {
  return (
    <>
      <Head>
        <title>Whatever You Watch</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon_logo_WYW.ico" />
      </Head>
      <UserContextProvider>
        <div className="w-screen fixed flex flex-col h-screen">
          <Navbar />
          <div className="w-full  h-[90%] flex bg-lightgrey">
            <Sidebar />
            <MainContent>{children}</MainContent>
          </div>
        </div>
      </UserContextProvider>
    </>
  );
}

export default Layout;
