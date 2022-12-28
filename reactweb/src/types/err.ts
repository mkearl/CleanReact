type Error = {
    [name: string]: string[];
};

type Err = {
    type: string;
    title: string;
    status: number;
    errors: Error;
};

export default Err;
