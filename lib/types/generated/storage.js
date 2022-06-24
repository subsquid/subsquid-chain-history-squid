"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemAccountNonceStorage = exports.SystemAccountStorage = exports.Instance1CollectiveProposalCountStorage = exports.Instance1CollectiveMembersStorage = exports.DemocracyPublicPropCountStorage = exports.CouncilProposalCountStorage = exports.CouncilMembersStorage = exports.BalancesTotalIssuanceStorage = exports.BalancesReservedBalanceStorage = exports.BalancesFreeBalanceStorage = exports.BalancesAccountStorage = void 0;
const assert_1 = __importDefault(require("assert"));
class BalancesAccountStorage {
    constructor(ctx, block) {
        block = block || ctx.block;
        this.blockHash = block.hash;
        this._chain = ctx._chain;
    }
    /**
     *  The balance of an account.
     *
     *  NOTE: THIS MAY NEVER BE IN EXISTENCE AND YET HAVE A `total().is_zero()`. If the total
     *  is ever zero, then the entry *MUST* be removed.
     *
     *  NOTE: This is only used in the case that this module is used to store balances.
     */
    get isV1050() {
        return this._chain.getStorageItemTypeHash('Balances', 'Account') === '0b3b4bf0dd7388459eba461bc7c3226bf58608c941710a714e02f33ec0f91e78';
    }
    /**
     *  The balance of an account.
     *
     *  NOTE: THIS MAY NEVER BE IN EXISTENCE AND YET HAVE A `total().is_zero()`. If the total
     *  is ever zero, then the entry *MUST* be removed.
     *
     *  NOTE: This is only used in the case that this module is used to store balances.
     */
    async getAsV1050(key) {
        (0, assert_1.default)(this.isV1050);
        return this._chain.getStorage(this.blockHash, 'Balances', 'Account', key);
    }
    async getManyAsV1050(keys) {
        (0, assert_1.default)(this.isV1050);
        return this._chain.queryStorage(this.blockHash, 'Balances', 'Account', keys.map(k => [k]));
    }
    /**
     * Checks whether the storage item is defined for the current chain version.
     */
    get isExists() {
        return this._chain.getStorageItemTypeHash('Balances', 'Account') != null;
    }
}
exports.BalancesAccountStorage = BalancesAccountStorage;
class BalancesFreeBalanceStorage {
    constructor(ctx, block) {
        block = block || ctx.block;
        this.blockHash = block.hash;
        this._chain = ctx._chain;
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
    get isV1020() {
        return this._chain.getStorageItemTypeHash('Balances', 'FreeBalance') === '0bac40afaf72ceea5a87ae2baaa5fe7f69915323f3293bdd970e7790a9d968c0';
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
    async getAsV1020(key) {
        (0, assert_1.default)(this.isV1020);
        return this._chain.getStorage(this.blockHash, 'Balances', 'FreeBalance', key);
    }
    async getManyAsV1020(keys) {
        (0, assert_1.default)(this.isV1020);
        return this._chain.queryStorage(this.blockHash, 'Balances', 'FreeBalance', keys.map(k => [k]));
    }
    /**
     * Checks whether the storage item is defined for the current chain version.
     */
    get isExists() {
        return this._chain.getStorageItemTypeHash('Balances', 'FreeBalance') != null;
    }
}
exports.BalancesFreeBalanceStorage = BalancesFreeBalanceStorage;
class BalancesReservedBalanceStorage {
    constructor(ctx, block) {
        block = block || ctx.block;
        this.blockHash = block.hash;
        this._chain = ctx._chain;
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
    get isV1020() {
        return this._chain.getStorageItemTypeHash('Balances', 'ReservedBalance') === '0bac40afaf72ceea5a87ae2baaa5fe7f69915323f3293bdd970e7790a9d968c0';
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
    async getAsV1020(key) {
        (0, assert_1.default)(this.isV1020);
        return this._chain.getStorage(this.blockHash, 'Balances', 'ReservedBalance', key);
    }
    async getManyAsV1020(keys) {
        (0, assert_1.default)(this.isV1020);
        return this._chain.queryStorage(this.blockHash, 'Balances', 'ReservedBalance', keys.map(k => [k]));
    }
    /**
     * Checks whether the storage item is defined for the current chain version.
     */
    get isExists() {
        return this._chain.getStorageItemTypeHash('Balances', 'ReservedBalance') != null;
    }
}
exports.BalancesReservedBalanceStorage = BalancesReservedBalanceStorage;
class BalancesTotalIssuanceStorage {
    constructor(ctx, block) {
        block = block || ctx.block;
        this.blockHash = block.hash;
        this._chain = ctx._chain;
    }
    /**
     *  The total units issued in the system.
     */
    get isV1020() {
        return this._chain.getStorageItemTypeHash('Balances', 'TotalIssuance') === 'f8ebe28eb30158172c0ccf672f7747c46a244f892d08ef2ebcbaadde34a26bc0';
    }
    /**
     *  The total units issued in the system.
     */
    async getAsV1020() {
        (0, assert_1.default)(this.isV1020);
        return this._chain.getStorage(this.blockHash, 'Balances', 'TotalIssuance');
    }
    /**
     * Checks whether the storage item is defined for the current chain version.
     */
    get isExists() {
        return this._chain.getStorageItemTypeHash('Balances', 'TotalIssuance') != null;
    }
}
exports.BalancesTotalIssuanceStorage = BalancesTotalIssuanceStorage;
class CouncilMembersStorage {
    constructor(ctx, block) {
        block = block || ctx.block;
        this.blockHash = block.hash;
        this._chain = ctx._chain;
    }
    /**
     *  The current members of the collective. This is stored sorted (just by value).
     */
    get isV9111() {
        return this._chain.getStorageItemTypeHash('Council', 'Members') === 'f5df25eadcdffaa0d2a68b199d671d3921ca36a7b70d22d57506dca52b4b5895';
    }
    /**
     *  The current members of the collective. This is stored sorted (just by value).
     */
    async getAsV9111() {
        (0, assert_1.default)(this.isV9111);
        return this._chain.getStorage(this.blockHash, 'Council', 'Members');
    }
    /**
     * Checks whether the storage item is defined for the current chain version.
     */
    get isExists() {
        return this._chain.getStorageItemTypeHash('Council', 'Members') != null;
    }
}
exports.CouncilMembersStorage = CouncilMembersStorage;
class CouncilProposalCountStorage {
    constructor(ctx, block) {
        block = block || ctx.block;
        this.blockHash = block.hash;
        this._chain = ctx._chain;
    }
    /**
     *  Proposals so far.
     */
    get isV9111() {
        return this._chain.getStorageItemTypeHash('Council', 'ProposalCount') === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02';
    }
    /**
     *  Proposals so far.
     */
    async getAsV9111() {
        (0, assert_1.default)(this.isV9111);
        return this._chain.getStorage(this.blockHash, 'Council', 'ProposalCount');
    }
    /**
     * Checks whether the storage item is defined for the current chain version.
     */
    get isExists() {
        return this._chain.getStorageItemTypeHash('Council', 'ProposalCount') != null;
    }
}
exports.CouncilProposalCountStorage = CouncilProposalCountStorage;
class DemocracyPublicPropCountStorage {
    constructor(ctx, block) {
        block = block || ctx.block;
        this.blockHash = block.hash;
        this._chain = ctx._chain;
    }
    /**
     *  The number of (public) proposals that have been made so far.
     */
    get isV1020() {
        return this._chain.getStorageItemTypeHash('Democracy', 'PublicPropCount') === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02';
    }
    /**
     *  The number of (public) proposals that have been made so far.
     */
    async getAsV1020() {
        (0, assert_1.default)(this.isV1020);
        return this._chain.getStorage(this.blockHash, 'Democracy', 'PublicPropCount');
    }
    /**
     * Checks whether the storage item is defined for the current chain version.
     */
    get isExists() {
        return this._chain.getStorageItemTypeHash('Democracy', 'PublicPropCount') != null;
    }
}
exports.DemocracyPublicPropCountStorage = DemocracyPublicPropCountStorage;
class Instance1CollectiveMembersStorage {
    constructor(ctx, block) {
        block = block || ctx.block;
        this.blockHash = block.hash;
        this._chain = ctx._chain;
    }
    /**
     *  The current members of the collective. This is stored sorted (just by value).
     */
    get isV1020() {
        return this._chain.getStorageItemTypeHash('Instance1Collective', 'Members') === 'f5df25eadcdffaa0d2a68b199d671d3921ca36a7b70d22d57506dca52b4b5895';
    }
    /**
     *  The current members of the collective. This is stored sorted (just by value).
     */
    async getAsV1020() {
        (0, assert_1.default)(this.isV1020);
        return this._chain.getStorage(this.blockHash, 'Instance1Collective', 'Members');
    }
    /**
     * Checks whether the storage item is defined for the current chain version.
     */
    get isExists() {
        return this._chain.getStorageItemTypeHash('Instance1Collective', 'Members') != null;
    }
}
exports.Instance1CollectiveMembersStorage = Instance1CollectiveMembersStorage;
class Instance1CollectiveProposalCountStorage {
    constructor(ctx, block) {
        block = block || ctx.block;
        this.blockHash = block.hash;
        this._chain = ctx._chain;
    }
    /**
     *  Proposals so far.
     */
    get isV1020() {
        return this._chain.getStorageItemTypeHash('Instance1Collective', 'ProposalCount') === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02';
    }
    /**
     *  Proposals so far.
     */
    async getAsV1020() {
        (0, assert_1.default)(this.isV1020);
        return this._chain.getStorage(this.blockHash, 'Instance1Collective', 'ProposalCount');
    }
    /**
     * Checks whether the storage item is defined for the current chain version.
     */
    get isExists() {
        return this._chain.getStorageItemTypeHash('Instance1Collective', 'ProposalCount') != null;
    }
}
exports.Instance1CollectiveProposalCountStorage = Instance1CollectiveProposalCountStorage;
class SystemAccountStorage {
    constructor(ctx, block) {
        block = block || ctx.block;
        this.blockHash = block.hash;
        this._chain = ctx._chain;
    }
    /**
     *  The full account information for a particular account ID.
     */
    get isV1050() {
        return this._chain.getStorageItemTypeHash('System', 'Account') === '2208f857b7cd6fecf78ca393cf3d17ec424773727d0028f07c9f0dc608fc1b7a';
    }
    /**
     *  The full account information for a particular account ID.
     */
    async getAsV1050(key) {
        (0, assert_1.default)(this.isV1050);
        return this._chain.getStorage(this.blockHash, 'System', 'Account', key);
    }
    async getManyAsV1050(keys) {
        (0, assert_1.default)(this.isV1050);
        return this._chain.queryStorage(this.blockHash, 'System', 'Account', keys.map(k => [k]));
    }
    /**
     *  The full account information for a particular account ID.
     */
    get isV2025() {
        return this._chain.getStorageItemTypeHash('System', 'Account') === 'eb40f1d91f26d72e29c60e034d53a72b9b529014c7e108f422d8ad5f03f0c902';
    }
    /**
     *  The full account information for a particular account ID.
     */
    async getAsV2025(key) {
        (0, assert_1.default)(this.isV2025);
        return this._chain.getStorage(this.blockHash, 'System', 'Account', key);
    }
    async getManyAsV2025(keys) {
        (0, assert_1.default)(this.isV2025);
        return this._chain.queryStorage(this.blockHash, 'System', 'Account', keys.map(k => [k]));
    }
    /**
     *  The full account information for a particular account ID.
     */
    get isV2028() {
        return this._chain.getStorageItemTypeHash('System', 'Account') === '73070b537f1805475b37167271b33ac7fd6ffad8ba62da08bc14937a017b8bb2';
    }
    /**
     *  The full account information for a particular account ID.
     */
    async getAsV2028(key) {
        (0, assert_1.default)(this.isV2028);
        return this._chain.getStorage(this.blockHash, 'System', 'Account', key);
    }
    async getManyAsV2028(keys) {
        (0, assert_1.default)(this.isV2028);
        return this._chain.queryStorage(this.blockHash, 'System', 'Account', keys.map(k => [k]));
    }
    /**
     *  The full account information for a particular account ID.
     */
    get isV2030() {
        return this._chain.getStorageItemTypeHash('System', 'Account') === '1ddc7ade926221442c388ee4405a71c9428e548fab037445aaf4b3a78f4735c1';
    }
    /**
     *  The full account information for a particular account ID.
     */
    async getAsV2030(key) {
        (0, assert_1.default)(this.isV2030);
        return this._chain.getStorage(this.blockHash, 'System', 'Account', key);
    }
    async getManyAsV2030(keys) {
        (0, assert_1.default)(this.isV2030);
        return this._chain.queryStorage(this.blockHash, 'System', 'Account', keys.map(k => [k]));
    }
    /**
     * Checks whether the storage item is defined for the current chain version.
     */
    get isExists() {
        return this._chain.getStorageItemTypeHash('System', 'Account') != null;
    }
}
exports.SystemAccountStorage = SystemAccountStorage;
class SystemAccountNonceStorage {
    constructor(ctx, block) {
        block = block || ctx.block;
        this.blockHash = block.hash;
        this._chain = ctx._chain;
    }
    /**
     *  Extrinsics nonce for accounts.
     */
    get isV1020() {
        return this._chain.getStorageItemTypeHash('System', 'AccountNonce') === '25f0d63900988134e6767c7fe398885c0448fd3bd7a0d8ff90cf6b33a482cebd';
    }
    /**
     *  Extrinsics nonce for accounts.
     */
    async getAsV1020(key) {
        (0, assert_1.default)(this.isV1020);
        return this._chain.getStorage(this.blockHash, 'System', 'AccountNonce', key);
    }
    async getManyAsV1020(keys) {
        (0, assert_1.default)(this.isV1020);
        return this._chain.queryStorage(this.blockHash, 'System', 'AccountNonce', keys.map(k => [k]));
    }
    /**
     * Checks whether the storage item is defined for the current chain version.
     */
    get isExists() {
        return this._chain.getStorageItemTypeHash('System', 'AccountNonce') != null;
    }
}
exports.SystemAccountNonceStorage = SystemAccountNonceStorage;
//# sourceMappingURL=storage.js.map