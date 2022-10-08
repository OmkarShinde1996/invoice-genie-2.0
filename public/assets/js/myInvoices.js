{

    /**
     * Populates a data table with some data
     * @param {HTMLDivElement} root 
     */

    async function updateTable(root){
        root.querySelector('.table-refresh__button').classList.add('table-refresh__button--refreshing')

        const table = root.querySelector('.table-refresh__table')
        const response = await fetch(root.dataset.url)
        const data = await response.json()

        //clear table
        table.querySelector('thead tr').innerHTML = ''
        table.querySelector('tbody').innerHTML = ''

        //Populate headers
        for(const header of data.headers){
            table.querySelector('thead tr').insertAdjacentHTML('beforeend', `<th class="text-center">${header}</th>`)
        }
        //Populate rows
        let index = 0
        if(data.rows.length === 0){
            table.querySelector('tbody').insertAdjacentHTML('beforeend', `<tr><td class="text-center">No Records Found</td></tr>`)
        }else{
            for(const row of data.rows){
                
                table.querySelector('tbody').insertAdjacentHTML('beforeend', `
                <tr>
                    ${row.map(col => `<td class="text-center">${col}</td>`).join('')}
                    <td class="text-center d-flex justify-content-center">
                        <a href="/viewInvoice?templateId=${data.templates[index]}"><button type="button" id="${row[0]}-view" class=" btn btn-outline-primary" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="View">
                        View
                        </button></a>
                        <a href="/editSelectedInvoice?invoiceUniqueId=${row[0]}&templateId=${data.templates[index]}&type=update"><button type="button" id="${row[0]}-edit" class=" btn btn-outline-warning" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Edit">
                        Edit
                        </button></a>
                        <button type="button" id="${row[0]}-delete" class=" btn btn-outline-danger" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Delete">
                        <i class="bi bi-trash3-fill"></i>
                        </button>
                    </td>
                </tr>
                `
                )

                //asign view actions to buttons
                let viewActionButton = document.getElementById(`${row[0]}-view`)
                viewActionButton.addEventListener('click', () => {
                    sessionStorage.setItem('selectedInvoiceUniqueId', row[0])
                    // console.log(data.templates);
                })
                
                //asign edit actions to buttons
                let editActionButton = document.getElementById(`${row[0]}-edit`)
                editActionButton.addEventListener('click', () => {
                    sessionStorage.setItem('selectedInvoiceUniqueId', row[0])
                })

                //asign delete actions to buttons
                let deleteActionButton = document.getElementById(`${row[0]}-delete`)
                deleteActionButton.addEventListener('click', () => {
                    const uniqueInvoiceId = {
                        InvoiceUniqueId: row[0]
                    }
                    fetch('/api/deleteInvoice', {
                        method: 'DELETE',
                        body: JSON.stringify(uniqueInvoiceId),
                        headers:{
                            'content-type': 'application/json'
                        }
                    }).then(resp => resp.json())
                    .then(data => {
                        if(data.status == 'error'){
                            console.log(data.error)
                            location.reload()
                        }else{
                            location.reload()
                        }
                    })
                })
                index++

            }
        }

        //update last updated text
        root.querySelector('.table-refresh__label').textContent = `Last Updated: ${new Date(data.lastUpdated).toLocaleString()}`

        //Stoping ratating the button
        root.querySelector('.table-refresh__button').classList.remove('table-refresh__button--refreshing')

        
    }

    for(const root of document.querySelectorAll('.table-refresh[data-url]')){
        const table = document.createElement('table')
        const options = document.createElement('div')

        table.classList.add('table', 'table-borderless', 'table-striped', 'table-refresh__table', 'caption-top')
        options.classList.add('container', 'table-refresh__options', 'mb-5', 'pb-5')

        table.innerHTML = `
        <caption class="h5 text-primary">Invoice List<a href="/#templates" class="btn btn-primary ms-5"><i class="bi bi-plus-circle me-2"></i>Create Invoice</a></caption>
            <thead class="table-dark">
                <tr></tr>
            </thead>
            <tbody>
                <tr>
                    <td>No data available</td>
                </tr>
            </tbody>
        `;

        options.innerHTML = `
            <span class="table-refresh__label">Last Update: never</span>
            <button type="button" class=" btn btn-outline-primary table-refresh__button">
                <i class="bi bi-arrow-clockwise"></i>
            </button>
        `;

        root.append(table, options)

        options.querySelector('.table-refresh__button').addEventListener('click', () => {
            updateTable(root)
        })

        updateTable(root)
        root.querySelector('.table-refresh__button').classList.remove('table-refresh__button--refreshing')
    }

}


