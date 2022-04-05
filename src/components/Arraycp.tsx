import { IInvoiceListProps as IProps } from '../App'
import { useTranslation } from 'react-i18next'
import { arrayCpStyles } from '../makestyles/Arraycpstyles'

export const Arraycp: React.FC<IProps> = (props: IProps) => {
    const classes = arrayCpStyles()

    const { t } = useTranslation(["body"])

    const { customerFirstName, customerLastName, invoices } = props.invoiceData

    const matchsTest1 = invoices.filter(invoice => invoice.total >= 30000)
    const matchsTest2 = invoices.filter(invoice => invoice.paymentStatus === 'late')
    const matchsTest3 = invoices.sort((invoice1, invoice2) => (invoice1.total > invoice2.total) ? 1 : (invoice1.total < invoice2.total) ? -1 : 0)
    const matchsTest4 = invoices.reduce((result, inv) => {
        return result + inv.total
    }, 0)

    return (
        <div className={classes.container}>
            <h1>{customerLastName} {customerFirstName}</h1>
            <div>
                {invoices.map((invoice) => (
                    <ul key={invoice.id} className={classes.data}>
                        <li>{invoice.name}</li>
                        <div className={classes.invoiceTotal}>{invoice.total} ({invoice.paymentStatus})</div>
                    </ul>
                ))}
            </div>

            <h1 className={classes.testingFunction}>{t("functiontestingname")}</h1>
            <div>
                <div className={classes.invoiceNameTesting}>*Invoice ID that greater than 30000: </div>
                {matchsTest1.map(match => (
                    <ul key={match.id} className={classes.queryInvoice}>
                        <li>{match.name}</li>
                    </ul>
                ))}
            </div>

            <div>
                <div className={classes.invoiceNameTesting}>*Invoice ID that is late: </div>
                {matchsTest2.map(match => (
                    <ul key={match.id} className={classes.queryInvoice}>
                        <li>{match.name}</li>
                    </ul>
                ))}
            </div>

            <div>
                <div className={classes.invoiceNameTesting}>*Sorted Invoice ascending by total: </div>
                {matchsTest3.map(match => (
                    <ul key={match.id} className={classes.queryInvoice}>
                        <li>{match.name}</li>
                    </ul>
                ))}
            </div>

            <div>
                <div className={classes.invoiceNameTesting}>*Total Invoice price: </div>
                <ul className={classes.queryInvoice}>
                    <li>{matchsTest4}</li>
                </ul>
            </div>
        </div>
    )
}