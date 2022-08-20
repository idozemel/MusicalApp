import React, { useEffect, useState } from "react";
import { Container, Form, Row, Stack } from "react-bootstrap";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
const ChatPage = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState(["Hello", "Hello", "How r ya?"]);
  const [messageToSend, setMessageToSend] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const socket = io("http://localhost:3030");
    setSocket(socket);
    socket.on("chat message", function (msg) {
      setMessages((messages) => [...messages, msg]);
    });
    return () => socket.close();
  }, []);

  const inputHander = (ev) => [setMessageToSend(ev.target.value)];

  // form.addEventListener("submit", function (e) {
  //   e.preventDefault();
  //   if (input.value) {
  //     socket.emit("chat message", input.value);
  //     input.value = "";
  //   }
  // });

  return (
    <Container className="h-75 mt-5 d-flex flex-column justify-content-space-between">
      <Stack gap={3} className="flex-column d-flex">
        {messages.map((m, idx) => (
          <Row
            key={idx}
            className="small p-3 me-3 mb-1 text-white rounded-3 bg-primary"
          >
            {m}
          </Row>
        ))}
      </Stack>
      <Form
        onSubmit={(ev) => {
          ev.preventDefault();
          if (messageToSend) {
            socket.emit("chat message", messageToSend);
          }
        }}
      >
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Send a message</Form.Label>
          <Form.Control
            placeholder="message"
            name="message"
            onChange={inputHander}
          />
        </Form.Group>
      </Form>
    </Container>
  );
};

export default ChatPage;
