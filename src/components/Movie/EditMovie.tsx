import "./Movie.css";
import { Button } from "../UI/Button";
import { validate } from "../../helpers/inputValidation";
import { useEffect, useState } from "react";
import { Movie } from "../../types/MovieType";
import {
  Rating,
  Radio,
  RadioGroup,
  FormControlLabel,
  Slider,
  TextField,
  CircularProgress,
} from "@mui/material";

interface Props {
  onSave: (movies: Movie[]) => void;
  movies: Movie[];
  id: string;
}

export const EditMovie: React.FC<Props> = (props: Props) => {
  const [formSubmitted, setIsFormSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const movie = props.movies.filter((movie) => {
    return movie.id === props.id;
  });

  const [isValid, setIsValid] = useState<{
    title: boolean;
    director: boolean;
  }>({
    title: false,
    director: false,
  });
  const [values, setValues] = useState<{
    title: string;
    director: string;
    rating: number;
    length: number;
    is3D: string;
  }>({
    title: movie[0].title,
    director: movie[0].director,
    rating: movie[0].rating,
    length: movie[0].length,
    is3D: movie[0].is3D,
  });

  useEffect(() => {
    setIsValid({
      title: validate("title", values.title),
      director: validate("director", values.director),
    });
    setIsFormSubmitted(false);
  }, [values]);

  const onChangeHandler = (event: any) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onSliderChangeHandler = (event: any, value: number | number[]) => {
    if (Array.isArray(value)) {
      setValues({ ...values, length: value[0] });
    } else {
      setValues({ ...values, length: value });
    }
  };

  const onSubmitHandler: React.FormEventHandler<HTMLFormElement> = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    setIsFormSubmitted(true);
    event.preventDefault();
    if (!isValid.title || !isValid.director) {
      return;
    }
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
      const updatedMovies = props.movies.map((movie) => {
        if (movie.id === props.id) {
          return {
            ...movie,
            title: values.title,
            director: values.director,
            length: values.length,
            rating: values.rating,
            is3D: values.is3D,
          };
        }
        return movie;
      });
      setValues({
        title: values.title,
        director: values.director,
        length: values.length,
        rating: values.rating,
        is3D: values.is3D,
      });
      props.onSave(updatedMovies);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  };

  return (
    <div className="form">
      <h1>Edit Movie</h1>
      <form onSubmit={onSubmitHandler}>
        <div className="text-fields">
          <TextField
            name="title"
            label="Title"
            size="small"
            value={values.title}
            error={!isValid.title && formSubmitted}
            helperText={
              !isValid.title && formSubmitted ? "Enter a valid Title" : ""
            }
            sx={{ margin: "1rem 1rem 0.5rem 0" }}
            onChange={onChangeHandler}
          />
          <TextField
            name="director"
            label="Director"
            size="small"
            value={values.director}
            error={!isValid.director && formSubmitted}
            helperText={
              !isValid.director && formSubmitted ? "Enter a valid Director" : ""
            }
            sx={{ margin: "1rem 0 1rem 0.5rem" }}
            onChange={onChangeHandler}
          />
        </div>
        <label style={{ marginBottom: "0.8rem" }}>
          Length: {values.length} min
        </label>
        <Slider
          value={values.length}
          onChange={onSliderChangeHandler}
          min={1}
          max={300}
          step={1}
        />
        <label style={{ marginTop: "0.8rem" }}>Rating:</label>
        <Rating
          sx={{
            color: "var(--secondary-color)",
            fontSize: 32,
            margin: "1rem 0",
          }}
          name="rating"
          value={parseInt(values.rating.toString())}
          onChange={onChangeHandler}
        />
        <RadioGroup
          sx={{ display: "flex", flexDirection: "row", marginBottom: "1rem" }}
          aria-label="movie-type"
          name="is3D"
          value={values.is3D}
          onChange={onChangeHandler}
        >
          <FormControlLabel
            value="3D"
            control={<Radio sx={{ color: "primary.main" }} />}
            label="3D"
          />
          <FormControlLabel
            value="Standard"
            control={<Radio sx={{ color: "primary.main" }} />}
            label="Standard"
          />
        </RadioGroup>
        <Button>Save Changes</Button>
        {loading && (
          <CircularProgress
            sx={{ color: "var(--secondary-color)", marginTop: "1rem" }}
          />
        )}
      </form>
    </div>
  );
};
