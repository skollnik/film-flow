import { ReactNode, CSSProperties } from "react";
import "./Button.css";

interface Props {
  children: ReactNode;
  style?: CSSProperties;
  onClick?: (event: any) => void;
}

export const Button: React.FC<Props> = (props: Props) => {
  return (
    <button style={props.style} onClick={props.onClick}>
      {props.children}
    </button>
  );
};
