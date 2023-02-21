import { faker } from '@faker-js/faker/locale/pt_BR'

export const createFakeData = () => {
    const fakeFullName = `${faker.name.firstName()} ${faker.name.lastName()} ${faker.name.lastName()}`
    const separateNames = fakeFullName.split(' ')
    const fakeEmail = faker.internet.email(separateNames[0], separateNames[1], 'gmail.com')
    const fakePassword = faker.internet.password()

    return {fakeFullName, fakeEmail, fakePassword}
}