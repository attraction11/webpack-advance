export function exportExcel (val, tHeader, filterVal, filename) {
    return import('@/vendor/Export2Excel').then(excel => {
        const data = formatJson(val, filterVal)
        excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: filename || Date.now()
        })
    })
}

function formatJson (val, filterVal) {
    return val.map(v => filterVal.map(j => {
        return v[j] ? v[j] : '-'
    }))
}