import React, {
  useState,
  useEffect,
  useReducer,
  useContext,
  useRef,
} from "react";
import { useNavigate } from "react-router-dom";
import Card from "../UI/Card/Card";
import classes from "./Users.module.css";

const users = [
  { id: 1, name: "dudi" },
  { id: 2, name: "amit" },
];

const Users = (props) => {
  useEffect(() => {
    //Fetch Users Here
  }, []);

  return (
    //Create List Component
    <List className={classes.users}>
      {users.map((user) => {
        //Create List Item Component
        return <ListItem item={user} />;
      })}
    </List>
  );
};

export default Users;
