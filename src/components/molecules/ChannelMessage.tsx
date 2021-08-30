import type { FC } from 'react';

interface Response {
  id: string;
  timestamp: string;
  author: {
    id: string;
    name: string;
    avator: string;
    bot: string;
    state: string;
  };
  content: string;
  guild_id: string;
  channel_id: string;
};

interface Props {
  response: Response;
};

const Message: FC<Props> = (props) => {
  const r: Response = props.response
  const author_avator: string = r.author.avator
  const author_name = r.author.name
  const timestamp = r.timestamp
  const content = r.content

  return (
    <div>
      <img src={author_avator} alt={author_name + "'s avator"}></img>
      <div>{author_name}</div>
      <div>{timestamp}</div>
      <div>{content}</div>
    </div>
  )
}

export default Message
