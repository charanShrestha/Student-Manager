const mongoose = require('mongoose');
const Student = require('../Models/studentModel');
const validator = require('../validation/validator');

const getAll = () => Student.find({status: 'active'}).then(students => students);
const getArchived = () => Student.find({status: 'archived'}).then(students => students);

const findById = (id) => Student.findOne({'vitalInfo.personNumber': id}).then(student => student);

const remove = (id) => {
  Student.findOneAndUpdate({'vitalInfo.personNumber': id}, 
    {$set:{
      status: 'archived'
    }},
    (err, result) => {
      if(err){
        console.log(err);
      } 
      console.log('Student has been archived.');
    });
};


// validate this
const update = (id, data) => {
  const output = validator(data);
  console.log(output.error);
  if(output.error === null){
    Student.findOneAndUpdate({'vitalInfo.personNumber': id}, 
    {$set:data},
    {$push:{comments: data.comments, performance: data.performance}},
    (err, result) => {
      if(err){
          console.log(err);
        }
        console.log('with comments/performance');
      });
  }
};

const create = (student) => {
  const {
    vitalInfo,
  } = student;
  const {
    personNumber,
    firstName,
    lastName,
    phone,
    email,
    address,
    image
  } = vitalInfo;
  const output = validator(student);
  console.log(output.error);
  if(output.error === null){
    const newStudent = new Student({
      vitalInfo: {
        personNumber: personNumber,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        email: email,
        address: address,
        image: image,
      },
      status: 'active',
    });
    newStudent.save((err) => {
      console.log(newStudent, 'saved');
      if (err) return console.log(err);
    });
  }
};

const commenter = (id, data) => {
  Student.findOneAndUpdate({'vitalInfo.personNumber': id}, 
    {$push:{comments: data}},(err, result) => {
      if(err){
        console.log(err);
      }
      console.log('comment added');
    });
};

const performer = (id, data) => {
  Student.findOneAndUpdate({'vitalInfo.personNumber': id}, 
    {$push:{performance: data}},(err, result) => {
      if(err){
        console.log(err);
      }
      console.log('performance added');
    });
};

module.exports = {
  create,
  getAll,
  getArchived,
  findById,
  remove,
  update,
  commenter,
  performer,
};
