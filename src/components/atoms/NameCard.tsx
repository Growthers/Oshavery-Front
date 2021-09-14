import React from "react"
import type { FC } from "react"

type Props = {
  name: string
}

const NameCard: FC<Props> = (props) => {
  return (
    <>
      <span>{props.name}</span>
    </>
  )
}

export default React.memo(NameCard)
