import { theme, mocks } from "../constants";

import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase('funnyquizzes.db');


export function CreateTableScore() {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS score (id INTERGER PRIMARY KEY NOT NULL, challenge_id INT NOT NULL);",
        [],
        () => {
          resolve(true)
        }
      );
    });
  });
}

export function CreateScore(challenge_id) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        "INSERT INTO score (id, challenge_id) VALUES (1, ?)",
        [challenge_id],
        () => {
          resolve(true)
        }
      );
    });
  });
}

export function GetScore() {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        "SELECT * FROM score WHERE id = 1 LIMIT 1",
        [],
        (_, { rows: { _array } }) => {
          resolve(_array[0])
        }
      );
    })
  });
}

export function UpdateScore(challenge_id) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        "UPDATE score SET challenge_id = ? WHERE id = 1",
        [challenge_id],
        () => {
          resolve(true)
        }
      );
    });
  });
}
