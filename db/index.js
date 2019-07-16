import dotEnv from 'dotEnv';
//import makeDb from "../src/data-access";

(async function setupDb () {
    console.log('Setting up database...');
    // database collection will automatically be created if it does not exist
    // indexes will only be added if they don't exist
    const dbConnection = require('../src/data-access')
    const db = await dbConnection.makeDb();
    const result = await db
        .collection('connected_manufacturing_po')
        .createIndexes([
            { key: { hash: 1 }, name: 'hash_idx' },
            { key: { poNumber: -1 }, name: 'postId_idx' },
        ]);
    console.log(result);
    console.log('Database setup complete...');
    process.exit()
})();