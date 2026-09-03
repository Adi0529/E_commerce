const Pagination = ({

    currentPage,

    totalPages,

    onPageChange

}) => {

    if (totalPages <= 1) {

        return null;

    }

    return (

        <nav>

            <ul className="pagination justify-content-center">

                {

                    Array.from(

                        {

                            length: totalPages

                        }

                    ).map((_, index) => (

                        <li

                            key={index}

                            className={`page-item ${currentPage === index + 1 ? "active" : ""}`}

                        >

                            <button

                                className="page-link"

                                onClick={() =>

                                    onPageChange(index + 1)

                                }

                            >

                                {index + 1}

                            </button>

                        </li>

                    ))

                }

            </ul>

        </nav>

    );

};

export default Pagination;