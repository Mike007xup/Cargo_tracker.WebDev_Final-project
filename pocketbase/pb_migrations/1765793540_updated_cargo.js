
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qaoby19o495yfo0")

  collection.name = "Cargos"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qaoby19o495yfo0")

  collection.name = "cargo"

  return dao.saveCollection(collection)
})
