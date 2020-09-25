const clients = [
    { id: 1, taxNumber: '86620855', name: 'HECTOR ACUÑA BOLAÑOS'},
    { id: 2, taxNumber: '7317855K', name: 'JESUS RODRIGUEZ ALVAREZ'},
    { id: 3, taxNumber: '73826497', name: 'ANDRES NADAL MOLINA'},
    { id: 4, taxNumber: '88587715', name: 'SALVADOR ARNEDO MANRIQUEZ'},
    { id: 5, taxNumber: '94020190', name: 'VICTOR MANUEL ROJAS LUCAS'},
    { id: 6, taxNumber: '99804238', name: 'MOHAMED FERRE SAMPER' }],
    accounts = [
    { clientId: 6, bankId: 1, balance: 15000 },
    { clientId: 1, bankId: 3, balance: 18000 },
    { clientId: 5, bankId: 3, balance: 135000 },
    { clientId: 2, bankId: 2, balance: 5600 },
    { clientId: 3, bankId: 1, balance: 23000 },
    { clientId: 5, bankId: 2, balance: 15000 },
    { clientId: 3, bankId: 3, balance: 45900 },
    { clientId: 2, bankId: 3, balance: 19000 },
    { clientId: 4, bankId: 3, balance: 51000 },
    { clientId: 5, bankId: 1, balance: 89000 },
    { clientId: 1, bankId: 2, balance: 1600 },
    { clientId: 5, bankId: 3, balance: 37500 },
    { clientId: 6, bankId: 1, balance: 19200 },
    { clientId: 2, bankId: 3, balance: 10000 },
    { clientId: 3, bankId: 2, balance: 5400 },
    { clientId: 3, bankId: 1, balance: 9000 },
    { clientId: 4, bankId: 3, balance: 13500 },
    { clientId: 2, bankId: 1, balance: 38200 },
    { clientId: 5, bankId: 2, balance: 17000 },
    { clientId: 1, bankId: 3, balance: 1000 },
    { clientId: 5, bankId: 2, balance: 600 },
    { clientId: 6, bankId: 1, balance: 16200 },
    { clientId: 2, bankId: 2, balance: 10000 }],
    banks = [
    { id: 1, name: 'SANTANDER' },
    { id: 2, name: 'CHILE' },
    { id: 3, name: 'ESTADO' }];

    // 0 Arreglo con los ids de clientes
function listClientsIds() {
    return clients.map((client) => client.id);
};

  // 1 Arreglo con los ids de clientes ordenados por rut
function listClientsIdsSortByTaxNumber() {
    return clients.sort((a, b) => {
        let clientA =  a.taxNumber.replace(/[a-z]/ig, 0),
            clientB =  b.taxNumber.replace(/[a-z]/ig, 0);
        return Number(clientA) - Number(clientB);
    }).map((client) => client.id);
}

  // 2 Arreglo con los nombres de cliente ordenados de mayor a menor por la suma TOTAL de los saldos de cada cliente en los bancos que participa.
function sortClientsTotalBalances() {
    return clients.map(client => {
        let totalBalance = 0;
        accounts.forEach(accountItem => (accountItem.clientId == client.id) ? totalBalance = totalBalance + accountItem.balance : '')
        return { name: client.name, balance:totalBalance };
    }).sort((a,b) => b.balance - a.balance ).map((client) => client.name);
}

  // 3 Objeto en que las claves sean los nombres de los bancos y los valores un arreglo con los ruts de sus clientes ordenados alfabeticamente por nombre.
function banksClientsTaxNumbers() {
    let clientsByBank = {};
    banks.forEach(bank => {
        const nameBank = bank.name;
        clientsByBank = { ...clientsByBank, [nameBank]: [] }
        accounts.forEach(account => {
            if(bank.id == account.bankId){
                const clientFilter = clients.find(client => client.id == account.clientId);
                if(clientsByBank[nameBank] == [] || !clientsByBank[nameBank].some(i => i == clientFilter.taxNumber)) {
                    clientsByBank[nameBank].push(clientFilter.taxNumber)
                }
            }
        });
    })
    return clientsByBank;
}

  // 4 Arreglo ordenado decrecientemente con los saldos de clientes que tengan más de 25.000 en el Banco SANTANDER
function richClientsBalances() {
    return TotalBalanceUserByBank().filter(account => account.bankId == 1 && account.balance > 25000).map(account => account.balance);
}

  // 5 Arreglo con ids de bancos ordenados crecientemente por la cantidad TOTAL de dinero que administran.
function banksRankingByTotalBalance() {
    return banks.map(bank => {
        let totalBalance = 0;
        accounts.forEach(accountItem => (accountItem.bankId == bank.id) ? totalBalance = totalBalance + accountItem.balance : '')
        return { name: bank.name, balance:totalBalance };
    }).sort((a,b) => a.balance - b.balance);
}

  // 6 Objeto en que las claves sean los nombres de los bancos y los valores el número de clientes que solo tengan cuentas en ese banco.
function banksFidelity() {
    let fidelityUserBank = [],
        countFidelityBanks = {};
    clients.forEach(client => {
        let accountsUser = TotalBalanceUserByBank().filter(account => account.clientId == client.id);
        if(accountsUser.length==1){
            fidelityUserBank.push(...accountsUser);
        }
    });
    banks.forEach(bank => {
        let clientByBank = fidelityUserBank.filter(i => i.bankId == bank.id);
        countFidelityBanks = {...countFidelityBanks, [bank.name]: clientByBank.length }
    })
    return countFidelityBanks
}

  // 7 Objeto en que las claves sean los nombres de los bancos y los valores el id de su cliente con menos dinero.
function banksPoorClients() {
    let clientsByBank = {};
    banks.forEach(bank => {
        const nameBank = bank.name;
        clientsByBank = { ...clientsByBank, [nameBank]: [] }
        TotalBalanceUserByBank().forEach(account => {
            if(bank.id == account.bankId){
                    clientsByBank[nameBank].push(account);
            }
        });
        clientsByBank[nameBank] = clientsByBank[nameBank].sort((a,b) => a.balance - b.balance).slice(0,3).map(i => i.clientId);
    })
    return clientsByBank;
}

  // 8 Agregar nuevo cliente con datos ficticios a "clientes" y agregar una cuenta en el BANCO ESTADO con un saldo de 9000 para este nuevo empleado. 
  // Luego devolver el lugar que ocupa este cliente en el ranking de la pregunta 2.
  // No modificar arreglos originales para no alterar las respuestas anteriores al correr la solución
function newClientRanking() {
    clients.push({id: clients.length+1, taxNumber: '270984460', name: 'CARLOS YONUSG' });
    accounts.push({ clientId: clients.length, bankId: 3, balance: 9000 })
    return sortClientsTotalBalances();
}
//funcion custom que te trae los usuario con el balance total por banco
function TotalBalanceUserByBank(){
    let totalBalanceUserByBank  = new Array();
    accounts.forEach(account => {
        if(totalBalanceUserByBank == [] || !totalBalanceUserByBank.some(i => account.clientId == i.clientId && account.bankId == i.bankId)) {
            totalBalanceUserByBank.push(account);
        }
        else {
            totalBalanceUserByBank = totalBalanceUserByBank.map(i => { 
                if(account.clientId == i.clientId && account.bankId == i.bankId) {
                    i.balance = i.balance + account.balance;
                }
                return i;
            })
        }
    })
    return totalBalanceUserByBank;
}
  // Impresión de soluciones. No modificar.
console.log('Pregunta 0');
console.log(listClientsIds());
console.log('Pregunta 1');
console.log(listClientsIdsSortByTaxNumber());
console.log('Pregunta 2');
console.log(sortClientsTotalBalances());
console.log('Pregunta 3');
console.log(banksClientsTaxNumbers());
console.log('Pregunta 4');
console.log(richClientsBalances());
console.log('Pregunta 5');
console.log(banksRankingByTotalBalance());
console.log('Pregunta 6');
console.log(banksFidelity());
console.log('Pregunta 7');
console.log(banksPoorClients());
console.log('Pregunta 8');
console.log(newClientRanking());
