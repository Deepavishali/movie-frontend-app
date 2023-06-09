import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { logOut } from "../../../common/utils/helper";

const Navbar = () => {
	return (
		<div>
			<div className='nav-wrapper'>
				<div className='logo-div'>
					<Link to='/' className='linktag'>
						MBA
					</Link>
				</div>
				<div className='search-div'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='1em'
						height='1em'
						viewBox='0 0 18 18'
						className='search-icon'
					>
						<path
							fill='#f84464'
							d='M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14z'
						/>
					</svg>

					<input
						className='search-input'
						type='search'
						placeholder='search'
					/>
				</div>
				<div className='items-div'>
					{localStorage.getItem("token") ? (
						<button onClick={() => logOut()}>LogOut</button>
					) : (
						<button>
							<Link to='/login'>Login</Link>
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default Navbar;
