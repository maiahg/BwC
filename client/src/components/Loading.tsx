import React from "react";
import { Spinner } from "@/components/ui/spinner";

const Loading = () => {
  return (
    <div className="flex items-center">
      <Spinner size="large" />
    </div>
  );
};

export default Loading;
