import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const CardWrapper = styled.div`
    width: 100%;
    border: 1px solid lightgrey;
    padding: 20px;
    margin-bottom: 25px;
`;

const CardHeader = styled.div``;

const CardExtraContent = styled.div`
    margin-top: 20px;
    background: rgba(211, 211, 211, 0.2);
    padding: 15px;

    & > .additional-card {
        border-bottom: 1px solid grey;
        padding: 10px;
    }
`;

const LicensePlateEntry = ({ licensePlate, additionalResults, pictureName, onSelect }) => {
    const handleSelect = plate => {
        onSelect(plate);
    };

    return (
        <>
            <CardWrapper className={'row mx-0'}>
                <div className="col-lg-6">
                    <CardHeader>
                        <div className="d-flex justify-content-between">
                            <span>
                                <b>{licensePlate}</b>
                            </span>
                            <span className="btn btn-primary btn-sm" onClick={() => handleSelect(licensePlate)}>
                                Избери
                            </span>
                        </div>
                    </CardHeader>

                    <CardExtraContent>
                        {additionalResults.map(({ plate, id }) => {
                            return (
                                <div key={id + plate} className=" mb-2 pl-5 w-100 d-flex justify-content-between additional-card">
                                    <span className="text-bold">{plate}</span>
                                    <span className="btn btn-outline-primary btn-sm" onClick={() => handleSelect(plate)}>
                                        Избери
                                    </span>
                                </div>
                            );
                        })}
                    </CardExtraContent>
                </div>
                <div className="col-lg-6">
                    <img src={process.env.REACT_APP_UPLOAD_FOLDER + pictureName} className="img-fluid" />
                </div>
            </CardWrapper>
        </>
    );
};

LicensePlateEntry.propTypes = {
    licensePlate: PropTypes.string.isRequired,
    additionalResults: PropTypes.array,
    onSelect: PropTypes.func.isRequired,
};

export default LicensePlateEntry;
