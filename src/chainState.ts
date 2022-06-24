import { BatchContext, SubstrateBlock } from '@subsquid/substrate-processor'
import { Store } from '@subsquid/typeorm-store'
import { MoreThan } from 'typeorm'
import { Account, ChainState } from './model'
import { UnknownVersionError } from './processor'
import {
    BalancesTotalIssuanceStorage,
    CouncilMembersStorage,
    CouncilProposalCountStorage,
    DemocracyPublicPropCountStorage,
    Instance1CollectiveMembersStorage,
    Instance1CollectiveProposalCountStorage,
} from './types/generated/storage'
// import { PERIOD } from './consts/consts'
import { Block, ChainContext } from './types/generated/support'
// import chains from './consts/chains'
// import config from './config'
// import { UnknownVersionError } from './common/errors'
// import { ChainInfo } from './common/types'

export async function saveChainState(ctx: BatchContext<Store, unknown>, block: SubstrateBlock) {
    const state = new ChainState({ id: block.id })

    state.timestamp = new Date(block.timestamp)
    state.blockNumber = block.height
    state.councilMembers = (await getCouncilMembers(ctx, block))?.length || 0
    state.councilProposals = (await getCouncilProposalsCount(ctx, block)) || 0
    state.democracyProposals = (await getDemocracyProposalsCount(ctx, block)) || 0
    state.tokenBalance = (await getTotalIssuance(ctx, block)) || 0n

    state.tokenHolders = await ctx.store.count(Account, { where: { updatedAt: MoreThan(0) } })

    await ctx.store.insert(state)

    console.log(`Chain state updated at block ${block.height}`)
}

async function getCouncilMembers(ctx: ChainContext, block: Block) {
    const storage = new CouncilMembersStorage(ctx, block)
    if (!storage.isExists) return await getInstance1Members(ctx, block)

    if (storage.isV9111) {
        return await storage.getAsV9111()
    }

    throw new UnknownVersionError(storage.constructor.name)
}

async function getInstance1Members(ctx: ChainContext, block: Block) {
    const storage = new Instance1CollectiveMembersStorage(ctx, block)
    if (!storage.isExists) return undefined

    if (storage.isV1020) {
        return await storage.getAsV1020()
    }

    throw new UnknownVersionError(storage.constructor.name)
}

async function getCouncilProposalsCount(ctx: ChainContext, block: Block) {
    const storage = new CouncilProposalCountStorage(ctx, block)
    if (!storage.isExists) return await getInstance1ProposalsCount(ctx, block)

    if (storage.isV9111) {
        return await storage.getAsV9111()
    }

    throw new UnknownVersionError(storage.constructor.name)
}

async function getInstance1ProposalsCount(ctx: ChainContext, block: Block) {
    const storage = new Instance1CollectiveProposalCountStorage(ctx, block)
    if (!storage.isExists) return undefined

    if (storage.isV1020) {
        return await storage.getAsV1020()
    }

    throw new UnknownVersionError(storage.constructor.name)
}

async function getDemocracyProposalsCount(ctx: ChainContext, block: Block) {
    const storage = new DemocracyPublicPropCountStorage(ctx, block)
    if (!storage.isExists) return undefined

    if (storage.isV1020) {
        return await storage.getAsV1020()
    }

    throw new UnknownVersionError(storage.constructor.name)
}

async function getTotalIssuance(ctx: ChainContext, block: Block) {
    const storage = new BalancesTotalIssuanceStorage(ctx, block)
    if (!storage.isExists) return undefined

    if (storage.isV1020) {
        return await storage.getAsV1020()
    }

    throw new UnknownVersionError(storage.constructor.name)
}
