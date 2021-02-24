#!/usr/bin/env node
var fs = require('fs');
require('dotenv').config();
const { exec } = require('child_process');
const path = require('path');
const fetch = require('node-fetch');

const BASE_PATH = process.env.BASE_PATH;
const NEW_FILE_PATH = process.env.NEW_FILE_PATH;
const API_URL = encodeURI(process.env.API_URL);

const USER_DETAILS = {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
};
// All the license plates from today
var todaysLicensePlates = [];
var currentToken = {
    token: null,
    expires: 0,
};

/**
 * Gets the current date and transforms it to a path to access the FTP folder
 */
function getFolderDatePath() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();

    return year + '/' + month + '/' + day + '/';
}

/**
 * Deletes all the files from the specified directory
 * @param {*} dirname
 */
function deleteAllDirectoryFiles(dirname) {
    fs.readdir(dirname, (err, files) => {
        files.forEach(f => {
            fs.unlink(path.join(dirname, f), e => console.log(e));
        });
    });
}

/**
 * Reads all the files in a directory and sorts them by date ASC
 * @param {*} dirname - directory where to find all the files
 */
function readFiles(dirname) {
    /**
     * Sort function to sort dates ASC
     * @param {*} f1 - date 1
     * @param {*} f2 - date 2
     */
    function sortFilesByDate(f1, f2) {
        return new Date(f2.modificationDate) - new Date(f1.modificationDate);
    }

    return new Promise((resolve, reject) => {
        fs.readdir(dirname, function(err, filenames) {
            if (err) {
                return reject(err);
            }

            // if (filenames === 'undefined' || filenames.length === 0) {
            if (filenames.length === 0) {
                return reject({ errCode: 0 });
            }

            var sortedFilenames = [];

            filenames.forEach(function(file) {
                var stats = fs.statSync(dirname + '/' + file);
                sortedFilenames.push({
                    filename: file,
                    modificationDate: stats.mtime,
                });
            });

            return resolve(sortedFilenames.sort(sortFilesByDate).map(f => f.filename));
        });
    });
}

/**
 * the image recognition command that is executed in the bash
 * @param {*} file - to be recognised
 * @param {*} basePath - path to the folder with files
 */
function getCommand(file, basePath) {
    return `${process.env.ALPR_COMMAND} ${basePath}${process.env.ALPR_COMMAND_END} ${file}`;
}

function deleteFile(file, basePath) {
    fs.unlink(basePath + file, e => {
        if (e) {
            console.log('Error deleting file', file);
            console.log(e);
            return;
        }
        console.log('Deleting file: ', file);
    });
}

function moveFile(file, basePath) {
    const oldPath = basePath + file;
    const newPath = NEW_FILE_PATH + file;

    fs.rename(oldPath, newPath, e => {
        if (e) {
            console.log('Error moving file', file);
            console.log(e);
            return;
        }
        console.log('Successfully moved file: ', file);
    });
}

/**
 * Loop through all the files and look for license plate
 * @param {*} filesFromFolder
 */
async function alprFiles(filesFromFolder, basePath) {
    console.log('----> ', basePath);
    for (const i in filesFromFolder) {
        const file = filesFromFolder[i];
        const result = await executeOnCommandLine(file, basePath);

        if (result.fail) {
            console.log('No license plate found in ' + file + '.\nOn to the next file ->');
            deleteFile(file, basePath);
        } else {
            const license_plate = result.license_plate;
            console.log('License plate FOUND in ' + file + '. (' + license_plate + ')');
            if (todaysLicensePlates.indexOf(license_plate) < 0) {
                moveFile(file, basePath);
                sendLicensePlate(result, file);
            } else {
                deleteFile(file, basePath);
            }
            todaysLicensePlates.push(license_plate);
            // deleteAllDirectoryFiles(basePath)
            // break;
        }
    }
}

/**
 * Executes command line operation and returns the result
 * @param {*} file - file to execute
 * @param {*} basePath - path to this file
 */
function executeOnCommandLine(file, basePath) {
    return new Promise((resolve, reject) => {
        exec(getCommand(file, basePath), (err, stdout, stderr) => {
            if (err) {
                reject(err);
            }
            // console.log(`getCommand(file, basePath): ${getCommand(file, basePath)}`);
            // console.log(`stdout: ${stdout}`);
            // console.log(`stderr: ${stderr}`);
            if (!stderr) {
                const output = JSON.parse(stdout);
                if (output.results.length === 0) {
                    resolve({ fail: true });
                } else {
                    resolve({
                        fail: false,
                        license_plate: output.results[0].plate,
                        additionalResults: output.results[0].candidates,
                    });
                }
            } else {
                resolve({ fail: true });
            }
        });
    });
}

/**
 * Makes an API call to check for service
 */
function checkAPI() {
    return fetch(API_URL).then(res => res.json());
}

function sendLicensePlate(alprResult, file = '') {
    console.log('🚀 ~ file: index.js ~ line 167 ~ sendLicensePlate ~ plate', JSON.stringify(alprResult));

    const body = {
        license_plate: alprResult.license_plate,
        additional_results: JSON.stringify(alprResult.additionalResults),
        picture_name: file,
    };

    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
    })
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        });

    // if (currentToken.expires < Date.now()) {
    //     fetch(API_URL, {
    //         method: 'POST',
    //         body: JSON.stringify(USER_DETAILS),
    //         headers: [
    //             { 'Content-Type': 'application/json' },
    //         ],
    //     }).then(res => {
    //         currentToken = res;
    //         putLicensePlate(body);
    //     }).catch(err => { console.log(err) });
    // } else {
    //     putLicensePlate(body);
    // }
}

function callAgain(timeout) {
    setTimeout(() => {
        startReading();
    }, timeout);
}

/**
 * Interval which makes API calls to check for service status
 */
function startScript() {
    checkAPI()
        .then(res => {
            console.log('checking service ');
            console.log(res);
            if (res.is_license_plate_required) {
                const todaysPath = BASE_PATH + getFolderDatePath();
                // console.log('Reading from:' + todaysPath);

                readFiles(todaysPath)
                    .then(async res => {
                        console.log(res);
                        await alprFiles(res, todaysPath);
                        return callAgain(2000);
                    })
                    .catch(function(error) {
                        console.log('No files. Going to sleep for 2 sec ... ' + new Date());
                        return callAgain(2000);
                    });
            } else {
                console.log('No service started. Going to sleep for 2 sec ...' + new Date());
                return callAgain(2000);
            }
        })
        .catch(err => {
            console.log(err);
            return callAgain(2000);
        });
}

function startReading() {
    const todaysPath = BASE_PATH + getFolderDatePath();
    // console.log('Reading from:' + todaysPath);

    readFiles(todaysPath)
        .then(async res => {
            await alprFiles(res, todaysPath);
            return callAgain(2000);
        })
        .catch(function(error) {
            // console.log('No files. Going to sleep for 2 sec ... ' + new Date());
            console.log('...');
            return callAgain(2000);
        });
}

startReading();

console.log(`BASE_PATH ${BASE_PATH}`);
console.log(`API_URL ${API_URL}`);

/**
 * Clears the todaysLicensePlates once a day
 * TODO: possibly remove
 */
// setInterval(() => {
//     const now = new Date();
//     if (now.getHours() === 5 && now.getMinutes() === 0) {
//         todaysLicensePlates.clear();
//     }
// }, 60000)
