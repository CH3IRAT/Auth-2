import React from "react";
import { useHistory } from "react-router";
import { Button } from "react-bootstrap";

export const Home = () => {
  const history = useHistory();
  const handleClick = () => {
    history.push("/register");
  };
  return (
    <div>
      <h1> Home </h1>
      <Button
        onClick={handleClick}
        style={{ width: "250", textAlign: "center" }}
      >
        {" "}
        LOGIN{" "}
      </Button>
    </div>
  );
};
