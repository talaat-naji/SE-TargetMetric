import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";

import apiClient from "../../services/api";
// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
import Button2 from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const chart1_2_options = {
    maintainAspectRatio: false,
    // onClick: (e, element) => {
    //   if (element.length > 0) {
    //     let ind = element[0]._index;
    //     fetchDailySales(ind + 1);
    //     // this.setState({ open: true ,ind:ind+1})
    //     // this.fetchDailyData(ind);
    //   }
    // },
    
    legend: {
      display: false
    },
    tooltips: {
      backgroundColor: "#f5f5f5",
      titleFontColor: "#333",
      bodyFontColor: "#666",
      bodySpacing: 4,
      xPadding: 12,
      mode: "nearest",
      intersect: 0,
      position: "nearest",
    },
    responsive: true,
    scales: {
      yAxes: [
        {
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: "rgba(29,140,248,0.0)",
            zeroLineColor: "transparent"
          },
          ticks: {
            suggestedMin: 60,
            suggestedMax: 125,
            padding: 20,
            fontColor: "#9a9a9a"
          }
        }
      ],
      xAxes: [
        {
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: "rgba(29,140,248,0.1)",
            zeroLineColor: "transparent"
          },
          ticks: {
            padding: 20,
            fontColor: "#9a9a9a"
          }
        }
      ]
    }
};
export default function DailyData(props) {
    const [dailyChartData, setdailyChartData] = React.useState("sales");
    const [dailyDataSales, setDailyDataSales] = React.useState([]);
    const [dailyDataProfits, setDailyDataProfits] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    // const [month, setMonth] = React.useState(0);
    const [monthName, setMonthName] = React.useState('');

    const handleClose = () => {
        setOpen(false);
       
         props.setMonth(0);
    }

    const fixDailyData = (data) => {
       
         let date = new Date("2021/" + props.month + "/1")
        let shortMonth = date.toLocaleString('en-us', { month: 'long' });
        setMonthName(shortMonth);
        let sales = [];
        let profits = [];
        let lastday = new Date(new Date().getFullYear(), data[0], 0).getDate();
       
        for (var i = 1; i <= lastday; i++) {
            let j = 0;
            let sale = 0;
            let profit = 0;
            
            while (j < data[1].length) {
                if (data[1][j]['day'] == i) {
                    sale += data[1][j]['totalSales'];
                    profit += data[2][j]['totalProfit'];

                }

                j++;
            }
            profits.push({ profits: profit, day: i });
            sales.push({ sales: sale, day: i });
        }
   
        setDailyDataSales(sales);
        setDailyDataProfits(profits);
   
    }
    //get Daily sales and profits for the diagrams
    const fetchDailySales = (month) => {
        if (sessionStorage.getItem('loggedIn')) {

            apiClient.post('../api/getDailySales', { month: month })
                .then((response) => {
                    // fixGraphData(response.data);
                    // setGraphData(response.data);
                    fixDailyData(response.data);
                })
                .catch(error => console.error(error))
        }
    }
  
    React.useEffect(() => {
        fetchDailySales(props.month);
       
        setOpen(props.open)
        

},[props.open])
    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth={true} >
        <DialogTitle id="form-dialog-title" style={{ backgroundColor: "#1e1e2e" }}>
          <Button2 onClick={handleClose} color="primary">
            <i className="tim-icons icon-minimal-left"/>
              </Button2>{monthName} {dailyChartData}</DialogTitle>
        <DialogContent style={{ backgroundColor: "#252537" }}>
        <Row>
        <Col xs="12">
          <Card className="card-chart">
            <CardHeader>
              <Row>
                <Col className="text-left" sm="6">
                  <h5 className="card-category">Total Shipments</h5>
                  <CardTitle tag="h2">Performance</CardTitle>
                </Col>
                <Col sm="6">
                  <ButtonGroup
                    className="btn-group-toggle float-right"
                    data-toggle="buttons"
                  >
                    <Button
                      tag="label"
                      className={classNames("btn-simple", {
                        active: dailyChartData === "sales"
                      })}
                      color="info"
                      id="0"
                      size="sm"
                      onClick={() => { setdailyChartData("sales");}}
                    >
                      <input
                        defaultChecked
                        className="d-none"
                        name="options"
                        type="radio"
                      />
                      <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                        Sales
                      </span>
                      <span className="d-block d-sm-none">
                        <i className="tim-icons icon-single-02" />
                      </span>
                    </Button>
                    <Button
                      color="info"
                      id="1"
                      size="sm"
                      tag="label"
                      className={classNames("btn-simple", {
                        active: dailyChartData === "profits"
                      })}
                      onClick={() => {  setdailyChartData("profits");}}
                    >
                      <input
                        className="d-none"
                        name="options"
                        type="radio"
                      />
                      <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                        Profits
                      </span>
                      <span className="d-block d-sm-none">
                        <i className="tim-icons icon-gift-2" />
                      </span>
                    </Button>

                  </ButtonGroup>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <div className="chart-area">
                <Line
                  data={{
                    labels:dailyDataSales.map((day) => { return (day.day) }),
                    datasets: [
                      {
                        label: dailyChartData === "sales" ? "Sales" : "Profits" ,
                        fill: true,
                        backgroundColor: "powderblue",
                        borderColor: "#1f8ef1",
                        borderWidth: 2,
                        borderDash: [],
                        borderDashOffset: 0.0,
                        pointBackgroundColor: "#1f8ef1",
                        pointBorderColor: "rgba(255,255,255,0)",
                        pointHoverBackgroundColor: "#1f8ef1",
                        pointBorderWidth: 20,
                        pointHoverRadius: 4,
                        pointHoverBorderWidth: 15,
                        pointRadius: 4,
                        data:  dailyChartData === "sales" ? dailyDataSales.map((day) => { return (day.sales) }) : dailyDataProfits.map((day) => { return (day.profits) }) ,
                      }
                    ]
                  }
                  }
                  options={chart1_2_options}

                />

              </div>

            </CardBody>
          </Card>
        </Col>
                </Row>
                </DialogContent>
                </Dialog>
)

}