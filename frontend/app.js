window.addEventListener('load', async () => {
    if (typeof window.ethereum !== 'undefined') {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
    } else {
        alert('Please install MetaMask to use this platform.');
    }
});

const contractAddress = "0xCc0b1dD2D2a086158129aF6c517AE8f305945827";
const contractABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "credentialId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "issuer",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			}
		],
		"name": "CredentialIssued",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "credentialId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "verifier",
				"type": "address"
			}
		],
		"name": "CredentialVerified",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "credentialCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "credentials",
		"outputs": [
			{
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "issuer",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "verified",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_description",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_recipient",
				"type": "address"
			}
		],
		"name": "issueCredential",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_credentialId",
				"type": "uint256"
			}
		],
		"name": "verifyCredential",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]; 

const contract = new web3.eth.Contract(contractABI, contractAddress);

async function addTalent() {
    const name = document.getElementById("talentName").value;
    const skill = document.getElementById("talentSkill").value;
    const accounts = await web3.eth.getAccounts();

    await contract.methods.verifyTalent(name, skill).send({ from: accounts[0] });
    alert('Talent Verified!');
    fetchTalents();
}

async function fetchTalents() {
    const count = await contract.methods.getTalentCount().call();
    const listDiv = document.getElementById("talentList");
    listDiv.innerHTML = "";

    for (let i = 0; i < count; i++) {
        const talent = await contract.methods.getTalent(i).call();
        listDiv.innerHTML += `<p>${talent.name} - ${talent.skill}</p>`;
    }
}
