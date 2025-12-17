
migrate((db) => {
  const collection = new Collection({
    "id": "zula97a0cxgvf5v",
    "created": "2025-12-14 12:04:01.656Z",
    "updated": "2025-12-14 12:04:01.656Z",
    "name": "Usera",
    "type": "auth",
    "system": false,
    "schema": [],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "allowEmailAuth": true,
      "allowOAuth2Auth": true,
      "allowUsernameAuth": true,
      "exceptEmailDomains": null,
      "manageRule": null,
      "minPasswordLength": 8,
      "onlyEmailDomains": null,
      "onlyVerified": false,
      "requireEmail": false
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("zula97a0cxgvf5v");

  return dao.deleteCollection(collection);
})
