import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import lowdb from 'lowdb';
import FileAsync from 'lowdb/adapters/FileAsync.js';
import path from 'path';
console.log("Db path: ", path.resolve('./assets/db/db.json'));
const tablenames = ["products", "product_categories", "users"];
const dbPath = path.resolve('./assets/db/db.json');
const adapters = new FileAsync(dbPath);
const db = await lowdb(adapters);
// class LowDBUltils {
//     private static _db = db;
//     public static getDb() {
//         return this._db;
//     }
//     /**
//     * Get a list of records of a table by table name.
//     * @param {string} tableName - Pass a table name in database.
//     **/
//     public static async getRecords<T>(tableName: keyof MyDB): Promise<T | undefined> {
//         try {
//             const records = (await this._db).get(tableName).value() as T;
//             return Promise.resolve(records);
//         } catch (error) {
//             console.log(error);
//             return Promise.resolve(undefined);
//         }
//     }
//     /**
//     * Get a user information by key - value.
//     * @param {string} key - Pass a field name in a user table.
//     * @param {string} value - Pass a value for this field.
//     **/
//      public static async getUser(key: keyof UserModel, value: any): Promise<UserModel | undefined> {
//         try {
//             const user = (await this._db).get("users").find({ [key]: value }).value();
//             return Promise.resolve(user);
//         } catch (error) {
//             console.log(error);
//             return Promise.resolve(undefined);
//         }
//     }
//     /**
//     * Add new user to the users table in the database and save changes.
//     * @param {T} record - Pass a new user.
//     **/
//     public static async addUser(record: UserModel) {
//         try {
//             await this._db.get("users").push(record).write();
//         } catch (error) {
//             console.log(error);
//             return Promise.resolve(false);
//         }
//     }
//     /**
//     * Check a user in a database with key - value.
//     * @param {string} key - Pass a field name in a user table.
//     * @param {string} value - Pass a value for this field.
//     **/
//     public static async isUserExist(key: keyof UserModel, value: any): Promise<boolean> {
//         try {
//             const record = (await this._db).get("users").find({[key]: value}).value();
//             if(!record) return Promise.resolve(false);
//             return Promise.resolve(true);
//         } catch (error) {
//             console.log(error);
//             return Promise.resolve(false);
//         }
//     }
// }
/**
* Get a list of records of a table by table name.
* @param {string} tableName - Pass a table name in database.
**/
export async function getRecords(tableName) {
    try {
        const records = db.get(tableName).value();
        if (records === undefined)
            throw new Error("Cannot get records in " + tableName);
        return Promise.resolve(records);
    }
    catch (error) {
        console.log(error);
        return Promise.resolve(undefined);
    }
}
/**
* Get a list of products by search strings. Can filter by name and category.
* @param {string} tableName - Pass a table name in database.
**/
export async function getProducsBySearchString(searchStrings) {
    try {
        let records;
        if (searchStrings.category) {
            records = db.get("products").filter({ category: searchStrings.category }).value();
        }
        else {
            records = db.get("products").value();
        }
        if (searchStrings.name) {
            records = records.filter(product => {
                return product.name.toLowerCase().includes(searchStrings.name.toLowerCase());
            });
        }
        if (records === undefined)
            throw new Error("Cannot get products.");
        return Promise.resolve(records);
    }
    catch (error) {
        console.log(error);
        return Promise.resolve(undefined);
    }
}
/**
* Get a user information by key - value.
* @param {string} key - Pass a field name in a user table.
* @param {string} value - Pass a value for this field.
**/
export async function getUser(key, value) {
    try {
        const user = db.get("users").find({ [key]: value }).value();
        return Promise.resolve(user);
    }
    catch (error) {
        console.log(error);
        return Promise.resolve(undefined);
    }
}
/**
* Add new user to the users table in the database and save changes.
* @param {T} record - Pass a new user.
**/
export async function addUser(record) {
    try {
        await db.get("users").push(record).write();
        return Promise.resolve(true);
    }
    catch (error) {
        console.log(error);
        return Promise.resolve(false);
    }
}
/**
* Update new user's information with id.
* @param {string} id - Pass a user's id to find information.
* @param {string} key - Pass a field name in a user table.
* @param {string} value - Pass a new information.
**/
export async function updateUser(id, key, value) {
    try {
        const record = await db.get("users").find({ id }).assign({ [key]: value }).write();
        console.log(record);
        if (!record)
            return Promise.resolve(false);
        return Promise.resolve(true);
    }
    catch (error) {
        console.log(error);
        return Promise.resolve(false);
    }
}
/**
* Check a user in a database with key - value.
* @param {string} key - Pass a field name in a user table.
* @param {string} value - Pass a value for this field.
**/
export async function isUserExist(key, value) {
    try {
        const record = db.get("users").find({ [key]: value }).value();
        if (!record)
            return Promise.resolve(false);
        return Promise.resolve(true);
    }
    catch (error) {
        console.log(error);
        return Promise.resolve(false);
    }
}
/**
* Create new custome token for other actions.
* @param {string} userId - Pass a token.
* @param {string} value - Pass a value for this field.
**/
export async function createCustomToken(userId, obj) {
    try {
        const token = {
            id: uuidv4(),
            userId,
            value: await bcrypt.hash(obj, await bcrypt.genSalt(10)),
            expireAt: new Date().toLocaleString(),
            type: "RESET_PASSWORD"
        };
        const record = await db.get("tokens").push(token).write();
        if (!record)
            return Promise.resolve(undefined);
        return Promise.resolve(token);
    }
    catch (error) {
        console.log(error);
        return Promise.resolve(undefined);
    }
}
/**
* Check a custom token is valid or not.
* @param {string} userId - Pass a token.
* @param {string} token - Pass a token from client.
* @param {string} type - Type of token.
* @return - true if token exist and isn't expired else false.
**/
export async function checkCustomToken(userId, type, token) {
    try {
        const record = db.get("tokens").find({ userId, type }).value();
        if (!record)
            return Promise.resolve(undefined);
        if (token) {
            if (record.value !== token)
                return Promise.resolve(undefined);
            const now = new Date().getTime();
            const expiredDate = new Date(record.expireAt).getTime();
            const isExpired = (now - expiredDate) > 0 ? true : false;
            if (isExpired)
                return Promise.resolve(undefined);
        }
        return Promise.resolve(record);
    }
    catch (error) {
        console.log(error);
        return Promise.resolve(undefined);
    }
}
