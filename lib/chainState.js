"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveChainState = void 0;
const typeorm_1 = require("typeorm");
const model_1 = require("./model");
const processor_1 = require("./processor");
const storage_1 = require("./types/generated/storage");
// import chains from './consts/chains'
// import config from './config'
// import { UnknownVersionError } from './common/errors'
// import { ChainInfo } from './common/types'
async function saveChainState(ctx, block) {
    const state = new model_1.ChainState({ id: block.id });
    state.timestamp = new Date(block.timestamp);
    state.blockNumber = block.height;
    state.councilMembers = (await getCouncilMembers(ctx, block))?.length || 0;
    state.councilProposals = (await getCouncilProposalsCount(ctx, block)) || 0;
    state.democracyProposals = (await getDemocracyProposalsCount(ctx, block)) || 0;
    state.tokenBalance = (await getTotalIssuance(ctx, block)) || 0n;
    state.tokenHolders = await ctx.store.count(model_1.Account, { where: { updatedAt: (0, typeorm_1.MoreThan)(0) } });
    await ctx.store.insert(state);
    console.log(`Chain state updated at block ${block.height}`);
}
exports.saveChainState = saveChainState;
async function getCouncilMembers(ctx, block) {
    const storage = new storage_1.CouncilMembersStorage(ctx, block);
    if (!storage.isExists)
        return await getInstance1Members(ctx, block);
    if (storage.isV9111) {
        return await storage.getAsV9111();
    }
    throw new processor_1.UnknownVersionError(storage.constructor.name);
}
async function getInstance1Members(ctx, block) {
    const storage = new storage_1.Instance1CollectiveMembersStorage(ctx, block);
    if (!storage.isExists)
        return undefined;
    if (storage.isV1020) {
        return await storage.getAsV1020();
    }
    throw new processor_1.UnknownVersionError(storage.constructor.name);
}
async function getCouncilProposalsCount(ctx, block) {
    const storage = new storage_1.CouncilProposalCountStorage(ctx, block);
    if (!storage.isExists)
        return await getInstance1ProposalsCount(ctx, block);
    if (storage.isV9111) {
        return await storage.getAsV9111();
    }
    throw new processor_1.UnknownVersionError(storage.constructor.name);
}
async function getInstance1ProposalsCount(ctx, block) {
    const storage = new storage_1.Instance1CollectiveProposalCountStorage(ctx, block);
    if (!storage.isExists)
        return undefined;
    if (storage.isV1020) {
        return await storage.getAsV1020();
    }
    throw new processor_1.UnknownVersionError(storage.constructor.name);
}
async function getDemocracyProposalsCount(ctx, block) {
    const storage = new storage_1.DemocracyPublicPropCountStorage(ctx, block);
    if (!storage.isExists)
        return undefined;
    if (storage.isV1020) {
        return await storage.getAsV1020();
    }
    throw new processor_1.UnknownVersionError(storage.constructor.name);
}
async function getTotalIssuance(ctx, block) {
    const storage = new storage_1.BalancesTotalIssuanceStorage(ctx, block);
    if (!storage.isExists)
        return undefined;
    if (storage.isV1020) {
        return await storage.getAsV1020();
    }
    throw new processor_1.UnknownVersionError(storage.constructor.name);
}
//# sourceMappingURL=chainState.js.map