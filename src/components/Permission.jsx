import React from "react";
import { useCurrentUser } from "../api/projectApi";


const Permissions = ({ children }) => {
  const { data: user, isLoading } = useCurrentUser();

  if (isLoading || !user) return null;

  const permissions = user?.permissions || [];

  // Clone and inject permissions as prop into child
  return React.Children.map(children, (child) =>
    React.cloneElement(child, { permissions })
  );
};

export default Permissions;
