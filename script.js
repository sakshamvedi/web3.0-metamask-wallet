
class MetaLangInterpreter {
    constructor() {
        if (window.ethereum) {
            this.web3 = new Web3(window.ethereum);
        } else {
            alert('MetaMask is not installed!');
        }
    }

    async connect() {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            this.accounts = await this.web3.eth.getAccounts();
            console.log('Connected to MetaMask:', this.accounts);
        } catch (error) {
            console.error('Failed to connect to MetaMask:', error);
        }
    }

    async send(amount, to) {
        try {
            const from = this.accounts[0];
            const tx = await this.web3.eth.sendTransaction({ from, to, value: this.web3.utils.toWei(amount, 'ether') });
            console.log('Transaction successful:', tx);
        } catch (error) {
            console.error('Transaction failed:', error);
        }
    }

    print(message) {
        console.log(message);
    }

    async interpret(command) {
        const [action, ...args] = command.split(' ');
        switch (action) {
            case 'connect':
                await this.connect();
                break;
            case 'send':
                if (args.length === 2) {
                    const [amount, to] = args;
                    await this.send(amount, to);
                } else {
                    console.error('Invalid send command. Usage: send [amount] [to_address]');
                }
                break;
            case 'print':
                const message = args.join(' ').replace(/"/g, '');
                this.print(message);
                break;
            default:
                console.error('Unknown command:', action);
        }
    }
}


