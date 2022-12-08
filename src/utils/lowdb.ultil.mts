import express, { Application, Request, Response, NextFunction } from 'express';
import lowdb from 'lowdb';
import FileAsync from 'lowdb/adapters/FileAsync.js';
import path from 'path';
console.log("Db path: ", path.resolve('./assets/db/db.json'));

type MyDB = {
    products: ProductModel[],
    product_categories: string[],
    users: UserModel[]
};

const tablenames = ["products", "product_categories", "users"];

const dbPath = path.resolve('./assets/db/db.json');
const adapters = new FileAsync<MyDB>(dbPath);
const db = await lowdb(adapters);

class LowDBUltils {
    private static _db = db;

    public static getDb() {
        return this._db;
    }

    /**
    * Get a list of records of a table by table name.
    * @param {string} tableName - Pass a table name in database.
    **/
    public static async getRecords<T>(tableName: keyof MyDB): Promise<T | undefined> {
        try {
            const records = (await this._db).get(tableName).value() as T;
            return Promise.resolve(records);
        } catch (error) {
            console.log(error);
            return Promise.resolve(undefined);
        }
    }

    /**
    * Get a user information by key - value.
    * @param {string} key - Pass a field name in a user table.
    * @param {string} value - Pass a value for this field.
    **/
     public static async getUser(key: keyof UserModel, value: any): Promise<UserModel | undefined> {
        try {
            const user = (await this._db).get("users").find({ [key]: value }).value();
            return Promise.resolve(user);
        } catch (error) {
            console.log(error);
            return Promise.resolve(undefined);
        }
    }

    /**
    * Add new user to the users table in the database and save changes.
    * @param {T} record - Pass a new user.
    **/
    public static async addUser(record: UserModel) {
        try {
            await this._db.get("users").push(record).write();
        } catch (error) {
            console.log(error);
            return Promise.resolve(false);
        }
    }

    /**
    * Check a user in a database with key - value.
    * @param {string} key - Pass a field name in a user table.
    * @param {string} value - Pass a value for this field.
    **/
    public static async isUserExist(key: keyof UserModel, value: any): Promise<boolean> {
        try {
            const record = (await this._db).get("users").find({[key]: value}).value();
            if(!record) return Promise.resolve(false);
            return Promise.resolve(true);
        } catch (error) {
            console.log(error);
            return Promise.resolve(false);
        }
    }
}

export default LowDBUltils;