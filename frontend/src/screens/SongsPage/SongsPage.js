import React, { useEffect } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../components/Handlers/ErrorMessage";
import Loading from "../../components/Handlers/Loading";
import MainScreen from "../../components/MainScreen/MainScreen";
import { getAllSong } from "../../actions/songAction";
const SongsPage = () => {
  const dispatch = useDispatch();

  const allSongs = useSelector((state) => state.getAllSongs);
  const { loading, error, songsInfo } = allSongs;

  useEffect(() => {
    if (!songsInfo) {
      dispatch(getAllSong());
    }
  }, [dispatch, songsInfo]);

  return (
    <MainScreen title="SONGS">
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      <Container>
        <Row>
          {songsInfo?.map((song) => {
            return (
              <Col xs="3">
                <Card key={song._id}>
                  <Card.Img variant="top" src={song.image} />
                  <Card.Body>
                    <Card.Title>{song.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {song.artist.name}
                    </Card.Subtitle>
                    <Card.Text>
                    <p>Genre: {song.genre.name}</p>
                    </Card.Text>
                    <Button size="sm" variant="primary" onClick={() => window.open(song.link)}>Song Link</Button>
                    <Button size="sm" variant="outline-primary" onClick={() => window.open(song.artist.link)}>Artist Link</Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </MainScreen>
  );
};

export default SongsPage;
