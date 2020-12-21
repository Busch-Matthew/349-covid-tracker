import React, { useState } from "react";
import ReactTooltip from "react-tooltip";


import "./styles.css";
import MapChart from "./map/Map";
import BasicTable from "./table/table";

import LineGraph from "./graph/Graph";
import CircleChart from "./circleChart/circleChart"

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#282c34",

  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor: 'white'
  },
}));


function App() {
  const [content, setContent] = useState("");
  const [basicTableData, setBasicTableData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('World');
  const [historicalData, setHistoricalData] = useState([]);
  const [todaysData, setTodaysData] = useState([]);
  const [lifetimeData, setLifetimeData] = useState([]);


  const classes = useStyles();



  return (


    <div className={classes.root}>
      <div
        style={{
          backgroundColor: "#282c34"
        }}>
        <h1
        style = {{
          color: "#c51b7d"
        }}
        >
          Covid-19 World-Report
        </h1>
      </div>
      <Grid container spacing={3}
        style={{
          height: 650,
          backgroundColor: "#282c34"
        }}>
        <Grid item xs={7}
        >
          <Paper className={classes.paper}
            style={{
              height: 600,
              backgroundColor: "#cecece"
            }}
          >
            <MapChart
              setTooltipContent={setContent}
              setTableContent={setBasicTableData}
              selectedCountry={setSelectedCountry}
              historicalData={setHistoricalData}
              todaysData={setTodaysData}
              lifetimeData = {setLifetimeData}
            />
            <ReactTooltip place="top">
              {content}
            </ReactTooltip>
          </Paper>
        </Grid>
        <Grid item xs={5}
        >
          <Paper className={classes.paper}
            style={{
              height: 600
            }}>

            <h1
            style = {{
              color: "#212121"
            }}
            >
              {selectedCountry}
            </h1>
            <h2
            style = {{
              color: "#212121"
            }}
            >Breakdown by Area (If Available)</h2>
            <BasicTable
              tableData={basicTableData}
            />
          </Paper>
        </Grid>
      </Grid>
      <div
        style={{
          height: 25,
          backgroundColor: "#282c34"
        }} />
      <Grid container spacing={3}
        style={{
          backgroundColor: "#282c34"
        }}>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <div
              style={{
                height: 30,
                display: "flex",
                alignItems: "center" 
               
              }}>
              <h1
              style = {{
                color: "#212121"
              }}
              >Historical Data for {selectedCountry}</h1>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <div
              style={{
                height: 30,
                display: "flex",
                alignItems: "center" 
              }}>
              <h1
              style = {{
                color: "#212121"
              }}
              >Today's Totals for {selectedCountry}</h1>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <div
              style={{
                height: 30,
                display: "flex",
                alignItems: "center" 
                
              }}>
              <h1
              style = {{
                color: "#212121"
              }}
              >Lifetime Totals for {selectedCountry}</h1>
            </div>
          </Paper>
        </Grid>
      </Grid>
      <div
        style={{
          height: 5,
          backgroundColor: "#282c34"
        }} />
      <Grid container spacing={3}
        style={{
          backgroundColor: "#282c34"
        }}>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <div
              style={{
                height: 400
              }}>
              <LineGraph data={historicalData} />
            </div>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <div
              style={{
                height: 400,
                width: 600
              }}>
              <CircleChart data={todaysData} />
            </div>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <div
              style={{
                height: 400
              }}>
              <CircleChart data={lifetimeData} />
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;