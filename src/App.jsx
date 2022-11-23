import reactLogo from './assets/react.svg';
import './App.css';
import Map from './components/Map'
import 'leaflet/dist/leaflet.css';
import { AiOutlineMenu } from 'react-icons/ai'
import { RiMenuUnfoldFill } from 'react-icons/ri'
import { useEffect, useState } from 'react';
import CreateProject from './components/CreateProject';
import EditProject from './components/EditProject';
import ProjectsList from './components/ProjectsList';

function App() {
  const [newProjectInfo, setNewProjectInfo] = useState(null)
  const [editProjectInfo, setEditProjectInfo] = useState(null)
  const [goToCoords, setGoToCoords] = useState(null)
  const [menuClicked, setMenuClicked] = useState({
    menu: false,
    newProject: false,
    projectsList: false
  })


  function handleMenuClick(prop) {
    if (prop === 'menu') {
      setMenuClicked(oldState => {
        return {
          ...oldState, menu: !oldState.menu, newProject: false, projectsList: false
        }
      })
    } else if (prop === 'new project') {
      setMenuClicked(oldState => {
        return {
          ...oldState, newProject: true, projectsList: false
        }
      })
    } else if (prop === 'projects list') {
      setMenuClicked(oldState => {
        return {
          ...oldState, projectsList: true, newProject: false
        }
      })
    }
  }

  return (
    <div className="App">
      <div className='header'>
        <span className='menu-icon' style={{ width: menuClicked?.menu ? '600px' : '150px' }}>
          <span onClick={() => handleMenuClick('menu')}>
            {!menuClicked?.menu ? <AiOutlineMenu size={40} color='white' /> : <RiMenuUnfoldFill size={40} color='white' />}
          </span>
          {menuClicked?.menu ? <div className='menu-options'>
            <p onClick={() => handleMenuClick('new project')}>Kreiraj nov projekat</p>
            <p onClick={() => handleMenuClick('projects list')}>Lista predstojecih obilazaka</p>
          </div> : <p>OPCIJE</p>}
        </span>
        <div className='header-logo'>
          <img src="https://www.butobu.com/b2b/eu/rs/details/light/api/resizenew.php?zc=0&h=110&src=https://www.butobu.com/b2b/eu/rs/members/logo/72261602871513603788..png" alt="" />
        </div>
      </div>
      <div>
        <a href='' target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div className='content-container'>
        <Map newProjectInfo={newProjectInfo} setNewProjectInfo={setNewProjectInfo} setEditProjectInfo={setEditProjectInfo} setMenuClicked={setMenuClicked} goToCoords={goToCoords} setGoToCoords={setGoToCoords} />
      </div>
      {menuClicked.newProject ? <CreateProject setNewProjectInfo={setNewProjectInfo} setMenuClicked={setMenuClicked} /> : null}
      {editProjectInfo ? <EditProject editProjectInfo={editProjectInfo} setEditProjectInfo={setEditProjectInfo} /> : null}
      {menuClicked.projectsList ? <ProjectsList setGoToCoords={setGoToCoords} /> : null}
    </div >
  )
}

export default App
