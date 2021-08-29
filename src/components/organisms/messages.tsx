import React from 'react'
import Message from '../molecules/message'
import InfiniteScroll from 'react-infinite-scroller'

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

interface State {
  messages: JSX.Element[];
};

class Messages extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props)
    this.state = {
      messages: [],
    }
  }

  loadMore(_: number) {
    const response: Response = {
      id: "test_id",
      timestamp: "test_timestamp",
      author: {
        id: "test_author_id",
        name: "test_author_name",
        avator: "test_author_name",
        bot: "test_author_bot",
        state: "test_author_state",
      },
      content: "test_content",
      guild_id: "test_guild_id",
      channel_id: "test_channnel_id",
    }
    this.setState({messages: this.state.messages.concat([<Message response={response}></Message>])})
  }

  render() {
    return (
      <>
        <InfiniteScroll
          loadMore={this.loadMore.bind(this)}
          hasMore={true}
          loader={<div className="loader" key={0}>Loading ...</div>}
        >
          {this.state.messages.map((i, j) => (<div key={j.toString()}>{i}</div>))}
        </InfiniteScroll>
      </>
    )
  }
}

export default Messages
