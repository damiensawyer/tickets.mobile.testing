export enum Environment {
    production = "production",
    development = "development",
    local = 'local'
}

export type EnvironmentSettings = {
    environment: Environment,
    baseUrl: string,
}

// export const trippleNumber = (a: number): number => a * 3;
export const GetEnvironmentSettings = (e: Environment): EnvironmentSettings => {
    switch (e) {
        case Environment.development:
            return {environment: Environment.local, baseUrl: 'https://dev.tickets.org.au'}
        case Environment.production:
            return {environment: Environment.local, baseUrl: 'https://app.tickets.org.au'}
        case Environment.local:
            return {environment: Environment.local, baseUrl: 'https://welcomemat.com'}
    }


}

export default class TicketsCore {

}