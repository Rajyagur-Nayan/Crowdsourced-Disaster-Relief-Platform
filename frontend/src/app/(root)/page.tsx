import React from "react";
import Section1 from "../components/Section1";
import { Toaster } from "react-hot-toast";
import Section2 from "../components/Section2";

const page = () => {
  return (
    <div>
      <Section1 />
      <Section2 />
      <Toaster />
    </div>
  );
};

export default page;
