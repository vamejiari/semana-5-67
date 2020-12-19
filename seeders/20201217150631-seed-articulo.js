'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Articulos',[{
      codigo: "222222",
      nombre: 'test3_articulo',
      descripcion: "lorem ipsum 231", 
      estado: 1,
      categoriaId: 1,
      stock: 30,
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Articulos', null, {});
  }
};
