const DynamicCreateModule = require('../libs/models/DynamicCreateModule');
const mod1 = {
  aa: {
    type: 'string',
  },
  bb: {
    type: 'integer',
  }
};

const mod2 = {
  aa: {
    type: 'string',
  },
  bb: {
    type: 'integer',
  }
};

let a = DynamicCreateModule.initModule("dsadkjhsa", mod1);
let b = DynamicCreateModule.initModule("dsadkjhsa", mod2);
a.findAll();
console.log();