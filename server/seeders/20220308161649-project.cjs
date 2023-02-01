
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    const participants = [{
      id: 1,
      email: 'jonathan@dortheimer.com',
      password: '111111',
      fname: 'Jonathan',
      lname: 'Dortheimer',
      createdAt: Sequelize.fn('NOW'),
      updatedAt: Sequelize.fn('NOW'),
    }]

    const projects = [
      {
        name:'Tzahar Center for Innovation, Culture and Education' ,
        clientBackground: `Eurotech Communication is a leader in communication solutions for the mining and telecom sectors. With over 20 years of experience, from R&D to design and manufacturing, Eurotech understands the future of communication like no other company. Our solutions have been deployed across five continents, and we proudly serve clients in the civil, military, government and mining industries. We specialize in creating tailored solutions for applications and goals that were previously thought to be impossible.`,
        projectBackground: `The Tzahar Innovation, Culture and Education Center is an initiative to create an informal meeting place for cultural, educational and innovative people, but also for various communities from the area.
        The multi-purpose center will offer a variety of spaces for the community, offices, clinics, rehearsal rooms, warehouses, production spaces, workshops and studio spaces. A place for everyone!
        The building will also be a meeting place for diverse communities from the area and will be able to offer a hostel for social organizations, learning groups, cultural events and informal meetings. The center will provide the community with rooms of various sizes and will allow an informal meeting of Jews and Arabs from the area, of residents, workers in the industrial area and visitors.`,
        objectives: `An environment that encourages innovation and creativity
        There is room for experimentation - it is desirable and permissible to make mistakes
        Mental and spiritual security - the possibility of free expression
        Comfort and homeliness
        Free access to spaces by community members through digital mechanisms.
        Program
        Development of outdoor areas + vegetation
        Community uses (1700) Common community area: White rooms / Workshops / Outdoor areas / Community pop-ups
        Required uses (1300):
         Additional office / industrial / storage space for rent - 700 sqm
         Conference hall and public activities - 450 sqm
         Cafe / restaurant - minimum 50 sqm + public area for sitting
        Types of activities you want to encourage
        Community meetings
        Conferences (200 people)
        Parties / Events
        Personal study
        Group study
        Information exchange
        The building will house the following tenants
        Eurotech Company, Communications - 600 sq.m. (100 sq.m. offices and 500 sq.m. production and storage)
        Valiant Investment Company - 100 sq.m.
        
        Limitations
        Height - 3 floors
        Area - 2800 sq.m. construction
        Building lines - 5 m from the boundaries of the lot in each direction
        Parking standard`,
        siteBackground:`The Tzahar industrial zone was established in 1991, with the aim of strengthening the economic infrastructure in the northeastern Israel area and in order to develop sources of employment for the residents of the area. The industrial zone was established by three Jewish local authorities: Safed, Hatzor HaGlilit and Rosh Pena. (Arabic) In 2005, the Upper Galilee Regional Council joined, which is the fifth partner in the industrial area.

        The industrial area is located in the municipal area of ​​the town of Rosh Pena, and is located 2 minutes from the local airport and near the main road.
        
        The Tzahar industrial area covers an area of ​​850 dunams, and is populated by 50 factories and businesses that employ about 1,500 Jewish and Arab workers. The existing factories are diverse, including heavy industry, agricultural products, but also trade and high-tech companies.`,
        location:'32.9709024,35.5596483',
        audience: `The users of the building will be:...`,
        budget: '$ 3,000,000',
        strategy: 'linear',        
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW'),
        ownerId: 1,
        strategy: '',
        // participants: []
      }]

    const ProjectRoles = [
      {
        ProjectId: 1,
        participantId: 1,
        kind: 'designer',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW'),
      }
    ]

    const TaskBlocks = [
      {
        kind: 'CreateSketch',
        status: 'todo',
        ProjectId: 1,
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW'),
      },
      {
        kind: 'Critique',
        status: 'todo',
        ProjectId: 1,
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW'),
      },
    ]

    const Tasks = [
      {
        kind: 'CreateSketch',
        status: 'todo',
        ProjectId: 1,
        TaskBlockId: 1,
        ParticipantId: 1,
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW'),
      }, {
        kind: 'Critique',
        status: 'todo',
        ProjectId: 1,
        TaskBlockId: 2,
        ParticipantId: 1,
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW'),
      }

    ]
    // INSERT INTO `TaskBlocks` (`id`, `kind`, `status`, `strategy`, `createdAt`, `updatedAt`, `hierarchyLevel`, `parentId`, `ProjectId`) VALUES (NULL, 'CreateSketch', 'progress', 'creative', '2022-03-08 18:39:50.000000', '2022-03-08 18:39:50.000000', NULL, NULL, '1');

    try {
      // console.log(projectRequirements.map(x=>x.type));
      return queryInterface
        .bulkInsert('Participants', participants)
        .then(() => console.log('Added participants'))
        .then(() => queryInterface.bulkInsert('Projects', projects))
        .then(() => queryInterface.bulkInsert('ProjectRoles', ProjectRoles))
        .then(() => queryInterface.bulkInsert('TaskBlocks', TaskBlocks))
        .then(() => queryInterface.bulkInsert('Tasks', Tasks))
    } catch (e) {
      console.log(e);
      throw e;
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
