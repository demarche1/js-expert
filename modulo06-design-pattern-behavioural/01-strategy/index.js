const ContextStrategy = require("./src/base/contextStategy");
const PostgresStrategy = require("./src/strategies/postgresStrategy");
const MongoDBStrategy = require("./src/strategies/mongoDBStrategy");

const postgresConnectionString = 'postgres://alessandro:secret@localhost:5432/heroes';
const postgresContext = new ContextStrategy(new PostgresStrategy(postgresConnectionString));

const mongoDBConnectionString = 'mongodb://alessandro:senha@localhost:27017/heroes';
const mongoDBContext = new ContextStrategy(new MongoDBStrategy(mongoDBConnectionString));

const data = [
    {
        name: 'Flash',
        type: 'transaction'
    },
    {
        name: 'Batman',
        type: 'activityLog'
    }
];

const contextTypes = {
    transaction: postgresContext,
    activityLog: mongoDBContext
}

async function main() {
    try {
        await mongoDBContext.connect();
        await postgresContext.connect();

        for(const {name, type} of data) {
            const context = contextTypes[type];
            await context.create({name: name + Date.now()});

            console.log(type, context.dbStrategy.constructor.name);
            console.log(await context.read());
        }
    } catch (error) {
        console.log(error);
    }
}

main();