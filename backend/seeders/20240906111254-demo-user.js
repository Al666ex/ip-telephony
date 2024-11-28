'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('persons', [
      {
        last_name: "MANEA",
        first_name: "INGA",
		    patronymic: "Victor",
        createdAt: new Date(),
        updatedAt: new Date()		
    },
    {
        last_name: "OLEINIC",
        first_name: "EUGENIU",
		    patronymic: "Victor",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        last_name: "STAVSCHI",
        first_name: "ALEXANDR",
		    patronymic: "ALEXANDR",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        last_name: "PÎRĂU",
        first_name: "VLADISLAV",
		    patronymic: "Vasile",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        last_name: "ŢÎLEA",
        first_name: "ALA",
		    patronymic: "Gheorghe",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        last_name: "CASSIR",
        first_name: "ANA",
		    patronymic: "Petru",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        last_name: "MUSTEAŢĂ",
        first_name: "VLADIMIR",
		    patronymic: "Victor",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        last_name: "JUMBEI",
        first_name: "NATALIA",
		    patronymic: "Pantelei",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        last_name: "ŞMIGLIUC",
        first_name: "ELENA",
		    patronymic: "Mircea",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        last_name: "IAŢÂŞIN",
        first_name: "ALEXEI",
		    patronymic: "Iuri",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        last_name: "ŞAMOVSKAIA",
        first_name: "INGA",
		    patronymic: "Anatolie",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        last_name: "SERDŢEV",
        first_name: "VITALIE",
		    patronymic: "Petru",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        last_name: "STURZINSCHI",
        first_name: "VALENTIN",
		    patronymic: "Petru",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        last_name: "ZGHIBARŢA",
        first_name: "ANGELA",
		    patronymic: "Andrei",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        last_name: "ŞTIROI",
        first_name: "SERGHEI",
		    patronymic: "Piotr",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        last_name: "BANTAŞ",
        first_name: "OCTAVIAN",
		    patronymic: "Petru",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        last_name: "BÎTLAN",
        first_name: "VICTOR",
		    patronymic: "Ion",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        last_name: "KORCHYNSKAYA",
        first_name: "TATIANA",
		    patronymic: "Vitali",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        last_name: "DURUM",
        first_name: "TATIANA",
		    patronymic: "Semion",
        createdAt: new Date(),
        updatedAt: new Date()
    }
   ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('persons', null, {});
  }
};
