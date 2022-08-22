import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Handlers/Loading";
import MainScreen from "../../components/MainScreen/MainScreen";
import { getAllSong } from "../../actions/songAction";
import { useNavigate } from "react-router-dom";
import { isHeAdmin } from "../../services/userService";
import "./SongsPage.css";
import { getGenres } from "../../services/songService";
const SongsPage = () => {
  const dispatch = useDispatch();
  const [genres, setGenres] = useState([]);
  const [filters, setFilters] = useState({
    artistText: "",
    songText: "",
    genres: [],
  });
  const allSongs = useSelector((state) => state.getAllSongs);
  const [isAdmin, setIsAdmin] = useState(false);
  const { loading, error, songsInfo } = allSongs;
  const navigate = useNavigate();
  useEffect(() => {
    isHeAdmin().then((isAdmin) => {
      setIsAdmin(isAdmin);
    });
    if (!songsInfo) {
      dispatch(getAllSong());
    }
  }, [dispatch, songsInfo, isAdmin]);

  useEffect(() => {
    const initFetch = async () => {
      const genre = await getGenres();
      const genreNames = genre.map((g) => g.name);
      setGenres(genreNames);
    };
    initFetch();
  }, []);

  useEffect(() => console.log(filters), [filters]);

  return (
    <MainScreen title="Songs">
      {error && navigate("/login")}
      {loading && <Loading />}
      <Container>
        {isAdmin && (
          <Row className="mb-3">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate(`/song/edit`)}
            >
              Add New Song
            </Button>
          </Row>
        )}

        <Row>
          <Col lg={4} md={6} sm={12} xs={12}>
            <Form.Group className="mb-3">
              <Form.Label>Song</Form.Label>
              <Form.Control
                className="searchBox"
                type="text"
                id="songSearch"
                value={filters.songText}
                placeholder="Search For Song"
                onChange={(event) =>
                  setFilters((filters) => ({
                    ...filters,
                    songText: event.target.value,
                  }))
                }
              />
            </Form.Group>
          </Col>
          <Col lg={4} md={6} sm={12} xs={12}>
            <Form.Group className="mb-3">
              <Form.Label>Artist</Form.Label>
              <Form.Control
                className="searchBox"
                type="text"
                id="artistSearch"
                placeholder="Search For Artist"
                onChange={(event) =>
                  setFilters((filters) => ({
                    ...filters,
                    artistText: event.target.value,
                  }))
                }
              />
            </Form.Group>
          </Col>

          <Col lg={4} md={6} sm={12} xs={12}>
            <Form.Group className="mb-3">
              <Form.Label>Genre</Form.Label>
              <Form.Select
                multiple
                name="name"
                value={filters.genres}
                aria-label="Genre"
                onChange={(event) =>
                  setFilters((filters) => {
                    const genre = event.target.value;
                    if (filters.genres.includes(genre))
                      return {
                        ...filters,
                        genres: filters.genres.filter((g) => g === genre),
                      };
                    else
                      return {
                        ...filters,
                        genres: [...filters.genres, genre],
                      };
                  })
                }
              >
                {genres && genres.length > 0 && (
                  <option key={genres.name} value={genres.name}>
                    {genres.name}
                  </option>
                )}
                {genres &&
                  genres
                    .filter((g) => g !== genres.name)
                    .map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Button size="md" className="mb-4" variant="secondary">
            Submit
          </Button>
        </Row>

        <Row>
          {songsInfo &&
            songsInfo.map((song, idx) => {
              return (
                <Col xs="3" key={idx}>
                  <Card
                    className="mb-3"
                    style={{ cursor: isAdmin && "pointer" }}
                    key={song._id}
                    onClick={() =>
                      isAdmin && navigate(`/song/edit/${song._id}`)
                    }
                  >
                    <Card.Img
                      variant="top"
                      src={
                        song.image ||
                        "https://i2.wp.com/www.wmhbradio.org/wp-content/uploads/2016/07/music-placeholder.png?resize=300%2C300&ssl=1"
                      }
                    />
                    <Card.Body>
                      <Card.Title>{song.name}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        {song.artist.name}
                      </Card.Subtitle>
                      <Card.Text>Genre: {song.genre.name}</Card.Text>
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() => window.open(song.link)}
                      >
                        Song Link
                      </Button>
                      <Button
                        size="sm"
                        variant="outline-primary"
                        onClick={() => window.open(song.artist.link)}
                      >
                        Artist Link
                      </Button>
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
