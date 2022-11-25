import {ProcessorConfig} from '../interfaces/processorConfig'

export const config: ProcessorConfig = {
    chainName: 'polkadot',
    prefix: 'polkadot',
    dataSource: {
        archive: 'https://polkadot.archive.subsquid.io/graphql',
        chain: 'wss://rpc.polkadot.io',
    },
}
