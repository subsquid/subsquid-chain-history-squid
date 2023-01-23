import assert from 'assert'
import {Block, BlockContext, Chain, ChainContext, Option, Result, StorageBase} from './support'
import * as v0 from './v0'
import * as v25 from './v25'
import * as v28 from './v28'
import * as v30 from './v30'

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
    get isV0(): boolean {
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
    get asV0(): BalancesAccountStorageV0 {
        assert(this.isV0)
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
export interface BalancesAccountStorageV0 {
    get(key: Uint8Array): Promise<v0.AccountData>
    getAll(): Promise<v0.AccountData[]>
    getMany(keys: Uint8Array[]): Promise<v0.AccountData[]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: v0.AccountData][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: v0.AccountData][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: v0.AccountData][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: v0.AccountData][]>
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
    get isV0(): boolean {
        return this.getTypeHash() === 'f8ebe28eb30158172c0ccf672f7747c46a244f892d08ef2ebcbaadde34a26bc0'
    }

    /**
     *  The total units issued in the system.
     */
    get asV0(): BalancesTotalIssuanceStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  The total units issued in the system.
 */
export interface BalancesTotalIssuanceStorageV0 {
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
    get isV9110(): boolean {
        return this.getTypeHash() === 'f5df25eadcdffaa0d2a68b199d671d3921ca36a7b70d22d57506dca52b4b5895'
    }

    /**
     *  The current members of the collective. This is stored sorted (just by value).
     */
    get asV9110(): CouncilMembersStorageV9110 {
        assert(this.isV9110)
        return this as any
    }
}

/**
 *  The current members of the collective. This is stored sorted (just by value).
 */
export interface CouncilMembersStorageV9110 {
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
    get isV9110(): boolean {
        return this.getTypeHash() === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
    }

    /**
     *  Proposals so far.
     */
    get asV9110(): CouncilProposalCountStorageV9110 {
        assert(this.isV9110)
        return this as any
    }
}

/**
 *  Proposals so far.
 */
export interface CouncilProposalCountStorageV9110 {
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
    get isV0(): boolean {
        return this.getTypeHash() === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
    }

    /**
     *  The number of (public) proposals that have been made so far.
     */
    get asV0(): DemocracyPublicPropCountStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  The number of (public) proposals that have been made so far.
 */
export interface DemocracyPublicPropCountStorageV0 {
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
    get isV0(): boolean {
        return this.getTypeHash() === 'f5df25eadcdffaa0d2a68b199d671d3921ca36a7b70d22d57506dca52b4b5895'
    }

    /**
     *  The current members of the collective. This is stored sorted (just by value).
     */
    get asV0(): Instance1CollectiveMembersStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  The current members of the collective. This is stored sorted (just by value).
 */
export interface Instance1CollectiveMembersStorageV0 {
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
    get isV0(): boolean {
        return this.getTypeHash() === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
    }

    /**
     *  Proposals so far.
     */
    get asV0(): Instance1CollectiveProposalCountStorageV0 {
        assert(this.isV0)
        return this as any
    }
}

/**
 *  Proposals so far.
 */
export interface Instance1CollectiveProposalCountStorageV0 {
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
    get isV0(): boolean {
        return this.getTypeHash() === '2208f857b7cd6fecf78ca393cf3d17ec424773727d0028f07c9f0dc608fc1b7a'
    }

    /**
     *  The full account information for a particular account ID.
     */
    get asV0(): SystemAccountStorageV0 {
        assert(this.isV0)
        return this as any
    }

    /**
     *  The full account information for a particular account ID.
     */
    get isV25(): boolean {
        return this.getTypeHash() === 'eb40f1d91f26d72e29c60e034d53a72b9b529014c7e108f422d8ad5f03f0c902'
    }

    /**
     *  The full account information for a particular account ID.
     */
    get asV25(): SystemAccountStorageV25 {
        assert(this.isV25)
        return this as any
    }

    /**
     *  The full account information for a particular account ID.
     */
    get isV28(): boolean {
        return this.getTypeHash() === '73070b537f1805475b37167271b33ac7fd6ffad8ba62da08bc14937a017b8bb2'
    }

    /**
     *  The full account information for a particular account ID.
     */
    get asV28(): SystemAccountStorageV28 {
        assert(this.isV28)
        return this as any
    }

    /**
     *  The full account information for a particular account ID.
     */
    get isV30(): boolean {
        return this.getTypeHash() === '1ddc7ade926221442c388ee4405a71c9428e548fab037445aaf4b3a78f4735c1'
    }

    /**
     *  The full account information for a particular account ID.
     */
    get asV30(): SystemAccountStorageV30 {
        assert(this.isV30)
        return this as any
    }
}

/**
 *  The full account information for a particular account ID.
 */
export interface SystemAccountStorageV0 {
    get(key: Uint8Array): Promise<v0.AccountInfo>
    getAll(): Promise<v0.AccountInfo[]>
    getMany(keys: Uint8Array[]): Promise<v0.AccountInfo[]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: v0.AccountInfo][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: v0.AccountInfo][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: v0.AccountInfo][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: v0.AccountInfo][]>
}

/**
 *  The full account information for a particular account ID.
 */
export interface SystemAccountStorageV25 {
    get(key: Uint8Array): Promise<v25.AccountInfo>
    getAll(): Promise<v25.AccountInfo[]>
    getMany(keys: Uint8Array[]): Promise<v25.AccountInfo[]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: v25.AccountInfo][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: v25.AccountInfo][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: v25.AccountInfo][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: v25.AccountInfo][]>
}

/**
 *  The full account information for a particular account ID.
 */
export interface SystemAccountStorageV28 {
    get(key: Uint8Array): Promise<v28.AccountInfo>
    getAll(): Promise<v28.AccountInfo[]>
    getMany(keys: Uint8Array[]): Promise<v28.AccountInfo[]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: v28.AccountInfo][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: v28.AccountInfo][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: v28.AccountInfo][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: v28.AccountInfo][]>
}

/**
 *  The full account information for a particular account ID.
 */
export interface SystemAccountStorageV30 {
    get(key: Uint8Array): Promise<v30.AccountInfo>
    getAll(): Promise<v30.AccountInfo[]>
    getMany(keys: Uint8Array[]): Promise<v30.AccountInfo[]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: v30.AccountInfo][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: v30.AccountInfo][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: v30.AccountInfo][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: v30.AccountInfo][]>
}
