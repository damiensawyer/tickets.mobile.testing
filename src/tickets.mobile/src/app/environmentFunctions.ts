export const IsProduction = () => !(!process.env.NODE_ENV || process.env.NODE_ENV === 'development')

