import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles({
    table: {
      minWidth: 650,
      overflowY: "scroll",
      backgroundColor: "#c51b7d"
    },
  });

 

const BasicTable = ({tableData}) => {

    const classes = useStyles();

    return (
        <TableContainer component={Paper}
        style = {{
          height:425
        }}
        >
          <Table className={classes.table} size = "small" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style = {{color: "white"}}>State/Province</TableCell>
                <TableCell align="right" style = {{color: "white"}}>Confirmed Cases</TableCell>
                <TableCell align="right" style = {{color: "white"}}>Active Cases</TableCell>
                <TableCell align="right" style = {{color: "white"}}>Recovered Cases</TableCell>
                <TableCell align="right" style = {{color: "white"}}>Deaths</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row) => (
                <TableRow key={row.province}>
                  <TableCell component="th" scope="row" style = {{color: "white"}}>
                    {row.province || row.state||"Total"}
                  </TableCell>
                  <TableCell align="right" style = {{color: "white"}}>{ row.cases || row.stats.confirmed}</TableCell>
                  <TableCell align="right" style = {{color: "white"}}>{ row.active || (row.stats.confirmed - row.stats.recovered - row.stats.deaths)}</TableCell>
                  <TableCell align="right" style = {{color: "white"}}>{ row.recovered || row.stats.recovered}</TableCell>
                  <TableCell align="right" style = {{color: "white"}}>{ row.deaths || row.stats.deaths}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );



}



export default BasicTable

