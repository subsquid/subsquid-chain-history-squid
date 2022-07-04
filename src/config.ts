import { ProcessorConfig } from './types/custom/processorConfig'

const config: ProcessorConfig = {
    chainName: 'crust',
    prefix: 'crust',
    dataSource: {
        archive: 'https://crust.archive.subsquid.io/graphql',
        chain: 'wss://crust.api.onfinality.io/ws?apikey=0572033a-a43f-4334-9a78-205e82e45c31',
    },
    typesBundle: 'crust',
    batchSize: 500,
    // blockRange: {
    //     from: 7567700,
    // },
}

export default config
