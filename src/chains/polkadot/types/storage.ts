import assert from 'assert'
import {Block, Chain, ChainContext, BlockContext, Result, Option} from './support'
import * as v0 from './v0'
import * as v25 from './v25'
import * as v28 from './v28'
import * as v30 from './v30'

export class BalancesAccountStorage {
    private readonly _chain: Chain
    private readonly blockHash: string

    constructor(ctx: BlockContext)
    constructor(ctx: ChainContext, block: Block)
    constructor(ctx: BlockContext, block?: Block) {
        block = block || ctx.block
        this.blockHash = block.hash
        this._chain = ctx._chain
    }

    /**
     *  The balance of an account.
     * 
     *  NOTE: THIS MAY NEVER BE IN EXISTENCE AND YET HAVE A `total().is_zero()`. If the total
     *  is ever zero, then the entry *MUST* be removed.
     * 
     *  NOTE: This is only used in the case that this module is used to store balances.
     */
    get isV0() {
        return this._chain.getStorageItemTypeHash('Balances', 'Account') === '0b3b4bf0dd7388459eba461bc7c3226bf58608c941710a714e02f33ec0f91e78'
    }

    /**
     *  The balance of an account.
     * 
     *  NOTE: THIS MAY NEVER BE IN EXISTENCE AND YET HAVE A `total().is_zero()`. If the total
     *  is ever zero, then the entry *MUST* be removed.
     * 
     *  NOTE: This is only used in the case that this module is used to store balances.
     */
    async getAsV0(key: Uint8Array): Promise<v0.AccountData> {
        assert(this.isV0)
        return this._chain.getStorage(this.blockHash, 'Balances', 'Account', key)
    }

    async getManyAsV0(keys: Uint8Array[]): Promise<(v0.AccountData)[]> {
        assert(this.isV0)
        return this._chain.queryStorage(this.blockHash, 'Balances', 'Account', keys.map(k => [k]))
    }

    async getAllAsV0(): Promise<(v0.AccountData)[]> {
        assert(this.isV0)
        return this._chain.queryStorage(this.blockHash, 'Balances', 'Account')
    }

    /**
     * Checks whether the storage item is defined for the current chain version.
     */
    get isExists(): boolean {
        return this._chain.getStorageItemTypeHash('Balances', 'Account') != null
    }
}

export class BalancesTotalIssuanceStorage {
    private readonly _chain: Chain
    private readonly blockHash: string

    constructor(ctx: BlockContext)
    constructor(ctx: ChainContext, block: Block)
    constructor(ctx: BlockContext, block?: Block) {
        block = block || ctx.block
        this.blockHash = block.hash
        this._chain = ctx._chain
    }

    /**
     *  The total units issued in the system.
     */
    get isV0() {
        return this._chain.getStorageItemTypeHash('Balances', 'TotalIssuance') === 'f8ebe28eb30158172c0ccf672f7747c46a244f892d08ef2ebcbaadde34a26bc0'
    }

    /**
     *  The total units issued in the system.
     */
    async getAsV0(): Promise<bigint> {
        assert(this.isV0)
        return this._chain.getStorage(this.blockHash, 'Balances', 'TotalIssuance')
    }

    /**
     * Checks whether the storage item is defined for the current chain version.
     */
    get isExists(): boolean {
        return this._chain.getStorageItemTypeHash('Balances', 'TotalIssuance') != null
    }
}

export class CouncilMembersStorage {
    private readonly _chain: Chain
    private readonly blockHash: string

    constructor(ctx: BlockContext)
    constructor(ctx: ChainContext, block: Block)
    constructor(ctx: BlockContext, block?: Block) {
        block = block || ctx.block
        this.blockHash = block.hash
        this._chain = ctx._chain
    }

    /**
     *  The current members of the collective. This is stored sorted (just by value).
     */
    get isV9110() {
        return this._chain.getStorageItemTypeHash('Council', 'Members') === 'f5df25eadcdffaa0d2a68b199d671d3921ca36a7b70d22d57506dca52b4b5895'
    }

    /**
     *  The current members of the collective. This is stored sorted (just by value).
     */
    async getAsV9110(): Promise<Uint8Array[]> {
        assert(this.isV9110)
        return this._chain.getStorage(this.blockHash, 'Council', 'Members')
    }

    /**
     * Checks whether the storage item is defined for the current chain version.
     */
    get isExists(): boolean {
        return this._chain.getStorageItemTypeHash('Council', 'Members') != null
    }
}

export class CouncilProposalCountStorage {
    private readonly _chain: Chain
    private readonly blockHash: string

    constructor(ctx: BlockContext)
    constructor(ctx: ChainContext, block: Block)
    constructor(ctx: BlockContext, block?: Block) {
        block = block || ctx.block
        this.blockHash = block.hash
        this._chain = ctx._chain
    }

    /**
     *  Proposals so far.
     */
    get isV9110() {
        return this._chain.getStorageItemTypeHash('Council', 'ProposalCount') === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
    }

    /**
     *  Proposals so far.
     */
    async getAsV9110(): Promise<number> {
        assert(this.isV9110)
        return this._chain.getStorage(this.blockHash, 'Council', 'ProposalCount')
    }

    /**
     * Checks whether the storage item is defined for the current chain version.
     */
    get isExists(): boolean {
        return this._chain.getStorageItemTypeHash('Council', 'ProposalCount') != null
    }
}

export class DemocracyPublicPropCountStorage {
    private readonly _chain: Chain
    private readonly blockHash: string

    constructor(ctx: BlockContext)
    constructor(ctx: ChainContext, block: Block)
    constructor(ctx: BlockContext, block?: Block) {
        block = block || ctx.block
        this.blockHash = block.hash
        this._chain = ctx._chain
    }

    /**
     *  The number of (public) proposals that have been made so far.
     */
    get isV0() {
        return this._chain.getStorageItemTypeHash('Democracy', 'PublicPropCount') === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
    }

    /**
     *  The number of (public) proposals that have been made so far.
     */
    async getAsV0(): Promise<number> {
        assert(this.isV0)
        return this._chain.getStorage(this.blockHash, 'Democracy', 'PublicPropCount')
    }

    /**
     * Checks whether the storage item is defined for the current chain version.
     */
    get isExists(): boolean {
        return this._chain.getStorageItemTypeHash('Democracy', 'PublicPropCount') != null
    }
}

export class Instance1CollectiveMembersStorage {
    private readonly _chain: Chain
    private readonly blockHash: string

    constructor(ctx: BlockContext)
    constructor(ctx: ChainContext, block: Block)
    constructor(ctx: BlockContext, block?: Block) {
        block = block || ctx.block
        this.blockHash = block.hash
        this._chain = ctx._chain
    }

    /**
     *  The current members of the collective. This is stored sorted (just by value).
     */
    get isV0() {
        return this._chain.getStorageItemTypeHash('Instance1Collective', 'Members') === 'f5df25eadcdffaa0d2a68b199d671d3921ca36a7b70d22d57506dca52b4b5895'
    }

    /**
     *  The current members of the collective. This is stored sorted (just by value).
     */
    async getAsV0(): Promise<Uint8Array[]> {
        assert(this.isV0)
        return this._chain.getStorage(this.blockHash, 'Instance1Collective', 'Members')
    }

    /**
     * Checks whether the storage item is defined for the current chain version.
     */
    get isExists(): boolean {
        return this._chain.getStorageItemTypeHash('Instance1Collective', 'Members') != null
    }
}

export class Instance1CollectiveProposalCountStorage {
    private readonly _chain: Chain
    private readonly blockHash: string

    constructor(ctx: BlockContext)
    constructor(ctx: ChainContext, block: Block)
    constructor(ctx: BlockContext, block?: Block) {
        block = block || ctx.block
        this.blockHash = block.hash
        this._chain = ctx._chain
    }

    /**
     *  Proposals so far.
     */
    get isV0() {
        return this._chain.getStorageItemTypeHash('Instance1Collective', 'ProposalCount') === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
    }

    /**
     *  Proposals so far.
     */
    async getAsV0(): Promise<number> {
        assert(this.isV0)
        return this._chain.getStorage(this.blockHash, 'Instance1Collective', 'ProposalCount')
    }

    /**
     * Checks whether the storage item is defined for the current chain version.
     */
    get isExists(): boolean {
        return this._chain.getStorageItemTypeHash('Instance1Collective', 'ProposalCount') != null
    }
}

export class SystemAccountStorage {
    private readonly _chain: Chain
    private readonly blockHash: string

    constructor(ctx: BlockContext)
    constructor(ctx: ChainContext, block: Block)
    constructor(ctx: BlockContext, block?: Block) {
        block = block || ctx.block
        this.blockHash = block.hash
        this._chain = ctx._chain
    }

    /**
     *  The full account information for a particular account ID.
     */
    get isV0() {
        return this._chain.getStorageItemTypeHash('System', 'Account') === '2208f857b7cd6fecf78ca393cf3d17ec424773727d0028f07c9f0dc608fc1b7a'
    }

    /**
     *  The full account information for a particular account ID.
     */
    async getAsV0(key: Uint8Array): Promise<v0.AccountInfo> {
        assert(this.isV0)
        return this._chain.getStorage(this.blockHash, 'System', 'Account', key)
    }

    async getManyAsV0(keys: Uint8Array[]): Promise<(v0.AccountInfo)[]> {
        assert(this.isV0)
        return this._chain.queryStorage(this.blockHash, 'System', 'Account', keys.map(k => [k]))
    }

    async getAllAsV0(): Promise<(v0.AccountInfo)[]> {
        assert(this.isV0)
        return this._chain.queryStorage(this.blockHash, 'System', 'Account')
    }

    /**
     *  The full account information for a particular account ID.
     */
    get isV25() {
        return this._chain.getStorageItemTypeHash('System', 'Account') === 'eb40f1d91f26d72e29c60e034d53a72b9b529014c7e108f422d8ad5f03f0c902'
    }

    /**
     *  The full account information for a particular account ID.
     */
    async getAsV25(key: Uint8Array): Promise<v25.AccountInfo> {
        assert(this.isV25)
        return this._chain.getStorage(this.blockHash, 'System', 'Account', key)
    }

    async getManyAsV25(keys: Uint8Array[]): Promise<(v25.AccountInfo)[]> {
        assert(this.isV25)
        return this._chain.queryStorage(this.blockHash, 'System', 'Account', keys.map(k => [k]))
    }

    async getAllAsV25(): Promise<(v25.AccountInfo)[]> {
        assert(this.isV25)
        return this._chain.queryStorage(this.blockHash, 'System', 'Account')
    }

    /**
     *  The full account information for a particular account ID.
     */
    get isV28() {
        return this._chain.getStorageItemTypeHash('System', 'Account') === '73070b537f1805475b37167271b33ac7fd6ffad8ba62da08bc14937a017b8bb2'
    }

    /**
     *  The full account information for a particular account ID.
     */
    async getAsV28(key: Uint8Array): Promise<v28.AccountInfo> {
        assert(this.isV28)
        return this._chain.getStorage(this.blockHash, 'System', 'Account', key)
    }

    async getManyAsV28(keys: Uint8Array[]): Promise<(v28.AccountInfo)[]> {
        assert(this.isV28)
        return this._chain.queryStorage(this.blockHash, 'System', 'Account', keys.map(k => [k]))
    }

    async getAllAsV28(): Promise<(v28.AccountInfo)[]> {
        assert(this.isV28)
        return this._chain.queryStorage(this.blockHash, 'System', 'Account')
    }

    /**
     *  The full account information for a particular account ID.
     */
    get isV30() {
        return this._chain.getStorageItemTypeHash('System', 'Account') === '1ddc7ade926221442c388ee4405a71c9428e548fab037445aaf4b3a78f4735c1'
    }

    /**
     *  The full account information for a particular account ID.
     */
    async getAsV30(key: Uint8Array): Promise<v30.AccountInfo> {
        assert(this.isV30)
        return this._chain.getStorage(this.blockHash, 'System', 'Account', key)
    }

    async getManyAsV30(keys: Uint8Array[]): Promise<(v30.AccountInfo)[]> {
        assert(this.isV30)
        return this._chain.queryStorage(this.blockHash, 'System', 'Account', keys.map(k => [k]))
    }

    async getAllAsV30(): Promise<(v30.AccountInfo)[]> {
        assert(this.isV30)
        return this._chain.queryStorage(this.blockHash, 'System', 'Account')
    }

    /**
     * Checks whether the storage item is defined for the current chain version.
     */
    get isExists(): boolean {
        return this._chain.getStorageItemTypeHash('System', 'Account') != null
    }
}
