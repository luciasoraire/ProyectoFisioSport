import React, { useEffect, useState } from 'react';
import { useTable, usePagination } from 'react-table';
import { useDispatch, useSelector } from "react-redux"
import { deletePatientInfo, filterByDNIOrEmail } from '../../Redux/Actions/Actions';
import './Patients.css'
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
import EditPatient from '../../modals/EditPatient/EditPatient';
import EditMedicalHistory from '../../modals/EditMedicalHistory/EditMedicalHistory';
import ConfirmDelete from '../../modals/ConfirmDelete/ConfirmDelete';
import { IoMdCloseCircle } from "react-icons/io";
import { IoIosSettings } from "react-icons/io";

const Patients = () => {

    const dispatch = useDispatch()

    const patients = useSelector(state => state.patients)
    const [modalEditPatientShow, setModalEditPatientShow] = useState(false);
    const [modalMedicalHistoryShow, setMedicalHistoryShow] = useState(false);
    const [modalDeleteShow, setDeleteShow] = useState(false);
    
    const [selectedPatient, setSelectedPatient] = useState(null);

    const handleEditClick = (patient, column) => {
        console.log(patient);
        setSelectedPatient(patient);
        if(column === 'medicalHistory') setMedicalHistoryShow(true)
        if(column === 'editPatient') setModalEditPatientShow(true);
        if(column === 'deletePatient') setDeleteShow(true)

    };


    const columns = React.useMemo(
        () => [
            {
                Header: '#',
                accessor: 'id_patient',
            },
            {
                Header: 'DNI',
                accessor: 'dni',
            },
            {
                Header: 'Nombre',
                accessor: 'name',
            },
            {
                Header: 'Apellido',
                accessor: 'lastname',
            },
            {
                Header: 'Email',
                accessor: 'email',
            },
            {
                Header: 'Teléfono',
                accessor: 'phone',
            },
            {
                Header: 'Historial Médico',
                accessor: 'historial_medico',
                Cell: ({ row }) => (
                    <button onClick={() => handleEditClick(row.original, 'medicalHistory')}>Ver</button>
                )
            },
            {
                Header: 'Acciones',
                accessor: 'actions',
                Cell: ({ row }) => (
                    <div className='containerButtonsActions'>
                        <button onClick={() => handleEditClick(row.original, 'editPatient')}><IoIosSettings className='iconActionEdit'/></button>
                        <button onClick={() => handleEditClick(row.original, 'deletePatient')}><IoMdCloseCircle className='iconActionDelete'/></button>
                    </div>
                ),
            }

        ],
        []
    );

    const data = React.useMemo(() => patients, [patients]);

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
        dispatch(filterByDNIOrEmail({ stateName: 'patients', stateNameToFilter: 'patientsToFilter', propertyName: e.target.name, value: e.target.value }))
    }

    return (
        <div className='containerPatients'>
            <div className='titlePatients'>
                <p>Pacientes</p>
            </div>
            <div className='containerFilterPatients'>
                <p>Buscar por:</p>
                <input type="text" name='dni' onChange={handleFilterChange} placeholder='DNI' />
                <input type="text" name='email' onChange={handleFilterChange} placeholder='Email' />

            </div>
            <div className='containerTablePatients'>

                <table {...getTableProps()} className="table">
                    <thead className='thead'>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.map((row) => {
                            prepareRow(row);
                            return (
                                <tr key={row.id} {...row.getRowProps()}>
                                    {row.cells.map((cell) => (
                                        <td key={cell.column.id} {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div className='containerOptionsNavigation'>
                    <div className='containerButtonsNavigation'>
                        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage} className='buttonsArrowsPage'>
                            <MdKeyboardDoubleArrowLeft className='arrowIcon' />
                        </button>
                        <button onClick={() => previousPage()} disabled={!canPreviousPage} className='buttonNavigationPage'>
                            Anterior
                        </button>
                        <button onClick={() => nextPage()} disabled={!canNextPage} className='buttonNavigationPage'>
                            Siguiente
                        </button>
                        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} className='buttonsArrowsPage'>
                            <MdKeyboardDoubleArrowRight className='arrowIcon' />

                        </button>
                    </div>
                    <div className='numberOfPage'>
                        <span>
                            Página{' '}
                            <strong>
                                {pageIndex + 1} de {pageOptions.length}
                            </strong>{' '}
                        </span>
                    </div>
                </div>
            </div>
            <EditPatient
                show={modalEditPatientShow}
                onHide={() => setModalEditPatientShow(false)}
                patient={selectedPatient}
            />
            <EditMedicalHistory
                show={modalMedicalHistoryShow}
                onHide={() => setMedicalHistoryShow(false)}
                patient={selectedPatient}
            />
            <ConfirmDelete
                show={modalDeleteShow}
                onHide={() => setDeleteShow(false)}
                patient={selectedPatient}
            />
        </div>
    )
}

export default Patients