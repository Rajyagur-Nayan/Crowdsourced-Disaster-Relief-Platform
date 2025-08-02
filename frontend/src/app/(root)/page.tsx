import React from "react";
import Section1 from "../components/Section1";
import { Toaster } from "react-hot-toast";

const page = () => {
  return (
    <div>
      <Section1 />
      <Toaster />
    </div>
  );
};

export default page;
