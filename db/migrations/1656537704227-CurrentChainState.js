module.exports = class Data1656537704227 {
  name = 'Data1656537704227'

  async up(db) {
    await db.query(`CREATE TABLE "current_chain_state" ("id" character varying NOT NULL, "token_balance" numeric NOT NULL, "token_holders" integer NOT NULL, "council_members" integer NOT NULL, "democracy_proposals" integer NOT NULL, "council_proposals" integer NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "block_number" integer NOT NULL, CONSTRAINT "PK_635aee56410df525938bf40f669" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_b610f50e22008c895b1c9912bd" ON "current_chain_state" ("timestamp") `)
    await db.query(`CREATE INDEX "IDX_a9c38ffcf2e78137f75e24f88c" ON "current_chain_state" ("block_number") `)
  }

  async down(db) {
    await db.query(`DROP TABLE "current_chain_state"`)
    await db.query(`DROP INDEX "public"."IDX_b610f50e22008c895b1c9912bd"`)
    await db.query(`DROP INDEX "public"."IDX_a9c38ffcf2e78137f75e24f88c"`)
  }
}
