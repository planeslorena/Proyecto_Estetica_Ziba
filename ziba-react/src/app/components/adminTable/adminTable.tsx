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
import { AddClient } from '../modalsAdmin/clients';
import { AddProfessional } from '../modalsAdmin/professional';
import { AddServices } from '../modalsAdmin/services';
import { AddAppoinments } from '../modalsAdmin/appointments';

interface tableProps {
    data: any[];
    columns: any[];
    filter: string;
}

export const AdminTable: React.FC<tableProps> = ({ data, columns, filter }) => {

    const [showClient, setShowClient] = useState(false);
    const [showProfessional, setShowProfessional] = useState(false);
    const [showAppointments, setShowAppointments] = useState(false);
    const [showServices, setShowServices] = useState(false);

    const [showEditClient, setShowEditClient] = useState<number>();
    const [showEditProfessional, setShowEditProfessional] = useState<number>();
    /* const [showEditAppointments, setShowEditAppointments] = useState<number>(); */
    const [showEditServices, setShowEditServices] = useState<number>();

    const handleClose = () => {
        switch (filter) {
            case "Clientes":
                setShowClient(false)
                break;
            case "Profesionales":
                setShowProfessional(false)
                break;
            case "Turnos":
                setShowAppointments(false)
                break;
            case "Servicios":
                setShowServices(false)
                break;
        }
    };

    const handleShow = () => {
        switch (filter) {
            case "Clientes":
                setShowClient(true)
                break;
            case "Profesionales":
                setShowProfessional(true)
                break;
            case "Turnos":
                setShowAppointments(true)
                break;
            case "Servicios":
                setShowServices(true)
                break;
        }
    };

    const handleShowEdit = (id: any) => {
        switch (filter) {
            case "Clientes":
                setShowEditClient(id)
                break;
            case "Profesionales":
                setShowEditProfessional(id)
                break;
            /* case "Turnos":
                setShowEditAppointments(id)
                break; */
            case "Servicios":
                setShowEditServices(id)
                break;
        }
    };

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
                <button onClick={handleShow} className='button-agregar'>Agregar {filter} +</button>
                
                    <AddClient show={showClient} handleClose={handleClose} />
                    <AddProfessional show={showProfessional} handleClose={handleClose} />
                    <AddServices show={showServices} handleClose={handleClose} />
                    <AddAppoinments show= {showAppointments} handleClose={handleClose}/>

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
                            <td table-admin-td>
                                {filter !== 'Turnos' &&
                                    <i onClick={() => handleShowEdit(row.original.id)} className='bi bi-pencil icon-pencil'/> 
                                }
                                <AddClient data={row.original} show={row.original.id == showEditClient} handleClose={() => setShowEditClient(0)} />
                                <AddProfessional data={row.original} show={row.original.id == showEditProfessional} handleClose={() => setShowEditProfessional(0)} />
                                <AddServices data={row.original} show={row.original.id == showEditServices} handleClose={() => setShowEditServices(0)} />
                                {/* <AddAppoinments data={row.original} show= {row.original.id == showEditAppointments} handleClose={() => setShowEditAppointments}/> */}
                                <i className='bi bi-trash3 icon-trash'/>
                            </td>
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