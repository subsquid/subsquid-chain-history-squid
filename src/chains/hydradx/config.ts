import {ProcessorConfig} from '../interfaces/processorConfig'

export const config: ProcessorConfig = {
    chainName: 'hydradx',
    prefix: 'hydradx',
    dataSource: {
        archive: 'https://hydradx.archive.subsquid.io/graphql',
        chain: 'wss://rpc.hydradx.cloud',
    },
    // blockRange: {
    //     from: 7567700,
    // },
}
