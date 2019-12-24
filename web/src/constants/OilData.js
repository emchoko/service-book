export default {
  // Oil change section
  oil_change_options: [10, 15, 20],
  oil_brands: [
    {
      value: 'Castrol',
      viscosities: [
        { value: '15w40 GTX A3/B3' },
        { value: '10w40 Diesel B4' },
        { value: '10w40 A3/B3' },
        { value: '10w60 Edge' },
        { value: '5w20 Magnatec Prof FORD' },
        { value: '5w30 Edge C1' },
        { value: '5w30 Edge LL (LongLife)' },
        { value: '5w30 Edge C3 (LongLife)' },
        { value: '5w30 Magnatec A5' },
        { value: '5w30 Magnatec C3' },
        { value: '5w40 Magnatec C3' },
        { value: '5w40 Magnatec DPF' },
        { value: '5w40 Edge TD C3' },
        { value: '0w30 Edge C3' },
        { value: '0w30 Edge A5' },
        { value: '0w40 C3' },
      ]
    },
    {
      value: 'Total',
      viscosities: [
        { value: '10w40 A3/B4 наливно' },
        { value: '10w40 7000 Diesel A3/B4' },
        { value: '10w40 7000 A3/B4' },
        { value: '5w40 A3/B4 наливно' },
        { value: '5w40 A3/B4' },
        { value: '5w30 INEO ECS C3' },
        { value: '5w30 INEO LL C3' },
        { value: '5w30 INEO MC3' },
        { value: '0w20 9000 GF 5' },
      ]
    },
    {
      value: 'Elf',
      viscosities: [
        { value: '10w40 A3/B4 наливно' },
        { value: '10w40 TD A3/B4' },
        { value: '10w40 A3/B4' },
        { value: '5w30 C3/C4' },
        { value: '5w40 A3/B4' },
      ]
    },
    {
      value: 'Duglas',
      viscosities: [
        { value: '10w40 A3/B4 наливно' },
        { value: '15w40 A3/B3 наливно' },
        { value: '5w30 C3 наливно' },
        { value: '5w30 LL IV C3' },
        { value: '5w30 C1' },
        { value: '5w40 C3' },
      ]
    },
    {
      value: 'Mobil',
      viscosities: [
        { value: '10w40 2000 A3/B4' },
        { value: '5w30 C2/C3' },
        { value: '5w40 3000 A3/B4' },
        { value: '5w50' },
        { value: '0w40' },
      ]
    },
    {
      value: 'Motul',
      viscosities: [
        { value: '10w40 G100 A3/B4' },
        { value: '5w30 X-clean+ C3' },
        { value: '5w30 X-clean C2/C3' },
        { value: '5w40 A3/B4' },
        { value: '0w20 Dexos 1' },
      ]
    },
    {
      value: 'Repsol',
      viscosities: [
        { value: '10w40 A3/B4' },
      ]
    },
    {
      value: 'Bardahl',
      viscosities: [
        { value: '5w30 C3' },
        { value: '5w40 XTEC C3' },
        { value: '0w30 XTS A1/B1' },
        { value: '0w30 XTS A5/B5' },
        { value: '0w30 XTEC C2' },
      ]
    },
    {
      value: 'Mercedes-Benz',
      viscosities: [
        { value: '5w30 MB 229.52' },
      ]
    },
    {
      value: 'Ford',
      viscosities: [
        { value: '5w30 A5/B5' }
      ]
    },
    {
      value: 'BMW',
      viscosities: [
        { value: '5w30 LongLife-04' }
      ]
    },
    {
      value: 'Toyota',
      viscosities: [
        { value: '5w30' }
      ]
    },
  ],
  // Gearbox section
  oil_gearbox_change_options: [40, 50, 60, 80],

  gear_service_types: [
    { value: 'Ръчна скоростна кутия' },
    { value: 'Диференциал' },
    { value: 'Автоматична скоростна кутия' },
  ],

  oil_manual_gearbox_brands: [
    {
      value: 'Castrol',
      viscosities: [
        { value: '75w80 Syntrans V FE' },
        { value: '75w90 Syntrax LL' },
        { value: '75w90 Syntrans' },
        { value: '75w90 Syntrax' },
        { value: '75w90 Universal +' },
        { value: '75w90 Syntrans Multivehicle' },
        { value: '75w Syntrans B' },
        { value: '75w Syntrans FE' },
        { value: '75w140 Limited Slip' },
        { value: '80-90 EP' },
        { value: '80-90 EPX' },
      ]
    },
    {
      value: 'Total',
      viscosities: [
        { value: '75w80' },
      ]
    },
    {
      value: 'Duglas',
      viscosities: [
        { value: '75w80' },
        { value: '75w90' },
        { value: '80-90' },
      ]
    },
    {
      value: 'Fuchs',
      viscosities: [
        { value: '75w85 Fuchs MB235.7' },
      ]
    },
    {
      value: 'Elf',
      viscosities: [
        { value: '80-90' },
      ]
    },
  ],

  oil_automatic_gearbox_brands: [
    {
      value: 'ATF',
      viscosities: [
        { value: '7G-TRONIC' },
        { value: 'AW' },
        { value: 'CVT' },
        { value: 'VI' },
        { value: 'DEXRON II' },
        { value: 'DEXRON III' },
      ],
    },
    {
      value: 'VAG',
      viscosities: [
        { value: 'SPECIAL DSG/DCT' },
      ],
    },
  ],

  // Hydraulics section
  oil_hydraulics_change_options: [50, 60, 70],

  oil_hydraulics_brands: [
    { 
      value: 'Castrol',
      viscosities: [
        { value: 'D II'},
        { value: 'D III'},
      ]
    },
    { 
      value: 'Duglas',
      viscosities: [
        { value: 'D II'},
        { value: 'D III'},
        { value: 'VW'},
        { value: 'Ford'},
      ]
    },
    { 
      value: 'Total',
      viscosities: [
        { value: 'D III'}
      ]
    },
    { 
      value: 'Fuchs',
      viscosities: [
        { value: 'CHF 11S'}
      ]
    },
    { 
      value: 'IGAT',
      viscosities: [
        { value: 'VW'},
        { value: 'Ford'},
      ]
    },
  ],
}