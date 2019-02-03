import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ImageInput from './ImageInput';
import './newStudent.scss';

class NewStudent extends Component {
  constructor(props) {
    super(props);
  }
  
  render(){
    const { redirect, handleNewSubmit } = this.props;
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
      <>
      <h1>New Student</h1>
      <form className="newForm" onSubmit={handleNewSubmit} >
          <>
          <ImageInput className="image" name="image" maxheight={64} required />
          <br />
            <label>
              personNumber:{' '}
            </label>
            <input type="text" name="vitalInfo.personNumber" placeholder="196302047365" required/><br />
            <br />
            <label>
              firstName:{' '}
            </label>
            <input type="text" name="vitalInfo.firstName" placeholder="Sven" required /><br />
            <br />
            <label>
              lastName:{' '}
            </label>
            <input type="text" name="vitalInfo.lastName" placeholder="Svensson" required /><br />
            <br />
            <label>
              phone:{' '}
            </label>
            <input type="text" name="vitalInfo.phone" placeholder="0730204765" required /><br />
            <br />
            <label>
              email:{' '}
            </label>
            <input type="text" name="vitalInfo.email" placeholder="sven@sven.com" required /><br />
            <br />
            <label>
              address:{' '}
            </label>
            <input type="text" name="vitalInfo.address" placeholder="13 Svennsgata" required /><br />
          </>
          <button className="submitNew">Submit</button>
      </form>
      </>
    );
  }
}

export default NewStudent;