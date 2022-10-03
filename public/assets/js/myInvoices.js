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
        for(const row of data.rows){
            table.querySelector('tbody').insertAdjacentHTML('beforeend', `
            <tr>
                ${row.map(col => `<td class="text-center">${col}</td>`).join('')}
                <td class="text-center">
                    <button type="button" class=" btn btn-outline-primary" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="View">
                    View
                    </button>
                    <button type="button" class=" btn btn-outline-warning" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Edit">
                    Edit
                    </button>
                    <button type="button" class=" btn btn-outline-danger" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Delete">
                    <i class="bi bi-trash3-fill"></i>
                    </button>
                </td>
            </tr>
            `
            )
        }

        //update last updated text
        root.querySelector('.table-refresh__label').textContent = `Last Updated: ${new Date(data.lastUpdated).toLocaleString()}`

        //Stoping ratating the button
        root.querySelector('.table-refresh__button').classList.remove('table-refresh__button--refreshing')
    }

    for(const root of document.querySelectorAll('.table-refresh[data-url]')){
        const table = document.createElement('table')
        const options = document.createElement('div')

        table.classList.add('table', 'table-borderless', 'table-striped', 'table-refresh__table')
        options.classList.add('container', 'table-refresh__options')

        table.innerHTML = `
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