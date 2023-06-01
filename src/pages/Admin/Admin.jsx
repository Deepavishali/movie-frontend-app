import React, { useEffect, useState } from "react";
import Navbar from "../LandingPage/Navbar/Navbar";
import "./Admin.css";
import { CCol, CRow, CWidgetStatsC } from "@coreui/react";
import { AiOutlinePieChart } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import { getTheaters, removeTheater ,updateTheater} from "../../common/apis/Theaters/Index.js";
import { getMovies, removeMovie,updateMovie } from "../../common/apis/Movies/index.js";
import { getUsers } from "../../common/apis/Users";
import TheatresEditModal from "./TheatresEditModal";
import MovieEditModal from "./MovieEditModal"
import Button from '@material-ui/core/Button';
import { useNavigate } from "react-router-dom";


const Admin = () => {
	const [counterInfo, setCounterInfo] = useState({});
	const [errorMessage, setErrorMessage] = useState("");
	const [theatersData, setTheatersData] = useState([]);
	const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTheatre, setSelectedTheatre] = useState({});
 
	const [moviesData, setMoviesData] = useState([]);
	const [usersData, setUsersData] = useState([]);

	const [showTheaterTable, setShowTheaterTable] = useState(true);
	const [showMoviesTable, setShowMoviesTable] = useState(false);
	const [showUsersTable, setShowUsersTable] = useState(false);

	const [selectedMovie, setSelectedMovie] = useState({});
	const [showMovieEditModal, setShowMovieEditModal] = useState(false);

	// To navigate //

	const navigate = useNavigate();

	const fetchTheatersData = async () => {
		const theatersData = await getTheaters();
		const theaters = theatersData.data;
		setTheatersData(theaters);
		counterInfo.theaters = theaters?.length;
		setCounterInfo(counterInfo);
	};

	const fetchMoviesData = async () => {
		const datafromAPI = await getMovies();
		const moviesData = datafromAPI.data;
		setMoviesData(moviesData);
		counterInfo.movies = moviesData?.length;
		setCounterInfo(counterInfo);
	};

	const fetchUsersData = async () => {
		const datafromAPI = await getUsers();
		const users = datafromAPI.data;
		setUsersData(users);
		counterInfo.users = users?.length;
		setCounterInfo(counterInfo);
	};

	useEffect(() => {
		fetchTheatersData();
		fetchMoviesData();
		fetchUsersData();
		// eslint-disable-next-line
	}, []);
	const showMovies = () => {
		setShowMoviesTable(true);
		setShowTheaterTable(false);
		setShowUsersTable(false);
	};
	const showTheaters = () => {
		setShowMoviesTable(false);
		setShowTheaterTable(true);
		setShowUsersTable(false);
	};
	const showUsers = () => {
		setShowMoviesTable(false);
		setShowTheaterTable(false);
		setShowUsersTable(true);
	};
	const deleteMovie = async (movie) => {
		await removeMovie(movie);
		fetchMoviesData();
	};
	const deleteTheater = async (theater) => {
		await removeTheater(theater);
		fetchTheatersData();
	};

	
// Edit theatre //
	const editTheater = (theatreDetail) => {
		console.log(theatreDetail);
		setSelectedTheatre({ ...theatreDetail });
		setShowEditModal(true);
	  };

 const handleTicketsChange = (e) => {
		const tempTheatre = { ...selectedTheatre };
		if (e.target.name === "name") {
		  tempTheatre.name = e.target.value;
		} else if (e.target.name === "city") {
		  tempTheatre.city = e.target.value;
		} else if (e.target.name === "description") {
		  tempTheatre.description = e.target.value;
		} else if (e.target.name === "pinCode") {
		  tempTheatre.pinCode = e.target.value;
		}
		setSelectedTheatre(tempTheatre);
	  };
	
	  const handleEditTheatreSubmit = (e) => {
		const id = selectedTheatre._id;
	
		try {
		  updateTheater(id, selectedTheatre)
			.then((res) => {
			  const { message, status } = res;
			  if (status === 200) {
				setSelectedTheatre({});
				setErrorMessage("");
				setShowEditModal(false);
				fetchTheatersData();
			  } else if (message) {
				setErrorMessage(message);
			  }
			})
			.catch((err) => {
			  setErrorMessage(err.message);
			});
		} catch (err) {
		  setErrorMessage(err.message);
		}
		e.preventDefault();
	  };

	  //Edit Movie//

	  const editMovie = (rowData) => {
		console.log(rowData)
		setSelectedMovie({ ...rowData });
		setShowMovieEditModal(true);
	  };

	  const handleEditMovieSubmit = (e) => {
		updateMovie(selectedMovie._id, selectedMovie)
		  .then((res) => {
			const { status } = res;
			if (status === 200) {
			  setErrorMessage("");
			  setSelectedMovie({});
			  fetchMoviesData();
			  setShowMovieEditModal(false);
			}
		  })
		  .catch((err) => {
			setErrorMessage(err.message);
		  });
		e.preventDefault();
	  };
	
	  const handleMovieChange = (e) => {
		const tempMovie = { ...selectedMovie };
	
		if (e.target.name === "name") {
		  tempMovie.name = e.target.value;
		} else if (e.target.name === "releaseDate") {
		  tempMovie.releaseDate = e.target.value;
		} else if (e.target.name === "releaseStatus") {
		  tempMovie.releaseStatus = e.target.value;
		} else if (e.target.name === "director") {
		  tempMovie.director = e.target.value;
		} else if (e.target.name === "description") {
		  tempMovie.description = e.target.value;
		}
	
		setSelectedMovie(tempMovie);
	  };
	  
	const options = {
		filtering: true,
		sorting: true,
		search: true,
		paging: true,
		pageSizeOptions: [5, 10, 20],
		paginationSize: 3,
		paginationType: "stepped",
		headerStyle: {
			backgroundColor: "#323545",
			color: "white",
			align: "center",
			paddingLeft: "auto",
			textAlign: "center",
		},
		rowStyle: {
			backgroundColor: "#fff",
		},
		actionsColumnIndex: -1,
		exportMenu: [
			{
				label: "Export PDF",
				exportFunc: (cols, datas) =>
					ExportPdf(cols, datas, "Tickets CRM"),
			},
			{
				label: "Export CSV",
				exportFunc: (cols, datas) =>
					ExportCsv(cols, datas, "Tickets CRM"),
			},
		],
	};
	return (
		<div>
			<Navbar />
			<h2 className='page-heading'>
				Welcome , {localStorage.getItem("name")} !
			</h2>
			<div>
				<h4 className='stats-heading'>Have a quick look to stats</h4>
				<div className='stats '>
					<CRow className='stats-row'>
						<CCol xs={3}>
							<CWidgetStatsC
								className='widget mb-3'
								icon={<AiOutlinePieChart size={30} />}
								color='primary'
								inverse
								progress={{ value: counterInfo.theater }}
								text='Number of Theaters'
								title='Theaters'
								value={counterInfo.theaters}
								onClick={() => showTheaters()}
							/>
						</CCol>
						<CCol xs={3}>
							<CWidgetStatsC
								className='widget mb-3'
								icon={<AiOutlinePieChart size={30} />}
								color='success'
								inverse
								progress={{ value: counterInfo.movies }}
								text='Number of Movies'
								title='Movies'
								value={counterInfo.movies}
								onClick={() => showMovies()}
							/>
						</CCol>
						<CCol xs={3}>
							<CWidgetStatsC
								className='widget mb-3'
								icon={<AiOutlinePieChart size={30} />}
								color='danger'
								inverse
								progress={{ value: counterInfo.users }}
								text='Number of Users'
								title='Users'
								value={counterInfo.users}
								onClick={() => showUsers()}
							/>
						</CCol>
					</CRow>
					
				</div>
				<div>
					{showTheaterTable && (
						<div className='tables'>
							<MaterialTable
								title='THEATERS'
								getRowId={(row) => row._id}
								columns={[
									{ title: "Theater Name", field: "name" },
									{ title: "City", field: "city" },
									{
										title: "Descriptions",
										field: "description",
									},
									{ title: "Pin Code", field: "pinCode" },
								]}
								actions={[
									{
										icon: AiFillEdit,
										tooltip: "Edit Theater",
										onClick: (event, rowData) => {
											editTheater(rowData);
										},
									},
									{
										icon: AiFillDelete,
										tooltip: "Delete Theatre",
										onClick: (event, rowData) => {
											deleteTheater(rowData);
										},
									},
								]}
								data={theatersData}
								options={options}
							/>
							<br/>
							<Button variant="contained" color="primary" onClick={()=>navigate("/addtheatre")}>Add Theatres</Button>
							<br/>
						</div>
					)}
 {showEditModal && (
        <TheatresEditModal
          showEditModal={showEditModal}
          setErrorMessage={setErrorMessage}
          setShowEditModal={setShowEditModal}
          selectedTheatre={selectedTheatre}
          handleEditTheatreSubmit={handleEditTheatreSubmit}
          handleTicketsChange={handleTicketsChange}
          errorMessage={errorMessage}
        />
      )}
	  </div>
	  
<div>
					{showMoviesTable && (
						<div className='tables'>
							<MaterialTable
								title='MOVIES'
								getRowId={(row) => row._id}
								columns={[
									{ title: "Movie Name", field: "name" },
									{ title: "Director", field: "director" },
									{
										title: "Release Date",
										field: "releaseDate",
									},
									{
										title: "Release Status",
										field: "releaseStatus",
									},
								]}
								
								actions={[
									{
										icon: AiFillEdit,
										tooltip: "Edit Theater",
										onClick: (event, rowData) => {
											editMovie(rowData);
										},
									},
									{
										icon: AiFillDelete,
										tooltip: "Delete Theatre",
										onClick: (event, rowData) => {
											deleteMovie(rowData);
										},
									},
								]}
								data={moviesData}
								options={options}
							/>
							<br/>
							<Button variant="contained" color="primary" onClick={()=>navigate("/addmovie")}>Add Movie</Button>
							<br/>
						</div>
					)}
{showMovieEditModal && (
        <MovieEditModal
		showMovieEditModal={showMovieEditModal}
          setErrorMessage={setErrorMessage}
          setShowMovieEditModal={setShowMovieEditModal}
          selectedMovie={selectedMovie}
          handleEditMovieSubmit={handleEditMovieSubmit}
          handleMovieChange={handleMovieChange}
          errorMessage={errorMessage}
        />
      )}
</div>

					{showUsersTable && (
						<div className='tables'>
							<MaterialTable
								title='USERS'
								getRowId={(row) => row._id}
								columns={[
									{ title: "USER ID", field: "userId" },
									{ title: "Name", field: "name" },
									{ title: "Email", field: "email" },
									{ title: "Role", field: "userType" },
									{title:"UserStatus",field:"userStatus"},
								]}
								data={usersData}
								// actions={[
								// 	{
								// 		icon: AiFillEdit,
								// 		tooltip: "Edit Theater",
								// 		onClick: (event, rowData) => {
								// 			// Edit Function
								// 		},
								// 	},
								// 	{
								// 		icon: AiFillDelete,
								// 		tooltip: "Delete Theatre",
								// 		onClick: (event, rowData) => {
								// 			// Delete Function
								// 		},
								// 	},
								// ]}
								options={options}
							/>
						</div>
					)}
				</div>
			</div>
		);
};

export default Admin;
