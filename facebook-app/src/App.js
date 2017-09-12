import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(){
    super();
    this.getUserInput = this.getUserInput.bind(this);
    this.addUserComment = this.addUserComment.bind(this);

    this.state = {
      userInput: '',
      commentList: [],
    }
  };

  getUserInput(event) {
    let comment = event.target.value;
    this.setState({
      userInput: comment,
    });

  };

  getUserReply(event, i){
    let replyInput = event.target.value
    let state = Object.assign({}, this.state);
    state.commentList[i].replyInput = replyInput;
    this.setState({
      state,
    })
  }
  addReplyComment(i){
    let state = Object.assign({}, this.state);
    const newReply = 
          {
            reply: state.commentList[i].replyInput,
            replyLike:0,
            replydislike:0, 
         }
        
    state.commentList[i].replies.push(newReply);
    this.setState({
      state,
    });
  }
  addUserComment() {
    let getCommentsArray = this.state.commentList.slice();
    const newComment = 
        {
          comment: this.state.userInput,
          likes: 0,
          dislikes: 0,
          replyInput: '',
          replies: [],
     }

    getCommentsArray.push(newComment);
    this.setState({
      commentList: getCommentsArray,
    });
  };

  handleRemoveClick(i){
    let commentIndex = i;
    let commentList = this.state.commentList;
    commentList.splice(commentIndex, 1)
    this.setState({
      commentList: commentList,
    })
  }

  handleResponseClick(reaction, i) {
    let state = Object.assign({}, this.state);
    if (reaction === "like") {
      // set state to comment with new like
        state.commentList[i].likes++;
    } else if (reaction === "dislike") {
      // set state to comment with new dislike
        state.commentList[i].dislikes++;
    }
    this.setState({
      state
    })
  }

  replyHandle(add, i, childindex){
    let state = Object.assign({}, this.state);
     if (add === "good") {
      // set state to comment with new like
          state.commentList[i].replies[childindex].replyLike++;
    } else if (add === "bad") {
      // set state to comment with new dislike
          state.commentList[i].replies[childindex].replydislike++;
    }
    this.setState({
      state
    })
  }

  render() {
    const commentList = this.state.commentList.map(function(commentObj, i){
      const replytocomment = this.state.commentList[i].replies.map(function(replyobj, childindex){
        return(
          <div key={childindex}>
            <p >{replyobj.reply}</p>
            <button value="good" onClick={(add)=>{this.replyHandle("good", i,  childindex)}}>{this.state.commentList[i].replies[childindex].replyLike} Like</button>
            <button value="bad" onClick={(add)=>{this.replyHandle("bad", i,  childindex)}}>{this.state.commentList[i].replies[childindex].replydislike} Like</button>
            <button onClick={()=>{this.handleRemoveClick(i)}}>Remove</button>
          </div>
        )
      }, this);
      return (
        <li key={i}>{commentObj.comment}
          <button value="like" onClick={(reaction)=>{this.handleResponseClick("like", i)}}>{this.state.commentList[i].likes} Like</button>
          <button value="dislike" onClick={(reaction)=>{this.handleResponseClick("dislike", i)}}> {this.state.commentList[i].dislikes} Dislike</button>
          <input type="text" onChange={ (event) => {this.getUserReply(event, i)} } /> <button onClick={ () => {this.addReplyComment(i)}}>Reply</button>
          {replytocomment}
        </li>

      );
    }, this);


    return (
      <div className="App">
        <h1>RedTalk</h1>
        <input type="text" value={this.state.userInput} onChange={this.getUserInput} />
        <button onClick={this.addUserComment}>Submit</button>
        <ul>
        {commentList}
        </ul>
      </div>
    );
  }
}

export default App;


// Create a way to write responses to the original comment
// Create a thumbs up / thumbs down counter for these comments and ability to delete