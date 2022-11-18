import assert from 'assert'
import {Block, Chain, ChainContext, BlockContext, Result} from './support'
import * as v900 from './v900'

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
  get isV900() {
    return this._chain.getStorageItemTypeHash('Balances', 'Account') === '17669917f628c38832645ae9b39d0bab5a99964e3446b9b2ef904cad2f4bd653'
  }

  /**
   *  The balance of an account.
   * 
   *  NOTE: This is only used in the case that this pallet is used to store balances.
   */
  async getAsV900(key: Uint8Array): Promise<v900.AccountData> {
    assert(this.isV900)
    return this._chain.getStorage(this.blockHash, 'Balances', 'Account', key)
  }

  async getManyAsV900(keys: Uint8Array[]): Promise<(v900.AccountData)[]> {
    assert(this.isV900)
    return this._chain.queryStorage(this.blockHash, 'Balances', 'Account', keys.map(k => [k]))
  }

  async getAllAsV900(): Promise<(v900.AccountData)[]> {
    assert(this.isV900)
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
  get isV900() {
    return this._chain.getStorageItemTypeHash('Balances', 'TotalIssuance') === 'f8ebe28eb30158172c0ccf672f7747c46a244f892d08ef2ebcbaadde34a26bc0'
  }

  /**
   *  The total units issued in the system.
   */
  async getAsV900(): Promise<bigint> {
    assert(this.isV900)
    return this._chain.getStorage(this.blockHash, 'Balances', 'TotalIssuance')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Balances', 'TotalIssuance') != null
  }
}

export class CouncilCollectiveMembersStorage {
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
  get isV900() {
    return this._chain.getStorageItemTypeHash('CouncilCollective', 'Members') === 'd14508def9da76532021b53d553e9048fd079e2e735d2393e6d531e6d1fd29ca'
  }

  /**
   *  The current members of the collective. This is stored sorted (just by value).
   */
  async getAsV900(): Promise<Uint8Array[]> {
    assert(this.isV900)
    return this._chain.getStorage(this.blockHash, 'CouncilCollective', 'Members')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('CouncilCollective', 'Members') != null
  }
}

export class CouncilCollectiveProposalCountStorage {
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
  get isV900() {
    return this._chain.getStorageItemTypeHash('CouncilCollective', 'ProposalCount') === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
  }

  /**
   *  Proposals so far.
   */
  async getAsV900(): Promise<number> {
    assert(this.isV900)
    return this._chain.getStorage(this.blockHash, 'CouncilCollective', 'ProposalCount')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('CouncilCollective', 'ProposalCount') != null
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
  get isV900() {
    return this._chain.getStorageItemTypeHash('Democracy', 'PublicPropCount') === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
  }

  /**
   *  The number of (public) proposals that have been made so far.
   */
  async getAsV900(): Promise<number> {
    assert(this.isV900)
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
  get isV900() {
    return this._chain.getStorageItemTypeHash('System', 'Account') === 'a83a7372c51978aa017bd09db5672f3ea3957f0882455abd9726ac2b6d4b61dc'
  }

  /**
   *  The full account information for a particular account ID.
   */
  async getAsV900(key: Uint8Array): Promise<v900.AccountInfo> {
    assert(this.isV900)
    return this._chain.getStorage(this.blockHash, 'System', 'Account', key)
  }

  async getManyAsV900(keys: Uint8Array[]): Promise<(v900.AccountInfo)[]> {
    assert(this.isV900)
    return this._chain.queryStorage(this.blockHash, 'System', 'Account', keys.map(k => [k]))
  }

  async getAllAsV900(): Promise<(v900.AccountInfo)[]> {
    assert(this.isV900)
    return this._chain.queryStorage(this.blockHash, 'System', 'Account')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('System', 'Account') != null
  }
}
