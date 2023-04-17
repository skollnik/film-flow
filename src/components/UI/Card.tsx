import "./Card.css";
interface Props {
  title: string;
  director: string;
  length: number;
  rating: number;
  is3D: string;
}
export const Card: React.FC<Props> = (props: Props) => {
  return (
    <div className="card">
      <h3>{props.title}</h3>
      <p>Director: {props.director}</p>
      <p>Length: {props.length}</p>
      <p>Rating: {props.rating}</p>
      <p>Type: {props.is3D}</p>
    </div>
  );
};
