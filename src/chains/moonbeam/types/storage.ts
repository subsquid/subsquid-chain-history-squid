import assert from 'assert'
import {Block, BlockContext, Chain, ChainContext, Option, Result, StorageBase} from './support'
import * as v900 from './v900'

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
     *  NOTE: This is only used in the case that this pallet is used to store balances.
     */
    get isV900(): boolean {
        return this.getTypeHash() === '17669917f628c38832645ae9b39d0bab5a99964e3446b9b2ef904cad2f4bd653'
    }

    /**
     *  The balance of an account.
     * 
     *  NOTE: This is only used in the case that this pallet is used to store balances.
     */
    get asV900(): BalancesAccountStorageV900 {
        assert(this.isV900)
        return this as any
    }
}

/**
 *  The balance of an account.
 * 
 *  NOTE: This is only used in the case that this pallet is used to store balances.
 */
export interface BalancesAccountStorageV900 {
    get(key: Uint8Array): Promise<v900.AccountData>
    getAll(): Promise<v900.AccountData[]>
    getMany(keys: Uint8Array[]): Promise<v900.AccountData[]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: v900.AccountData][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: v900.AccountData][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: v900.AccountData][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: v900.AccountData][]>
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
    get isV900(): boolean {
        return this.getTypeHash() === 'f8ebe28eb30158172c0ccf672f7747c46a244f892d08ef2ebcbaadde34a26bc0'
    }

    /**
     *  The total units issued in the system.
     */
    get asV900(): BalancesTotalIssuanceStorageV900 {
        assert(this.isV900)
        return this as any
    }
}

/**
 *  The total units issued in the system.
 */
export interface BalancesTotalIssuanceStorageV900 {
    get(): Promise<bigint>
}

export class CouncilCollectiveMembersStorage extends StorageBase {
    protected getPrefix() {
        return 'CouncilCollective'
    }

    protected getName() {
        return 'Members'
    }

    /**
     *  The current members of the collective. This is stored sorted (just by value).
     */
    get isV900(): boolean {
        return this.getTypeHash() === 'd14508def9da76532021b53d553e9048fd079e2e735d2393e6d531e6d1fd29ca'
    }

    /**
     *  The current members of the collective. This is stored sorted (just by value).
     */
    get asV900(): CouncilCollectiveMembersStorageV900 {
        assert(this.isV900)
        return this as any
    }
}

/**
 *  The current members of the collective. This is stored sorted (just by value).
 */
export interface CouncilCollectiveMembersStorageV900 {
    get(): Promise<Uint8Array[]>
}

export class CouncilCollectiveProposalCountStorage extends StorageBase {
    protected getPrefix() {
        return 'CouncilCollective'
    }

    protected getName() {
        return 'ProposalCount'
    }

    /**
     *  Proposals so far.
     */
    get isV900(): boolean {
        return this.getTypeHash() === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
    }

    /**
     *  Proposals so far.
     */
    get asV900(): CouncilCollectiveProposalCountStorageV900 {
        assert(this.isV900)
        return this as any
    }
}

/**
 *  Proposals so far.
 */
export interface CouncilCollectiveProposalCountStorageV900 {
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
    get isV900(): boolean {
        return this.getTypeHash() === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
    }

    /**
     *  The number of (public) proposals that have been made so far.
     */
    get asV900(): DemocracyPublicPropCountStorageV900 {
        assert(this.isV900)
        return this as any
    }
}

/**
 *  The number of (public) proposals that have been made so far.
 */
export interface DemocracyPublicPropCountStorageV900 {
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
    get isV900(): boolean {
        return this.getTypeHash() === 'a83a7372c51978aa017bd09db5672f3ea3957f0882455abd9726ac2b6d4b61dc'
    }

    /**
     *  The full account information for a particular account ID.
     */
    get asV900(): SystemAccountStorageV900 {
        assert(this.isV900)
        return this as any
    }
}

/**
 *  The full account information for a particular account ID.
 */
export interface SystemAccountStorageV900 {
    get(key: Uint8Array): Promise<v900.AccountInfo>
    getAll(): Promise<v900.AccountInfo[]>
    getMany(keys: Uint8Array[]): Promise<v900.AccountInfo[]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: v900.AccountInfo][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: v900.AccountInfo][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: v900.AccountInfo][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: v900.AccountInfo][]>
}
