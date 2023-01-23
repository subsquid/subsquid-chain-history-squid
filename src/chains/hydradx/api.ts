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
    SystemAccountStorage,
} from './types/storage'
import {Block, ChainContext, Event} from './types/support'

export function getBalanceSetAccount(ctx: ChainContext, event: Event) {
    const data = new BalancesBalanceSetEvent(ctx, event)

    if (data.isV100) {
        return data.asV100[0]
    } else if (data.isV104) {
        return data.asV104.who
    } else {
        throw new UnknownVersionError(data.constructor.name)
    }
}

export function getTransferAccounts(ctx: ChainContext, event: Event): [Uint8Array, Uint8Array] {
    const data = new BalancesTransferEvent(ctx, event)

    if (data.isV100) {
        return [data.asV100[0], data.asV100[1]]
    } else if (data.isV104) {
        return [data.asV104.from, data.asV104.to]
    } else {
        throw new UnknownVersionError(data.constructor.name)
    }
}

export function getEndowedAccount(ctx: ChainContext, event: Event) {
    const data = new BalancesEndowedEvent(ctx, event)

    if (data.isV100) {
        return data.asV100[0]
    } else if (data.isV104) {
        return data.asV104.account
    } else {
        throw new UnknownVersionError(data.constructor.name)
    }
}

export function getDepositAccount(ctx: ChainContext, event: Event) {
    const data = new BalancesDepositEvent(ctx, event)

    if (data.isV100) {
        return data.asV100[0]
    } else if (data.isV104) {
        return data.asV104.who
    } else {
        throw new UnknownVersionError(data.constructor.name)
    }
}

export function getReservedAccount(ctx: ChainContext, event: Event) {
    const data = new BalancesReservedEvent(ctx, event)

    if (data.isV100) {
        return data.asV100[0]
    } else if (data.isV104) {
        return data.asV104.who
    } else {
        throw new UnknownVersionError(data.constructor.name)
    }
}

export function getUnreservedAccount(ctx: ChainContext, event: Event) {
    const data = new BalancesUnreservedEvent(ctx, event)

    if (data.isV100) {
        return data.asV100[0]
    } else if (data.isV104) {
        return data.asV104.who
    } else {
        throw new UnknownVersionError(data.constructor.name)
    }
}

export function getWithdrawAccount(ctx: ChainContext, event: Event) {
    const data = new BalancesWithdrawEvent(ctx, event)

    if (data.isV100) {
        return data.asV100[0]
    } else if (data.isV104) {
        return data.asV104.who
    } else {
        throw new UnknownVersionError(data.constructor.name)
    }
}

export function getSlashedAccount(ctx: ChainContext, event: Event) {
    const data = new BalancesSlashedEvent(ctx, event)

    if (data.isV100) {
        return data.asV100[0]
    } else if (data.isV104) {
        return data.asV104.who
    } else {
        throw new UnknownVersionError(data.constructor.name)
    }
}

export function getReserveRepatriatedAccounts(ctx: ChainContext, event: Event): [Uint8Array, Uint8Array] {
    const data = new BalancesReserveRepatriatedEvent(ctx, event)

    if (data.isV100) {
        return [data.asV100[0], data.asV100[1]]
    } else if (data.isV104) {
        return [data.asV104.from, data.asV104.to]
    } else {
        throw new UnknownVersionError(data.constructor.name)
    }
}

export async function getBalancesAccountBalances(ctx: ChainContext, block: Block, accounts: Uint8Array[]) {
    const storage = new BalancesAccountStorage(ctx, block)
    if (!storage.isExists) return undefined

    const mapData = (d: {free: bigint; reserved: bigint}) => ({free: d.free, reserved: d.reserved})

    if (storage.isV100) {
        return storage.asV100.getMany(accounts).then((data) => data.map(mapData))
    } else {
        throw new UnknownVersionError(storage.constructor.name)
    }
}

export async function getSystemAccountBalances(ctx: ChainContext, block: Block, accounts: Uint8Array[]) {
    const storage = new SystemAccountStorage(ctx, block)
    if (!storage.isExists) return undefined

    const mapData = (d: {data: {free: bigint; reserved: bigint}}) => ({free: d.data.free, reserved: d.data.reserved})

    if (storage.isV100) {
        return storage.asV100.getMany(accounts).then((data) => data.map(mapData))
    } else {
        throw new UnknownVersionError(storage.constructor.name)
    }
}

export async function getCouncilMembersCount(ctx: ChainContext, block: Block) {
    const storage = new CouncilMembersStorage(ctx, block)
    if (!storage.isExists) return undefined

    if (storage.isV108) {
        return await storage.asV108.get().then((r) => r.length)
    }

    throw new UnknownVersionError(storage.constructor.name)
}

export async function getCouncilProposalsCount(ctx: ChainContext, block: Block) {
    const storage = new CouncilProposalCountStorage(ctx, block)
    if (!storage.isExists) return undefined

    if (storage.isV108) {
        return await storage.asV108.get()
    }

    throw new UnknownVersionError(storage.constructor.name)
}

export async function getDemocracyProposalsCount(ctx: ChainContext, block: Block) {
    const storage = new DemocracyPublicPropCountStorage(ctx, block)
    if (!storage.isExists) return undefined

    if (storage.isV108) {
        return await storage.asV108.get()
    }

    throw new UnknownVersionError(storage.constructor.name)
}

export async function getTotalIssuance(ctx: ChainContext, block: Block) {
    const storage = new BalancesTotalIssuanceStorage(ctx, block)
    if (!storage.isExists) return undefined

    if (storage.isV100) {
        return await storage.asV100.get()
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
