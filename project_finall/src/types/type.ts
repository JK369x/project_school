export interface Lookup {
    id: string | number
    label: string
    zipcode?: string | number
}


export const roleWeek: Lookup[] = [{
    id: '1',
    label: 'จันทร์',
}, {
    id: '2',
    label: 'อังคาร',
}, {
    id: '3',
    label: 'พุธ',
},
{
    id: '4',
    label: 'พฤหัส',
},
{
    id: '5',
    label: 'ศุกร์',
},
{
    id: '6',
    label: 'เสาร์',
},
{
    id: '7',
    label: 'อาทิตย์',
},
]


export const typeCourseOnline_Onside: Lookup[] = [{
    id: '1',
    label: 'ONLINE',
}, {
    id: '2',
    label: 'ONSITE',
},
]
