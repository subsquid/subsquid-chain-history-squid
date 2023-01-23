import assert from 'assert'
import {Block, BlockContext, Chain, ChainContext, Option, Result, StorageBase} from './support'
import * as v1050 from './v1050'
import * as v2025 from './v2025'
import * as v2028 from './v2028'
import * as v2030 from './v2030'

export class BalancesAccountStorage extends StorageBase {
    protected getPrefix() {
        return 'Balances'
    }

    protected getName() {
        return 'Account'
    }

    /**
     *  The balance of an account.
     * 
     *  NOTE: THIS MAY NEVER BE IN EXISTENCE AND YET HAVE A `total().is_zero()`. If the total
     *  is ever zero, then the entry *MUST* be removed.
     * 
     *  NOTE: This is only used in the case that this module is used to store balances.
     */
    get isV1050(): boolean {
        return this.getTypeHash() === '0b3b4bf0dd7388459eba461bc7c3226bf58608c941710a714e02f33ec0f91e78'
    }

    /**
     *  The balance of an account.
     * 
     *  NOTE: THIS MAY NEVER BE IN EXISTENCE AND YET HAVE A `total().is_zero()`. If the total
     *  is ever zero, then the entry *MUST* be removed.
     * 
     *  NOTE: This is only used in the case that this module is used to store balances.
     */
    get asV1050(): BalancesAccountStorageV1050 {
        assert(this.isV1050)
        return this as any
    }
}

/**
 *  The balance of an account.
 * 
 *  NOTE: THIS MAY NEVER BE IN EXISTENCE AND YET HAVE A `total().is_zero()`. If the total
 *  is ever zero, then the entry *MUST* be removed.
 * 
 *  NOTE: This is only used in the case that this module is used to store balances.
 */
export interface BalancesAccountStorageV1050 {
    get(key: Uint8Array): Promise<v1050.AccountData>
    getAll(): Promise<v1050.AccountData[]>
    getMany(keys: Uint8Array[]): Promise<v1050.AccountData[]>
}

export class BalancesFreeBalanceStorage extends StorageBase {
    protected getPrefix() {
        return 'Balances'
    }

    protected getName() {
        return 'FreeBalance'
    }

    /**
     *  The 'free' balance of a given account.
     * 
     *  This is the only balance that matters in terms of most operations on tokens. It
     *  alone is used to determine the balance when in the contract execution environment. When this
     *  balance falls below the value of `ExistentialDeposit`, then the 'current account' is
     *  deleted: specifically `FreeBalance`. Further, the `OnFreeBalanceZero` callback
     *  is invoked, giving a chance to external modules to clean up data associated with
     *  the deleted account.
     * 
     *  `system::AccountNonce` is also deleted if `ReservedBalance` is also zero (it also gets
     *  collapsed to zero if it ever becomes less than `ExistentialDeposit`.
     */
    get isV1020(): boolean {
        return this.getTypeHash() === '0bac40afaf72ceea5a87ae2baaa5fe7f69915323f3293bdd970e7790a9d968c0'
    }

    /**
     *  The 'free' balance of a given account.
     * 
     *  This is the only balance that matters in terms of most operations on tokens. It
     *  alone is used to determine the balance when in the contract execution environment. When this
     *  balance falls below the value of `ExistentialDeposit`, then the 'current account' is
     *  deleted: specifically `FreeBalance`. Further, the `OnFreeBalanceZero` callback
     *  is invoked, giving a chance to external modules to clean up data associated with
     *  the deleted account.
     * 
     *  `system::AccountNonce` is also deleted if `ReservedBalance` is also zero (it also gets
     *  collapsed to zero if it ever becomes less than `ExistentialDeposit`.
     */
    get asV1020(): BalancesFreeBalanceStorageV1020 {
        assert(this.isV1020)
        return this as any
    }
}

/**
 *  The 'free' balance of a given account.
 * 
 *  This is the only balance that matters in terms of most operations on tokens. It
 *  alone is used to determine the balance when in the contract execution environment. When this
 *  balance falls below the value of `ExistentialDeposit`, then the 'current account' is
 *  deleted: specifically `FreeBalance`. Further, the `OnFreeBalanceZero` callback
 *  is invoked, giving a chance to external modules to clean up data associated with
 *  the deleted account.
 * 
 *  `system::AccountNonce` is also deleted if `ReservedBalance` is also zero (it also gets
 *  collapsed to zero if it ever becomes less than `ExistentialDeposit`.
 */
export interface BalancesFreeBalanceStorageV1020 {
    get(key: Uint8Array): Promise<bigint>
    getAll(): Promise<bigint[]>
    getMany(keys: Uint8Array[]): Promise<bigint[]>
}

export class BalancesReservedBalanceStorage extends StorageBase {
    protected getPrefix() {
        return 'Balances'
    }

    protected getName() {
        return 'ReservedBalance'
    }

    /**
     *  The amount of the balance of a given account that is externally reserved; this can still get
     *  slashed, but gets slashed last of all.
     * 
     *  This balance is a 'reserve' balance that other subsystems use in order to set aside tokens
     *  that are still 'owned' by the account holder, but which are suspendable.
     * 
     *  When this balance falls below the value of `ExistentialDeposit`, then this 'reserve account'
     *  is deleted: specifically, `ReservedBalance`.
     * 
     *  `system::AccountNonce` is also deleted if `FreeBalance` is also zero (it also gets
     *  collapsed to zero if it ever becomes less than `ExistentialDeposit`.)
     */
    get isV1020(): boolean {
        return this.getTypeHash() === '0bac40afaf72ceea5a87ae2baaa5fe7f69915323f3293bdd970e7790a9d968c0'
    }

    /**
     *  The amount of the balance of a given account that is externally reserved; this can still get
     *  slashed, but gets slashed last of all.
     * 
     *  This balance is a 'reserve' balance that other subsystems use in order to set aside tokens
     *  that are still 'owned' by the account holder, but which are suspendable.
     * 
     *  When this balance falls below the value of `ExistentialDeposit`, then this 'reserve account'
     *  is deleted: specifically, `ReservedBalance`.
     * 
     *  `system::AccountNonce` is also deleted if `FreeBalance` is also zero (it also gets
     *  collapsed to zero if it ever becomes less than `ExistentialDeposit`.)
     */
    get asV1020(): BalancesReservedBalanceStorageV1020 {
        assert(this.isV1020)
        return this as any
    }
}

/**
 *  The amount of the balance of a given account that is externally reserved; this can still get
 *  slashed, but gets slashed last of all.
 * 
 *  This balance is a 'reserve' balance that other subsystems use in order to set aside tokens
 *  that are still 'owned' by the account holder, but which are suspendable.
 * 
 *  When this balance falls below the value of `ExistentialDeposit`, then this 'reserve account'
 *  is deleted: specifically, `ReservedBalance`.
 * 
 *  `system::AccountNonce` is also deleted if `FreeBalance` is also zero (it also gets
 *  collapsed to zero if it ever becomes less than `ExistentialDeposit`.)
 */
export interface BalancesReservedBalanceStorageV1020 {
    get(key: Uint8Array): Promise<bigint>
    getAll(): Promise<bigint[]>
    getMany(keys: Uint8Array[]): Promise<bigint[]>
}

export class BalancesTotalIssuanceStorage extends StorageBase {
    protected getPrefix() {
        return 'Balances'
    }

    protected getName() {
        return 'TotalIssuance'
    }

    /**
     *  The total units issued in the system.
     */
    get isV1020(): boolean {
        return this.getTypeHash() === 'f8ebe28eb30158172c0ccf672f7747c46a244f892d08ef2ebcbaadde34a26bc0'
    }

    /**
     *  The total units issued in the system.
     */
    get asV1020(): BalancesTotalIssuanceStorageV1020 {
        assert(this.isV1020)
        return this as any
    }
}

/**
 *  The total units issued in the system.
 */
export interface BalancesTotalIssuanceStorageV1020 {
    get(): Promise<bigint>
}

export class CouncilMembersStorage extends StorageBase {
    protected getPrefix() {
        return 'Council'
    }

    protected getName() {
        return 'Members'
    }

    /**
     *  The current members of the collective. This is stored sorted (just by value).
     */
    get isV9111(): boolean {
        return this.getTypeHash() === 'f5df25eadcdffaa0d2a68b199d671d3921ca36a7b70d22d57506dca52b4b5895'
    }

    /**
     *  The current members of the collective. This is stored sorted (just by value).
     */
    get asV9111(): CouncilMembersStorageV9111 {
        assert(this.isV9111)
        return this as any
    }
}

/**
 *  The current members of the collective. This is stored sorted (just by value).
 */
export interface CouncilMembersStorageV9111 {
    get(): Promise<Uint8Array[]>
}

export class CouncilProposalCountStorage extends StorageBase {
    protected getPrefix() {
        return 'Council'
    }

    protected getName() {
        return 'ProposalCount'
    }

    /**
     *  Proposals so far.
     */
    get isV9111(): boolean {
        return this.getTypeHash() === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
    }

    /**
     *  Proposals so far.
     */
    get asV9111(): CouncilProposalCountStorageV9111 {
        assert(this.isV9111)
        return this as any
    }
}

/**
 *  Proposals so far.
 */
export interface CouncilProposalCountStorageV9111 {
    get(): Promise<number>
}

export class DemocracyPublicPropCountStorage extends StorageBase {
    protected getPrefix() {
        return 'Democracy'
    }

    protected getName() {
        return 'PublicPropCount'
    }

    /**
     *  The number of (public) proposals that have been made so far.
     */
    get isV1020(): boolean {
        return this.getTypeHash() === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
    }

    /**
     *  The number of (public) proposals that have been made so far.
     */
    get asV1020(): DemocracyPublicPropCountStorageV1020 {
        assert(this.isV1020)
        return this as any
    }
}

/**
 *  The number of (public) proposals that have been made so far.
 */
export interface DemocracyPublicPropCountStorageV1020 {
    get(): Promise<number>
}

export class Instance1CollectiveMembersStorage extends StorageBase {
    protected getPrefix() {
        return 'Instance1Collective'
    }

    protected getName() {
        return 'Members'
    }

    /**
     *  The current members of the collective. This is stored sorted (just by value).
     */
    get isV1020(): boolean {
        return this.getTypeHash() === 'f5df25eadcdffaa0d2a68b199d671d3921ca36a7b70d22d57506dca52b4b5895'
    }

    /**
     *  The current members of the collective. This is stored sorted (just by value).
     */
    get asV1020(): Instance1CollectiveMembersStorageV1020 {
        assert(this.isV1020)
        return this as any
    }
}

/**
 *  The current members of the collective. This is stored sorted (just by value).
 */
export interface Instance1CollectiveMembersStorageV1020 {
    get(): Promise<Uint8Array[]>
}

export class Instance1CollectiveProposalCountStorage extends StorageBase {
    protected getPrefix() {
        return 'Instance1Collective'
    }

    protected getName() {
        return 'ProposalCount'
    }

    /**
     *  Proposals so far.
     */
    get isV1020(): boolean {
        return this.getTypeHash() === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
    }

    /**
     *  Proposals so far.
     */
    get asV1020(): Instance1CollectiveProposalCountStorageV1020 {
        assert(this.isV1020)
        return this as any
    }
}

/**
 *  Proposals so far.
 */
export interface Instance1CollectiveProposalCountStorageV1020 {
    get(): Promise<number>
}

export class SystemAccountStorage extends StorageBase {
    protected getPrefix() {
        return 'System'
    }

    protected getName() {
        return 'Account'
    }

    /**
     *  The full account information for a particular account ID.
     */
    get isV1050(): boolean {
        return this.getTypeHash() === '2208f857b7cd6fecf78ca393cf3d17ec424773727d0028f07c9f0dc608fc1b7a'
    }

    /**
     *  The full account information for a particular account ID.
     */
    get asV1050(): SystemAccountStorageV1050 {
        assert(this.isV1050)
        return this as any
    }

    /**
     *  The full account information for a particular account ID.
     */
    get isV2025(): boolean {
        return this.getTypeHash() === 'eb40f1d91f26d72e29c60e034d53a72b9b529014c7e108f422d8ad5f03f0c902'
    }

    /**
     *  The full account information for a particular account ID.
     */
    get asV2025(): SystemAccountStorageV2025 {
        assert(this.isV2025)
        return this as any
    }

    /**
     *  The full account information for a particular account ID.
     */
    get isV2028(): boolean {
        return this.getTypeHash() === '73070b537f1805475b37167271b33ac7fd6ffad8ba62da08bc14937a017b8bb2'
    }

    /**
     *  The full account information for a particular account ID.
     */
    get asV2028(): SystemAccountStorageV2028 {
        assert(this.isV2028)
        return this as any
    }

    /**
     *  The full account information for a particular account ID.
     */
    get isV2030(): boolean {
        return this.getTypeHash() === '1ddc7ade926221442c388ee4405a71c9428e548fab037445aaf4b3a78f4735c1'
    }

    /**
     *  The full account information for a particular account ID.
     */
    get asV2030(): SystemAccountStorageV2030 {
        assert(this.isV2030)
        return this as any
    }
}

/**
 *  The full account information for a particular account ID.
 */
export interface SystemAccountStorageV1050 {
    get(key: Uint8Array): Promise<v1050.AccountInfo>
    getAll(): Promise<v1050.AccountInfo[]>
    getMany(keys: Uint8Array[]): Promise<v1050.AccountInfo[]>
}

/**
 *  The full account information for a particular account ID.
 */
export interface SystemAccountStorageV2025 {
    get(key: Uint8Array): Promise<v2025.AccountInfo>
    getAll(): Promise<v2025.AccountInfo[]>
    getMany(keys: Uint8Array[]): Promise<v2025.AccountInfo[]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: v2025.AccountInfo][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: v2025.AccountInfo][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: v2025.AccountInfo][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: v2025.AccountInfo][]>
}

/**
 *  The full account information for a particular account ID.
 */
export interface SystemAccountStorageV2028 {
    get(key: Uint8Array): Promise<v2028.AccountInfo>
    getAll(): Promise<v2028.AccountInfo[]>
    getMany(keys: Uint8Array[]): Promise<v2028.AccountInfo[]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: v2028.AccountInfo][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: v2028.AccountInfo][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: v2028.AccountInfo][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: v2028.AccountInfo][]>
}

/**
 *  The full account information for a particular account ID.
 */
export interface SystemAccountStorageV2030 {
    get(key: Uint8Array): Promise<v2030.AccountInfo>
    getAll(): Promise<v2030.AccountInfo[]>
    getMany(keys: Uint8Array[]): Promise<v2030.AccountInfo[]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: v2030.AccountInfo][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: v2030.AccountInfo][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: v2030.AccountInfo][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: v2030.AccountInfo][]>
}
