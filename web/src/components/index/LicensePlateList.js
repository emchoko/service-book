import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Fetcher from '../../utils/Fetcher';
import Helper from '../../utils/Helper';
import LicensePlateEntry from './LicensePlateEntry';

const LicensePlateList = ({ startService }) => {
    const [list, setList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        getListOfLicensePlates();
    }, []);

    const getListOfLicensePlates = () => {
        setIsLoading(true);
        Fetcher.GETsession()
            .then(result => {
                return result.json();
            })
            .then(body => {
                setIsLoading(false);
                setList(Helper.transformLicensePlateListData(body));
            })
            .catch(e => {
                console.log('🚀 ~ file: LicensePlateList.js ~ line 22 ~ getListOfLicensePlates ~ e', e);
                setIsLoading(false);
                setError('Грешка при взимането на резултатите');
            });
    };

    const refresh = () => {
        if (!isLoading) {
            getListOfLicensePlates();
        }
    };

    const handleOnSelect = selectedPlate => {
        if (selectedPlate) {
            startService(selectedPlate);
        }
    };

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4>Резултати:</h4>
                        <button className="btn btn-success btn-sm" disabled={isLoading} onClick={refresh}>
                            Обнови
                        </button>
                    </div>

                    <div>
                        {!error ? (
                            <>
                                {list.map((entry, index) => {
                                    return (
                                        <div key={index}>
                                            <LicensePlateEntry {...entry} onSelect={handleOnSelect} />
                                        </div>
                                    );
                                })}
                            </>
                        ) : (
                            <p>
                                <p className="text-danger">{error}</p>
                            </p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="registration-input">Въведи ръчно</label>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="registration-input"
                                aria-describedby="basic-addon3"
                                placeholder="Въведи регистрационен номер..."
                                autocomplete="off"
                                value={inputValue}
                                onChange={e => {
                                    setInputValue(e.target.value);
                                }}
                            />

                            <button className="ml-5 btn btn-outline-primary" onClick={() => handleOnSelect(inputValue)}>
                                Напред
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

LicensePlateList.propTypes = {
    startService: PropTypes.func.isRequired,
};

export default LicensePlateList;
