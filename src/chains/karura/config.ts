import {ProcessorConfig} from '../interfaces/processorConfig'

export const config: ProcessorConfig = {
    chainName: 'karura',
    prefix: 'karura',
    dataSource: {
        archive: 'https://karura.archive.subsquid.io/graphql',
        chain: 'wss://karura-rpc-2.aca-api.network/ws',
    },
}
