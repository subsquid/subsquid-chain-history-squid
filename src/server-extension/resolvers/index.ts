import { Field, ObjectType, Query, Resolver } from 'type-graphql'
import 'reflect-metadata'
import type { EntityManager } from 'typeorm'
import { CurrentChainState } from '../../model'
import assert from 'assert'
import chains from '../../chains'
import config from '../../config/kusama'

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
