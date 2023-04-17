import { useState } from "react";
import "./App.css";
import { Header } from "./components/Header/Header";
import {
  Box,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { Button } from "./components/UI/Button";
import { EditMovie } from "./components/Movie/EditMovie";
import { Movie } from "./types/MovieType";
import { Card } from "./components/UI/Card";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "max-content",
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const handleMovie = (movie: Movie) => {
    setMovies([...movies, movie]);
  };

  const sortedMovies = movies.sort((a, b) => a.title.localeCompare(b.title));

  const [search, setSearch] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [id, setId] = useState<string>("");
  const handleOpen: () => void = () => setOpen(true);
  const handleClose: () => void = () => setOpen(false);

  const onSaveHandler = (updateMovies: Movie[]) => {
    setMovies(updateMovies);
  };

  const deleteMovieHandler = (id: string) => {
    const updatedMovies = movies.filter((movie) => movie.id !== id);
    setMovies(updatedMovies);
  };

  const topMovies = () => {
    const topThreeMovies = [...movies].sort(
      (a, b) => parseInt(b.rating.toString()) - parseInt(a.rating.toString())
    );
    return topThreeMovies.slice(0, 3);
  };

  return (
    <>
      <Header onNewMovie={handleMovie} />
      <TextField
        sx={{
          marginTop: "2rem",
          textAlign: "center",
          transform: "translateX(-50%)",
          left: "50%",
        }}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        label="Filter"
        size="small"
      />
      {movies.length < 1 ? (
        <h1 className="no-content">No content</h1>
      ) : (
        <TableContainer
          component={Paper}
          sx={{ minWidth: "80%", maxWidth: "80%", margin: "2rem auto 0" }}
        >
          <Table
            sx={{ tableLayout: "fixed", width: "100%" }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow sx={{ backgroundColor: "var(--secondary-color)" }}>
                <TableCell sx={{ color: "#ffffff", textAlign: "center" }}>
                  Title
                </TableCell>
                <TableCell sx={{ color: "#ffffff", textAlign: "center" }}>
                  Director
                </TableCell>
                <TableCell sx={{ color: "#ffffff", textAlign: "center" }}>
                  Length
                </TableCell>
                <TableCell sx={{ color: "#ffffff", textAlign: "center" }}>
                  Rating
                </TableCell>
                <TableCell sx={{ color: "#ffffff", textAlign: "center" }}>
                  Type
                </TableCell>
                <TableCell sx={{ color: "#ffffff", textAlign: "center" }}>
                  Update
                </TableCell>
                <TableCell sx={{ color: "#ffffff", textAlign: "center" }}>
                  Delete
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedMovies
                .filter((item) => {
                  return search.toLowerCase() === ""
                    ? item
                    : item.title.toLowerCase().includes(search) ||
                        item.director.toLowerCase().includes(search) ||
                        item.length.toString().includes(search) ||
                        item.rating.toString().includes(search) ||
                        item.is3D.toLowerCase().includes(search);
                })
                .map((movie, index) => (
                  <TableRow
                    key={movie.id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      backgroundColor: index % 2 === 0 ? "#f2f2f2" : "inherit",
                    }}
                  >
                    <TableCell sx={{ textAlign: "center" }}>
                      {movie.title}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {movie.director}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {movie.length} min
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {movie.rating}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {movie.is3D}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      <Button
                        style={{ width: "50%" }}
                        onClick={() => {
                          setId(movie.id);
                          handleOpen();
                        }}
                      >
                        Update
                      </Button>
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      <Button
                        style={{ width: "50%" }}
                        onClick={() => {
                          deleteMovieHandler(movie.id);
                        }}
                      >
                        X
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <EditMovie onSave={onSaveHandler} movies={movies} id={id} />
        </Box>
      </Modal>
      <h1 className="top-movies">Top Movies</h1>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "2rem",
        }}
      >
        <div className="top-movies-container">
          {topMovies().map((movie) => (
            <Card
              key={movie.id}
              title={movie.title}
              director={movie.director}
              rating={movie.rating}
              length={movie.length}
              is3D={movie.is3D}
            />
          ))}
        </div>
      </Box>
    </>
  );
}

export default App;
