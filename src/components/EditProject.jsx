import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { editProject } from "../features/projectsSlice";
import './EditProject.css'

const EditIrrigationProject = (props) => {
    const [systemStatus, setSystemStatus] = useState(props.editProjectInfo.status)
    const winterDate = useRef(props.editProjectInfo.winterDate)
    const status = useRef(props.editProjectInfo.status)
    const contact = useRef(props.editProjectInfo.contact)
    const note = useRef(props.editProjectInfo.note)
    const refillDate = useRef(props.editProjectInfo.refillDate)
    const dispatch = useDispatch()

    function handleSystemStatus(e) {
        setSystemStatus(e.target.value)
    }

    function handleSubmitChanges(sysyemInfo) {
        const editedProject = {
            ...sysyemInfo,
            refillDate: refillDate.current.value,
            winterDate: winterDate.current.value ? winterDate.current.value : 'nema datuma',
            status: status.current.value,
            contact: contact.current.value,
            note: note.current.value
        }
        dispatch(editProject(editedProject))
        props.setEditProjectInfo(null)
    }

    return <div>
        <span className="select-field">
            <p>Datum poslednjeg obilaska:</p>
            <input type="date" ref={refillDate} defaultValue={props.editProjectInfo.refillDate} />
        </span>
        <span className="select-field">
            <p>Datum zazimljavanja:</p>
            <input type="date" ref={winterDate} className='boolean' disabled={systemStatus === 'aktivan' ? 'disabled' : null} defaultValue={props.editProjectInfo.winterDate} />
        </span>
        <span className="select-field">
            <p>Status:</p>
            <select name="status" ref={status} onChange={(e) => handleSystemStatus(e)} defaultValue={props.editProjectInfo.status}>
                <option value="aktivan">aktivan</option>
                <option value="zazimljen">zazimljen</option>
            </select>
        </span>
        <span className="select-field">
            <p>Kontakt osoba:</p>
            <input type="text" placeholder="ime osobe i broj telefona" ref={contact} defaultValue={props.editProjectInfo.contact} />
        </span>
        <span className="select-field">
            <p>Napomena:</p>
            <textarea placeholder="utrosen materijal, radni sati, cena sistema..." ref={note} defaultValue={props.editProjectInfo.note}></textarea>
        </span>
        <button className="submit-btn" onClick={() => handleSubmitChanges(props.editProjectInfo)}>klikni da sacuvas izmene</button>
    </div>
}


const EditFreezanzProject = (props) => {
    const [systemStatus, setSystemStatus] = useState(props.editProjectInfo.status)
    const winterDate = useRef(props.editProjectInfo.winterDate)
    const status = useRef(props.editProjectInfo.status)
    const contact = useRef(props.editProjectInfo.contact)
    const note = useRef(props.editProjectInfo.note)
    const refillDate = useRef(props.editProjectInfo.refillDate)
    const product1 = useRef(null)
    const product2 = useRef(null)
    const product3 = useRef(null)
    const consumption1 = useRef(null)
    const consumption2 = useRef(null)
    const consumption3 = useRef(null)
    const workTime1 = useRef(null)
    const workTime2 = useRef(null)
    const workTime3 = useRef(null)
    const refill1 = useRef(null)
    const refill2 = useRef(null)
    const refill3 = useRef(null)
    const nozzles = useRef(null)
    const dispatch = useDispatch()

    function handleSystemStatus(e) {
        setSystemStatus(e.target.value)
    }

    function handleSubmitChanges(sysyemInfo) {
        const editedProject = {
            ...sysyemInfo,
            refillDate: refillDate.current.value,
            product1: product1.current.value,
            product2: product2.current?.value ? product2.current?.value : null,
            product3: product3.current?.value ? product3.current?.value : null,
            consumption1: consumption1.current.value,
            consumption2: consumption2.current?.value ? consumption2.current?.value : null,
            consumption3: consumption3.current?.value ? consumption3.current?.value : null,
            workTime1: workTime1.current.value,
            workTime2: workTime2.current?.value ? workTime2.current?.value : null,
            workTime3: workTime3.current?.value ? workTime3.current?.value : null,
            refill1: refill1.current.value,
            refill2: refill2.current?.value ? refill2.current?.value : null,
            refill3: refill3.current?.value ? refill3.current?.value : null,
            nozzles: nozzles.current.value,
            winterDate: winterDate.current.value ? winterDate.current.value : 'nema datuma',
            status: status.current.value,
            contact: contact.current.value,
            note: note.current.value
        }
        dispatch(editProject(editedProject))
        props.setEditProjectInfo(null)
    }

    return <div>
        <span className="select-field freezanz">
            <p>Datum poslednjeg obilaska:</p>
            <input type="date" ref={refillDate} defaultValue={props.editProjectInfo.refillDate} />
        </span>
        <span className="wrapper">
            <span>
                <span className="consumption">
                    <p>Proizvodi:</p>
                    <span>
                        <input type="text" placeholder="proizvod 1" ref={product1} defaultValue={props.editProjectInfo.product1} />
                        {props.editProjectInfo.model === 'garden-start' || props.editProjectInfo.model === 'garden-biactive' || props.editProjectInfo.model === '3-p-park' ? < input type="text" placeholder="proizvod 2" ref={product2} defaultValue={props.editProjectInfo.product2} /> : null}
                        {props.editProjectInfo.model === '3-p-park' && < input type="text" placeholder="proizvod 3" ref={product3} defaultValue={props.editProjectInfo.product3} />}
                    </span>
                </span>
                <span className="consumption">
                    <p>Utrosak:</p>
                    <span>
                        <input type="number" placeholder="%" min={0} ref={consumption1} defaultValue={props.editProjectInfo.consumption1} />
                        {props.editProjectInfo.model === 'garden-start' || props.editProjectInfo.model === 'garden-biactive' || props.editProjectInfo.model === '3-p-park' ? <input type="number" placeholder="%" min={0} ref={consumption2} defaultValue={props.editProjectInfo.consumption2} /> : null}
                        {props.editProjectInfo.model === '3-p-park' && <input type="number" placeholder="%" min={0} ref={consumption3} defaultValue={props.editProjectInfo.consumption3} />}
                    </span>
                </span>
            </span>
            <span className="consumption-wrapper">
                <span className="consumption">
                    <p style={{ whiteSpace: 'nowrap' }}>Vreme rada:</p>
                    <span>
                        <input type="number" placeholder="sek" min={0} ref={workTime1} defaultValue={props.editProjectInfo.workTime1} />
                        {props.editProjectInfo.model === 'garden-start' || props.editProjectInfo.model === 'garden-biactive' || props.editProjectInfo.model === '3-p-park' ? <input type="number" placeholder="sek" min={0} ref={workTime2} defaultValue={props.editProjectInfo.workTime2} /> : null}
                        {props.editProjectInfo.model === '3-p-park' && <input type="number" placeholder="sek" min={0} ref={workTime3} defaultValue={props.editProjectInfo.workTime3} />}
                    </span>
                </span>
                <span className="consumption">
                    <p>Dopunjeno:</p>
                    <span>
                        <input type="number" placeholder="ml" min={0} ref={refill1} defaultValue={props.editProjectInfo.refill1} />
                        {props.editProjectInfo.model === 'garden-start' || props.editProjectInfo.model === 'garden-biactive' || props.editProjectInfo.model === '3-p-park' ? <input type="number" placeholder="ml" min={0} ref={refill2} defaultValue={props.editProjectInfo.refill2} /> : null}
                        {props.editProjectInfo.model === '3-p-park' && <input type="number" placeholder="ml" min={0} ref={refill3} defaultValue={props.editProjectInfo.refill3} />}
                    </span>
                </span>
            </span>
            <span>
                <span className="consumption nozz">
                    <p>Broj dizni:</p>
                    <span className="nozz-count">
                        <input type="number" min={0} ref={nozzles} defaultValue={props.editProjectInfo.nozzles} />
                    </span>
                </span>
            </span>
        </span>
        <span className="select-field freezanz">
            <p>Datum zazimljavanja:</p>
            <input type="date" ref={winterDate} className='boolean' disabled={systemStatus === 'aktivan' ? 'disabled' : null} defaultValue={props.editProjectInfo.winterDate} />
        </span>
        <span className="select-field freezanz">
            <p>Status:</p>
            <select name="status" ref={status} onChange={(e) => handleSystemStatus(e)} defaultValue={props.editProjectInfo.status}>
                <option value="aktivan">aktivan</option>
                <option value="zazimljen">zazimljen</option>
            </select>
        </span>
        <span className="select-field freezanz">
            <p>Kontakt osoba:</p>
            <input type="text" placeholder="ime osobe i broj telefona" ref={contact} defaultValue={props.editProjectInfo.contact} />
        </span>
        <span className="select-field freezanz">
            <p>Napomena:</p>
            <textarea placeholder="utrosen materijal, radni sati, cena sistema..." ref={note} defaultValue={props.editProjectInfo.note}></textarea>
        </span>
        <button className="freezanz-btn" onClick={() => handleSubmitChanges(props.editProjectInfo)}>klikni da sacuvas izmene</button>
    </div >
}


const EditProject = (props) => {

    return <>
        <div className="edit-project-container">
            {props.editProjectInfo.projectType === 'navodnjavanje' ? <EditIrrigationProject editProjectInfo={props.editProjectInfo} setEditProjectInfo={props.setEditProjectInfo} setMenuClicked={props.setMenuClicked} /> : <EditFreezanzProject editProjectInfo={props.editProjectInfo} setEditProjectInfo={props.setEditProjectInfo} setMenuClicked={props.setMenuClicked} />}
        </div>
        <div className="cover-right"></div>
        <div className="cover-bottom"></div>
        <div className="cover-top"></div>
    </>
}

export default EditProject