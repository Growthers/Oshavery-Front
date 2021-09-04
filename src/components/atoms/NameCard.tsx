import React from "react";
import type { FC } from "react";

type Props = {
  name: string
};

const NameCard: FC<Props> = React.memo((props) => {
  return (
    <>
      <span>{props.name}</span>
    </>
  )
});

export default NameCard;
