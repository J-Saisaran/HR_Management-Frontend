import React from 'react';
import { Box, Skeleton, Card, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

export const TableSkeleton = ({ rows = 5, cols = 6 }) => {
  return (
    <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 2, mt: 2 }}>
      <Table>
        <TableHead sx={{ backgroundColor: '#f1f5f9' }}>
          <TableRow>
            {Array.from({ length: cols }).map((_, idx) => (
              <TableCell key={idx}>
                <Skeleton variant="text" height={28} width="80%" />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from({ length: rows }).map((_, rIdx) => (
            <TableRow key={rIdx}>
              {Array.from({ length: cols }).map((_, cIdx) => (
                <TableCell key={cIdx}>
                  <Skeleton variant="text" height={24} />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export const CardSkeleton = ({ count = 4 }) => {
  return (
    <Grid container spacing={3} sx={{ mt: 1 }}>
      {Array.from({ length: count }).map((_, idx) => (
        <Grid item xs={12} sm={6} md={3} key={idx}>
          <Card sx={{ borderRadius: 2, p: 2, boxShadow: 2 }}>
            <Skeleton variant="text" width="60%" height={32} />
            <Skeleton variant="rectangular" height={50} sx={{ my: 1, borderRadius: 1 }} />
            <Skeleton variant="text" width="40%" height={20} />
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default { TableSkeleton, CardSkeleton };
