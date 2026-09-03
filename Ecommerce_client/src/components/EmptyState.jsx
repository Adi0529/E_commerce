import { FaBoxOpen } from "react-icons/fa";

const EmptyState = ({

    title = "No Data Found",

    description = "Nothing to display."

}) => {

    return (

        <div

            className="text-center py-5"

        >

            <FaBoxOpen

                size={70}

                className="text-secondary"

            />

            <h3 className="mt-4">

                {title}

            </h3>

            <p className="text-muted">

                {description}

            </p>

        </div>

    );

};

export default EmptyState;