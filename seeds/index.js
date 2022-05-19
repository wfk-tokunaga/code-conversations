const seedUsers = require('./user-seeds');

const sequelize = require('../config/connection');

const seedAll = async() => {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');

    await seedUsers();
    console.log('\n----- USERS SEEDED -----\n');

    // await seedProducts();
    // console.log('\n----- PRODUCTS SEEDED -----\n');

    // await seedTags();
    // console.log('\n----- TAGS SEEDED -----\n');

    // await seedProductTags();
    // console.log('\n----- PRODUCT TAGS SEEDED -----\n');

    process.exit(0);
};

seedAll();