"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeId = exports.getOriginAccountId = exports.UnknownVersionError = void 0;
const ss58 = __importStar(require("@subsquid/ss58"));
const substrate_processor_1 = require("@subsquid/substrate-processor");
const typeorm_store_1 = require("@subsquid/typeorm-store");
const chainState_1 = require("./chainState");
const model_1 = require("./model");
const events_1 = require("./types/generated/events");
const storage_1 = require("./types/generated/storage");
const processor = new substrate_processor_1.SubstrateBatchProcessor()
    .setBatchSize(500)
    .setDataSource({
    archive: 'https://kusama.archive.subsquid.io/graphql',
    chain: 'wss://kusama-rpc.polkadot.io',
})
    .setBlockRange({
    from: 0,
})
    .addEvent('Balances.Endowed', {
    data: { event: { args: true } },
})
    .addEvent('Balances.Transfer', {
    data: { event: { args: true } },
})
    .addEvent('Balances.BalanceSet', {
    data: { event: { args: true } },
})
    .addEvent('Balances.Reserved', {
    data: { event: { args: true } },
})
    .addEvent('Balances.Unreserved', {
    data: { event: { args: true } },
})
    .addEvent('Balances.ReserveRepatriated', {
    data: { event: { args: true } },
})
    .addEvent('Balances.Deposit', {
    data: { event: { args: true } },
})
    .addEvent('Balances.Withdraw', {
    data: { event: { args: true } },
})
    .addEvent('Balances.Slashed', {
    data: { event: { args: true } },
})
    .addCall('*', {
    data: { call: { origin: true } },
})
    .includeAllBlocks();
processor.run(new typeorm_store_1.TypeormDatabase(), processBalances);
const SAVE_PERIOD = 12 * 60 * 60 * 1000;
let lastStateTimestamp;
async function getLastChainState(store) {
    return await store.get(model_1.ChainState, {
        order: {
            timestamp: 'DESC',
        },
    });
}
async function processBalances(ctx) {
    const accountIdsHex = new Set();
    for (const block of ctx.blocks) {
        for (const item of block.items) {
            if (item.kind === 'call') {
                processBalancesCallItem(ctx, item, accountIdsHex);
            }
            else if (item.kind === 'event') {
                processBalancesEventItem(ctx, item, accountIdsHex);
            }
        }
        if (lastStateTimestamp == null) {
            lastStateTimestamp = (await getLastChainState(ctx.store))?.timestamp.getTime() || 0;
        }
        if (block.header.timestamp - lastStateTimestamp >= SAVE_PERIOD) {
            const accountIdsU8 = [...accountIdsHex].map((id) => (0, substrate_processor_1.decodeHex)(id));
            await saveAccounts(ctx, block.header, accountIdsU8);
            await (0, chainState_1.saveChainState)(ctx, block.header);
            lastStateTimestamp = block.header.timestamp;
            accountIdsHex.clear();
        }
    }
    const block = ctx.blocks[ctx.blocks.length - 1];
    const accountIdsU8 = [...accountIdsHex].map((id) => (0, substrate_processor_1.decodeHex)(id));
    await saveAccounts(ctx, block.header, accountIdsU8);
}
async function saveAccounts(ctx, block, accountIds) {
    const balances = await getBalances(ctx, block, accountIds);
    if (!balances) {
        ctx.log.warn('No balances');
        return;
    }
    const accounts = new Map();
    for (let i = 0; i < accountIds.length; i++) {
        const id = encodeId(accountIds[i]);
        const balance = balances[i];
        if (!balance)
            continue;
        accounts.set(id, new model_1.Account({
            id,
            free: balance.free,
            reserved: balance.reserved,
            total: balance.free + balance.reserved,
            updatedAt: block.height,
        }));
    }
    await ctx.store.save([...accounts.values()]);
    ctx.log.child('accounts').info(`updated: ${accounts.size}`);
}
function processBalancesCallItem(ctx, item, accountIdsHex) {
    const call = item.call;
    if (call.parent != null)
        return;
    const id = getOriginAccountId(call.origin);
    if (id == null)
        return;
    accountIdsHex.add(id);
}
function processBalancesEventItem(ctx, item, accountIdsHex) {
    switch (item.name) {
        case 'Balances.BalanceSet': {
            const account = getBalanceSetAccount(ctx, item.event);
            accountIdsHex.add(account);
            break;
        }
        case 'Balances.Endowed': {
            const account = getEndowedAccount(ctx, item.event);
            accountIdsHex.add(account);
            break;
        }
        case 'Balances.Deposit': {
            const account = getDepositAccount(ctx, item.event);
            accountIdsHex.add(account);
            break;
        }
        case 'Balances.Reserved': {
            const account = getReservedAccount(ctx, item.event);
            accountIdsHex.add(account);
            break;
        }
        case 'Balances.Unreserved': {
            const account = getUnreservedAccount(ctx, item.event);
            accountIdsHex.add(account);
            break;
        }
        case 'Balances.Withdraw': {
            const account = getWithdrawAccount(ctx, item.event);
            accountIdsHex.add(account);
            break;
        }
        case 'Balances.Slashed': {
            const account = getSlashedAccount(ctx, item.event);
            accountIdsHex.add(account);
            break;
        }
        case 'Balances.Transfer': {
            const accounts = getTransferAccounts(ctx, item.event);
            accountIdsHex.add(accounts[0]);
            accountIdsHex.add(accounts[1]);
            break;
        }
        case 'Balances.ReserveRepatriated': {
            const accounts = getReserveRepatriatedAccounts(ctx, item.event);
            accountIdsHex.add(accounts[0]);
            accountIdsHex.add(accounts[1]);
            break;
        }
    }
}
function getBalanceSetAccount(ctx, event) {
    const data = new events_1.BalancesBalanceSetEvent(ctx, event);
    if (data.isV1031) {
        return (0, substrate_processor_1.toHex)(data.asV1031[0]);
    }
    else if (data.isV9130) {
        return (0, substrate_processor_1.toHex)(data.asV9130.who);
    }
    else {
        throw new UnknownVersionError(data.constructor.name);
    }
}
function getTransferAccounts(ctx, event) {
    const data = new events_1.BalancesTransferEvent(ctx, event);
    if (data.isV1020) {
        return [(0, substrate_processor_1.toHex)(data.asV1020[0]), (0, substrate_processor_1.toHex)(data.asV1020[1])];
    }
    else if (data.isV1050) {
        return [(0, substrate_processor_1.toHex)(data.asV1050[0]), (0, substrate_processor_1.toHex)(data.asV1050[1])];
    }
    else if (data.isV9130) {
        return [(0, substrate_processor_1.toHex)(data.asV9130.from), (0, substrate_processor_1.toHex)(data.asV9130.to)];
    }
    else {
        throw new UnknownVersionError(data.constructor.name);
    }
}
function getEndowedAccount(ctx, event) {
    const data = new events_1.BalancesEndowedEvent(ctx, event);
    if (data.isV1050) {
        return (0, substrate_processor_1.toHex)(data.asV1050[0]);
    }
    else if (data.isV9130) {
        return (0, substrate_processor_1.toHex)(data.asV9130.account);
    }
    else {
        throw new UnknownVersionError(data.constructor.name);
    }
}
function getDepositAccount(ctx, event) {
    const data = new events_1.BalancesDepositEvent(ctx, event);
    if (data.isV1032) {
        return (0, substrate_processor_1.toHex)(data.asV1032[0]);
    }
    else if (data.isV9130) {
        return (0, substrate_processor_1.toHex)(data.asV9130.who);
    }
    else {
        throw new UnknownVersionError(data.constructor.name);
    }
}
function getReservedAccount(ctx, event) {
    const data = new events_1.BalancesReservedEvent(ctx, event);
    if (data.isV2008) {
        return (0, substrate_processor_1.toHex)(data.asV2008[0]);
    }
    else if (data.isV9130) {
        return (0, substrate_processor_1.toHex)(data.asV9130.who);
    }
    else {
        throw new UnknownVersionError(data.constructor.name);
    }
}
function getUnreservedAccount(ctx, event) {
    const data = new events_1.BalancesUnreservedEvent(ctx, event);
    if (data.isV2008) {
        return (0, substrate_processor_1.toHex)(data.asV2008[0]);
    }
    else if (data.isV9130) {
        return (0, substrate_processor_1.toHex)(data.asV9130.who);
    }
    else {
        throw new UnknownVersionError(data.constructor.name);
    }
}
function getWithdrawAccount(ctx, event) {
    const data = new events_1.BalancesWithdrawEvent(ctx, event);
    if (data.isV9122) {
        return (0, substrate_processor_1.toHex)(data.asV9122[0]);
    }
    else if (data.isV9130) {
        return (0, substrate_processor_1.toHex)(data.asV9130.who);
    }
    else {
        throw new UnknownVersionError(data.constructor.name);
    }
}
function getSlashedAccount(ctx, event) {
    const data = new events_1.BalancesSlashedEvent(ctx, event);
    if (data.isV9122) {
        return (0, substrate_processor_1.toHex)(data.asV9122[0]);
    }
    else if (data.isV9130) {
        return (0, substrate_processor_1.toHex)(data.asV9130.who);
    }
    else {
        throw new UnknownVersionError(data.constructor.name);
    }
}
function getReserveRepatriatedAccounts(ctx, event) {
    const data = new events_1.BalancesReserveRepatriatedEvent(ctx, event);
    if (data.isV2008) {
        return [(0, substrate_processor_1.toHex)(data.asV2008[0]), (0, substrate_processor_1.toHex)(data.asV2008[1])];
    }
    else if (data.isV9130) {
        return [(0, substrate_processor_1.toHex)(data.asV9130.from), (0, substrate_processor_1.toHex)(data.asV9130.to)];
    }
    else {
        throw new UnknownVersionError(data.constructor.name);
    }
}
async function getBalances(ctx, block, accounts) {
    return ((await getSystemAccountBalances(ctx, block, accounts)) ||
        (await getBalancesAccountBalances(ctx, block, accounts)) ||
        (await getBalancesAccountBalancesOld(ctx, block, accounts)));
}
async function getBalancesAccountBalances(ctx, block, accounts) {
    const storage = new storage_1.BalancesAccountStorage(ctx, block);
    if (!storage.isExists)
        return undefined;
    const data = await ctx._chain.queryStorage(block.hash, 'Balances', 'Account', accounts.map((a) => [a]));
    return data.map((d) => ({ free: d.free, reserved: d.reserved }));
}
async function getBalancesAccountBalancesOld(ctx, block, accounts) {
    const storageFree = new storage_1.BalancesFreeBalanceStorage(ctx, block);
    const dataFree = storageFree.isExists
        ? await storageFree.getManyAsV1020(accounts)
        : new Array(accounts.length).fill(0n);
    const storageReserved = new storage_1.BalancesReservedBalanceStorage(ctx, block);
    const dataReserved = storageReserved.isExists
        ? await storageReserved.getManyAsV1020(accounts)
        : new Array(accounts.length).fill(0n);
    return dataFree.map((f, i) => ({ free: f, reserved: dataReserved[i] }));
}
async function getSystemAccountBalances(ctx, block, accounts) {
    const storage = new storage_1.SystemAccountStorage(ctx, block);
    if (!storage.isExists)
        return undefined;
    const data = await ctx._chain.queryStorage(block.hash, 'System', 'Account', accounts.map((a) => [a]));
    return data.map((d) => ({ free: d.data.free, reserved: d.data.reserved }));
}
class UnknownVersionError extends Error {
    constructor(name) {
        super(`There is no relevant version for ${name}`);
    }
}
exports.UnknownVersionError = UnknownVersionError;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getOriginAccountId(origin) {
    if (origin && origin.__kind === 'system' && origin.value.__kind === 'Signed') {
        return origin.value.value;
    }
    else {
        return undefined;
    }
}
exports.getOriginAccountId = getOriginAccountId;
function encodeId(id) {
    return ss58.codec('kusama').encode(id);
}
exports.encodeId = encodeId;
//# sourceMappingURL=processor.js.map