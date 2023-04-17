import "./Movie.css";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../UI/Button";
import { validate } from "../../helpers/inputValidation";
import { useEffect, useState } from "react";
import {
  Rating,
  Radio,
  RadioGroup,
  FormControlLabel,
  Slider,
  TextField,
  CircularProgress,
} from "@mui/material";

interface Movie {
  id: string;
  title: string;
  director: string;
  length: number;
  rating: number;
  is3D: string;
}

interface Props {
  movies: Movie[];
  onNewMovieAdd: (movie: Movie) => void;
}

export const AddNewMovie: React.FC<Props> = (props: Props) => {
  const [formSubmitted, setIsFormSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

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
    title: "",
    director: "",
    rating: 3,
    length: 1,
    is3D: "3D",
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
    const newMovie: Movie = {
      id: uuidv4(),
      title: values.title,
      director: values.director,
      length: values.length,
      rating: values.rating,
      is3D: values.is3D,
    };
    const timer = setTimeout(() => {
      setLoading(false);
      props.movies.push(newMovie);
      props.onNewMovieAdd(newMovie);
    }, 500);

    setValues({ title: "", director: "", rating: 3, length: 1, is3D: "3D" });
    return () => {
      clearTimeout(timer);
    };
  };

  return (
    <div className="form">
      <h1>Add new Movie</h1>
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
        <Button>Add new Movie</Button>
        {loading && (
          <CircularProgress
            sx={{ color: "var(--secondary-color)", marginTop: "1rem" }}
          />
        )}
      </form>
    </div>
  );
};
