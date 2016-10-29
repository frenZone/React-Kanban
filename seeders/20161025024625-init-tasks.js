'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Cards', [{
      title: 'Take out the trash',
      priority: 2,
      status: 'Queue',
      createdBy: 'Renee',
      assignedTo: 'JP',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      title: 'Clean the table',
      priority: 1,
      status: 'Progress',
      createdBy: 'Casey',
      assignedTo: 'Aaron',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      title: 'Vacum',
      priority: 1,
      status: 'Progress',
      createdBy: 'Bryan',
      assignedTo: 'Marta',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      title: 'Wipe Windows',
      priority: 3,
      status: 'Done',
      createdBy: 'Joe',
      assignedTo: 'Ray',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      title: 'Clean the white boards',
      priority: 3,
      status: 'Queue',
      createdBy: 'BB',
      assignedTo: 'Alan',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Cards', null, {});
  }
};
