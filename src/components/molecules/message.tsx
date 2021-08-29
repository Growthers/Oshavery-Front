import React from 'react'

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

class Message extends React.Component<Props, {}> {
  render() {
    const r: Response = this.props.response
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
}

export default Message
