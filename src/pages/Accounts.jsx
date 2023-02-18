import React, { useState, useEffect } from 'react'
import Table from '../components/table/Table'

const Accounts = (props) => {

    // Set variable for forcing rerender on selection of account
    const [render, setRender] = useState(0);
    const [population, setPopulation] = useState(0);


    useEffect(() => {

        let count = 0;

        props.selectedAccounts.map((acc) => {
            count += (parseInt(acc.totalDebit) - parseInt(acc.totalCredit))

        })

        setPopulation(() => count)

    }, [])


    async function handleAdd(items) {
        let filtered = []
        items.forEach((item) => {
            if (!props.selectedAccounts.includes(item)) {
                filtered.push(item)
            }
        })

        await props.setSelectedAccounts([...filtered, ...props.selectedAccounts])
    }
    async function handleRemove(item) {
        let filtered = props.selectedAccounts;
        let index = props.selectedAccounts.indexOf(item)
        filtered.splice(index, 1)
        await props.setSelectedAccounts(filtered)
    }
    async function handleClear() {
        await props.setSelectedAccounts([])
    }
    async function handleSameIndex(item) {
        if (!props.selectedAccounts.includes(item)) {
            await handleAdd([item])
        } else {
            await handleRemove(item)
        }

        props.setLastClicked(null)

    }

    // Handle checking/unchecking of account while remembering selection
    const handleChange = (event, index, item) => {

        // clicking on last clicked is weird and needs its own function
        if (index == props.lastClicked) {
            handleSameIndex(item)
        } else {
            // CHECK FOR SHIFT CLICK
            // Check if shift key
            if (event.shiftKey && props.lastClicked != null) {
                console.log(props.selectedAccounts.length)

                if (props.lastClicked < index) {
                    let arr = []
                    for (let i = props.lastClicked; i <= index; i++) {

                        if (!props.selectedAccounts.includes(props.audit[i])) {
                            // Account is not selected, add class and to selected accounts - otherwise leave
                            // arr.push(props.audit[i])
                            arr.push(props.audit[i])
                        }
                        handleAdd(arr)
                    }
                }
                if (props.lastClicked > index) {
                    let arr = []
                    for (let i = index; i <= props.lastClicked; i++) {

                        if (!props.selectedAccounts.includes(props.audit[i])) {
                            // Account is not selected, add class and to selected accounts - otherwise leave
                            arr.push(props.audit[i])
                        }
                        handleAdd(arr)
                    }
                }
            } else if (!props.selectedAccounts.includes(props.audit[index])) {
                // normal add and check for remove
                handleAdd([props.audit[index]])
            } else {
                handleRemove(props.audit[index])
            }

            props.setLastClicked(index)
        }

    }


    const customerTableHead = [
        "Selected",
        "Account Name",
        "Credit Transactions",
        "Debit Transactions",
        "Transaction Total"
    ]

    const renderHead = (item, index) => <th key={index}>{item}</th>

    const renderBody = (item, index) => (
        < tr key={index} className={"cursor-pointer" + (props.selectedAccounts.includes(item) ? " bg-blue text-white" : "")} onClick={(e) => {
            handleChange(e, index, item)

        }

        }>
            <td>
                <td>
                    <strong>
                        Select Account
                    </strong>
                </td>
            </td>
            <td>{item.transactions == null ? 'Account Name' : item.name}</td>
            <td>{item.totalCredit == null ? 'Transactions - credit' : ("$" + parseFloat(item.totalCredit).toLocaleString())}</td>
            <td>{item.totalDebit == null ? 'Transactions - debit' : ("$" + parseFloat(item.totalDebit).toLocaleString())}</td>
            {/* <td>{item.debitNum == null ? 'Transactions - debit' : item.}</td> */}
            <td>{item.transactions == null ? 'Total Debit' : "$" + (Math.abs((parseFloat(item.totalDebit) - parseFloat(item.totalCredit))).toLocaleString())}<span>{(parseFloat(item.totalDebit) - parseFloat(item.totalCredit)) < 0 ? " CR" : " DR"}</span></td>
        </tr >

    )

    return (
        <div {...render}>

            <h2 className="page-header">
                Select Accounts
            </h2>
            <div className='mb-3 max-w-lg mx-auto'>
                <div className="card">
                    <div className="card__body">
                        <div className="items-center justify-center">
                            <div className='flex justify-around '>
                                <div className='col-3 text-center'>
                                    <p className='my-2'>Population: </p>
                                    <span className='text-3xl font-bold'>${population.toLocaleString()}</span><span className='font-bold'>{population != 0 ? population < 0 ? " CR" : " DR" : ""}</span>
                                </div>
                                {population != 0 ?
                                    <div className='col-3 text-center flex flex-column'>
                                        <button className={"bg-red hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-3"} onClick={(e) => {
                                            handleClear()
                                        }}>
                                            Clear selected
                                        </button>
                                    </div>
                                    :
                                    <></>
                                }
                            </div>
                            <p className='px-5 my-5 text-xs'>* Shift + Click for multiple selection</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                            {props.fileUploaded ?
                                <Table
                                    // limit='10'
                                    headData={customerTableHead}
                                    renderHead={(item, index) => renderHead(item, index)}
                                    bodyData={props.audit != null ? props.audit : []}
                                    renderBody={(item, index) => renderBody(item, index, handleChange, props)}

                                />
                                :
                                <div className='my-20'>
                                    <h2 className='text-center'>
                                        Accounts will be displayed once an audit has been uploaded
                                    </h2>
                                </div>
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Accounts
