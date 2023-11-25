import React, { useState, useEffect } from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    TableSortLabel,
} from '@mui/material';
import { getAllNotVerifiedCoaches } from '../../apiCalls/getAllNotVerifiedCoaches';
import { updateCoachVerified } from '../../apiCalls/updateCoachVerified';
import { deleteCoachUnverified } from '../../apiCalls/deleteCoachUnverified';

const TableOfDataCoaches = () => {
    const [openModal, setOpenModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [dataCoaches, setDataCoaches] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [sortDirection, setSortDirection] = useState('asc');
    const [sortBy, setSortBy] = useState(null);

    useEffect(() => {
        getAllNotVerifiedCoaches().then((data) => {
            setDataCoaches(data);
            setFilteredData(data);
        });
    }, []);

    const handleOpenModal = (row) => {
        setSelectedRow(row);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleSort = (column) => {
        const isAsc = sortBy === column && sortDirection === 'asc';
        setSortDirection(isAsc ? 'desc' : 'asc');
        setSortBy(column);
        sortData(column, isAsc ? 'desc' : 'asc');
    };

    const sortData = (column, direction) => {
        const sortedData = [...filteredData].sort((a, b) => {
            if (direction === 'asc') {
                return a[column] > b[column] ? 1 : -1;
            } else {
                return a[column] < b[column] ? 1 : -1;
            }
        });
        setFilteredData(sortedData);
    };

    const handleApprove = async (email) => {
        const response = await updateCoachVerified({ email: email });
        const [status, message] = [response.status, await response.text()];
        if(status !== 200){
            window.alert(message);
        }else{
            setFilteredData((prevData) => prevData.filter((row) => row.Email !== email));
        }
    };

    const handleDelete = async (email) => {
        const response = await deleteCoachUnverified({ email: email });
        const [status, message] = [response.status, await response.text()];
        if(status !== 200){
            window.alert(message);
        }else{
            setFilteredData((prevData) => prevData.filter((row) => row.Email !== email));
        }
    };

    return (
        <>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead sx={{ backgroundColor: '#9CD91B' }}>
                        <TableRow>
                            <TableCell sx={{ color: 'white' }}>
                                <TableSortLabel
                                    sx={{ color: 'white' }}
                                    active={sortBy === 'FirstName'}
                                    direction={sortDirection}
                                    onClick={() => handleSort('RatingLevel')}
                                >
                                    First name
                                </TableSortLabel>
                            </TableCell>
                            <TableCell sx={{ color: 'white' }}>
                                <TableSortLabel
                                    sx={{ color: 'white' }}
                                    active={sortBy === 'LastName'}
                                    direction={sortDirection}
                                    onClick={() => handleSort('UserId')}
                                >
                                    Last name
                                </TableSortLabel>
                            </TableCell>
                            <TableCell sx={{ color: 'white' }}>
                                <TableSortLabel
                                    sx={{ color: 'white' }}
                                    active={sortBy === 'Email'}
                                    direction={sortDirection}
                                    onClick={() => handleSort('TimeSent')}
                                >
                                    Email
                                </TableSortLabel>
                            </TableCell>
                            <TableCell sx={{ color: 'white' }}>
                                <TableSortLabel
                                    sx={{ color: 'white' }}
                                    active={sortBy === 'CVFileName'}
                                    direction={sortDirection}
                                    onClick={() => handleSort('TimeSent')}
                                >
                                    CV file name
                                </TableSortLabel>
                            </TableCell>
                            <TableCell sx={{ color: 'white' }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredData.map((row) => (
                            <TableRow key={row.Email}>
                                <TableCell>{row.FirstName}</TableCell>
                                <TableCell>{row.LastName}</TableCell>
                                <TableCell>{row.Email}</TableCell>
                                <TableCell>{row.CVFileName}</TableCell>
                                <TableCell style={{ display: 'flex'}}>
                                    <Button onClick={() => handleOpenModal(row)}>
                                        <span aria-label="question">
                                            Recomendation
                                        </span>
                                    </Button>
                                    <Button sx={{ marginLeft: 2 }} onClick={() => handleApprove(row.Email)}>
                                        <span aria-label="approve">
                                            Approve
                                        </span>
                                    </Button>
                                    <Button sx={{ marginLeft: 2 }} onClick={() => handleDelete(row.Email)}>
                                        <span aria-label="approve">
                                            Delete
                                        </span>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={openModal} onClose={handleCloseModal}>
                <DialogTitle>Recomendation text</DialogTitle>
                <DialogContent>
                    <Typography>{selectedRow?.RecomendationText}</Typography>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default TableOfDataCoaches;
