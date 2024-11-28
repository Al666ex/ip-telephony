export const formatDataRoles = (roles) => roles.map(({value}) => ({
    label : value,
    value,
}))