import { Arg, Field, ObjectType, Query, Resolver } from 'type-graphql'
import 'reflect-metadata'
import type { EntityManager } from 'typeorm'
import { Account as Account_, CurrentChainState } from '../../model'
import assert from 'assert'
import chains from '../../chains'
import config from '../../config'
import { ID } from '@subsquid/graphql-server'
import { Int } from '@subsquid/graphql-server/lib/scalars'

@ObjectType()
export class Token {
    @Field(() => String, { nullable: false })
    symbol!: string

    @Field(() => String, { nullable: true })
    decimals!: number | null

    constructor(props: Partial<Token>) {
        Object.assign(this, props)
    }
}

@ObjectType()
export class ChainInfo {
    @Field(() => Number, { nullable: true })
    prefix!: number | null

    @Field(() => String, { nullable: false })
    name!: string

    @Field(() => String, { nullable: false })
    displayName!: string

    @Field(() => [Token], { nullable: false })
    tokens!: Token[]

    @Field(() => Number, { nullable: true })
    paraId!: number | null

    @Field(() => String, { nullable: true })
    relayChain!: string | null

    constructor(props?: Partial<ChainInfo>) {
        Object.assign(this, props)
    }
}

@ObjectType()
class ChainStateObject {
    constructor(props?: Partial<ChainStateObject>) {
        Object.assign(this, props)
    }

    @Field(() => BigInt, { nullable: false })
    tokenBalance!: bigint

    @Field(() => Number, { nullable: false })
    tokenHolders!: number

    @Field(() => Number, { nullable: false })
    councilMembers!: number

    @Field(() => Number, { nullable: false })
    democracyProposals!: number

    @Field(() => Number, { nullable: false })
    councilProposals!: number

    @Field(() => Date, { nullable: false })
    timestamp!: Date

    @Field(() => Number, { nullable: false })
    blockNumber!: number
}

@Resolver()
export class ChainInfoResolver {
    @Query(() => ChainInfo)
    chainInfo(): ChainInfo {
        const info = chains.find((ch) => ch.name === config.chainName)
        assert(info != null)

        return new ChainInfo({
            prefix: info.prefix,
            name: info.name,
            relayChain: info.relay,
            paraId: info.paraId,
            displayName: info.displayName,
            tokens: info.tokens.map(({ symbol, decimals }) => new Token({ symbol, decimals })),
        })
    }
}

@Resolver()
export class ChainStateResolver {
    constructor(private tx: () => Promise<EntityManager>) {}

    @Query(() => ChainStateObject)
    async currentChainState(): Promise<ChainStateObject | null> {
        const manager = await this.tx()
        const repository = manager.getRepository(CurrentChainState)

        const state = await repository.findOneBy({ id: '0' })
        return state != null ? new ChainStateObject({ ...state }) : null
    }
}

@ObjectType()
class Account implements Account_ {
    constructor(props?: Partial<Account>) {
        Object.assign(this, props)
    }

    @Field(() => ID, { nullable: false })
    id!: string

    @Field(() => BigInt, { nullable: false })
    free!: bigint

    @Field(() => BigInt, { nullable: false })
    reserved!: bigint

    @Field(() => BigInt, { nullable: false })
    total!: bigint

    @Field(() => Int, { nullable: false })
    updatedAt!: number | null | undefined
}

@ObjectType()
class RankedAccount {
    constructor(props?: Partial<RankedAccount>) {
        Object.assign(this, props)
    }

    @Field(() => Number, { nullable: false })
    rank!: number

    @Field(() => Account, { nullable: false })
    account!: Account
}

@Resolver()
export class AccountRank {
    constructor(private tx: () => Promise<EntityManager>) {}

    @Query(() => RankedAccount)
    async rankAccount(
        @Arg('id', { nullable: false })
        id: string
    ): Promise<RankedAccount | null> {
        const manager = await this.tx()
        const repository = manager.getRepository(Account_)

        const data = (
            await repository.query(
                `SELECT * FROM (SELECT *, RANK() OVER (ORDER BY total DESC) FROM account) as ranked WHERE id = '${id}'`
            )
        )?.[0]
        console.log(data)
        if (data != null) {
            data.updatedAt = data['updated_at']
            const { rank, ...account } = data
            return new RankedAccount({ rank, account: new Account(account) })
        } else {
            return null
        }
    }
}
