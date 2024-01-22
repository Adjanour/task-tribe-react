import * as React from "react";

import logo from "@/assets/logo.svg";
import africoda from "@/assets/africoda.jpeg";
import { Link } from "react-router-dom";
import { Card } from "antd";

type LayoutProps = {
  children: React.ReactNode;
  title: string;
};

export const Layout = ({ children, title }: LayoutProps) => {
  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 sm:px-6 lg:px-8">
        <div className="rounded-full w-24 h-24 mb-4">
          <img src={africoda} className="rounded-full" alt="africoda"/>
        </div>
        <Card className="px-2" style={{width:"500px"}}>
          <div className="mb-3">
            <p className="text-center mx-auto mb-2 text-2xl text-blue-200">{title}</p>
          </div>
          <div className="w-full">{children}</div>
        </Card>
      </div>
    </>
  );
};
