import React, { useEffect, useRef, useState } from "react";
import { Container, Form, Row, Stack } from "react-bootstrap";
import { io } from "socket.io-client";
import axios from "axios";
const ChatPage = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageToSend, setMessageToSend] = useState("");
  useEffect(() => {
    const socket = io("http://localhost:3030");
    setSocket(socket);
    axios.get("http://localhost:3030/api/chat").then(({data}) => {
      if(data){
        setMessages(data);
      }
    });
    socket.on("chat message", (msg) =>
      setMessages((messages) => [...messages, msg])
    );
    return () => socket.close();
  }, []);

  const bottom = useRef(null);

  const scrollToBottom = () => {
    bottom.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const inputHander = (ev) => [setMessageToSend(ev.target.value)];

  return (
    <Container className="h-75 mt-5 d-flex flex-column justify-content-space-between">
      <Stack gap={3} className=" p-3  flex-column d-flex overflow-y-scroll">
        {messages?.map((m, idx) => (
          <Row key={idx} className="small p-3  text-white rounded-3 bg-primary">
            {m}
          </Row>
        ))}
        <div ref={bottom}></div>
      </Stack>
      <Form
        onSubmit={(ev) => {
          ev.preventDefault();
          if (messageToSend) {
            socket.emit("chat message", messageToSend);
            setMessageToSend("");
          }
        }}
      >
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Send a message</Form.Label>
          <Form.Control
            value={messageToSend}
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
