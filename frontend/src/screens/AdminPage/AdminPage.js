import React, { useEffect, useState } from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../actions/userAction";
import ErrorMessage from "../../components/Handlers/ErrorMessage";
import Loading from "../../components/Handlers/Loading";
import MainScreen from "../../components/MainScreen/MainScreen";
import { isHeAdmin } from "../../services/userService";

const AdminPage = () => {
  const dispatch = useDispatch();
  const usersList = useSelector((state) => state.getAllUsers);
  const { loading, error, allUsers } = usersList;


  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    isHeAdmin().then((isAdmin) => {
      setIsAdmin(isAdmin);
    });
    if (!allUsers) {
      dispatch(getAllUsers());
    }

  }, [dispatch, allUsers, isAdmin]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      //Write delete operation
    }
  };

  return (
    <MainScreen title="Hello Admin">
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      {allUsers?.map((user) => {
        return (
          <Accordion key={user._id}>
            <Card style={{ margin: 10 }}>
              <Card.Header style={{ display: "flex" }}>
                <span
                  style={{
                    color: "black",
                    textDecoration: "none",
                    flex: 1,
                    cursor: "pointer",
                    alignSelf: "center",
                    fontSize: 18,
                  }}
                >
                  <Accordion.Header as={Card.Text} variant="link">
                    {" "}
                    {user.username}
                  </Accordion.Header>
                </span>
                <div>
                  <Button
                    variant="light"
                    className="mx-2"
                    onClick={() => deleteHandler(user._id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Header>
              <Accordion.Body>
                <Card.Body>
                  <h4>
                    <Badge pill bg="success">
                      Username - {user.username}
                    </Badge>
                  </h4>
                  <blockquote className="blockquote mb-0">
                    <p>{user.email}</p>
                    <footer>
                      Admin -{" "}
                      <strong>
                        {user.isAdmin.toString().charAt(0).toUpperCase() +
                          user.isAdmin.toString().slice(1)}
                      </strong>
                    </footer>
                  </blockquote>
                </Card.Body>
              </Accordion.Body>
            </Card>
          </Accordion>
        );
      })}
    </MainScreen>
  );
};

export default AdminPage;
