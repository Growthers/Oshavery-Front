import type { FC } from "react";

type Props = {
  id?: string;
  value: string;
  onChange: (e: string) => void;
};
const InputBox: FC<Props> = (props) => (
  <input type="text" onChange={(e) => props.onChange(e.target.value)} id={props.id} />
);

export default InputBox;
