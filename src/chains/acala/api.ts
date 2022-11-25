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
    GeneralCouncilMembersStorage,
    GeneralCouncilProposalCountStorage,
    DemocracyPublicPropCountStorage,
    SystemAccountStorage,
} from './types/storage'
import {Block, ChainContext, Event} from './types/support'
import {UnknownVersionError} from '../../utils'
import {ChainApi} from '../interfaces/chainApi'

export function getBalanceSetAccount(ctx: ChainContext, event: Event) {
    const data = new BalancesBalanceSetEvent(ctx, event)

    if (data.isV2000) {
        return data.asV2000[0]
    } else if (data.isV2011) {
        return data.asV2011.who
    } else {
        throw new UnknownVersionError(data.constructor.name)
    }
}

export function getTransferAccounts(ctx: ChainContext, event: Event): [Uint8Array, Uint8Array] {
    const data = new BalancesTransferEvent(ctx, event)

    if (data.isV2000) {
        return [data.asV2000[0], data.asV2000[1]]
    } else if (data.isV2011) {
        return [data.asV2011.from, data.asV2011.to]
    } else {
        throw new UnknownVersionError(data.constructor.name)
    }
}

export function getEndowedAccount(ctx: ChainContext, event: Event) {
    const data = new BalancesEndowedEvent(ctx, event)

    if (data.isV2000) {
        return data.asV2000[0]
    } else if (data.isV2011) {
        return data.asV2011.account
    } else {
        throw new UnknownVersionError(data.constructor.name)
    }
}

export function getDepositAccount(ctx: ChainContext, event: Event) {
    const data = new BalancesDepositEvent(ctx, event)

    if (data.isV2000) {
        return data.asV2000[0]
    } else if (data.isV2011) {
        return data.asV2011.who
    } else {
        throw new UnknownVersionError(data.constructor.name)
    }
}

export function getReservedAccount(ctx: ChainContext, event: Event) {
    const data = new BalancesReservedEvent(ctx, event)

    if (data.isV2000) {
        return data.asV2000[0]
    } else if (data.isV2011) {
        return data.asV2011.who
    } else {
        throw new UnknownVersionError(data.constructor.name)
    }
}

export function getUnreservedAccount(ctx: ChainContext, event: Event) {
    const data = new BalancesUnreservedEvent(ctx, event)

    if (data.isV2000) {
        return data.asV2000[0]
    } else if (data.isV2011) {
        return data.asV2011.who
    } else {
        throw new UnknownVersionError(data.constructor.name)
    }
}

export function getWithdrawAccount(ctx: ChainContext, event: Event) {
    const data = new BalancesWithdrawEvent(ctx, event)

    if (data.isV2000) {
        return data.asV2000[0]
    } else if (data.isV2011) {
        return data.asV2011.who
    } else {
        throw new UnknownVersionError(data.constructor.name)
    }
}

export function getSlashedAccount(ctx: ChainContext, event: Event) {
    const data = new BalancesSlashedEvent(ctx, event)

    if (data.isV2000) {
        return data.asV2000[0]
    } else if (data.isV2011) {
        return data.asV2011.who
    } else {
        throw new UnknownVersionError(data.constructor.name)
    }
}

export function getReserveRepatriatedAccounts(ctx: ChainContext, event: Event): [Uint8Array, Uint8Array] {
    const data = new BalancesReserveRepatriatedEvent(ctx, event)

    if (data.isV2000) {
        return [data.asV2000[0], data.asV2000[1]]
    } else if (data.isV2011) {
        return [data.asV2011.from, data.asV2011.to]
    } else {
        throw new UnknownVersionError(data.constructor.name)
    }
}

export async function getBalancesAccountBalances(ctx: ChainContext, block: Block, accounts: Uint8Array[]) {
    const storage = new BalancesAccountStorage(ctx, block)
    if (!storage.isExists) return undefined

    const mapData = (d: {free: bigint; reserved: bigint}) => ({free: d.free, reserved: d.reserved})

    if (storage.isV2000) {
        return storage.getManyAsV2000(accounts).then((data) => data.map(mapData))
    } else {
        throw new UnknownVersionError(storage.constructor.name)
    }
}

export async function getSystemAccountBalances(ctx: ChainContext, block: Block, accounts: Uint8Array[]) {
    const storage = new SystemAccountStorage(ctx, block)
    if (!storage.isExists) return undefined

    const mapData = (d: {data: {free: bigint; reserved: bigint}}) => ({free: d.data.free, reserved: d.data.reserved})

    if (storage.isV2000) {
        return storage.getManyAsV2000(accounts).then((data) => data.map(mapData))
    } else {
        throw new UnknownVersionError(storage.constructor.name)
    }
}

export async function getCouncilMembersCount(ctx: ChainContext, block: Block) {
    const storage = new GeneralCouncilMembersStorage(ctx, block)
    if (!storage.isExists) return undefined

    if (storage.isV2000) {
        return await storage.getAsV2000().then((r) => r.length)
    }

    throw new UnknownVersionError(storage.constructor.name)
}

export async function getCouncilProposalsCount(ctx: ChainContext, block: Block) {
    const storage = new GeneralCouncilProposalCountStorage(ctx, block)
    if (!storage.isExists) return undefined

    if (storage.isV2000) {
        return await storage.getAsV2000()
    }

    throw new UnknownVersionError(storage.constructor.name)
}

export async function getDemocracyProposalsCount(ctx: ChainContext, block: Block) {
    const storage = new DemocracyPublicPropCountStorage(ctx, block)
    if (!storage.isExists) return undefined

    if (storage.isV2000) {
        return await storage.getAsV2000()
    }

    throw new UnknownVersionError(storage.constructor.name)
}

export async function getTotalIssuance(ctx: ChainContext, block: Block) {
    const storage = new BalancesTotalIssuanceStorage(ctx, block)
    if (!storage.isExists) return undefined

    if (storage.isV2000) {
        return await storage.getAsV2000()
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
