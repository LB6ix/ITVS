import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getHardwares } from "../../actions/assets/hardware";
import Loading from "../layout/Loading";
import Tables from "../tables/Tables";
import { Link } from "react-router-dom";
import formatDate from "../../utility/formatDate";
import {
  Paper,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TablePagination,
  TableRow,
  Toolbar
} from "@material-ui/core";

const Hardwares = ({
  getHardwares,
  user,
  hardware: { hardwares, loading },
  isAuthenticated,
  isAdmin
}) => {
  useEffect(() => {
    // {
    //   !loading && isAdmin && getHardwares();
    // }
    // {
    //   !loading && isAuthenticated && !isAdmin && getUserHardwares();
    // }
    getHardwares();
  }, [getHardwares]);

  const headerCells = [
    { id: "name", label: "Pavadinimas" },
    { id: "serialNumber", label: "Serijinis Numeris", disableSorting: true },
    { id: "model", label: "Modelis" },
    { id: "category", label: "Kategorija" },
    { id: "status", label: "Statusas" },
    { id: "assignedTo", label: "Kam priskirtas", disableSorting: true },
    { id: "cost", label: "Kaina", disableSorting: true },
    { id: "date", label: "Įkėlimo data" },
    { id: "Veiksmai", label: "Veiksmai" },
    { id: "test", label: "Veiksmai" }
  ];

  //const TableContainer = (props) => <Table>{props.children}</Table>;

  const {
    TableContainer,
    TableHeader,
    TablePaginationKomp,
    recordsAfterPagingAndSorting
  } = Tables(hardwares, headerCells);

  return loading ? (
    <Loading />
  ) : (
    <Fragment>
      <h3 className='MuiTypography-h3'>Aparatinės įrangos sąrašas</h3>
      <Link to={`/hardwares/add-hardware`} className='btn btn-primary'>
        Pridėti naują įrangą
      </Link>
      {/* <Toolbar>DO SEARCH</Toolbar> */}
      <TableContainer>
        <TableHeader />
        <TableBody>
          {recordsAfterPagingAndSorting().map((hw) => (
            <TableRow key={hardwares._id}>
              <TableCell>{hw.name}</TableCell>
              <TableCell>{hw.serialNumber}</TableCell>
              <TableCell>{hw.model}</TableCell>
              <TableCell>{hw.category}</TableCell>
              <TableCell>{hw.status}</TableCell>
              <TableCell>{hw.assignedTo}</TableCell>
              {/* <TableCell>{sw.assignedTo}</TableCell> */}
              <TableCell>{hw.cost}</TableCell>
              <TableCell>{formatDate(hw.date)}</TableCell>
              <TableCell>{formatDate(hw.date)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableContainer>
      <TablePaginationKomp />
    </Fragment>
  );
};

Hardwares.propTypes = {
  isAdmin: PropTypes.bool,
  getHardwares: PropTypes.func.isRequired,
  //   getUserHardwares: PropTypes.func.isRequired,
  hardware: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  hardware: state.hardware,
  user: state.user,
  isAuthenticated: state.auth.isAuthenticated,
  isAdmin: state.auth.isAdmin
});

export default connect(mapStateToProps, { getHardwares })(Hardwares);
