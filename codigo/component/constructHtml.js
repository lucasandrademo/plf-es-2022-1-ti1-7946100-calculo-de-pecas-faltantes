function selectOptions(obj, msg = '', showCod = true){
    let html = '';
    if(msg != ''){
        html += `<option value="" disabled selected hidden>${msg}</option>`;
    }
    obj.forEach(item => {
        html +=
        `<option value="${item.id}">
            ${showCod && item.cod + ' - '}
            ${item.desc}
        </option>`;
    });
    return html;
}

function  insertRow(table, row){
    table.bootstrapTable(
        'insertRow',
        {
            index: 0,
            row: row
        }
    )
}

export {selectOptions, insertRow}