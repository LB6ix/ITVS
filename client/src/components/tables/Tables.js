import React, { useState } from 'react';

import {
  Table,
  TableHead,
  TableCell,
  TableRow,
  TablePagination,
  makeStyles,
  TableSortLabel
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  table: {
    marginTop: theme.spacing(4),
    '& thead th': {
      margin: '40%',
      fontWeight: '500',
      color: '#212121',
      backgroundColor: theme.palette.primary.light
    },
    '& tbody td': {
      width: '50%',
      fontWeight: '300'
    },
    '& tbody td:hover': {
      backgroundColor: '#fffbf2',
      cursor: 'pointer'
    }
  }
}));

export default function Tables(records, headerCells) {
  const classes = useStyles();

  const pages = [10, 15, 25];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
  const [order, setOrder] = useState();
  const [orderBy, setOrderBy] = useState();

  const TableContainer = (props) => (
    <Table className={classes.table}>{props.children}</Table>
  );

  const TableHeader = (props) => {
    const handleSortRequest = (cellId) => {
      const isAsc = orderBy === cellId && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(cellId);
    };
    return (
      <TableHead>
        <TableRow>
          {headerCells.map((headerCell) => (
            <TableCell
              key={headerCell.id}
              sortDirection={orderBy === headerCell.id ? order : false}
            >
              {headerCell.disableSorting ? (
                headerCell.label
              ) : (
                <TableSortLabel
                  active={orderBy === headerCell.id}
                  direction={orderBy === headerCell.id ? order : 'asc'}
                  onClick={() => {
                    handleSortRequest(headerCell.id);
                  }}
                >
                  {headerCell.label}{' '}
                </TableSortLabel>
              )}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const TablePaginationKomp = () => (
    <TablePagination
      labelRowsPerPage='Įrašų kiekis puslapyje:'
      labelDisplayedRows={({ from, to, count }) =>
        `Rodomi įrašai ${from}-${to} iš visų ${count} įrašų`
      }
      component='div'
      page={page}
      rowsPerPageOptions={pages}
      rowsPerPage={rowsPerPage}
      count={records.length}
      onChangeRowsPerPage={handleChangeRowsPerPage}
      onChangePage={handleChangePage}
    />
  );

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }

    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  const recordsAfterPagingAndSorting = () => {
    return stableSort(records, getComparator(order, orderBy)).slice(
      page * rowsPerPage,
      (page + 1) * rowsPerPage
    );
  };

  return {
    TableContainer,
    TableHeader,
    TablePaginationKomp,
    recordsAfterPagingAndSorting
  };
}
