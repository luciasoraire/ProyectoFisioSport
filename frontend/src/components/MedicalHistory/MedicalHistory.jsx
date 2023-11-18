import React from 'react';
import { useTable, usePagination } from 'react-table';
import { useDispatch, useSelector } from "react-redux"
import { filterByDNIOrEmail } from '../../Redux/Actions/Actions';

const MedicalHistory = () => {

    const dispatch = useDispatch()

    const medicalHistory = useSelector(state => state.medicalHistory)

    const columns = React.useMemo(
        () => [
            {
                Header: 'DNI',
                accessor: 'Patient.dni', // Acceder a la propiedad dni dentro de Patient
            },
            {
                Header: 'Nombre',
                accessor: 'Patient.name', // Acceder a la propiedad name dentro de Patient
            },
            {
                Header: 'Apellido',
                accessor: 'Patient.lastname', // Acceder a la propiedad lastname dentro de Patient
            },
            {
                Header: 'Paciente Email',
                accessor: 'Patient.email', // Acceder a la propiedad email dentro de Patient
            },
            {
                Header: 'Diagnóstico',
                accessor: 'diagnostic',
            },
            {
                Header: 'Notas',
                accessor: 'notes',
            },
            {
                Header: 'Antecedentes',
                accessor: 'background',
            },
        ],
        []
    );

    const data = React.useMemo(() => medicalHistory, [medicalHistory]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        state: { pageIndex },
    } = useTable({ columns, data, initialState: { pageIndex: 0, pageSize: 20 } }, usePagination);

    const handleFilterChange = (e) => {      
        console.log(e.target.name);
        dispatch(filterByDNIOrEmail({stateName: 'medicalHistory', stateNameToFilter: 'medicalHistoryToFilter', propertyName:e.target.name, value: e.target.value}))
    }

    return (
        <div>
            <input type="text" name='dni' onChange={handleFilterChange} placeholder='DNI' />
            <input type="text" name='email' onChange={handleFilterChange} placeholder='EMAIL' />

            <table
                {...getTableProps()}

            >
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()} >
                            {headerGroup.headers.map((column) => (
                                <th
                                    {...column.getHeaderProps()}

                                >
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()} style={{ borderBottom: '1px solid #ddd' }}>
                                {row.cells.map((cell) => (
                                    <td {...cell.getCellProps()} style={{ padding: '8px' }}>
                                        {cell.render('Cell')}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div>
                <span>
                    Página{' '}
                    <strong>
                        {pageIndex + 1} de {pageOptions.length}
                    </strong>{' '}
                </span>
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                </button>
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    Anterior
                </button>
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    Siguiente
                </button>
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {'>>'}
                </button>
            </div>
        </div>
    )
}

export default MedicalHistory