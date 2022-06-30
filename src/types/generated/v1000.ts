import type {Result} from './support'

export type AccountId = Uint8Array

export type Balance = bigint

export type BalanceStatus = BalanceStatus_Free | BalanceStatus_Reserved

export interface BalanceStatus_Free {
  __kind: 'Free'
}

export interface BalanceStatus_Reserved {
  __kind: 'Reserved'
}

export interface AccountData {
  free: Balance
  reserved: Balance
  miscFrozen: Balance
  feeFrozen: Balance
}

export interface AccountInfo {
  nonce: Index
  consumers: RefCount
  providers: RefCount
  sufficients: RefCount
  data: AccountData
}

export type Index = number

export type RefCount = number
