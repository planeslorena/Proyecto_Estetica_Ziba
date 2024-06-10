import {
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'
import './adminTable.css'

interface tableProps {
    data: any[];
    columns: any[];
}

export const AdminTable: React.FC<tableProps> = ({ data, columns }) => {

    const [sorting, setSorting] = useState<SortingState>([]);
    const [filtering, setFiltering] = useState("");

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting,
            globalFilter: filtering,
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering,
    });

    return (
        <div className="p-2">
            <div className='d-flex flex-row justify-content-between'>
                <input className='inputbuscador-admin' placeholder="Buscar "
                    type='text'
                    value={filtering}
                    onChange={e => setFiltering(e.target.value)}
                />
                <button className='button-agregar'>Agregar cliente </button>
            </div>
            <table className='table-admin-container'>
                <thead className='table-admin-thead'>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th className='table-admin-th' key={header.id}
                                    onClick={header.column.getToggleSortingHandler()}
                                >
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                    {
                                        { 'asc': <i className="bi bi-sort-down-alt icon-down" />, 'desc': <i className="bi bi-sort-up icon-up" /> }[header.column.getIsSorted() as string] ?? <i className="bi bi-arrow-down-up icon-double-arrow" />
                                    }
                                </th>
                            ))}
                            <th className='table-admin-th'>Ajustes</th>
                        </tr>
                    ))}
                </thead>
                <tbody className='body-ajustes'>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <td className='table-admin-td' key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                            <td table-admin-td><i className='bi bi-pencil' /> <i className='bi bi-trash3' /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <i onClick={() => table.setPageIndex(0)} className="bi bi-chevron-double-left"></i>
            <i onClick={() => table.previousPage} className="bi bi-chevron-left"></i>
            <i onClick={() => table.nextPage} className="bi bi-chevron-right"></i>
            <i onClick={() => table.setPageIndex(table.getPageCount() - 1)} className="bi bi-chevron-double-right"></i>
            <div className="h-4" />
        </div>
    );

}
