import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const CardWrapper = styled.div`
    width: 100%;
    border: 1px solid lightgrey;
    padding: 20px;
    margin-bottom: 25px;
`;

const CardHeader = styled.div`
`;

const CardExtraContent = styled.div`
    margin-top: 20px;
    background: rgba(211, 211, 211, 0.2);
    padding: 15px;

    &>.additional-card {
        border-bottom: 1px solid grey;
        padding: 10px;
    }
`;

const LicensePlateEntry = ({ licensePlate, additionalResults, onSelect }) => {

    const [show, setShow] = useState(false);

    const handleSelect = (plate) => {
        onSelect(plate)
    }

    return (
        <>
            <CardWrapper>
                <CardHeader>
                    <div className="d-flex justify-content-between">
                        <span>
                            <b>{licensePlate}</b>
                        </span>
                        <span className="btn btn-primary btn-sm" onClick={() => handleSelect(licensePlate)}>Избери</span>
                    </div>
                    <span className="btn btn-outline-primary btn-sm more-results" onClick={() => setShow(!show)}>Още резултати &#8964;</span>
                </CardHeader>

                {show && (
                    <>
                        <CardExtraContent>
                            {additionalResults.map(({ plate, id }) => {
                                return (
                                    <div key={id + plate} className=" mb-2 pl-5 w-100 d-flex justify-content-between additional-card">
                                        <span className="text-bold">
                                            {plate}
                                        </span>
                                        <span className="btn btn-outline-primary btn-sm" onClick={() => handleSelect(plate)}>Избери</span>
                                    </div>
                                );
                            })}
                        </CardExtraContent>
                    </>
                )}


            </CardWrapper>
        </>
    );
}

LicensePlateEntry.propTypes = {
    licensePlate: PropTypes.string.isRequired,
    additionalResults: PropTypes.array,
    onSelect: PropTypes.func.isRequired
}

export default LicensePlateEntry;