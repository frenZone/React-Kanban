'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Cards', [{
      title: 'Take out the trash',
      priority: 'medium',
      status: 'Queue',
      createdBy: 'Renee',
      assignedTo: 'JP',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      title: 'Clean the table',
      priority: 'low',
      status: 'Progress',
      createdBy: 'Casey',
      assignedTo: 'Aaron',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      title: 'Vacum',
      priority: 'low',
      status: 'Progress',
      createdBy: 'Bryan',
      assignedTo: 'Marta',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      title: 'Wipe Windows',
      priority: 'low',
      status: 'Done',
      createdBy: 'Joe',
      assignedTo: 'Ray',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      title: 'Clean the white boards',
      priority: 'high',
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
