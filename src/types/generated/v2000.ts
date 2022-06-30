import type {Result} from './support'

export type AccountId32 = Uint8Array

export type BalanceStatus = BalanceStatus_Free | BalanceStatus_Reserved

export interface BalanceStatus_Free {
  __kind: 'Free'
}

export interface BalanceStatus_Reserved {
  __kind: 'Reserved'
}

export interface AccountData_5 {
  free: bigint
  reserved: bigint
  miscFrozen: bigint
  feeFrozen: bigint
}

export interface AccountInfo_3 {
  nonce: number
  consumers: number
  providers: number
  sufficients: number
  data: AccountData_5
}
