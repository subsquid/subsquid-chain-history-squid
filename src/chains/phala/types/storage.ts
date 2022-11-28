import assert from 'assert'
import {Block, Chain, ChainContext, BlockContext, Result, Option} from './support'
import * as v1090 from './v1090'

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
     *  NOTE: This is only used in the case that this pallet is used to store balances.
     */
    get isV1090() {
        return this._chain.getStorageItemTypeHash('Balances', 'Account') === '0b3b4bf0dd7388459eba461bc7c3226bf58608c941710a714e02f33ec0f91e78'
    }

    /**
     *  The balance of an account.
     * 
     *  NOTE: This is only used in the case that this pallet is used to store balances.
     */
    async getAsV1090(key: Uint8Array): Promise<v1090.AccountData> {
        assert(this.isV1090)
        return this._chain.getStorage(this.blockHash, 'Balances', 'Account', key)
    }

    async getManyAsV1090(keys: Uint8Array[]): Promise<(v1090.AccountData)[]> {
        assert(this.isV1090)
        return this._chain.queryStorage(this.blockHash, 'Balances', 'Account', keys.map(k => [k]))
    }

    async getAllAsV1090(): Promise<(v1090.AccountData)[]> {
        assert(this.isV1090)
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
    get isV1090() {
        return this._chain.getStorageItemTypeHash('Balances', 'TotalIssuance') === 'f8ebe28eb30158172c0ccf672f7747c46a244f892d08ef2ebcbaadde34a26bc0'
    }

    /**
     *  The total units issued in the system.
     */
    async getAsV1090(): Promise<bigint> {
        assert(this.isV1090)
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
    get isV1090() {
        return this._chain.getStorageItemTypeHash('Council', 'Members') === 'f5df25eadcdffaa0d2a68b199d671d3921ca36a7b70d22d57506dca52b4b5895'
    }

    /**
     *  The current members of the collective. This is stored sorted (just by value).
     */
    async getAsV1090(): Promise<Uint8Array[]> {
        assert(this.isV1090)
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
    get isV1090() {
        return this._chain.getStorageItemTypeHash('Council', 'ProposalCount') === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
    }

    /**
     *  Proposals so far.
     */
    async getAsV1090(): Promise<number> {
        assert(this.isV1090)
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
    get isV1090() {
        return this._chain.getStorageItemTypeHash('Democracy', 'PublicPropCount') === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
    }

    /**
     *  The number of (public) proposals that have been made so far.
     */
    async getAsV1090(): Promise<number> {
        assert(this.isV1090)
        return this._chain.getStorage(this.blockHash, 'Democracy', 'PublicPropCount')
    }

    /**
     * Checks whether the storage item is defined for the current chain version.
     */
    get isExists(): boolean {
        return this._chain.getStorageItemTypeHash('Democracy', 'PublicPropCount') != null
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
    get isV1090() {
        return this._chain.getStorageItemTypeHash('System', 'Account') === '1ddc7ade926221442c388ee4405a71c9428e548fab037445aaf4b3a78f4735c1'
    }

    /**
     *  The full account information for a particular account ID.
     */
    async getAsV1090(key: Uint8Array): Promise<v1090.AccountInfo> {
        assert(this.isV1090)
        return this._chain.getStorage(this.blockHash, 'System', 'Account', key)
    }

    async getManyAsV1090(keys: Uint8Array[]): Promise<(v1090.AccountInfo)[]> {
        assert(this.isV1090)
        return this._chain.queryStorage(this.blockHash, 'System', 'Account', keys.map(k => [k]))
    }

    async getAllAsV1090(): Promise<(v1090.AccountInfo)[]> {
        assert(this.isV1090)
        return this._chain.queryStorage(this.blockHash, 'System', 'Account')
    }

    /**
     * Checks whether the storage item is defined for the current chain version.
     */
    get isExists(): boolean {
        return this._chain.getStorageItemTypeHash('System', 'Account') != null
    }
}
