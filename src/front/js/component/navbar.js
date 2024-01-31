import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import Logo from "../../img/logo.png";
import "../../styles/home.css";

export const Navbar = () => {
	const { store, actions } = useContext(Context);

	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-black" aria-label="Offcanvas navbar large">
    		<div className="container">
				{store.auth == false ? 
					<Link to="/">
						<img src={Logo} className="img-fluid rounded my-2 logo" alt="logo" />
					</Link> :
					<Link to={"/private/" + store.userId}>
						<img src={Logo} className="img-fluid rounded my-2 logo" alt="logo" />
					</Link>
				}
      			<button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar2" aria-controls="offcanvasNavbar2" aria-label="Toggle navigation">
        			<span className="navbar-toggler-icon"></span>
      			</button>
				<div className="offcanvas offcanvas-end text-bg-dark" tabIndex="-1" id="offcanvasNavbar2" aria-labelledby="offcanvasNavbar2Label">
					<div className="offcanvas-header">
						<h5 className="offcanvas-title" id="offcanvasNavbar2Label">Menu</h5>
						<button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
					</div>
					<div className="offcanvas-body">
						<ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
							<li className="nav-item d-flex align-self-center mx-2">
								{store.auth == false ? null :
									<Link to={"/private/" + store.userId}>
										<a className="nav-link active" aria-current="page">Wall</a>
									</Link>
								}
							</li>
							<li className="nav-item dropdown d-flex align-self-center mx-2">
								{store.auth == false ? null :
									<>
										<a className="nav-link active dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
										Lists
										</a>
										<ul className="dropdown-menu dropdown-menu-end">
											<li>
												<Link to="/artists">
													<a className="dropdown-item">Artists</a>
												</Link>
											</li>
											<li>
												<Link to="/albums">
													<a className="dropdown-item">Albums</a>
												</Link>
											</li>
											<li>
												<Link to="/songs">
													<a className="dropdown-item">Songs</a>
												</Link>
											</li>
										</ul>
									</>
								}
							</li>
							{store.auth == false ? null :
								<li className="nav-item dropdown btn btn-pink mx-2">
									<a className="nav-link active dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
										{store.username}
									</a>
									<ul className="dropdown-menu dropdown-menu-end">
										<li>
											<Link to="/account">
												<a className="dropdown-item">Account Settings</a>
											</Link>
										</li>
										<li><hr className="dropdown-divider"/></li>
										<li>
											<button onClick={actions.logout} className="dropdown-item link-pink">Log Out</button>
										</li>
									</ul>
								</li>
							}
							{store.authAdmin == false ? null :
								<li className="nav-item dropdown btn btn-green mx-2">
									<a className="nav-link active dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
										Admin
									</a>
									<ul className="dropdown-menu dropdown-menu-end">
										<li>
											<Link to="/admin/private">
												<a className="dropdown-item">Admin Lists</a>
											</Link>
										</li>
										<li><hr className="dropdown-divider"/></li>
										<li>
											<button onClick={actions.adminLogout} className="dropdown-item link-green">Log Out</button>
										</li>
									</ul>
								</li>
							}
						</ul>
					</div>
				</div>
    		</div>
  		</nav>
	);
};
