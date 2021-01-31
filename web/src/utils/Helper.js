export default class Helper {

    static transformLicensePlateListData(data) {

        return data.map((entry) => {
            return {
                licensePlate: entry.license_plate,
                additionalResults: JSON.parse(entry.additional_results)
            }
        })
    }

}