import React, { useState } from 'react';

import { Route, Switch } from 'react-router-dom'

import Customers from '../pages/Customers'
import Audits from '../pages/Audits'
import Accounts from '../pages/Accounts'
import Transactions from '../pages/Transactions'
import Dashboard from '../pages/Dashboard'
import { useEffect } from 'react';

const Routes = (props) => {
    // Receiving audit states
    const [audit, setAudit] = useState();

    const [fileName, setFileName] = useState('');

    const [file, setFile] = useState();

    const [err, setErr] = useState('');

    const [fileUploaded, setFileUploaded] = useState(false);

    // Accounts select states
    const [selectedAccounts, setSelectedAccounts] = useState([]);

    // Current selected transactions
    const [selectedTransactions, setSelectedTransactions] = useState([]);

    // Sampled transactions
    const [sampledTransactions, setSampledTransactions] = useState([]);

    // Samples
    const [samples, setSamples] = useState([0, 0]);

    // Last clicked for accounts
    const [lastClicked, setLastClicked] = useState(null);


    return (
        <Switch>
            <Route path='/' exact component={() => <Audits
                audit={audit}
                setAudit={setAudit}
                fileName={fileName}
                setFileName={setFileName}
                setSelectedAccounts={setSelectedAccounts}
                setSampledTransactions={setSampledTransactions}
                setSamples={setSamples}
                File={file}
                setFile={setFile}
                fileUploaded={fileUploaded}
                setFileUploaded={setFileUploaded}
            />} />
            <Route path='/customers' component={Customers} />
            <Route path='/accounts' component={() =>
                <Accounts
                    audit={audit}
                    lastClicked={lastClicked}
                    setLastClicked={setLastClicked}
                    selectedAccounts={selectedAccounts} setSelectedAccounts={setSelectedAccounts}
                    fileUploaded={fileUploaded}
                />} />
            <Route path='/sampling' component={() => <Transactions
                audit={audit}
                selectedAccounts={selectedAccounts}
                sampledTransactions={sampledTransactions}
                setSampledTransactions={setSampledTransactions}
                samples={samples}
                setSamples={setSamples}
                setErr={setErr}
                err={err}
            />} />
            <Route path='/dashboard' component={Dashboard} />
        </Switch>
    )
}

export default Routes
