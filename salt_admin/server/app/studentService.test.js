const svc = require('./studentService.js');

describe('Student Service', () => { 
    test('Get all Students', () => {
      expect(typeof svc.getAll()).toBe('object');
  });

    
});