import { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { useTranslation } from 'react-i18next'
import { muiTableStyles } from '../makestyles/Muitablestyles'

interface Column {
    field: string,
    headerName: string,
    headerClassName: string,
    width?: any
}

const columns: Column[] = [
    { field: 'id', headerName: 'ID', headerClassName: 'header-name' },
    { field: 'title', headerName: 'Title', headerClassName: 'header-name', width: 300 },
    { field: 'body', headerName: 'Content', headerClassName: 'header-name', width: 400 }
]

export const Muitable: React.FC = () => {
    const classes = muiTableStyles()

    const [tableData, setTableData] = useState([])
    
    const [pageSize, setPageSize] = useState(5)

    const { t } = useTranslation(["body"])

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then((data) => data.json())
            .then((data) => setTableData(data))
            .catch(() => alert('Có lỗi!'))
    }, [])

    return (
        <div className={classes.layout}>
            <h1>{t("muitablename")}</h1>
            <DataGrid
                className={classes.component}
                rows={tableData}
                columns={columns}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[5, 15, 50, 100]}
                checkboxSelection={true}
            />
        </div>
    );
}
