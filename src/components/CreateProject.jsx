import React, { useRef, useState } from "react";
import { useEffect } from "react";
import './CreateProject.css'

const CreateProject = (props) => {
    const [error, setError] = useState(false)
    const [projectType, setProjectType] = useState('navodnjavanje')
    const [deviceModel, setDeviceModel] = useState('evolution')
    const [systemStatus, setSystemStatus] = useState('aktivan')

    const pType = useRef(null)
    const installDate = useRef(null)
    const winterDate = useRef(null)
    const status = useRef(null)
    const contact = useRef(null)
    const note = useRef(null)
    const model = useRef(null)
    const refillDate = useRef(null)
    const irrigationType = useRef(null)
    const product1 = useRef(null)
    const product2 = useRef(null)
    const product3 = useRef(null)
    const consumption1 = useRef(null)
    const consumption2 = useRef(null)
    const consumption3 = useRef(null)
    const nozzles = useRef(null)
    const workTime1 = useRef(null)
    const workTime2 = useRef(null)
    const workTime3 = useRef(null)
    const refill1 = useRef(null)
    const refill2 = useRef(null)
    const refill3 = useRef(null)


    function handleSystemStatus(e) {
        setSystemStatus(e.target.value)
    }

    function handleProjectTypeRef(e) {
        setProjectType(e.target.value)
    }

    function handleDeviceModelRef(e) {
        setDeviceModel(e.target.value)
    }


    function submitProjectInfo() {
        if (projectType === 'navodnjavanje') {
            if (projectType && irrigationType.current.value &&
                installDate.current.value && refillDate.current.value &&
                status.current.value && contact.current.value &&
                note.current.value) {
                setError(false)
                const newProject = {
                    projectType,
                    irrigationType: irrigationType.current.value,
                    installDate: installDate.current.value,
                    refillDate: refillDate.current.value,
                    winterDate: winterDate.current.value ? winterDate.current.value : 'nema datuma',
                    status: status.current.value,
                    contact: contact.current.value,
                    note: note.current.value
                }
                props.setNewProjectInfo(newProject)
                props.setMenuClicked(oldState => {
                    return {
                        ...oldState, menu: !oldState.menu, newProject: false, projectsList: false
                    }
                })
            } else { setError(true) }
        } else if (projectType === 'freezanz') {
            if (projectType && model.current.value &&
                installDate.current.value && product1.current.value &&
                consumption1.current.value && workTime1.current.value &&
                nozzles.current.value && refillDate.current.value &&
                status.current.value && contact.current.value &&
                note.current.value) {
                setError(false)
                const newProject = {
                    projectType,
                    model: model.current.value,
                    installDate: installDate.current.value,
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
                    refillDate: refillDate.current.value,
                    winterDate: winterDate.current.value ? winterDate.current.value : null,
                    status: status.current.value,
                    contact: contact.current.value,
                    note: note.current.value
                }
                props.setNewProjectInfo(newProject)
                props.setMenuClicked(oldState => {
                    return {
                        ...oldState, menu: !oldState.menu, newProject: false, projectsList: false
                    }
                })

            } else {
                setError(true)
            }
        }

    }

    function projectTypeInput(type) {
        if (type === 'navodnjavanje' || type === '') {
            return <div>
                <span className="select-field">
                    <p>Vrsta navodnjavanja:</p>
                    <select name="irrigation" ref={irrigationType}>
                        <option value="vocnjak">vocnjak</option>
                        <option value="dvoriste">dvoriste</option>
                        <option value="ostalo">ostalo</option>
                    </select>
                </span>
                <span className="select-field">
                    <p>Datum postavke:</p>
                    <input type="date" ref={installDate} />
                </span>
                <span className="select-field">
                    <p>Datum poslednjeg obilaska:</p>
                    <input type="date" ref={refillDate} />
                </span>
                <span className="select-field">
                    <p>Datum zazimljavanja:</p>
                    <input type="date" ref={winterDate} className='boolean' disabled={systemStatus === 'aktivan' ? 'disabled' : null} />
                </span>
                <span className="select-field">
                    <p>Status:</p>
                    <select name="status" ref={status} onChange={(e) => handleSystemStatus(e)}>
                        <option value="aktivan">aktivan</option>
                        <option value="zazimljen">zazimljen</option>
                    </select>
                </span>
                <span className="select-field">
                    <p>Kontakt osoba:</p>
                    <input type="text" placeholder="ime osobe i broj telefona" ref={contact} />
                </span>
                <span className="select-field">
                    <p>Napomena:</p>
                    <textarea placeholder="utrosen materijal, radni sati, cena sistema..." ref={note}></textarea>
                </span>
                <button className="submit-btn" onClick={submitProjectInfo}>klikni da odaberes lokaciju</button>
            </div>
        } else if (type === 'freezanz') {
            return <div>
                <span className="select-field freezanz">
                    <p>Model uredjaja:</p>
                    <select name="model" ref={model} onChange={(e) => handleDeviceModelRef(e)}>
                        <option value="evolution">Evolution</option>
                        <option value="garden-start">Garden Start</option>
                        <option value="garden-biactive">Garden Biactive</option>
                        <option value="3-p-park">Park</option>
                    </select>
                </span>
                <span className="select-field freezanz">
                    <p>Datum postavke:</p>
                    <input type="date" ref={installDate} />
                </span>
                <span className="wrapper">
                    <span>
                        <span className="consumption">
                            <p>Proizvodi:</p>
                            <span>
                                <input type="text" placeholder="proizvod 1" ref={product1} />
                                {deviceModel === 'garden-start' || deviceModel === 'garden-biactive' || deviceModel === '3-p-park' ? < input type="text" placeholder="proizvod 2" ref={product2} /> : null}
                                {deviceModel === '3-p-park' && < input type="text" placeholder="proizvod 3" ref={product3} />}
                            </span>
                        </span>
                        <span className="consumption">
                            <p>Utrosak:</p>
                            <span>
                                <input type="number" placeholder="%" min={0} ref={consumption1} />
                                {deviceModel === 'garden-start' || deviceModel === 'garden-biactive' || deviceModel === '3-p-park' ? <input type="number" placeholder="%" min={0} ref={consumption2} /> : null}
                                {deviceModel === '3-p-park' && <input type="number" placeholder="%" min={0} ref={consumption3} />}
                            </span>
                        </span>
                    </span>
                    <span className="consumption-wrapper">
                        <span className="consumption">
                            <p style={{ whiteSpace: 'nowrap' }}>Vreme rada:</p>
                            <span>
                                <input type="number" placeholder="sek" min={0} ref={workTime1} />
                                {deviceModel === 'garden-start' || deviceModel === 'garden-biactive' || deviceModel === '3-p-park' ? <input type="number" placeholder="sek" min={0} ref={workTime2} /> : null}
                                {deviceModel === '3-p-park' && <input type="number" placeholder="sek" min={0} ref={workTime3} />}
                            </span>
                        </span>
                        <span className="consumption">
                            <p>Dopunjeno:</p>
                            <span>
                                <input type="number" placeholder="ml" min={0} ref={refill1} />
                                {deviceModel === 'garden-start' || deviceModel === 'garden-biactive' || deviceModel === '3-p-park' ? <input type="number" placeholder="ml" min={0} ref={refill2} /> : null}
                                {deviceModel === '3-p-park' && <input type="number" placeholder="ml" min={0} ref={refill3} />}
                            </span>
                        </span>
                    </span>
                    <span>
                        <span className="consumption nozz">
                            <p>Broj dizni:</p>
                            <span className="nozz-count">
                                <input type="number" ref={nozzles} min={0} />
                            </span>
                        </span>
                    </span>
                </span>
                <span className="select-field freezanz">
                    <p>Datum poslednjeg obilaska:</p>
                    <input type="date" ref={refillDate} />
                </span>
                <span className="select-field freezanz">
                    <p>Datum zazimljavanja:</p>
                    <input type="date" ref={winterDate} className='boolean' disabled={systemStatus === 'aktivan' ? 'disabled' : null} />
                </span>
                <span className="select-field freezanz">
                    <p>Status:</p>
                    <select name="status" ref={status} onChange={(e) => handleSystemStatus(e)}>
                        <option value="aktivan">aktivan</option>
                        <option value="zazimljen">zazimljen</option>
                    </select>
                </span>
                <span className="select-field freezanz">
                    <p>Kontakt osoba:</p>
                    <input type="text" placeholder="ime osobe i broj telefona" ref={contact} />
                </span>
                <span className="select-field freezanz">
                    <p>Napomena:</p>
                    <textarea placeholder="duzina cevi, cena sistema..." ref={note}></textarea>
                </span>
                <button className="freezanz-btn" onClick={submitProjectInfo}>klikni da odaberes lokaciju</button>
            </div >
        }
    }

    return <div className="project-create-container">
        <span className={projectType === 'navodnjavanje' ? "select-field" : 'select-field freezanz'}>
            <p>Tip projekta:</p>
            <select name="project-type" id="" ref={pType} onChange={(e) => handleProjectTypeRef(e)}>
                <option value="navodnjavanje">navodnjavanje</option>
                <option value="freezanz">freezanz</option>
            </select>
        </span>
        {projectTypeInput(projectType)}
        {error && <p className="error-msg">Unesi sve podatke</p>}
    </div>
}

export default CreateProject