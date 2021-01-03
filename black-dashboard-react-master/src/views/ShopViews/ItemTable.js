import React from "react";
import { StickyTable, Row, Cell } from 'react-sticky-table';
import apiClient from "../../services/api"
export default function ItemTable(props) {

    const [productList, setProductList] = React.useState([]);
    const [barcode, setBarcode] = React.useState("");
    // const [total, setTotal] = React.useState(0);

    React.useEffect(() => {

        setProductList(props.clear);
        props.onAddProd(0, 0);
    }, [props.clear])
    const getProductLine = (barcode) => {

        let test = true;
        let sum = 0;
        let costSum = 0;
        let temp = productList;
        temp.forEach(element => {

            if (element.barcode === barcode) {
                element.qty = element.qty + 1;
                test = false;

            }
            sum += element.qty * element.price;
            costSum += element.qty * element.cost;

        });

        props.onAddProd(sum, costSum);

        props.onAdd(temp);
        if (test) {
            if (sessionStorage.getItem('loggedIn')) {

                apiClient.post('../api/getProductByBarcode', { barcode: barcode })
                    .then(response => {
                        if (response.data != null) {

                            temp.push({ barcode: barcode, description: response.data[0].description, qty: 1, price: response.data[0].price, cost: response.data[0].cost });
                            sum = 0;
                            temp.forEach(element => {
                                sum += element.qty * element.price;
                                costSum += element.qty * element.cost;
                            });
                            props.onAddProd(sum, costSum);
                            setProductList([]);
                            setBarcode("");
                            setProductList(temp);
                            props.onAdd(temp);
                        }
                    })
                    .catch(error => console.error(error))

            }
        }
    }


    return (
        <div style={{ marginLeft: "1px", width: '100%', height: '240px' }}>
            <StickyTable style={{ marginLeft: "5px", width: '100%' }}>
                <Row>
                    <Cell>Barcode</Cell>
                    <Cell>description                                </Cell>
                    <Cell>qty</Cell>
                    <Cell>U.price</Cell>
                    <Cell>T.price</Cell>
                </Row>
                {productList.map((line) => {
                    return (
                        <Row key={line.barcode}>
                            <Cell>{line.barcode}</Cell>
                            <Cell>{line.description}</Cell>
                            <Cell><input style={{ width: "60px" }} value={line.qty} /></Cell>

                            <Cell>{line.price}</Cell>
                            <Cell>{line.price * line.qty}</Cell>
                        </Row>
                    );
                })}
                <Row>
                    <Cell> <input style={{ width: "150px" }} type="text" value={barcode} onChange={(e) => { setBarcode(e.target.value); getProductLine(e.target.value) }} />
                    </Cell>
                    <Cell></Cell><Cell></Cell><Cell></Cell><Cell></Cell>
                </Row>


            </StickyTable>
        </div>
    )
}