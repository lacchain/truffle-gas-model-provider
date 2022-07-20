/*
 * type aliases for better readability around legacy positional arguments
 */
import {provider} from "web3-core";

export type MnemonicPhrase = string;
export type MnemonicPassword = string;
export interface Mnemonic {
  phrase: MnemonicPhrase;
  password?: MnemonicPassword;
}
type Eip1193Provider = {
  request: (options: {
    method: string;
    params?: unknown[] | object;
  }) => Promise<any>;
};
export type PrivateKey = string;
export type Provider = provider | Eip1193Provider;
export type ProviderUrl = string;
export type ProviderOrUrl = Provider | ProviderUrl;
export type AddressIndex = number;
export type NodeAddress = string;
export type Expiration = number;
export type NumberOfAddresses = number;
export type PollingInterval = number;
export type ShareNonce = boolean;
export type DerivationPath = string;
export type ChainId = number;
export type Hardfork = string;
export type ChainSettings = {
  hardfork?: Hardfork;
  chainId?: ChainId;
};
