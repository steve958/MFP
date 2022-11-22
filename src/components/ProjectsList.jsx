import React, { useState } from "react";
import './ProjectsList.css'
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { calcDepletion, filterType } from "../helpers/filterFunctions";
import { GrMapLocation } from 'react-icons/gr'

const ProjectsList = (props) => {
    const [displayArray, setDisplayArray] = useState([])
    const projectsArray = useSelector(state => state.list.projectsList)
    useEffect(() => {
        setDisplayArray(filterType(projectsArray))
    }, [projectsArray])

    function handleGoToCoords(coordsArray) {
        props.setGoToCoords(coordsArray)
    }


    return <div className="projects-list-container">
        {displayArray.length === 0 ? <p>--nema aktivnih freezanz projekata--</p> : <div className="list-wrapper">
            {displayArray.map(system => {
                return <div className="system" key={system.id}>
                    <span>
                        <p>{system.contact}</p>
                        <span className="go-to-icon" onClick={() => handleGoToCoords(system.location)}><GrMapLocation size={30} color="white" /></span>
                    </span>
                    <span className="depletion">
                        <p>{calcDepletion(system.workTime1, system.consumption1, system.nozzles, system.refill1, system.refillDate)} {calcDepletion(system.workTime1, system.consumption1, system.nozzles, system.refill1, system.refillDate) === 1 ? 'dan' : 'dana'} do praznjenja rezervoara 1</p>
                        {system.product2 && <p>{calcDepletion(system.workTime2, system.consumption2, system.nozzles, system.refill2, system.refillDate)} {calcDepletion(system.workTime2, system.consumption2, system.nozzles, system.refill2, system.refillDate) === 1 ? 'dan' : 'dana'} do praznjenja rezervoara 2</p>}
                        {system.product3 && <p>{calcDepletion(system.workTime3, system.consumption3, system.nozzles, system.refill3, system.refillDate)} {calcDepletion(system.workTime3, system.consumption3, system.nozzles, system.refill3, system.refillDate) === 1 ? 'dan' : 'dana'} do praznjenja rezervoara 3</p>}
                    </span>
                </div>
            })}
        </div>}
    </div>
}

export default ProjectsList