import React from "react";
import { api } from "service/axios";

const UserPage = () => {
  const getContactAll = async () => {
    try {
      const response = await api.get("contacts");
    } catch (error) {}
  };

  return <div>UserPage</div>;
};

export default UserPage;
