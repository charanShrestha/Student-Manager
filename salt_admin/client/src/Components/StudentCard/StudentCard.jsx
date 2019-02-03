import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './studentCard.scss';

class StudentCard extends Component {
  constructor(props) {
    super(props);
    const { firstName, lastName, personNumber, image }
      = this.props.student.vitalInfo;
    this.state = {
      firstName: firstName,
      lastName: lastName,
      personNumber: personNumber,
      image: image,
    };
  }
  render() {
    return (
      <>
        <div className="studentCard">
          <Link to={`/students/${this.state.personNumber}`}>
            {this.state.image.includes('base64') && 
              <img className={styles.studentImage} src={this.state.image} alt="avatar" />
            }
            {this.state.image.includes('.jpeg') &&
              <img className={styles.studentImage} src={`/assets/${this.state.image}`} alt="avatar" />
            }
            <br />
            <br />
            {this.state.firstName}
            <br />
            {this.state.lastName}<br />
          </Link>
        </div>
      </>
    );
  }
}

export default StudentCard;