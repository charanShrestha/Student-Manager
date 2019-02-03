import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import TextareaAutosize from 'react-autosize-textarea';
import commentBuilder from "../Dashboard/commentBuilder";
import performanceBuilder from "../Dashboard/performanceBuilder";
import "./student.scss";

class Student extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vitalInfo: null,
      comments: null,
      performance: null,
      isEditing: false,
      vitalInfoDrop: false,
      commentDrop: false,
      performanceDrop: false,
    };
    this.deleteStudent = this.deleteStudent.bind(this);
    this.toggleState = this.toggleState.bind(this);
    this.submit = this.submit.bind(this);
    this.submitPerf = this.submitPerf.bind(this);
    this.dropdown = this.dropdown.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    fetch(`/api/students/${id}`)
      .then(res => res.json())
      .then(res =>
        this.setState(prevState => ({
          ...prevState,
          vitalInfo: res.vitalInfo,
          comments: res.comments,
          performance: res.performance
        }))
      );
  }

  submit(e) {
    const { match } = this.props;
    const { id } = match.params;
    const data = new FormData(e.target);
    const form = JSON.stringify(commentBuilder(data));
    fetch(`/api/students/${id}/comments`, {
      method: "PUT",
      body: form,
      headers: { "Content-Type": "application/json" }
    }).then(() => {
      this.setState(prevState => ({ ...prevState }));
    });
  }

  submitPerf(e) {
    const { match } = this.props;
    const { id } = match.params;
    const data = new FormData(e.target);
    const form = JSON.stringify(performanceBuilder(data));
    fetch(`/api/students/${id}/performance`, {
      method: "PUT",
      body: form,
      headers: { "Content-Type": "application/json" }
    }).then(() => {
      this.setState(prevState => ({ ...prevState }));
    });
  }

  deleteStudent(id) {
    fetch(`/api/students/${id}`, { method: "DELETE" });
  }

  toggleState() {
    const { isEditing } = this.state;
    this.setState({
      isEditing: !isEditing
    });
  }

  dropdown(e) {
    const { vitalInfoDrop, commentDrop, performanceDrop } = this.state;
    switch (e.target.name) {
      case 'comments':
        this.setState(prevState => ({ ...prevState, commentDrop: true }));
        if (this.state.commentDrop === true) {
          this.setState(prevState => ({ ...prevState, commentDrop: false }));
        }
        break;
      case 'vitalInfo':
        this.setState(prevState => ({ ...prevState, vitalInfoDrop: true }));
        if (this.state.vitalInfoDrop === true) {
          this.setState(prevState => ({ ...prevState, vitalInfoDrop: false }));
        }
        break;
      case 'performances':
        this.setState(prevState => ({ ...prevState, performanceDrop: true }));
        if (this.state.performanceDrop === true) {
          this.setState(prevState => ({ ...prevState, performanceDrop: false }));
        }
        break;
      default:
    }
  }

  render() {
    const { match } = this.props;
    const { id } = match.params;
    const { redirect } = this.props;
    const handleFormSubmit = this.props.handleFormSubmit;
    if (redirect) {
      return (
        <Redirect
          to={{
            pathname: "/",
            state: { redirect: false }
          }}
        />
      );
    }

    return (
      <div>
        <button className="editButton" onClick={this.toggleState}>Edit</button>
        <br />
        {this.state.vitalInfo &&
          this.state.vitalInfo.image.includes(".jpeg") && (
            <img
              className="studentImageEdit"
              src={`/assets/${this.state.vitalInfo.image}`}
              alt="avatar"
            />
          )}
        <br />
        <br />
        {this.state.vitalInfo &&
          this.state.vitalInfo.image.includes("base64") && (
            <img
              className="studentImageEdit"
              src={`${this.state.vitalInfo.image}`}
              alt="avatar"
            />
          )}
        <br />
        <br />
        {/* editing */}
        {this.state.isEditing === true ? (
          <form
            onSubmit={(e, id) =>
              handleFormSubmit(e, this.props.match.params.id)
            }
          >
            <div className="vitalBoxEdit">
              <h3 className="boxName">Vital Information:</h3>
              <hr />
              <br />
              {this.state.vitalInfo &&
                Object.entries(this.state.vitalInfo).map(([title, comment]) => (
                  <>
                    <label className="vitalLabel" key={Math.random()}>{title}: </label>
                    <input
                      className="student-input"
                      key={Math.random()}
                      type="text"
                      name={`vitalInfo.${title}`}
                      defaultValue={comment}
                    />
                    <br />
                  </>
                ))}
              <br />
            </div>
            <div className="commentBoxEdit">
              <h3 className="boxName">Comments:</h3>
              <hr />
              <br />
              {this.state.comments.length >= 1 &&
                this.state.comments
                  .map(comment => (
                    <>
                      <label
                        className="vitalLabel"
                        key={Math.random()}>
                        Person:
                      </label>
                      <input
                        className="student-input"
                        key={Math.random()}
                        type="text"
                        name="comment.person"
                        defaultValue={comment.person}
                      />
                      <br />
                      <label
                        className="vitalLabel"
                        key={Math.random()}>
                        Comment:
                      </label>
                      <input
                        className="student-input"
                        key={Math.random()}
                        type="text"
                        name="comment.comments"
                        defaultValue={comment.comments}
                      />
                      <hr />
                    </>
                  ))}
              <br />
            </div>
            <div className="perfBoxEdit">
              <h3 className="boxName">Performance:</h3>
              <hr />
              <br />
              {this.state.performance.length >= 1 &&
                this.state.performance
                  .map(performance => (
                    <>
                      <label
                        className="vitalLabel"
                        key={Math.random()}>Title:</label>
                      <input
                        className="student-input"
                        key={Math.random()}
                        type="text"
                        name="performance.title"
                        defaultValue={performance.title}
                      />
                      <br />
                      <label
                        className="vitalLabel"
                        key={Math.random()}>Comments:</label>
                      <input
                        className="student-input"
                        key={Math.random()}
                        type="text"
                        name="performance.performance"
                        defaultValue={performance.performance}
                      />
                      <hr />
                    </>
                  ))}
              <br />
            </div>
            <div className="bottomButtons">
              <button className="button">Submit</button>
              <Link
                id="link"
                to="/"
                onClick={() => this.deleteStudent(id)}
              >
                Archive
              </Link>
            </div>
          </form>





        ) : (
            <div className="render">
              <div className="vitalBox">
                <h3>Vital Information:</h3>
                <input id="dropdown" type="submit" name="vitalInfo" onClick={(e) => this.dropdown(e)} value="+" />
                <hr />

                {this.state.vitalInfoDrop == false ? (
                  <div />
                ) : (
                    <>
                      <span className="left">Name:{" "}</span>
                      <span className="right">
                        {this.state.vitalInfo &&
                          this.state.vitalInfo.firstName +
                          " " +
                          this.state.vitalInfo.lastName}
                      </span>
                      <br />
                      <span className="left">Phone:{" "}</span>
                      <span className="right">{this.state.vitalInfo && this.state.vitalInfo.phone}</span>
                      <br />
                      <span className="left">Email:{" "}</span>
                      <span className="right">{this.state.vitalInfo && this.state.vitalInfo.email}</span>
                      <br />
                      <span className="left">Person Number:{" "}</span>
                      <span className="right">
                        {this.state.vitalInfo && this.state.vitalInfo.personNumber}
                      </span>
                      <br />
                      <span className="left">Address:{" "}</span>
                      <span className="right">{this.state.vitalInfo && this.state.vitalInfo.address}</span>
                      <br />
                      <br />
                    </>
                  )
                }
              </div>
              <div className="commentBox">
                <h3>Comments:</h3>
                <input id="dropdown" type="submit" name="comments" onClick={(e) => this.dropdown(e)} value="+" />
                <hr />
                {this.state.commentDrop == false ? (
                  <form className="addStuff" onSubmit={(e) => this.submit(e)}>
                    <input type="text" defaultValue={this.props.user} name="person" />
                    <TextareaAutosize className="textbox" name="comments" placeholder="Your comment here..." />
                    <input className="addButtonComm" type="submit" value="Add comment" />
                    <br />
                  </form>
                ) : (
                    <>
                      {this.state.vitalInfo &&
                        this.state.comments
                          .map(comment => (
                            <>
                              <ul className="list" key={Math.random()}>
                                <li>
                                  <span className="left">{comment.person}</span>
                                </li>
                                <li>
                                  <span className="right">{comment.comments}</span>
                                </li>
                                <br />
                              </ul>
                            </>
                          ))}
                      <br />
                      <form className="addStuff" onSubmit={(e) => this.submit(e)}>
                        <input type="text" defaultValue={this.props.user} name="person" />
                        <TextareaAutosize className="textbox" name="comments" placeholder="Your comment here..." />
                        <input className="addButtonComm" type="submit" value="Add comment" />
                        <br />
                      </form>
                    </>
                  )
                }
              </div>
              <div className="perfBox">
                <h3>Performance:</h3>
                <input id="dropdown" type="submit" name="performances" onClick={(e) => this.dropdown(e)} value="+" />
                <hr />
                {this.state.performanceDrop == false ? (
                  <form className="addStuff" onSubmit={(e) => this.submitPerf(e)}>
                    <input type="text" name="title" placeholder="Title..." />
                    <TextareaAutosize className="textbox" name="performance" placeholder="Your comment here..." />
                    <input className="addButtonPerf" type="submit" value="Add performance" />
                    <br />
                  </form>

                ) : (
                    <>
                      {this.state.vitalInfo &&
                        this.state.performance
                          .map(performance => (
                            <>
                              <ul className="list" key={Math.random()}>
                                <li>
                                  <span className="left">{performance.title}</span>
                                </li>
                                <li>
                                  <span className="right">{performance.performance}</span>
                                </li>
                                <br />
                              </ul>
                            </>
                          ))}
                      <br />
                      <form className="addStuff" onSubmit={(e) => this.submitPerf(e)}>
                        <input type="text" name="title" placeholder="Title..." />
                        <TextareaAutosize className="textbox" name="performance" placeholder="Your comment here..." />
                        <input className="addButtonPerf" type="submit" value="Add performance" />
                        <br />
                      </form>
                    </>
                  )
                }
              </div>
            </div>
          )}
      </div>
    );
  }
}

export default Student;
