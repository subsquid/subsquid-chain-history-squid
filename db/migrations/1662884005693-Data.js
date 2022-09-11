module.exports = class Data1662884005693 {
  name = 'Data1662884005693'

  async up(db) {
    await db.query(`CREATE INDEX "IDX_3756b99a2c20a91a19196cbc11" ON "account" ("total") `)
  }

  async down(db) {
    await db.query(`DROP INDEX "public"."IDX_3756b99a2c20a91a19196cbc11"`)
  }
}
