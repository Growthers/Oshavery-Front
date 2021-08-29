import React from 'react'
import Message from '../molecules/message'
import InfiniteScroll from 'react-infinite-scroller'

class Messages extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
    }
  }

  loadMore(page) {
    const response = {
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
      channnel_id: "test_channnel_id",
    }
    this.setState({messages: this.state.messages.concat([(<Message response={response}></Message>)])})
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
