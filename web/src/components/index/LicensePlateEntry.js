import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const CardWrapper = styled.div`
    width: 100%;
    border: 1px solid lightgrey;
    padding: 20px;
    margin-bottom: 25px;
`;

export const LicensePlateHolder = styled.div`
    cursor: pointer;
    display: flex;
    font-weight: bolder;
    letter-spacing: 3px;
    border-radius: 4px;
    border: 1px solid black;
    background: white;
    width: fit-content;
    height: 34px;
    overflow: hidden;

    &:hover {
        -webkit-box-shadow: 0px 0px 33px -8px rgba(0, 0, 0, 0.2);
        -moz-box-shadow: 0px 0px 33px -8px rgba(0, 0, 0, 0.2);
        box-shadow: 0px 0px 33px -8px rgba(0, 0, 0, 0.2);
    }

    .number {
        padding: 4px 4px 4px 10px;
    }

    .blue-part {
        height: 34px;
        width: 20px;
        background: #0c6bd5;
        color: white;
        font-size: 9px;
        padding-left: 4px;
        padding-top: 15px;
        letter-spacing: normal;
        display: flex;
        justify-content: end;
        align-items: baseline;
    }
`;

const CardExtraContent = styled.div`
    & > .additional-card {
        border-bottom: 1px solid grey;
        padding: 15px 0px;
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
                    <CardExtraContent>
                        {additionalResults.map(({ plate, id }) => {
                            return (
                                <div key={id + plate} className="w-100 d-flex justify-content-between additional-card">
                                    <LicensePlateHolder onClick={() => handleSelect(plate)}>
                                        <div className="blue-part">
                                            <span>BG</span>
                                        </div>
                                        <span className="number">{plate}</span>
                                    </LicensePlateHolder>
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
