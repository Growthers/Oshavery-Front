import React from 'react'

class Message extends React.Component {
  render() {
    const r = this.props.response
    const author_avator = r.author.avator
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
