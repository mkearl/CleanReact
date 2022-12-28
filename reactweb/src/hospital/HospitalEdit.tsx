import { useParams } from "react-router-dom";
import ApiStatus from "../apiStatus";
import { useFetchHospital, useUpdateHospital } from "../hooks/HospitalHooks";
import ValidationSummary from "../ValidationSummary";
import HospitalForm from "./HospitalForm";

const HospitalEdit = () => {
    const { id } = useParams();
    if (!id) throw Error("Need a house id");
    const hospitalId = parseInt(id);

    const { data, status, isSuccess } = useFetchHospital(hospitalId);
    const updateHospitalMutation = useUpdateHospital();

    if (!isSuccess) return <ApiStatus status={status} />;

    return (
        <>
            {updateHospitalMutation.isError && (
                <ValidationSummary error={updateHospitalMutation.error} />
            )}
            <HospitalForm
                hospital={data}
                submitted={(hospital) => {
                    updateHospitalMutation.mutate(hospital);
                }}
            />
        </>
    );
};

export default HospitalEdit;
