import React, { Component } from 'react';
import './App.css';

class App extends Component {
//use constructor when messing with state and binding functions 
  constructor(){
    super();

    this.state = {
      userInput: '',
      commentList: [],
    }

  };
//all binding done on the onClicks
  getUserInput  (event) {
    let comment = event.target.value;
    this.setState({
      userInput: comment,
    });
  };
//know where to add the reply with index
  getUserReply(event, i){
    let replyInput = event.target.value
    let state = Object.assign({}, this.state);
    state.commentList[i].replyInput = replyInput;
    this.setState({
      state,
    })
  }
  //makes a new object for the repy  a
  //push it into replies array of comment
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
  //makes a new obj for the array of comments
  addUserComment = () => {
    //makes a copy of the array
    let getCommentsArray = this.state.commentList.slice();
    //new comment
    const newComment =
        {
          comment: this.state.userInput,
          likes: 0,
          dislikes: 0,
          replyInput: '',
          replies: [],
        }
// pushing a new comment into to the list
    getCommentsArray.push(newComment);
    this.setState({
      commentList: getCommentsArray,
    });
  };
//remove a comment by index
  handleRemoveClick(i){
    let commentIndex = i;
    let commentList = this.state.commentList;
    commentList.splice(commentIndex, 1)
    this.setState({
      commentList: commentList,
    })
  }
//reaction target value
  handleResponseClick(reaction, i) {
    let state = Object.assign({}, this.state);
    if (reaction === "like") {

      state.commentList[i].likes++;
    } else if (reaction === "dislike") {

      state.commentList[i].dislikes++;
    }
    this.setState({
      state
    })
  }

  replyHandle(add, i, childindex){
    let state = Object.assign({}, this.state);
     if (add === "good") {
      // I shows which comment we are on || childindex shows which reply we are on
          state.commentList[i].replies[childindex].replyLike++;
    } else if (add === "bad") {
          state.commentList[i].replies[childindex].replydislike++;
    }
    this.setState({
      state
    })
  }



  render() {
    //map function:
    // calls a defined callback function on each element of an array,
    // and returns an array that contains the results.

    const commentList = this.state.commentList.map(function(commentObj, i){
      const replytocomment = this.state.commentList[i].replies.map(function(replyobj, childindex){
        //childIndex
        return(
          <div key={childindex}>
            <p >{replyobj.reply}</p>
            <button value="good" onClick={(add)=>{this.replyHandle("good", i,  childindex)}}>{this.state.commentList[i].replies[childindex].replyLike} Like</button>
            <button value="bad" onClick={(add)=>{this.replyHandle("bad", i,  childindex)}}>{this.state.commentList[i].replies[childindex].replydislike} Disike</button>
          </div>
        )
      }, this);
      return (
        //top comment
        <li key={i}>{commentObj.comment}
          <button value="like" onClick={(reaction)=>{this.handleResponseClick("like", i)}}>{this.state.commentList[i].likes} Like</button>
          <button value="dislike" onClick={(reaction)=>{this.handleResponseClick("dislike", i)}}> {this.state.commentList[i].dislikes} Dislike</button>
          <input type="text" onChange={ (event) => {this.getUserReply(event, i)} } /> <button onClick={ () => {this.addReplyComment(i)}}>Reply</button>
          <button onClick={()=>{this.handleRemoveClick(i)}}>Remove</button>
          {replytocomment}
        </li>

      );
    }, this);


    return (
      <div className="App">
        <h1>RedTalk</h1>
        <input type="text" value={this.state.userInput} onChange={(event) => {this.getUserInput(event)}} />
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