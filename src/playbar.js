import react from 'react';

const Playbar =()=>{

    return(
        <ul className="justify-content-center fixed-bottom navbar navbar-dark bg-dark">
        <li className="nav-item">
          <a className="nav-link " href="#"><i className="fas fa-backward text-white fa-3x"></i></a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#"><i className="fas fa-play text-white fa-3x"></i></a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#"><i className="fas fa-forward text-white fa-3x"></i></a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#"><i className="fas fa-pause text-white fa-3x"></i></a>
        </li>
      </ul>

    )
}
export default Playbar;