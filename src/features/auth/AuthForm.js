import React, { useState } from "react";

const AuthForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [action, setAction] = useState("Sign In");

  const authenticate = async () => {
      const basePath = 'api/auth/'; // server side path
      let url = basePath;

      if(action === "Sign In") {
          url += 'login'
      }

      console.log(url);

      const response = await fetch(url, {
          method: "POST"
          headers: {'contentType'}
      })
  }
};
