import { makeStyles, Theme } from "@material-ui/core/styles"

export const arrayCpStyles = makeStyles((theme: Theme) => ({
    data: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    container: {
        maxWidth: '600px',
        margin: '0 auto'
    },
    hr: {
        paddingLeft: '10px',
        paddingRight: '10px',
        marginRight: '10px'
    },
    invoiceTotal: {
        paddingRight: '10px'
    },
    testingFunction: {
        textAlign: 'center'
    },
    invoiceNameTesting: {
        color: 'brown',
        fontWeight: 'bold'
    },
    queryInvoice: {
        marginTop: '10px'
    }
}))