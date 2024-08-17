import React, { useState, ReactNode } from 'react';
import './GenericTable.scss';
import { RawText } from '../RawText/RawText';

interface Column<T> {
  className?: string;
  field: keyof T;
  label: string;
  render?: (value: any, item: T) => React.ReactNode;
}

interface GenericTableProps<T> {
  columns: Column<T>[];
  data: T[];
}

const isReactNode = (value: any): value is ReactNode => {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean' ||
    React.isValidElement(value) ||
    value === null ||
    value === undefined
  );
};

const GenericTable = <T,>({ columns, data }: GenericTableProps<T>) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginateData = (data: T[]) => {
    return data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  };

  const renderCellValue = (value: any) => {
    if (typeof value === 'string') {
      return <RawText text={value} fontSize={14} />;
    } else if (isReactNode(value)) {
      return value;
    }
    return String(value);
  };
  
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={String(column.field)} className={column.className || ''}>
                <RawText text={column.label} fontSize={16} fontWeight={700}/></th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginateData(data).map((item, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column) => (
                <td key={String(column.field)} className={column.className || ''}>
                  {column.render
                    ? column.render(item[column.field], item)
                    : renderCellValue(item[column.field])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => handleChangePage(page - 1)} disabled={page === 0}>
          Previous
        </button>
        <span>{page + 1}</span>
        <button
          onClick={() => handleChangePage(page + 1)}
          disabled={page >= Math.ceil(data.length / rowsPerPage) - 1}
        >
          Next
        </button>
        <select value={rowsPerPage} onChange={handleChangeRowsPerPage}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
        </select>
      </div>
    </div>
  );
};

export default GenericTable;
