import {
    BalancesBalanceSetEvent,
    BalancesTransferEvent,
    BalancesEndowedEvent,
    BalancesDepositEvent,
    BalancesReservedEvent,
    BalancesUnreservedEvent,
    BalancesWithdrawEvent,
    BalancesSlashedEvent,
    BalancesReserveRepatriatedEvent,
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
import {UnknownVersionError} from '../../utils'
import {ChainGetters} from '../chainGetters'

function getBalanceSetAccount(ctx: ChainContext, event: Event) {
    const data = new BalancesBalanceSetEvent(ctx, event)

    if (data.isV0) {
        return data.asV0[0]
    } else if (data.isV9140) {
        return data.asV9140.who
    } else {
        throw new UnknownVersionError(data.constructor.name)
    }
}

function getTransferAccounts(ctx: ChainContext, event: Event): [Uint8Array, Uint8Array] {
    const data = new BalancesTransferEvent(ctx, event)

    if (data.isV0) {
        return [data.asV0[0], data.asV0[1]]
    } else if (data.isV9140) {
        return [data.asV9140.from, data.asV9140.to]
    } else {
        throw new UnknownVersionError(data.constructor.name)
    }
}

function getEndowedAccount(ctx: ChainContext, event: Event) {
    const data = new BalancesEndowedEvent(ctx, event)

    if (data.isV0) {
        return data.asV0[0]
    } else if (data.isV9140) {
        return data.asV9140.account
    } else {
        throw new UnknownVersionError(data.constructor.name)
    }
}

function getDepositAccount(ctx: ChainContext, event: Event) {
    const data = new BalancesDepositEvent(ctx, event)

    if (data.isV0) {
        return data.asV0[0]
    } else if (data.isV9140) {
        return data.asV9140.who
    } else {
        throw new UnknownVersionError(data.constructor.name)
    }
}

function getReservedAccount(ctx: ChainContext, event: Event) {
    const data = new BalancesReservedEvent(ctx, event)

    if (data.isV8) {
        return data.asV8[0]
    } else if (data.isV9140) {
        return data.asV9140.who
    } else {
        throw new UnknownVersionError(data.constructor.name)
    }
}

function getUnreservedAccount(ctx: ChainContext, event: Event) {
    const data = new BalancesUnreservedEvent(ctx, event)

    if (data.isV8) {
        return data.asV8[0]
    } else if (data.isV9140) {
        return data.asV9140.who
    } else {
        throw new UnknownVersionError(data.constructor.name)
    }
}

function getWithdrawAccount(ctx: ChainContext, event: Event) {
    const data = new BalancesWithdrawEvent(ctx, event)

    if (data.isV9122) {
        return data.asV9122[0]
    } else if (data.isV9140) {
        return data.asV9140.who
    } else {
        throw new UnknownVersionError(data.constructor.name)
    }
}

function getSlashedAccount(ctx: ChainContext, event: Event) {
    const data = new BalancesSlashedEvent(ctx, event)

    if (data.isV9122) {
        return data.asV9122[0]
    } else if (data.isV9140) {
        return data.asV9140.who
    } else {
        throw new UnknownVersionError(data.constructor.name)
    }
}

function getReserveRepatriatedAccounts(ctx: ChainContext, event: Event): [Uint8Array, Uint8Array] {
    const data = new BalancesReserveRepatriatedEvent(ctx, event)

    if (data.isV8) {
        return [data.asV8[0], data.asV8[1]]
    } else if (data.isV9140) {
        return [data.asV9140.from, data.asV9140.to]
    } else {
        throw new UnknownVersionError(data.constructor.name)
    }
}

async function getBalancesAccountBalances(ctx: ChainContext, block: Block, accounts: Uint8Array[]) {
    const storage = new BalancesAccountStorage(ctx, block)
    if (!storage.isExists) return undefined

    const mapData = (d: {free: bigint; reserved: bigint}) => ({free: d.free, reserved: d.reserved})

    if (storage.isV0) {
        return storage.getManyAsV0(accounts).then((data) => data.map(mapData))
    } else {
        throw new UnknownVersionError(storage.constructor.name)
    }
}

async function getSystemAccountBalances(ctx: ChainContext, block: Block, accounts: Uint8Array[]) {
    const storage = new SystemAccountStorage(ctx, block)
    if (!storage.isExists) return undefined

    const mapData = (d: {data: {free: bigint; reserved: bigint}}) => ({free: d.data.free, reserved: d.data.reserved})

    if (storage.isV0) {
        return storage.getManyAsV0(accounts).then((data) => data.map(mapData))
    } else if (storage.isV25) {
        return storage.getManyAsV25(accounts).then((data) => data.map(mapData))
    } else if (storage.isV28) {
        return storage.getManyAsV28(accounts).then((data) => data.map(mapData))
    } else if (storage.isV30) {
        return storage.getManyAsV30(accounts).then((data) => data.map(mapData))
    } else {
        throw new UnknownVersionError(storage.constructor.name)
    }
}

async function getCouncilMembersCount(ctx: ChainContext, block: Block) {
    const storage = new CouncilMembersStorage(ctx, block)
    if (!storage.isExists) return getInstance1MembersCount(ctx, block)

    if (storage.isV9110) {
        return await storage.getAsV9110().then((r) => r.length)
    }

    throw new UnknownVersionError(storage.constructor.name)
}

async function getInstance1MembersCount(ctx: ChainContext, block: Block) {
    const storage = new Instance1CollectiveMembersStorage(ctx, block)
    if (!storage.isExists) return undefined

    if (storage.isV0) {
        return await storage.getAsV0().then((r) => r.length)
    }

    throw new UnknownVersionError(storage.constructor.name)
}

async function getCouncilProposalsCount(ctx: ChainContext, block: Block) {
    const storage = new CouncilProposalCountStorage(ctx, block)
    if (!storage.isExists) return getInstance1ProposalsCount(ctx, block)

    if (storage.isV9110) {
        return await storage.getAsV9110()
    }

    throw new UnknownVersionError(storage.constructor.name)
}

async function getInstance1ProposalsCount(ctx: ChainContext, block: Block) {
    const storage = new Instance1CollectiveProposalCountStorage(ctx, block)
    if (!storage.isExists) return undefined

    if (storage.isV0) {
        return await storage.getAsV0()
    }

    throw new UnknownVersionError(storage.constructor.name)
}

async function getDemocracyProposalsCount(ctx: ChainContext, block: Block) {
    const storage = new DemocracyPublicPropCountStorage(ctx, block)
    if (!storage.isExists) return undefined

    if (storage.isV0) {
        return await storage.getAsV0()
    }

    throw new UnknownVersionError(storage.constructor.name)
}

async function getTotalIssuance(ctx: ChainContext, block: Block) {
    const storage = new BalancesTotalIssuanceStorage(ctx, block)
    if (!storage.isExists) return undefined

    if (storage.isV0) {
        return await storage.getAsV0()
    }

    throw new UnknownVersionError(storage.constructor.name)
}

const getters: ChainGetters = {
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

export default getters
