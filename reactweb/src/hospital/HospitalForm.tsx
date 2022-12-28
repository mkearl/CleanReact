import React, { useState } from "react";
import toBase64 from "../toBase64";
import { Hospital } from "../types/hospital";

type Args = {
    hospital: Hospital;
    submitted: (hospital: Hospital) => void;
};

const HospitalForm = ({ hospital, submitted }: Args) => {
    const [hospitalState, setHospitalState] = useState({ ...hospital });

    const onSubmit: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault();
        submitted(hospitalState);
    };

    const onFileSelected = async (
        e: React.ChangeEvent<HTMLInputElement>
    ): Promise<void> => {
        e.preventDefault();
        e.target.files &&
        e.target.files[0] &&
        setHospitalState({
            ...hospitalState,
            photo: await toBase64(e.target.files[0]),
        });
    };

    return (
        <form className="mt-2">
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    value={hospitalState.name}
                    onChange={(e) =>
                        setHospitalState({ ...hospitalState, name: e.target.value })
                    }
                />
            </div>
            <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Address"
                    value={hospitalState.address}
                    onChange={(e) =>
                        setHospitalState({ ...hospitalState, address: e.target.value })
                    }
                />
            </div>
            <div className="form-group mt-2">
                <label htmlFor="country">Country</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Country"
                    value={hospitalState.country}
                    onChange={(e) =>
                        setHospitalState({ ...hospitalState, country: e.target.value })
                    }
                />
            </div>
            <div className="form-group mt-2">
                <label htmlFor="description">Description</label>
                <textarea
                    className="form-control"
                    placeholder="Description"
                    value={hospitalState.description}
                    onChange={(e) =>
                        setHospitalState({ ...hospitalState, description: e.target.value })
                    }
                />
            </div>
            <div className="form-group mt-2">
                <label htmlFor="staff">Net Worth</label>
                <input
                    type="number"
                    className="form-control"
                    placeholder="Staff"
                    value={hospitalState.staff}
                    onChange={(e) =>
                        setHospitalState({ ...hospitalState, staff: parseInt(e.target.value) })
                    }
                />
            </div>
            <div className="form-group mt-2">
                <label htmlFor="image">Image</label>
                <input
                    id="image"
                    type="file"
                    className="form-control"
                    onChange={onFileSelected}
                />
            </div>
            <div className="mt-2">
                <img src={hospitalState.photo}></img>
            </div>
            <button
                className="btn btn-primary mt-2"
                disabled={!hospitalState.name || !hospitalState.address || !hospitalState.country}
                onClick={onSubmit}
            >
                Submit
            </button>
        </form>
    );
};

export default HospitalForm;
