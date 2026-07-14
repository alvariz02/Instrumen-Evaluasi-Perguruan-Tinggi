'use client';

import React from 'react';

interface TableFieldProps {
  columns: string[];
  rows: Array<{ id: string; values: string[] }>;
  value: Record<string, string>;
  onChange: (value: Record<string, string>) => void;
}

export default function TableField({ columns, rows, value, onChange }: TableFieldProps) {
  const handleCellChange = (rowId: string, colIndex: number, cellValue: string) => {
    onChange({
      ...value,
      [`${rowId}_${colIndex}`]: cellValue,
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-50">
            {columns.map((column, index) => (
              <th key={index} className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              {row.values.map((cellValue, colIndex) => (
                <td key={colIndex} className="border border-gray-300 px-2 py-1">
                  {colIndex === 0 ? (
                    <span className="text-sm text-gray-700">{cellValue}</span>
                  ) : (
                    <input
                      type="text"
                      value={value[`${row.id}_${colIndex}`] || ''}
                      onChange={(e) => handleCellChange(row.id, colIndex, e.target.value)}
                      className="w-full px-2 py-1 text-sm border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Username"
                    />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
