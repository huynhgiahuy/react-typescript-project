import { makeStyles, Theme } from '@material-ui/core/styles'

export const muiTableStyles = makeStyles((theme: Theme) => ({
    layout: {
        height: 600,
        width: '70%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 14,
        borderRadius: 2
    },
    component: {
        '& .header-name': {
            color: 'blue'
        },
        '& .MuiDataGrid-main': {
            borderStyle: 'solid'
        },
        '& .MuiTablePagination-selectLabel': {
            content: 'normal',
            color: 'black',
            marginTop: 2
        },
        '& .MuiTablePagination-displayedRows': {
            color: 'black',
            marginTop: 2
        },
        '& .MuiIconButton-root': {
            all: 'unset'
        },
        '& .MuiCheckbox-root': {
            color: 'blue'
        },
        '& .MuiDataGrid-row:hover': {
            color: 'black',
            fontWeight: 'bold'
        },
        '& .PrivateSwitchBase-input': {
            color: 'blue'
        },
        '& .Mui-checked': {
            color: 'blue'
        },
        '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 'bold'
        }
    }
}))