import {UnknownVersionError} from '../../utils'
import {ChainApi} from '../interfaces/chainApi'
import {
    BalancesBalanceSetEvent,
    BalancesDepositEvent,
    BalancesEndowedEvent,
    BalancesReserveRepatriatedEvent,
    BalancesReservedEvent,
    BalancesSlashedEvent,
    BalancesTransferEvent,
    BalancesUnreservedEvent,
    BalancesWithdrawEvent,
} from './types/events'
import {
    BalancesAccountStorage,
    BalancesTotalIssuanceStorage,
    CouncilMembersStorage,
    CouncilProposalCountStorage,
    DemocracyPublicPropCountStorage,
    Instance1CollectiveMembersStorage,
    Instance1CollectiveProposalCountStorage,
    SystemAccountStorage,
} from './types/storage'
import {Block, ChainContext, Event} from './types/support'

function getBalanceSetAccount(ctx: ChainContext, event: Event) {
    const data = new BalancesBalanceSetEvent(ctx, event)

    if (data.isV1) {
        return data.asV1[0]
    } else if (data.isV916) {
        return data.asV916.who
    } else {
        throw new UnknownVersionError(data.constructor.name)
    }
}

function getTransferAccounts(ctx: ChainContext, event: Event): [Uint8Array, Uint8Array] {
    const data = new BalancesTransferEvent(ctx, event)

    if (data.isV1) {
        return [data.asV1[0], data.asV1[1]]
    } else if (data.isV916) {
        return [data.asV916.from, data.asV916.to]
    } else {
        throw new UnknownVersionError(data.constructor.name)
    }
}

function getEndowedAccount(ctx: ChainContext, event: Event) {
    const data = new BalancesEndowedEvent(ctx, event)

    if (data.isV1) {
        return data.asV1[0]
    } else if (data.isV916) {
        return data.asV916.account
    } else {
        throw new UnknownVersionError(data.constructor.name)
    }
}

function getDepositAccount(ctx: ChainContext, event: Event) {
    const data = new BalancesDepositEvent(ctx, event)

    if (data.isV1) {
        return data.asV1[0]
    } else if (data.isV916) {
        return data.asV916.who
    } else {
        throw new UnknownVersionError(data.constructor.name)
    }
}

function getReservedAccount(ctx: ChainContext, event: Event) {
    const data = new BalancesReservedEvent(ctx, event)

    if (data.isV1) {
        return data.asV1[0]
    } else if (data.isV916) {
        return data.asV916.who
    } else {
        throw new UnknownVersionError(data.constructor.name)
    }
}

function getUnreservedAccount(ctx: ChainContext, event: Event) {
    const data = new BalancesUnreservedEvent(ctx, event)

    if (data.isV1) {
        return data.asV1[0]
    } else if (data.isV916) {
        return data.asV916.who
    } else {
        throw new UnknownVersionError(data.constructor.name)
    }
}

function getWithdrawAccount(ctx: ChainContext, event: Event) {
    const data = new BalancesWithdrawEvent(ctx, event)

    if (data.isV908) {
        return data.asV908[0]
    } else if (data.isV916) {
        return data.asV916.who
    } else {
        throw new UnknownVersionError(data.constructor.name)
    }
}

function getSlashedAccount(ctx: ChainContext, event: Event) {
    const data = new BalancesSlashedEvent(ctx, event)

    if (data.isV908) {
        return data.asV908[0]
    } else if (data.isV916) {
        return data.asV916.who
    } else {
        throw new UnknownVersionError(data.constructor.name)
    }
}

function getReserveRepatriatedAccounts(ctx: ChainContext, event: Event): [Uint8Array, Uint8Array] {
    const data = new BalancesReserveRepatriatedEvent(ctx, event)

    if (data.isV1) {
        return [data.asV1[0], data.asV1[1]]
    } else if (data.isV916) {
        return [data.asV916.from, data.asV916.to]
    } else {
        throw new UnknownVersionError(data.constructor.name)
    }
}

async function getBalancesAccountBalances(ctx: ChainContext, block: Block, accounts: Uint8Array[]) {
    const storage = new BalancesAccountStorage(ctx, block)
    if (!storage.isExists) return undefined

    const mapData = (d: {free: bigint; reserved: bigint}) => ({free: d.free, reserved: d.reserved})

    if (storage.isV1) {
        return storage.asV1.getMany(accounts).then((data) => data.map(mapData))
    } else {
        throw new UnknownVersionError(storage.constructor.name)
    }
}

async function getSystemAccountBalances(ctx: ChainContext, block: Block, accounts: Uint8Array[]) {
    const storage = new SystemAccountStorage(ctx, block)
    if (!storage.isExists) return undefined

    const mapData = (d: {data: {free: bigint; reserved: bigint}}) => ({free: d.data.free, reserved: d.data.reserved})

    if (storage.isV1) {
        return storage.asV1.getMany(accounts).then((data) => data.map(mapData))
    } else {
        throw new UnknownVersionError(storage.constructor.name)
    }
}

async function getCouncilMembersCount(ctx: ChainContext, block: Block) {
    const storage = new CouncilMembersStorage(ctx, block)
    if (!storage.isExists) return getInstance1MembersCount(ctx, block)

    if (storage.isV906) {
        return await storage.asV906.get().then((r) => r.length)
    }

    throw new UnknownVersionError(storage.constructor.name)
}

async function getInstance1MembersCount(ctx: ChainContext, block: Block) {
    const storage = new Instance1CollectiveMembersStorage(ctx, block)
    if (!storage.isExists) return undefined

    if (storage.isV803) {
        return await storage.asV803.get().then((r) => r.length)
    }

    throw new UnknownVersionError(storage.constructor.name)
}

async function getCouncilProposalsCount(ctx: ChainContext, block: Block) {
    const storage = new CouncilProposalCountStorage(ctx, block)
    if (!storage.isExists) return getInstance1ProposalsCount(ctx, block)

    if (storage.isV906) {
        return await storage.asV906.get()
    }

    throw new UnknownVersionError(storage.constructor.name)
}

async function getInstance1ProposalsCount(ctx: ChainContext, block: Block) {
    const storage = new Instance1CollectiveProposalCountStorage(ctx, block)
    if (!storage.isExists) return undefined

    if (storage.isV803) {
        return await storage.asV803.get()
    }

    throw new UnknownVersionError(storage.constructor.name)
}

async function getDemocracyProposalsCount(ctx: ChainContext, block: Block) {
    const storage = new DemocracyPublicPropCountStorage(ctx, block)
    if (!storage.isExists) return undefined

    if (storage.isV803) {
        return await storage.asV803.get()
    }

    throw new UnknownVersionError(storage.constructor.name)
}

async function getTotalIssuance(ctx: ChainContext, block: Block) {
    const storage = new BalancesTotalIssuanceStorage(ctx, block)
    if (!storage.isExists) return undefined

    if (storage.isV1) {
        return await storage.asV1.get()
    }

    throw new UnknownVersionError(storage.constructor.name)
}

export const api: ChainApi = {
    events: {
        getBalanceSetAccount,
        getTransferAccounts,
        getEndowedAccount,
        getDepositAccount,
        getReservedAccount,
        getUnreservedAccount,
        getWithdrawAccount,
        getSlashedAccount,
        getReserveRepatriatedAccounts,
    },
    storage: {
        getBalancesAccountBalances,
        getSystemAccountBalances,
        getCouncilMembersCount,
        getCouncilProposalsCount,
        getDemocracyProposalsCount,
        getTotalIssuance,
    },
}
