import { useAddHospital } from "../hooks/HospitalHooks";
import { Hospital } from "../types/hospital";
import ValidationSummary from "../ValidationSummary";
import HospitalForm from "./HospitalForm";

const HospitalAdd = () => {
    const addHospitalMutation = useAddHospital();

    const house: Hospital = {
        name: "",
        address: "",
        country: "",
        description: "",
        staff: 0,
        id: 0,
        photo: "",
    };

    return (
        <>
            {addHospitalMutation.isError && (
                <ValidationSummary error={addHospitalMutation.error} />
            )}
            <HospitalForm
                hospital={house}
                submitted={(hospital) => addHospitalMutation.mutate(house)}
            />
        </>
    );
};

export default HospitalAdd;
