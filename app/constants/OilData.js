export default {
  oil_change_options: [10, 15, 20],
  oil_gearbox_change_options: [40, 50, 60, 80],

  oil_brands: [
    {
      value: 'Castrol',
      viscosities: [
        { value: '5w40' },
        { value: '10w40' },
        { value: '10w50' }
      ]
    },
    { value: 'Total' },
    { value: 'Elf' },
    { value: 'Duglas' },
    { value: 'Mobil' },
    { value: 'Motul' },
    { value: 'Repsol' },
    { value: 'Bardahl' },
    { value: 'Mercedes-Benz' },
    { value: 'Ford' },
    { value: 'BMW' },
    { value: 'Toyota' },
  ],
  viscosities: [
    { value: '5w40' },
    { value: '10w40' },
    { value: '10w50' }
  ],

  gear_service_types: [
    { value: 'Ръчна скоростна кутия' },
    { value: 'Диференциал' },
    { value: 'Автоматична скоростна кутия' },
  ],

  oil_gearbox_brands: [
    { value: 'Castrol GB' },
    { value: 'Elf GB' },
    { value: 'Mobil GB' }
  ],
  gearbox_viscosities: [
    { value: '75w40' },
    { value: '70w40' },
    { value: '70w50' }
  ],

  oil_hydraulics_change_options: [50, 60, 70],

  oil_hydraulics_brands: [
    { value: 'Castrol HY' },
    { value: 'Elf HY' },
    { value: 'Mobil HY' }
  ],

  hydraulics_viscosities: [
    { value: '75w40' },
    { value: '70w40' },
    { value: '70w50' }
  ]
}