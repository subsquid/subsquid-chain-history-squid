import { BatchContext, SubstrateBlock } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
import { Account, ChainState, CurrentChainState } from './model'
import { UnknownVersionError } from './processor'
import {
    BalancesTotalIssuanceStorage,
    CouncilCollectiveMembersStorage,
    CouncilCollectiveProposalCountStorage,
    DemocracyPublicPropCountStorage,
    Instance1CollectiveMembersStorage,
    Instance1CollectiveProposalCountStorage,
} from './types/generated/storage'
import { Block, ChainContext } from './types/generated/support'

export async function getChainState(ctx: BatchContext<Store, unknown>, block: SubstrateBlock) {
    const state = new ChainState({ id: block.id })

    state.timestamp = new Date(block.timestamp)
    state.blockNumber = block.height
    state.councilMembers = (await getCouncilMembers(ctx, block))?.length || 0
    state.councilProposals = (await getCouncilProposalsCount(ctx, block)) || 0
    state.democracyProposals = (await getDemocracyProposalsCount(ctx, block)) || 0
    state.tokenBalance = (await getTotalIssuance(ctx, block)) || 0n

    state.tokenHolders = await ctx.store.count(Account)

    return state
}

export async function saveRegularChainState(ctx: BatchContext<Store, unknown>, block: SubstrateBlock) {
    const state = await getChainState(ctx, block)
    await ctx.store.insert(state)

    ctx.log.child('state').info(`updated at block ${block.height}`)
}

export async function saveCurrentChainState(ctx: BatchContext<Store, unknown>, block: SubstrateBlock) {
    const state = await getChainState(ctx, block)
    await ctx.store.save(new CurrentChainState({ ...state, id: '0' }))
}

async function getCouncilMembers(ctx: ChainContext, block: Block) {
    const storage = new CouncilCollectiveMembersStorage(ctx, block)
    if (!storage.isExists) return await getInstance1Members(ctx, block)

    if (storage.isV1001) {
        return await storage.getAsV1001()
    }

    throw new UnknownVersionError(storage.constructor.name)
}

async function getInstance1Members(ctx: ChainContext, block: Block) {
    const storage = new Instance1CollectiveMembersStorage(ctx, block)
    if (!storage.isExists) return undefined

    if (storage.isV155) {
        return await storage.getAsV155()
    }

    throw new UnknownVersionError(storage.constructor.name)
}

async function getCouncilProposalsCount(ctx: ChainContext, block: Block) {
    const storage = new CouncilCollectiveProposalCountStorage(ctx, block)
    if (!storage.isExists) return await getInstance1ProposalsCount(ctx, block)

    if (storage.isV1001) {
        return await storage.getAsV1001()
    }

    throw new UnknownVersionError(storage.constructor.name)
}

async function getInstance1ProposalsCount(ctx: ChainContext, block: Block) {
    const storage = new Instance1CollectiveProposalCountStorage(ctx, block)
    if (!storage.isExists) return undefined

    if (storage.isV155) {
        return await storage.getAsV155()
    }

    throw new UnknownVersionError(storage.constructor.name)
}

async function getDemocracyProposalsCount(ctx: ChainContext, block: Block) {
    const storage = new DemocracyPublicPropCountStorage(ctx, block)
    if (!storage.isExists) return undefined

    if (storage.isV1001) {
        return await storage.getAsV1001()
    }

    throw new UnknownVersionError(storage.constructor.name)
}

async function getTotalIssuance(ctx: ChainContext, block: Block) {
    const storage = new BalancesTotalIssuanceStorage(ctx, block)
    if (!storage.isExists) return undefined

    if (storage.isV1001) {
        return await storage.getAsV1001()
    }

    throw new UnknownVersionError(storage.constructor.name)
}
