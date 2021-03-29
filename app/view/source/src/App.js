import React, {useEffect, useRef, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Button,
    TextField
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {KeyboardDateTimePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import {format} from 'date-fns';


const useStyles = makeStyles({
    wrapper: {
        margin: '20px 0',
    },
    table: {
        minWidth: 650,
    },
    remove: {
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '1.2rem',
        '&:hover': {
            color: "#f00",
        },
    },
    edit: {
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '1.2rem',
        '&:hover': {
            color: "#0f0",
        },
    },
    editRow: {
        background: '#efffe0'
    },
    sendBtn: {
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '1.2rem',
        '&:hover': {
            background: '#e0ffc4'
        }
    },
});


export default function DenseTable() {

    const classes = useStyles();

    const [users, setUsers] = useState([]);
    const [edit, setEdit] = useState(null);
    const [userPanel, setUserPanel] = useState(false);
    const [afterDate, setAfterDate] = useState(new Date("2018-01-01 00:00:00"));
    const [beforeDate, setBeforeDate] = useState(new Date());
    const [filter, setFilter] = useState({offset: 0, limit: 10, afterDate, beforeDate});

    const tableHead = useRef([]);
    const usersCount = useRef(0);
    const offsetField = useRef(null);
    const limitField = useRef(null);
    const nameField = useRef(null);

    useEffect(() => {

        fetch(`http://localhost:8080/users?offset=${filter.offset}&limit=${filter.limit}&filter[afterDate]=${format(filter.afterDate, 'yyyy-MM-dd HH:mm:ss')}&filter[beforeDate]=${format(filter.beforeDate, 'yyyy-MM-dd HH:mm:ss')}` + (filter.name ? `&filter[name]=${filter.name}` : ''))
            .then((response) => {
                return response.json();
            })
            .then((data) => {

                tableHead.current = ['id', 'username', 'first_name', 'last_name', 'email', 'gender', 'created', 'modified', 'delete', 'edit'];
                usersCount.current = data['count'];
                setUsers(data['data']);

            });

    }, [filter]);

    function removeHandler(e) {

        const id = +e.target.parentElement.parentElement.cells[0].innerHTML;

        fetch(`http://localhost:8080/users/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setUsers(users.filter(user => +user.id !== id));
                alert(data);
            });

    }

    function editHandler(e) {

        const cells = e.target.parentElement.parentElement.cells;
        let edit = {};
        for (let i = 0; i < cells.length - 2; i++) {
            edit[tableHead.current[i]] = cells[i].innerHTML;
        }
        setEdit(edit);

    }

    function sendHandler(e) {

        const newUsers = [...users];

        for (let i = 0; i < newUsers.length; i++) {
            if (newUsers[i].id === edit.id) {
                newUsers[i] = edit;
                break;
            }
        }

        fetch(`http://localhost:8080/users/${edit.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(edit)
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.error) {
                    alert(data.error);
                } else {
                    setUsers(newUsers);
                    setEdit(null);
                    alert(data);
                }
            });

    }

    function addHandler(e) {

        let newUser = {};
        const newUserField = ['username', 'first_name', 'last_name', 'email', 'gender'];
        Array.prototype.forEach.call(Array.prototype.slice.call(e.target.parentElement.cells, 0, -1), (cell, i) => newUser[newUserField[i]] = cell.lastChild.value);

        const date = format(new Date(), 'yyyy-MM-dd HH:mm:ss');

        fetch(`http://localhost:8080/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.error) {
                    alert(data.error);
                } else {
                    setUserPanel(false);
                    setUsers([...users, {...newUser, id: data, created: date, modified: date}])
                    alert(data);
                }
            });

    }

    return (
        <>
            <TableContainer className={classes.wrapper} component={Paper}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            {tableHead.current.map((value, i) => (
                                <TableCell key={i} align="center">{value}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map(user => (
                            <TableRow key={user.id}>
                                <TableCell component="th" scope="row" align="center">
                                    {user.id}
                                </TableCell>
                                <TableCell align="center">{user.username}</TableCell>
                                <TableCell align="center">{user.first_name}</TableCell>
                                <TableCell align="center">{user.last_name}</TableCell>
                                <TableCell align="center">{user.email}</TableCell>
                                <TableCell align="center">{user.gender}</TableCell>
                                <TableCell align="center">{user.created}</TableCell>
                                <TableCell align="center">{user.modified}</TableCell>
                                <TableCell align="center"><span className={classes.remove}
                                                                onClick={removeHandler}>X</span></TableCell>
                                <TableCell align="center"><span className={classes.edit} onClick={editHandler}>E</span></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Typography style={{float: 'right', margin: '0 20px'}}
                            variant="button">Count: {usersCount.current}</Typography>
                {
                    edit ?
                        <>
                            <Typography variant="h6" align="center">Edit</Typography>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        {
                                            tableHead.current.slice(0, -2).map((value, i) => (
                                                <TableCell key={i} align="center">{value}</TableCell>
                                            ))
                                        }
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow className={classes.editRow}>
                                        {Object.values(edit).map((value, i) => (
                                            <TableCell key={i} align="center">
                                                {
                                                    i === 0 || i === 6 || i === 7 ? value :
                                                        <input type="text" name="input" value={value}
                                                               onChange={(e) => setEdit({
                                                                   ...edit,
                                                                   [tableHead.current[i]]: e.target.value
                                                               })}/>
                                                }
                                            </TableCell>
                                        ))}
                                        <TableCell align="center" className={classes.sendBtn}
                                                   onClick={sendHandler}>Send</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </>
                    : null
                }
            </TableContainer>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'end', margin: '20px 0'}}>
                <TextField size="small" label="Name" defaultValue={filter.name} ref={nameField}/>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDateTimePicker
                        variant="inline"
                        ampm={false}
                        label="After Date"
                        value={afterDate}
                        onChange={setAfterDate}
                        onError={console.log}
                        format="yyyy-MM-dd HH:mm:ss"
                    />
                    <KeyboardDateTimePicker
                        variant="inline"
                        ampm={false}
                        label="Before Date"
                        value={beforeDate}
                        onChange={setBeforeDate}
                        onError={console.log}
                        format="yyyy-MM-dd HH:mm:ss"
                    />
                </MuiPickersUtilsProvider>
                <TextField size="small" type="number" label="Offset" defaultValue={filter.offset} ref={offsetField}/>
                <TextField size="small" type="number" label="Limit" defaultValue={filter.limit} ref={limitField}/>
                <Button variant="contained" onClick={e => setFilter({
                    offset: +offsetField.current.lastChild.lastChild.value,
                    limit: +limitField.current.lastChild.lastChild.value,
                    name: nameField.current.lastChild.lastChild.value,
                    afterDate,
                    beforeDate
                })}>Apply Filters</Button>
            </div>
            <Button onClick={(e) => setUserPanel(!userPanel)} variant="contained">New User</Button>
            {
                userPanel ?
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                {
                                    tableHead.current.slice(1, -4).map((value, i, arr) => (
                                        <TableCell key={i} align="center">{value}</TableCell>
                                    ))
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow className={classes.editRow}>
                                {
                                    tableHead.current.slice(1, -4).map((value, i) => (
                                        <TableCell key={i} align="center">
                                            <input type="text" name="input"/>
                                        </TableCell>
                                    ))
                                }
                                <TableCell align="center" className={classes.sendBtn}
                                           onClick={addHandler}>ADD</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                : null
            }
        </>
    );

}