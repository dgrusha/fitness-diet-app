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
import { getFeedbacks } from '../../apiCalls/administration/getAllFeedbacks';

const TableOfDataRatings = () => {
    const [openModal, setOpenModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    // const [dataFeedback, setDataFeedback] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [sortDirection, setSortDirection] = useState('asc');
    const [sortBy, setSortBy] = useState(null);

    useEffect(() => {
        getFeedbacks().then((data) => {
            // setDataFeedback(data);
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

    return (
        <>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead sx={{ backgroundColor: '#9CD91B' }}>
                        <TableRow>
                            <TableCell sx={{ color: 'white' }}>
                                <TableSortLabel
                                    sx={{ color: 'white' }}
                                    active={sortBy === 'RatingLevel'}
                                    direction={sortDirection}
                                    onClick={() => handleSort('RatingLevel')}
                                >
                                    Rating Level
                                </TableSortLabel>
                            </TableCell>
                            <TableCell sx={{ color: 'white' }}>
                                <TableSortLabel
                                    sx={{ color: 'white' }}
                                    active={sortBy === 'UserId'}
                                    direction={sortDirection}
                                    onClick={() => handleSort('UserId')}
                                >
                                    User ID
                                </TableSortLabel>
                            </TableCell>
                            <TableCell sx={{ color: 'white' }}>
                                <TableSortLabel
                                    sx={{ color: 'white' }}
                                    active={sortBy === 'TimeSent'}
                                    direction={sortDirection}
                                    onClick={() => handleSort('TimeSent')}
                                >
                                    Time Sent
                                </TableSortLabel>
                            </TableCell>
                            <TableCell sx={{ color: 'white' }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredData.map((row) => (
                            <TableRow key={row.Id}>
                                <TableCell>{row.RatingLevel}</TableCell>
                                <TableCell>{row.UserId}</TableCell>
                                <TableCell>{row.TimeSent}</TableCell>
                                <TableCell>
                                    <Button onClick={() => handleOpenModal(row)}>
                                        <span role="img" aria-label="question">
                                            Info
                                        </span>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={openModal} onClose={handleCloseModal}>
                <DialogTitle>Text of feedback</DialogTitle>
                <DialogContent>
                    <Typography>{selectedRow?.Text}</Typography>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default TableOfDataRatings;
