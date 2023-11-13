import { TableContainer, Table, TableBody, TableCell, TableHead, TableRow, IconButton,  makeStyles } from '@material-ui/core'
import { CheckCircle, Delete, Edit} from '@material-ui/icons'
import React, {useState, useCallback, useEffect} from 'react'
import  TextInput  from './TextInput'




const useStyles = makeStyles({
    checkIcon:{
        float:'right'
    },
    iconCell:{
        height:48,
        width:48
    }
})

const SetSerialNoArea = (props) => {
    const classes = useStyles();
    const [index, setIndex] = useState(0)
    const [id, setId] = useState("")
    const [serialNo, setSerialNo] = useState("");
    // const [prevSerialNos, setPrevSerialNos] = useState([])



    const inputSerialNo = useCallback((event) => {
        setSerialNo(event.target.value)
    },[setSerialNo])

    const addSerialNo = (serialNo) => {
        if (index === props.serialNos.length) {
            props.setSerialNos(prevState => [...prevState,  {serial_no:serialNo}])
            setIndex(index + 1)
            setSerialNo("")
        } else {
            const newSerialNos = props.serialNos
            newSerialNos[index] = {serial_no:serialNo, id:id}
            props.setSerialNos(newSerialNos)
            setIndex(newSerialNos.length)
            setSerialNo("")
        }
    };

    const editSerialNo = (index, serialNo, id) => {
        setIndex(index);
        setSerialNo(serialNo);
        setId(id);
        console.log(props.serialNos)
    }

    const deleteSerialNo = async (deleteIndex) => {
        const newSerialNos = props.serialNos.filter((item, i) => i !== deleteIndex);
        props.setSerialNos(newSerialNos)
    }

    useEffect(()=>{
        setIndex(props.serialNos.length)
    },[props.serialNos])


    
    useEffect(()=>{
        if(props.quantity > props.serialNos.length){
            for(let i = props.serialNos.length; i < props.quantity; i ++){
                addSerialNo(i+1)
            }
        }
        else if(props.quantity !="" && props.quantity < props.serialNos.length){
            console.log("quantity is smaller")
            let tempSerialNos = []
            for(let i = 0; i < props.quantity; i++){
                tempSerialNos.push(props.serialNos[i])
            }
            props.setSerialNos(tempSerialNos)
        }
    },[props.quantity])


    


    // const handleSerialNo = () => {
    //     for (let i=0; i < props.quantity; i++){
    //         addSerialNo((i+1).toString());
    //     }
    // }
    return (
        <div>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Serial No</TableCell>
                            <TableCell className={classes.iconCell} />
                            <TableCell className={classes.iconCell} />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            props.serialNos.map((item, i) => (
                                <TableRow key={i}>
                                    <TableCell>{item.serial_no}</TableCell>
                                    <TableCell>
                                        <IconButton className={classes.iconCell} onClick={()=> editSerialNo(i, item.serial_no, item.id)}>
                                            <Edit />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton className={classes.iconCell} onClick={() => deleteSerialNo(i)}>
                                            <Delete />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
                <div>
                    <TextInput
                        fullWidth={true} label={"SerialNo"} multiline={false} required={false}
                        onChange={inputSerialNo} value={serialNo} type={"text"} row={1}
                        variant={"outlined"}
                    />
                </div>
                <IconButton className={classes.checkIcon} onClick={() => addSerialNo(serialNo)}>
                    <CheckCircle />
                </IconButton>
            </TableContainer>
        </div>
    )
}

export default SetSerialNoArea
