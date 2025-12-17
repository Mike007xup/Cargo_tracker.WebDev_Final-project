
migrate((db) => {
  const collection = new Collection({
    "id": "o40z5rpllh6io0c",
    "created": "2025-12-14 13:34:43.547Z",
    "updated": "2025-12-14 13:34:43.547Z",
    "name": "Cargo_status_logs",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "crdmgxth",
        "name": "Cargo",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "qaoby19o495yfo0",
          "cascadeDelete": true,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "los8t8ji",
        "name": "status",
        "type": "select",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "tracking code",
            "sender name",
            "sender phone",
            "receiver phone",
            "receiver name",
            "origin",
            "destination",
            "current status",
            "estimated delivery date"
          ]
        }
      },
      {
        "system": false,
        "id": "esq9jycv",
        "name": "location",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "20kn1xgc",
        "name": "text",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "rt9kt4xb",
        "name": "updated_by",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("o40z5rpllh6io0c");

  return dao.deleteCollection(collection);
})
