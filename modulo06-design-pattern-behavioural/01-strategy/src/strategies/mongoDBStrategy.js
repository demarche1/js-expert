const MongoDB = require('mongodb');

module.exports = class ContextStrategy {
    #instance

    constructor(connectionString) {
        const {pathname: dbName} = new URL(connectionString);
        this.connectionString = connectionString.replace(dbName, '');
        this.collection = 'warriors'
        this.db = dbName.replace(/\W/, '')
    }
  
    async connect() {
        const client = new MongoDB.MongoClient(this.connectionString, {
            useUnifiedTopology: true,
        });

        await client.connect();

        const db = client.db(this.db).collection(this.collection);
        this.#instance = db;
    }
  
    async create(item) {
        return this.#instance.insertOne(item);
    }
  
    async read(item) {
        return this.#instance.find(item).toArray();
    }
  }