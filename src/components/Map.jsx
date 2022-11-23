import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMapEvent } from 'react-leaflet'
import uuid from 'react-uuid';
import 'leaflet/dist/leaflet.css';
import './Map.css'
import { useDispatch, useSelector } from "react-redux";
import { addProject, clearStore, deleteProject } from "../features/projectsSlice";
import L from 'leaflet'
import { BiNotepad } from 'react-icons/bi'
import { MdSettingsApplications } from 'react-icons/md'
import { VscEdit } from 'react-icons/vsc'
import { RiDeleteBinLine } from 'react-icons/ri'
import { GiConfirmed } from 'react-icons/gi'
import { ImCancelCircle } from 'react-icons/im'

const myIconIrrigation = new L.Icon({
    iconUrl:
        'https://freesvg.org/img/1413121417.png',
    iconRetinaUrl:
        'https://freesvg.org/img/1413121417.png',
    popupAnchor: [-0, -0],
    iconSize: [30, 30],
})

const myIconFreezanz = new L.Icon({
    iconUrl:
        'https://www.vivaiogiannini.com/vivgia-files/uploads/2015/07/no-mosquito.png',
    iconRetinaUrl:
        'https://www.vivaiogiannini.com/vivgia-files/uploads/2015/07/no-mosquito.png',
    popupAnchor: [-0, -0],
    iconSize: [40, 40],
})



function LocationMarker(props) {
    const [noteClicked, setNoteClicked] = useState(false)
    const [detailsClicked, setDetailsClicked] = useState(false)
    const dispatch = useDispatch()
    const projectsArray = useSelector(state => state.list.projectsList)

    useEffect(() => {
        const attribution = document.querySelector('.leaflet-control-attribution')
        attribution.style.display = 'none'
        // dispatch(clearStore())
    }, [])

    useEffect(() => {
        if (map1 && props.goToCoords) {
            map1.fireEvent('click', props.goToCoords)
            props.setMapCover(true)
        }
    }, [props.goToCoords])

    const map1 = useMapEvent('click', () => {
        if (props.goToCoords) {
            map1.setView(props.goToCoords, 13)
        }
    })

    const map = useMapEvents({
        click(e) {
            if (props.newProjectInfo) {
                dispatch(addProject({ ...props.newProjectInfo, id: uuid(), location: [e.latlng.lat, e.latlng.lng] }))
                props.setNewProjectInfo(null)
            }

            if (detailsClicked) {
                setDetailsClicked(false)
            }

            if (noteClicked) {
                setNoteClicked(false)
            }
        },
    })

    return projectsArray.length === 0 ? null : (
        projectsArray.map((marker) =>
            <Marker position={marker.location} key={marker.id} icon={marker.projectType === 'navodnjavanje' ? myIconIrrigation : myIconFreezanz}>
                <Popup style={{ width: '300px' }}>
                    <div className="popup-container" style={{ backgroundColor: marker.projectType === 'freezanz' ? '#90EE90' : '#7CB9E8' }}>
                        <span className="heading">
                            <p>{marker.projectType}</p>
                            <span>
                                <p>{marker.status}</p>
                                {marker.status === 'zazimljen' && <span className="winter-date">{marker.winterDate}</span>}
                            </span>
                        </span>
                        <span className="body">
                            <span>{marker.projectType === 'navodnjavanje' ?
                                <>
                                    <p>vrsta navodnjavanja:</p>{marker.irrigationType}
                                </>
                                :
                                <>
                                    <p>model uredjaja:</p>{marker.model}</>}
                            </span>
                            <span><p>datum postavke sistema:</p>{marker.installDate}</span>
                            <span><p>datum poslednjeg obilaska:</p>{marker.refillDate}</span>
                            <span><p>kontakt osoba:</p>{marker.contact}</span>
                            {marker.projectType === 'freezanz' && <span className="details-wrapper"><p>konfiguracija:</p><p onClick={() => { setDetailsClicked(!detailsClicked); setNoteClicked(false) }} className='details-icon'><MdSettingsApplications size={30} /></p></span>}
                            <span className="note-wrapper"><p>napomena:</p><p onClick={() => { setNoteClicked(!noteClicked); setDetailsClicked(false) }} className='note-icon'><BiNotepad size={30} /></p></span>

                            {noteClicked && <p className="note" style={{ backgroundColor: marker.projectType === 'navodnjavanje' ? '#7CB9E8' : '#90EE90' }}>{marker.note ? marker.note : '---nema podataka---'}</p>}
                            {detailsClicked && <div className="details">
                                <span>
                                    <p>proizvod 1: </p>{marker.product1}
                                    <p>dnevno radi: </p>{marker.workTime1}<p>sec</p>
                                    <p>na </p>{marker.consumption1} <p>%</p>
                                </span>
                                {marker.product2 && marker.workTime2 &&
                                    <span>
                                        <p>proizvod 2: </p>{marker.product2}
                                        <p>dnevno radi: </p>{marker.workTime2}<p>sec</p>
                                        <p>na </p>{marker.consumption2} <p>%</p>
                                    </span>}
                                {marker.product3 && marker.workTime3 &&
                                    <span>
                                        <p>proizvod 3: </p>{marker.product3}
                                        <p>dnevno radi: </p>{marker.workTime3}<p>sec</p>
                                        <p>na </p>{marker.consumption3} <p>%</p>
                                    </span>}
                                <span style={{ display: "flex", justifyContent: 'center' }}>
                                    <p style={{ marginRight: '20px' }}>broj dizni: </p>{marker.nozzles}
                                </span>
                            </div>}
                        </span>
                        <span className="footer">
                            <span onClick={() => {
                                props.setEditProjectInfo(marker); props.setMenuClicked({
                                    menu: false,
                                    newProject: false,
                                    projectsList: false
                                })
                            }}><p>izmeni sistem</p><VscEdit size={20} /></span>
                            <span onClick={() => props.setDeleteClicked(marker.id)}><p>obrisi sistem</p><RiDeleteBinLine size={20} /></span>
                        </span>
                    </div>
                </Popup>
            </Marker >
        )
    )
}

const Map = (props) => {
    const [deleteClicked, setDeleteClicked] = useState(null)
    const [mapCover, setMapCover] = useState(false)
    const dispatch = useDispatch()

    function handleDeleteProject(id) {
        dispatch(deleteProject(id))
        setDeleteClicked(null)
    }

    return < div className="map-container" >
        <MapContainer
            center={props.goToCoords ? props.goToCoords : [45.267136, 19.833549]}
            zoom={8}
            scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {mapCover && <div className="map-cover" onClick={() => { setMapCover(false); props.setGoToCoords(null) }}><p>klikni bilo gde na mapu</p></div>
            }
            <LocationMarker newProjectInfo={props.newProjectInfo} setNewProjectInfo={props.setNewProjectInfo} setDeleteClicked={setDeleteClicked} setEditProjectInfo={props.setEditProjectInfo} setMenuClicked={props.setMenuClicked} goToCoords={props.goToCoords} setMapCover={setMapCover} />
        </MapContainer >
        {deleteClicked && <>
            <div className="modal"></div>
            <div className="confirmation-wrapper">
                <p>Da li si siguran da zelis da obrises ovaj sistem?</p>
                <span>
                    <span className="yes" onClick={() => handleDeleteProject(deleteClicked)}><p>Da</p><GiConfirmed size={30} /></span>
                    <span className="no" onClick={() => setDeleteClicked(null)}><p>Ne</p><ImCancelCircle size={30} /></span>
                </span>
            </div></>}
    </div >
}

export default Map