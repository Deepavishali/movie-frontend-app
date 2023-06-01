import { Modal } from "react-bootstrap";

const MovieEditModal = (props) => {
    const {
        showMovieEditModal,
        setErrorMessage,
        setShowMovieEditModal,
        selectedMovie,
        handleEditMovieSubmit,
        handleMovieChange,
        errorMessage

    } = props
  return (
    <div>
       <Modal
            show={showMovieEditModal}
            onHide={() => {
                setErrorMessage("");
                setShowMovieEditModal(false);
            }}
            backdrop='static'
            keyboard={false}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>EDIT MOVIE</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="p-1">
                    <h4>MovieId: {selectedMovie._id}</h4>
                </div>

                <hr />

                <form
                 onSubmit={handleEditMovieSubmit}
                 >
                    <div className='input-group'>
                        <label>
                            Movie Name:
                            <input
                                type='text'
                                value={selectedMovie.name}
                                name='name'
                                className='form-control m-1'
                                onChange={handleMovieChange}
                            />
                        </label>
                    </div>

                    <div className='input-group'>
                        <label>
                            Release Data:
                            <input
                                type='text'
                                value={selectedMovie.releaseDate}
                                name='releaseDate'
                                className='form-control m-1'
                                onChange={handleMovieChange}
                            />
                        </label>
                    </div>

                    <div className="input-group">
                <label>
                  Release Status:
                  <input
                    type="text"
                    value={selectedMovie.releaseStatus}
                    name="releaseStatus"
                    className="form-control m-1"
                    onChange={handleMovieChange}
                  />
                </label>
              </div>

              <div className="input-group">
                <label>
                  Director:
                  <input
                    type="text"
                    value={selectedMovie.director}
                    name="director"
                    className="form-control m-1"
                    onChange={handleMovieChange}
                  />
                </label>
              </div>
              <div className="input-group">
                <label>
                  Description:
                  <textarea
                    name="description"
                    className="form-control m-1"
                    onChange={handleMovieChange}
                  >
                    {selectedMovie.description}
                  </textarea>
                </label>
              </div>

                    <div className='input-group'>
                        <button
                            type='button'
                            className='btn btn-secondary'
                            onClick={() => {
                                setErrorMessage("");
                                setShowMovieEditModal(false);
                            }}
                        >
                            Cancel
                        </button>

                        <button type='submit' className='btn btn-primary'>
                            Update
                        </button>
                    </div>
                </form>
              
                {errorMessage && (
                    <div className='text-danger'>{errorMessage}</div>
                )} 
            </Modal.Body>
        </Modal>
    </div>
  )
}

export default MovieEditModal
