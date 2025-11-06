// Mock service for initial development
export const CARV_SVM_CONFIG = {
  name: 'Carv SVM Testnet',
  url: 'https://svm.carv.io/chain',
  chainId: 'carv-svm-testnet',
  symbol: 'CARV',
  explorer: 'https://explorer.carv.io/'
};

export class CarvWeb3Service {
  constructor() {
    this.currentProvider = null;
    this.isConnected = false;
    this.publicKey = null;
    this.balance = '0';
  }

  getAvailableWallets() {
    return [
      { name: 'BackPack', type: 'injected', icon: '🎒' },
      { name: 'Phantom', type: 'injected', icon: '👻' }
    ];
  }

  async connectWallet(walletType = 'backpack') {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    this.isConnected = true;
    this.currentProvider = walletType;
    this.publicKey = 'Ckpc8hRJ' + Math.random().toString(36).substr(2, 9) + 'GzWCeM';
    this.balance = (Math.random() * 10).toFixed(4);
    
    return {
      success: true,
      publicKey: this.publicKey,
      network: CARV_SVM_CONFIG.name,
      walletName: walletType
    };
  }

  async getBalance() {
    this.balance = (Math.random() * 10).toFixed(4);
    return this.balance;
  }

  async disconnectWallet() {
    this.currentProvider = null;
    this.isConnected = false;
    this.publicKey = null;
    this.balance = '0';
    return true;
  }

  getConnectionStatus() {
    return {
      isConnected: this.isConnected,
      publicKey: this.publicKey,
      network: CARV_SVM_CONFIG.name,
      walletName: this.currentProvider,
      balance: this.balance
    };
  }

  isAnyWalletAvailable() {
    return true;
  }
}

const web3Service = new CarvWeb3Service();
export default web3Service;