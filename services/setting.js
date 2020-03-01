import { theme, mocks } from "../constants";

import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase('funnyquizzes.db');


export function CreateTableSetting() {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS setting (id INTERGER PRIMARY KEY NOT NULL, sound INT NOT NULL, lang TEXT NOT NULL);",
        [],
        () => {
          resolve(true)
        }
      );
    });
  });
}

export function CreateSetting(sound, lang) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        "INSERT INTO setting (id, sound, lang) VALUES (1, ?, ?)",
        [sound, lang],
        () => {
          resolve(true)
        }
      );
    });
  });
}

export function GetSetting() {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        "SELECT * FROM setting WHERE id = 1 LIMIT 1",
        [],
        (_, { rows: { _array } }) => {
          resolve(_array[0])
        }
      );
    })
  });
}

export function UpdateSetting(sound, lang) {
  return new Promise((resolve, reject) => {
    var sql = "UPDATE setting SET sound = ?, lang = ? WHERE id = 1"
    var sql_params = [sound, lang]
    if (!lang) {
      sql = "UPDATE setting SET sound = ? WHERE id = 1",
      sql_params = [sound]
    }
    else if (!sound) {
      sql = "UPDATE setting SET lang = ? WHERE id = 1",
      sql_params = [lang]
    }
    db.transaction(tx => {
      tx.executeSql(
        sql,
        sql_params,
        () => {
          resolve(true)
        }
      )
    })
  })
}
