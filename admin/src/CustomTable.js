import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';


export default function CustomTable(props) {
  return (
    <React.Fragment>
      {props.title ? <Title>{props.title}</Title> : null}
      <Table size="small">
        <TableHead>
          <TableRow>
            {props.cols.map(col => <TableCell>{col}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map(row => (
            <TableRow 
              hover={true} 
              key={props.key ? row[props.cols.indexOf(props.key)] : row[0]} 
              onClick={() => {props.onClick(row[0])}}
              style={{cursor:'pointer'}}>
              {row.map(cell => <TableCell>{cell}</TableCell>)}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
