import { Box, Modal } from "@mui/material";
import "./Header.css";
import { useState } from "react";
import { AddNewMovie } from "../Movie/AddNewMovie";
import { Button } from "../UI/Button";
import { Movie } from "../../types/MovieType";

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

interface Props {
  onNewMovie: (movie: any) => void;
}

export const Header: React.FC<Props> = (props: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen: () => void = () => setOpen(true);
  const handleClose: () => void = () => setOpen(false);

  const handleNewMovie = (movie: any) => {
    props.onNewMovie(movie);
  };

  const movies: Movie[] = [];

  return (
    <header>
      <div className="logo">
        <h1>Film Flow</h1>
      </div>
      <div className="btn-add">
        <Button onClick={handleOpen}>Add new Movie</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <AddNewMovie movies={movies} onNewMovieAdd={handleNewMovie} />
          </Box>
        </Modal>
      </div>
    </header>
  );
};
