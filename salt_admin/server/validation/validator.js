const Joi = require('joi');

const pNumber = /^(19|20)?[0-9]{2}[- ]?((0[0-9])|(10|11|12))[- ]?(([0-2][0-9])|(3[0-1])|(([0-3][0-9])|(6[1-9])|(9[0-1])))[- ]?[0-9]{4}$/

const validator = (data) => {
  const objectSchema = Joi.object().keys({
    vitalInfo: {
      personNumber: Joi.string().alphanum().regex(pNumber).required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      phone: Joi.number().min(10).required(),
      email: Joi.string().email({
        minDomainAtoms: 2
      }).required(),
      address: Joi.string().required(),
      image: Joi.string(),
    },
    comments: Joi.array(),
    performance: Joi.array(),
  });
  return Joi.validate(data, objectSchema);
};

module.exports = validator;
