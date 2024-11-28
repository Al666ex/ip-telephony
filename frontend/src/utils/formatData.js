export const formatData = (arr) => arr.map(({login,roles,banned,banReason}) => ({
    login,
    role : roles[0].value,
    description : roles[0].description,
    banned : banned ? 'true' : 'false',
    banReason
}))