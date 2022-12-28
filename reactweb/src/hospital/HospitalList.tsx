import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ApiStatus from "../apiStatus";
import { currencyFormatter } from "../config";
import { useFetchHospitals } from "../hooks/HospitalHooks";
import { Hospital } from "../types/hospital";

const HospitalList = () => {
    const nav = useNavigate();
    const { data, status, isSuccess } = useFetchHospitals();

    if (!isSuccess) return <ApiStatus status={status}></ApiStatus>;

    return (
        <div>
            <div className="row mb-2">
                <h5 className="themeFontColor text-center">
                    Hospitals - Net Worth
                </h5>
            </div>
            <table className="table table-hover">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Country</th>
                    <th>Net Worth</th>
                </tr>
                </thead>
                <tbody>
                {data &&
                    data.map((h: Hospital) => (
                        <tr key={h.id} onClick={() => nav(`/hospital/${h.id}`)}>
                            <td>{h.name}</td>
                            <td>{h.address}</td>
                            <td>{h.country}</td>
                            <td>{currencyFormatter.format(h.staff)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link className="btn btn-primary" to="/hospital/add">
                Add
            </Link>
        </div>
    );
};

export default HospitalList;
